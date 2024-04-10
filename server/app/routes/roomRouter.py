from app import app
from flask import request, jsonify
from app.controllers.roomController import RoomController
from app.controllers.messageController import MessageController
from app.routes import events

@app.route('/room/getRooms', methods=['GET'])
def getRooms():
    controller = RoomController()
    rooms = controller.get_all()
    rooms = list(map(lambda room: room.serialize(), rooms))
    return jsonify({"rooms": rooms}), 200

@app.route('/room/newRoom', methods=['POST'])
def newRoom():
    body = request.get_json()
    name = body["name"]
    profile_picture = body["profile_picture"]
    controller = RoomController()
    controller.create(name, profile_picture)
    events.reloadRoom()
    return jsonify({"message": "Room created successfully", "ok": True}), 200

@app.route('/room/getMessages', methods=['POST'])
def getMessages():
    body = request.get_json()
    room_id = body['idRoom']
    controller = MessageController()
    messages = controller.get_messages_by_room_id(room_id)
    return jsonify({'message': "Messages getter", "messages": messages})

@app.route("/room/getLastMessage", methods=['POST'])
def getLastMessage():
    body = request.get_json()
    room_id = body['idRoom']
    controller = MessageController()
    message = controller.get_last_message_by_room_id(room_id)
    if message is not None:
        return jsonify({'message': 'Okey', 'lastMessage': message})
    else:
        return jsonify({"message": "No message yet"})
