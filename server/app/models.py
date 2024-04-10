from app import db
from datetime import datetime

user_room_association = db.Table(
    'user_room_association',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('room_id', db.Integer, db.ForeignKey('room.id'))
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), index=True)
    password = db.Column(db.String(255), index=True)

    rooms = db.relationship('Room', secondary=user_room_association, back_populates='users')

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
        }

    def __repr__(self):
        return f'<User {self.name}>'

class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), index=True)
    profile_picture = db.Column(db.String(255), index=True)

    users = db.relationship('User', secondary=user_room_association, back_populates='rooms')

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'profile_picture': self.profile_picture,
        }

    def __repr__(self):
        return f'<Room {self.name}>'
    
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)

    user = db.relationship('User', backref=db.backref('messages', lazy=True))
    room = db.relationship('Room', backref=db.backref('messages', lazy=True))

    def serialize(self):
        return {
            'id': self.id,
            'text': self.text,
            'timestamp': self.timestamp.isoformat(),
            'user': {
                'id': self.user.id,
                'username': self.user.username,
            },
            'room': {
                'id': self.room.id,
                'name': self.room.name,
            }
        }

    def __repr__(self):
        return f'<Message {self.text}>'