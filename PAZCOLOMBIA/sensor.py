import sys
import serial
import datetime
import json
import requests

import Adafruit_DHT

date_handler = lambda obj: (
    obj.isoformat()
    if isinstance(obj, datetime.datetime)
    or isinstance(obj, datetime.date)
    else None
)
ser= serial.Serial('/dev/ttyACM0',9600)
sensor=Adafruit_DHT.DHT22
pin=4
tiempo=datetime.datetime.now()
humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
ser.write("dato")
groundhumidity=""
while groundhumidity=="":    
    while ser.inWaiting()>0:
        groundhumidity= int(ser.readline())         
ser.close()

url='http://ipinfo.io'
res= requests.get(url)
latitude,longitude= res.json()[u'loc'].split(",")
ciudad=res.json()[u'city']

print json.dumps({"IdDispositivo":"DeviceAgro1",
                  "Temperatura": temperature ,
                  "HumedadAmbiente": humidity ,
                  "Time": tiempo,
                  "HumedadSuelo": groundhumidity,
                  "Ciudad": ciudad,
                  "latitude": float(latitude),
                  "longitude": float(longitude)},default=date_handler)





   
