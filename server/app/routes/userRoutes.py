from app import app
from flask import request, jsonify
from app.controllers.userController import UserController
@app.route("/")
def index():
    return "<h1>¡Hola, mundo!</h1>"



@app.route("/user/newUser", methods=["POST"])
def register():
    body = request.get_json()
    username = body["username"]
    password = body["password"]
    controller = UserController()
    user = controller.register(username, password)
    if user is None:
        return jsonify({"message": "User already exists"}), 400
    else: 
        return jsonify({"user": user.serialize(), "message": "User created successfully"}), 200
    
@app.route("/user/login", methods=["POST"])
def login():
    body = request.get_json()
    username = body["username"]
    password = body["password"]
    controller = UserController()
    user = controller.login(username, password)
    if user is None or user is False:
        return jsonify({"message": "Invalid credentials"}), 400
    else:
        return jsonify({"user": user.serialize(), "message": "Login successful"}), 200
        