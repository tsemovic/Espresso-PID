# Imports
from flask import Flask, session  # Import flask
import time
from datetime import datetime
from flask_socketio import SocketIO, emit
import Adafruit_GPIO.SPI as SPI
import Adafruit_MAX31855.MAX31855 as MAX31855
import RPi.GPIO as GPIO
from simple_pid import PID
from multiprocessing import Process,Queue,Pipe,Value
from espresso import mainFunc
import threading


# Webserver setup
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secretkey'
socketio = SocketIO(app, logger=True, cors_allowed_origins="*")


temp = 0
userConnected = False


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
def connect():
    global userConnected
    userConnected = True
    print('someone connected to websocket')
    socketio.emit('temperature', "WOW")

    for x in "HELLO":
        print(temp)
        socketio.emit('temperature' , x)
        socketio.sleep(2)
        

    
@socketio.on('disconnect')
def disconnect():
    global userConnected
    userConnected = False
    print('user disconnected to websocket')  
            
            
def sendDat(data):            
    print("SENDING DATA : " + str(data))
    socketio.emit('temperature', "DATATATATA")

def thread_function(arg):
    
    print("THREAD STARTING")
    global temp
    global userConnected
    while(True):

        temp = sensor.readTempC()
        #internal = sensor.readInternalC()
        
        output = pid(temp)
        if(output > 0):
            GPIO.output(21, GPIO.HIGH)
        else:
            GPIO.output(21, GPIO.LOW)  
            
        print("TEMPERATURE: " + str(temp) + " |  PID OUTPUT: " + str(output))
        print("USER CONNECTED: " + str(userConnected))
        
        
        sendDat(output)
        
        time.sleep(2);
    
if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
    
    threading.Thread(target=lambda: socketio.run(app, host='192.168.1.21', port=3000, debug=False)).start()
    threading.Thread(target=thread_function, args=(1,)).start()

    #socketio.run(app, host='192.168.1.21', port=3000, debug=False)  # Start the server
    