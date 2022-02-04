# Imports
from flask import Flask, Response  # Import flask
import time
from datetime import datetime
from flask_socketio import SocketIO, emit
import Adafruit_GPIO.SPI as SPI
import Adafruit_MAX31855.MAX31855 as MAX31855
import RPi.GPIO as GPIO
import signal
from simple_pid import PID
from multiprocessing import Process,Queue,Pipe
from espresso import run

runTemperatureLoop = True
connected = False

# Webserver setup
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secretkey'
socketio = SocketIO(app, logger=True, cors_allowed_origins="*")

# PID setup
P = 1
I = 0.1
D = 3
pid = PID(P, I, D)
pid.sample_time = 0.01
pid.setpoint = 90

# MAX3188 setup
CLK = 4
CS  = 3
DO  = 2
sensor = MAX31855.MAX31855(CLK, CS, DO)

# SSR setup
GPIO.setup(21, GPIO.OUT)
GPIO.output(21, GPIO.HIGH)

# Webserver Routes
@app.route('/')
def home():  # At the same home function as before
    return "<p>Hello this is the backend</p>"

@socketio.on('connect')
def test_connect():
    print('someone connected to websocket')
    connected = True    
    
@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')
    connected = False


# 

parent_conn,child_conn = Pipe()
p = Process(target=run, args=(child_conn,))
p.start()
print(parent_conn.recv())   # prints output
socketio.emit('temperature', parent_conn.recv());

if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
    socketio.run(app, host='192.168.1.21', port=3000, debug=True)  # Start the server

    
