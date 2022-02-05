import time
import Adafruit_GPIO.SPI as SPI
import Adafruit_MAX31855.MAX31855 as MAX31855
import RPi.GPIO as GPIO
import signal
from simple_pid import PID
from multiprocessing import Process,Pipe


P = 1
I = 0.1
D = 0.05

pid = PID(P, I, D)
pid.sample_time = 0.01
pid.setpoint = 90

# Raspberry Pi software SPI configuration.
CLK = 4
CS  = 3
DO  = 2
sensor = MAX31855.MAX31855(CLK, CS, DO)


GPIO.setup(21, GPIO.OUT)
GPIO.output(21, GPIO.HIGH)


def handler(signum, frame):
    res = input("Ctrl-c was pressed. Do you really want to exit? y/n ")
    if res == 'y':
        GPIO.output(21, GPIO.LOW)
        exit(1)
 
signal.signal(signal.SIGINT, handler)

# Loop printing measurements every second.
def mainFunc(_q):
    while(True):
        temp = sensor.readTempC()
        #internal = sensor.readInternalC()

        output = pid(temp)
        if(output > 0):
            GPIO.output(21, GPIO.HIGH)
        else:
            GPIO.output(21, GPIO.LOW)  
            
            
        print("TEMPERATURE: " + str(temp) + "  |  PID: " + str(output)) 
        print("FROM ESPRESS)))): " + str(_q.get()))       
        time.sleep(1);
            

