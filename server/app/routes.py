from app import app
from markupsafe import escape
from flask import request, jsonify
import socketio

sio = socketio.Server(cors_allowed_origins="*")
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

@app.route("/")
def index():
    return "<h1>¡Hola, mundo!</h1>"

@sio.event
def connect(sid, environ):
    print(f"Usuario conectado: {sid}")
    sio.emit("message", "¡Bienvenido!", room=sid)

@sio.event
def disconnect(sid):
    print(f"Usuario desconectado: {sid}")

@sio.event
def sendMessage(sid, data):
    print(f'Mensaje recibido de {sid}: {data}')
    sio.emit('takeMessage', data)
