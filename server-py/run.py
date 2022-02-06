# Imports
from flask import Flask  # Import flask
import time
from flask_socketio import SocketIO, emit
import Adafruit_MAX31855.MAX31855 as MAX31855
import RPi.GPIO as GPIO
from simple_pid import PID
import threading
import json


# Webserver setup
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secretkey'
socketio = SocketIO(app, logger=False, cors_allowed_origins="*")

temp = 0
userConnected = False

# PID setup
P = 1
I = 0.02
D = 3

pid = PID(P, I, D)
pid.sample_time = 0.01
pid.setpoint = 90

def readSettings():
    
    # read settings file
    with open('settings.json', 'r') as myfile:
        data=myfile.read()
    jsonData = json.loads(data)
    
    global P
    global I
    global D
    global pid
    
    P = (jsonData['PID']['P'])
    I = (jsonData['PID']['I'])
    D = (jsonData['PID']['D'])
    targetTemperature = jsonData['TargetTemperature']

    pid = PID(P, I, D)
    pid.sample_time = 0.01
    pid.setpoint = targetTemperature
    
readSettings()


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

# Connect and Disconnect
@socketio.on('connect')
def connect():
    global userConnected
    userConnected = True
    print('user connected to websocket')
    
@socketio.on('disconnect')
def disconnect():
    global userConnected
    userConnected = False
    print('user disconnected to websocket')  

# Update Temperature
@socketio.on('temperature_give')
def temperature_give():
    socketio.emit('temperature', temp)
    print(pid.setpoint)

# Update PID
@socketio.on('PID_update')
def PID_update(data):
    print("updated PID settings: " + str(data))
    print(data)
 
    
def setPID():
    P = 2

def espresso():
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
                
        time.sleep(1);
    
if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
    
    # Run flask and espresso controller on seperate threads
    threading.Thread(target=lambda: socketio.run(app, host='192.168.1.21', port=3000, debug=False)).start()
    threading.Thread(target=espresso).start()    