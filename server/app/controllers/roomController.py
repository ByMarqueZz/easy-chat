from app.models import Room
from app import db

class RoomController:
    def __init__(self):
        self.__model = Room()

    def get_all(self):
        return self.__model.query.all()
    
    def get_by_id(self, id):
        return self.__model.query.get(id)
    
    def create(self, name, profile_picture):
        room = Room(name=name, profile_picture=profile_picture)
        db.session.add(room)
        db.session.commit()
        return room
    
