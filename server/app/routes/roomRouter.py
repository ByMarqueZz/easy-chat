from app import app
from flask import request, jsonify
from app.controllers.roomController import RoomController
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