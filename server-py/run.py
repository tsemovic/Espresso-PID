# Imports
from flask import Flask  # Import flask
import time
from flask_socketio import SocketIO, emit
import Adafruit_MAX31855.MAX31855 as MAX31855
import RPi.GPIO as GPIO
from simple_pid import PID
import threading
import json
import math
from datetime import datetime
from atexit import register



# Webserver setup
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secretkey'
socketio = SocketIO(app, logger=False, cors_allowed_origins="*")

temperature = 0
dataArray = []
userConnected = False
currentSettings = ""

# PID setup (default settings)
P = 1
I = 0.02
D = 3
pid = PID(P, I, D)
pid.sample_time = 0.01
pid.output_limits = (-10, 10)
pid.setpoint = 90

# MAX3188 setup
CLK = 4
CS = 3
DO = 2
sensor = MAX31855.MAX31855(CLK, CS, DO)

# SSR setup
GPIO.setup(21, GPIO.OUT)
GPIO.output(21, GPIO.HIGH)


# read PID settings from settings.json
def readSettings():

    # read settings file
    with open('settings.json', 'r') as f:
        data = f.read()
    jsonData = json.loads(data)

    global P
    global I
    global D
    global pid
    global currentSettings

    P = (jsonData['PID']['P'])
    I = (jsonData['PID']['I'])
    D = (jsonData['PID']['D'])
    targetTemperature = jsonData['TargetTemperature']

    currentSettings = {"PID":   {"P": P, "I": I, "D": D},
                       "TargetTemperature": targetTemperature}

    pid = PID(P, I, D)
    pid.sample_time = 0.01
    pid.output_limits = (-10, 10)
    pid.setpoint = targetTemperature

    print("Updated PID settings to: " + str(jsonData))


# readSettings called once at startup to get previously saved configuration from settings.json file
readSettings()

# Webserver Routes
@app.route('/')
def home():  # At the same home function as before
    return "<p>Hello this is the backend</p>"

@app.route('/data')
def data(filepath):
    return send_from_directory('../client/dist', 'index.html')

# SOCKET: connect
@socketio.on('connect')
def connect():
    global userConnected
    userConnected = True
    print('user connected to websocket')

# SOCKET: disconnect
@socketio.on('disconnect')
def disconnect():
    global userConnected
    userConnected = False
    print('user disconnected to websocket')

# SOCKET: send temperature to socket connection
@socketio.on('send_temperature')
def temperature_give():
    socketio.emit('recieve_temperature', dataArray)

# SOCKET: update settings file and re-instantiate PID settings
@socketio.on('send_PID')
def PID_update(data):
    writeSettings(data)
    readSettings()
    socketio.emit('give_PID', currentSettings)
    print("SENDING CURRENT SETTINGS")
    print(currentSettings)

# SOCKET: Send PID settings
@socketio.on('get_PID')
def PID_update():
    print("EMIT: give_PID " + str(currentSettings))
    socketio.emit('give_PID', currentSettings)
    print("SENDING CURRENT SETTINGS")
    print(currentSettings)
    
# function to write data to settings.json file
def writeSettings(data):
    P = data["P"]
    I = data["I"]
    D = data["D"]
    targetTemperature = data["targetTemperature"]

    dictionary = {"PID":   {"P": float(P), "I": float(I), "D": float(D)},
                  "TargetTemperature": float(targetTemperature)}

    # write settings file
    with open('settings.json', 'w', encoding='utf-8') as f:
        json.dump(dictionary, f, ensure_ascii=False, indent=4)

    print("Written settings to file: " + str(dictionary))


def espresso():
    print("THREAD STARTING")
    global temperature
    global temperatureArray
    global timestampArray

    while(True):

        temperature = sensor.readTempC()
        #internal = sensor.readInternalC()

        date = math.trunc(datetime.today().timestamp() * 1000)

        if (len(dataArray) >=60):
            dataArray.pop(0)
        
        dataArray.append({"x": date, "y": temperature})

        output = pid(temperature)
        if(output > 0):
            GPIO.output(21, GPIO.HIGH)
        else:
            GPIO.output(21, GPIO.LOW)

        print("TEMPERATURE: " + str(temperature) + " |  PID OUTPUT: " + str(output))

        time.sleep(0.5)

@register

def terminate():
    GPIO.output(21, GPIO.LOW)
    print("Goodbye!")
    
# If the script that was run is this script (we have not been imported)
if __name__ == '__main__':

    # Run flask and espresso controller on seperate threads
    threading.Thread(target=lambda: socketio.run(
        app, host='192.168.1.21', port=3000, debug=False)).start()
    threading.Thread(target=espresso).start()
