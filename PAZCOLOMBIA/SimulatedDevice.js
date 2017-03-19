'use strict';
var exec= require('child_process').exec;
 var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
 var Message = require('azure-iot-device').Message;

 var connectionString = 'HostName=hubAgro.azure-devices.net;DeviceId=DeviceAgro1;SharedAccessKey=suy9wHYBGMwzcX4TP/Y86KmwbQjzNS07KDJwV8T+3dc=';

 var client = clientFromConnectionString(connectionString);

function printResultFor(op) {
   return function printResult(err, res) {
     if (err) console.log(op + ' error: ' + err.toString());
     if (res) console.log(op + ' status: ' + res.constructor.name);
   };
 }

 var connectCallback = function (err) {
   if (err) {
     console.log('Could not connect: ' + err);
   } else {
     console.log('Client connected');

     // Create a message and send it to the IoT Hub every second
     setInterval(function(){
	var data;
	exec("python sensor.py",function(err,stdout){
 		if(err){console.log(err); }		
		data=stdout;
		console.log("Data is: "+ data);
		
		var message = new Message(data);
        	console.log("Sending message: " + message.getData());
         	client.sendEvent(message, printResultFor('send'));			
		});	
         
//captura de sensores, construccion de JSON
         
     }, 3000);
   }
 };

 client.open(connectCallback);