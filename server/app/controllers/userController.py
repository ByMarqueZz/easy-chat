from app.models import User
from app import db

class UserController:
    def __init__(self):
        self.__model = User()

    def get_all(self):
        return self.__model.query.all()
    
    def get_by_id(self, id):
        return self.__model.query.get(id)
    
    def register(self, username, password):
        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        return user
    
    def login(self, username, password):
        user: User = self.__model.query.filter_by(username=username).first()
        if user is None:
            return False
        if user.password == password:
            return user
    