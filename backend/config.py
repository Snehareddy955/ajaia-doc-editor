import os

class Config:
    SECRET_KEY = "ajaia-secret-key"
    SQLALCHEMY_DATABASE_URI = "sqlite:///documents.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False