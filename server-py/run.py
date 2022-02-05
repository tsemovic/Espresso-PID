# Imports
from flask import Flask, session  # Import flask
import time
from datetime import datetime
from flask_socketio import SocketIO, emit
import Adafruit_GPIO.SPI as SPI
import Adafruit_MAX31855.MAX31855 as MAX31855
import RPi.GPIO as GPIO
import signal
from simple_pid import PID
from multiprocessing import Process,Queue,Pipe,Value
from espresso import run
import threading

# Webserver setup
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secretkey'
socketio = SocketIO(app, logger=True, cors_allowed_origins="*")

# parent_conn,child_conn = Pipe()
# p = Process(target=run, args=(child_conn,))
# p.start()

# Webserver Routes
@app.route('/')
def home():  # At the same home function as before
    return "<p>Hello this is the backend</p>"

# @socketio.on('connect')
# def test_connect():
#     print('someone connected to websocket')  
    
# @socketio.on('disconnect')
# def test_disconnect():
#     print('Client disconnected')

def thread_function(arg):
    
    if arg.value == True:
        print("TRUEUREURUERUEUREUREURUEUREU")
    
    print("THREAD STARTING")
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
    
    global userConnected 
    userConnected = False

    while(True):
        
        @socketio.on('connect')
        def connect():
            global userConnected
            userConnected = True
            print('someone connected to websocket') 
            print("YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
            print(userConnected)
           
        # @socketio.on('disconnect')
        # def disconnect():
        #     print('Client disconnected')   
        #     userConnected = False

        temp = sensor.readTempC()
        #internal = sensor.readInternalC()
        
        output = pid(temp)
        if(output > 0):
            GPIO.output(21, GPIO.HIGH)
        else:
            GPIO.output(21, GPIO.LOW)  
            
        print("TEMPERATURE: " + str(temp) + " |  PID: " + str(output))
        print("USER STATIS: " + str(userConnected))
        
        # If user is connected send data via socket
        if(userConnected == True):
            print("SENDING DATA")
            socketio.emit('temperature', output)

        time.sleep(2);
        
        

if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
    
    #q = Queue()
    #q.put("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIi")
    #socketio.run(app, host='192.168.1.21', port=3000, debug=False)  # Start the server
    #threading.Thread(target=socketio.start_background_task(thread_function)).start()
    #threading.Thread(target=lambda: socketio.run(app, host='192.168.1.21', port=3000, debug=False)).start()
    #threading.Thread(target=thread_function, args=(1,)).start()
    recording_on = Value('b', True)

    p = Process(target=thread_function, args=(recording_on,))
    p.start()  
    socketio.run(app, host='192.168.1.21', port=3000, debug=False)  # Start the server
    p.join()
    