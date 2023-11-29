import socketio
from app import app

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
    print(f'Mensaje recibido de {sid}: {data}')
    sio.emit('takeMessage', data)
