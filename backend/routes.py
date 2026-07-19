from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os

from database import db
from models import User, Document, SharedDocument

api = Blueprint("api", __name__)

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"txt", "md"}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# -------------------------
# Health Check
# -------------------------

@api.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "Backend Connected"
    })


# -------------------------
# Login
# -------------------------

@api.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(
        email=email,
        password=password
    ).first()

    if user:

        return jsonify({
            "success": True,
            "id": user.id,
            "name": user.name,
            "email": user.email
        })

    return jsonify({
        "success": False,
        "message": "Invalid Email or Password"
    }), 401


# -------------------------
# Get All Documents
# -------------------------

@api.route("/documents", methods=["GET"])
def get_documents():

    docs = Document.query.order_by(Document.id.desc()).all()

    result = []

    for doc in docs:

        result.append({
            "id": doc.id,
            "title": doc.title,
            "content": doc.content,
            "owner_id": doc.owner_id,
            "updated_at": str(doc.updated_at)
        })

    return jsonify(result)


# -------------------------
# Get Single Document
# -------------------------

@api.route("/documents/<int:id>", methods=["GET"])
def get_document(id):

    doc = Document.query.get_or_404(id)

    return jsonify({
        "id": doc.id,
        "title": doc.title,
        "content": doc.content,
        "owner_id": doc.owner_id,
        "updated_at": str(doc.updated_at)
    })


# -------------------------
# Create Document
# -------------------------

@api.route("/documents", methods=["POST"])
def create_document():

    data = request.json

    title = data.get("title")

    if not title:

        return jsonify({
            "message": "Title is required"
        }), 400

    doc = Document(
        title=title,
        content="",
        owner_id=data.get("owner_id")
    )

    db.session.add(doc)
    db.session.commit()

    return jsonify({
        "message": "Document Created",
        "id": doc.id
    }), 201


# -------------------------
# Update Document
# -------------------------

@api.route("/documents/<int:id>", methods=["PUT"])
def update_document(id):

    doc = Document.query.get_or_404(id)

    data = request.json

    doc.title = data.get("title", doc.title)
    doc.content = data.get("content", doc.content)

    db.session.commit()

    return jsonify({
        "message": "Document Updated Successfully"
    })


# -------------------------
# Delete Document
# -------------------------

@api.route("/documents/<int:id>", methods=["DELETE"])
def delete_document(id):

    doc = Document.query.get_or_404(id)

    db.session.delete(doc)
    db.session.commit()

    return jsonify({
        "message": "Document Deleted Successfully"
    })
# -------------------------
# Get Users
# -------------------------

@api.route("/users", methods=["GET"])
def get_users():

    users = User.query.all()

    result = []

    for user in users:

        result.append({
            "id": user.id,
            "name": user.name,
            "email": user.email
        })

    return jsonify(result)

# -------------------------
# Share Document
# -------------------------

@api.route("/share", methods=["POST"])
def share_document():

    data = request.json

    document_id = data.get("document_id")
    user_id = data.get("user_id")

    already_shared = SharedDocument.query.filter_by(
        document_id=document_id,
        user_id=user_id
    ).first()

    if already_shared:

        return jsonify({
            "message": "Already Shared"
        })

    share = SharedDocument(
        document_id=document_id,
        user_id=user_id
    )

    db.session.add(share)
    db.session.commit()

    return jsonify({
        "message": "Document Shared Successfully"
    })


# -------------------------
# Shared Documents
# -------------------------

@api.route("/shared/<int:user_id>", methods=["GET"])
def shared_documents(user_id):

    shares = SharedDocument.query.filter_by(
        user_id=user_id
    ).all()

    result = []

    for share in shares:

        doc = Document.query.get(share.document_id)

        if doc:

            result.append({
                "id": doc.id,
                "title": doc.title,
                "content": doc.content,
                "owner_id": doc.owner_id
            })

    return jsonify(result)


# -------------------------
# Upload TXT / MD
# -------------------------

@api.route("/upload", methods=["POST"])
def upload_file():

    if "file" not in request.files:

        return jsonify({
            "message": "No file uploaded"
        }), 400

    file = request.files["file"]

    if file.filename == "":

        return jsonify({
            "message": "No file selected"
        }), 400

    if not allowed_file(file.filename):

        return jsonify({
            "message": "Only .txt and .md files are supported"
        }), 400

    filename = secure_filename(file.filename)

    path = os.path.join(UPLOAD_FOLDER, filename)

    file.save(path)

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    doc = Document(
        title=filename,
        content=content,
        owner_id=1
    )

    db.session.add(doc)
    db.session.commit()

    return jsonify({
        "message": "File Imported Successfully",
        "document_id": doc.id
    })