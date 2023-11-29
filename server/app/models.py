from app import db

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

    users = db.relationship('User', secondary=user_room_association, back_populates='rooms')

    def __repr__(self):
        return f'<Room {self.name}>'
    