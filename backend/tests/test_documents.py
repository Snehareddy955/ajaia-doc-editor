import pytest

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import app
from database import db


@pytest.fixture
def client():

    app.config["TESTING"] = True

    with app.test_client() as client:

        with app.app_context():
            db.create_all()

        yield client

        with app.app_context():
            db.drop_all()



def test_get_documents(client):

    response = client.get("/documents")

    assert response.status_code == 200

def test_create_document(client):

    response = client.post(
        "/documents",
        json={
            "title":"Test Document",
            "contpytestent":"Testing Ajaia Docs"
        }
    )

    assert response.status_code in [200,201]