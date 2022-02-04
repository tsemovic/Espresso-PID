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
import threading

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

# Crtl-c handler (turns off SSR)
def handler(signum, frame):
    res = input("Ctrl-c was pressed. Do you really want to exit? y/n ")
    if res == 'y':
        GPIO.output(21, GPIO.LOW)
        exit(1)
signal.signal(signal.SIGINT, handler)

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

def temperature():
    while (runTemperatureLoop == True):
        #internal = sensor.readInternalC()
        temp = sensor.readTempC()
        output = pid(temp)

        if(output > 0):
            GPIO.output(21, GPIO.HIGH)
        else:
            GPIO.output(21, GPIO.LOW)
            
        if(connected):
            socketio.emit('temperature', temp);
            print("Temperature: " + str(temp) + " PID: " + str(output))     
             
    time.sleep(2)

#temperature()
thread2 = threading.Thread(target=temperature)
thread2.start()

if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
    socketio.run(app, host='192.168.1.21', port=3000, debug=True)  # Start the server

    
