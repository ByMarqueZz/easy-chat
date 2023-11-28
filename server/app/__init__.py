from flask import Flask
import socketio

app = Flask(__name__)

from app import routes