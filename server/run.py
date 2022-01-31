# Webserver Setup
from flask import Flask, Response  # Import flask
import time
from datetime import datetime
from flask_socketio import SocketIO, emit

app = Flask(__name__, static_url_path='') # Setup the Flask app by creating an instance of Flask
socketio = SocketIO(app)

# MAX31855 Setup (thermocouple amplifier board)
#import board
#import digitalio
#import adafruit_max31855
#spi = board.SPI()
#cs = digitalio.DigitalInOut(board.D5)
#max31855 = adafruit_max31855.MAX31855(spi, cs)

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


@socketio.event
def my_event(message):
    emit('my response', {'data': 'got it!'})

if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
    socketio.run(app)  # Start the server
