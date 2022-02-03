# Imports
from flask import Flask, Response  # Import flask
import time
from datetime import datetime
from flask_socketio import SocketIO, emit
import Adafruit_GPIO.SPI as SPI
import Adafruit_MAX31855.MAX31855 as MAX31855
from simple_pid import PID
from flask_cors import CORS


# Webserver setup
app = Flask(__name__)
socketio = SocketIO(app, logger=True, cors_allowed_origins="*")


# Webserver Routes
@app.route('/')
def home():  # At the same home function as before
    return "<p>HELLO</p>"

@socketio.on('connect')
def test_connect():
    socketio.emit('message', "HI FROM SEVER!");

    print('someone connected to websocket')
       
if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
    socketio.run(app, host='192.168.1.21', port=3000, debug=True)  # Start the server