import socketio
from app import app
import json


sio = socketio.Server(cors_allowed_origins="*")
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

@sio.event
def connect(sid, environ):
    print(f"Usuario conectado: {sid}")
    sio.emit("message", "¡Bienvenido!", room=sid)

@sio.event
def disconnect(sid):
    print(f"Usuario desconectado: {sid}")

@sio.event
def sendMessage(sid, data):
    print(f'Mensaje recibido de {sid}:')
    json_data = json.dumps(data)
    sio.emit('takeMessage', json_data)

@sio.event
def reloadRoom(sid):
    sio.emit('reloadRoom')
