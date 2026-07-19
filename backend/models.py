from database import db
from datetime import datetime


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)


class Document(db.Model):
    __tablename__ = "documents"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, default="")
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )


class SharedDocument(db.Model):
    __tablename__ = "shared_documents"

    id = db.Column(db.Integer, primary_key=True)
    document_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer)