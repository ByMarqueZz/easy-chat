from app import db, app
from app.models import Message

class MessageController:
    def __init__(self):
        self.__model = Message()

    def get_all(self):
        return self.__model.query.all()
    
    def get_by_id(self, id):
        return self.__model.query.get(id)
    
    def get_messages_by_room_id(self, room_id):
        messages = self.__model.query.filter_by(room_id=room_id).all()
        serialized_messages = [message.serialize() for message in messages]
        return serialized_messages
    
    def create_message(self, text, user_id, room_id):
        with app.app_context():
            new_message = Message(text=text, user_id=user_id, room_id=room_id)
            db.session.add(new_message)
            db.session.commit()
            return new_message
        
    def get_last_message_by_room_id(self, room_id):
        with app.app_context():
            last_message = self.__model.query.filter_by(room_id=room_id).order_by(Message.timestamp.desc()).first()
            if last_message:
                return last_message.serialize()
            return None