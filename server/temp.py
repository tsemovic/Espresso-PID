import time
import Adafruit_GPIO.SPI as SPI
import Adafruit_MAX31855.MAX31855 as MAX31855
import RPi.GPIO as GPIO
import signal
from simple_pid import PID
import sys, json

P = 1
I = 0.1
D = 0.05

pid = PID(P, I, D)
pid.sample_time = 0.01
pid.setpoint = 90

# Define a function to convert celsius to fahrenheit.
def c_to_f(c):
        return c * 9.0 / 5.0 + 32.0

# Raspberry Pi software SPI configuration.
CLK = 4
CS  = 3
DO  = 2
sensor = MAX31855.MAX31855(CLK, CS, DO)

GPIO.setup(21, GPIO.OUT)
GPIO.output(21, GPIO.HIGH)

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def handler(signum, frame):
    res = input("Ctrl-c was pressed. Do you really want to exit? y/n ")
    if res == 'y':
        GPIO.output(21, GPIO.LOW)
        exit(1)
 
signal.signal(signal.SIGINT, handler)


# Loop printing measurements every second.
while True:
    temp = sensor.readTempC()
    internal = sensor.readInternalC()
    
    #lines = read_in()
        
    print(temp)

    output = pid(temp)

    if(output > 0):
        GPIO.output(21, GPIO.HIGH)
    else:
        GPIO.output(21, GPIO.LOW)      
    time.sleep(1) 
