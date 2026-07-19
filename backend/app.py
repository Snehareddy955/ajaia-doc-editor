from flask import Flask
from flask_cors import CORS

from config import Config
from database import db
from routes import api
from models import User

app = Flask(__name__)

app.config.from_object(Config)

CORS(app)

db.init_app(app)

app.register_blueprint(api)

with app.app_context():

    db.create_all()

    if User.query.count() == 0:

        alice = User(
            name="Alice",
            email="alice@test.com",
            password="123456"
        )

        bob = User(
            name="Bob",
            email="bob@test.com",
            password="123456"
        )

        db.session.add(alice)
        db.session.add(bob)
        db.session.commit()

@app.route("/documents", methods=["POST"])
def create_document():
    return {"message": "Document Created"}
@app.route("/documents", methods=["GET"])
def get_documents():
    return []
if __name__ == "__main__":
    app.run(debug=True)