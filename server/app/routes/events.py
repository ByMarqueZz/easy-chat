import socketio
from app import app
import json
from app.services.asignColor import *
from app.controllers.messageController import MessageController

sio = socketio.Server(cors_allowed_origins="*")
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

@sio.event
def connect(sid, environ):
    print(f"Usuario conectado: {sid}")
    asignar_color(sid)
    sio.emit("message", "¡Bienvenido!", room=sid)

@sio.event
def disconnect(sid):
    borrar_sid(sid)
    print(f"Usuario desconectado: {sid}")
    sio.emit("disconnect", 'reason')

@sio.event
def sendMessage(sid, data):
    print(f'Mensaje recibido de {sid}:')
    data['color'] = obtener_color(sid)
    controller = MessageController()
    controller.create_message(data['inputText'], data['user']['id'], data['room']['id'])
    reloadHome()
    json_data = json.dumps(data)
    sio.emit('takeMessage', json_data)

@sio.event
def reloadRoom():
    sio.emit('reloadRoom')

@sio.event
def reloadHome():
    sio.emit('reloadHome')