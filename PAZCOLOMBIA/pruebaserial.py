import serial
import sys
import time
ser= serial.Serial('/dev/ttyACM0',9600)  
ser.write("dato")
dato=""
while dato=="":    
    while ser.inWaiting()>0:
        dato=ser.readline()
        print dato          
ser.close()
