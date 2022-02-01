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
from flask_cors import CORS


# Webserver setup
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secretkey'
socketio = SocketIO(app, logger=True)

# PID setup
P = 1
I = 0.1
D = 0.05
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
    return app.send_static_file('index.html')  # Return index.html from the static folder

@app.route("/test/")
def test():

    def streamer():
        counter = "1";
        while True:
            counter = counter + "1"
            #tempC = max31855.temperature
            #tempF = tempC * 9 / 5 + 32
            #print("Temperature: {} C {} F ".format(tempC, tempF))
            yield counter

            time.sleep(1.0)

    return Response(streamer())



@socketio.on('connect')
def test_connect():
    socketio.emit('message', "HI FROM SEVER!");

    print('someone connected to websocket')
    
# Receive a message from the front end HTML
@socketio.on('send_message')   
def message_recieved(data):
    print(data['text'])
    emit('message_from_server', {'text':'Message recieved!'})
    
if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
    socketio.run(app, host='0.0.0.0', port=80, debug=True)  # Start the server
    
    