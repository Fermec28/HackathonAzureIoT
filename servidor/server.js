var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var connectionString = 'HostName=hubAgro.azure-devices.net;DeviceId=DeviceTrabajador1;SharedAccessKey=gOI3LMHvTml8tzMRkBQZ77R1Wdj40H6Yps08doWOM6M='
var client = clientFromConnectionString(connectionString);
var enviod={};
var app= express();
var Isconnected=false;
app.use(bodyParser());
app.use(express.static(path.join(__dirname,'public')));


function printResultFor(op) {
   return function printResult(err, res) {
     if (err) console.log(op + ' error: ' + err.toString());
     if (res) console.log(op + ' status: ' + res.constructor.name);
   };
 }


var envio=function(param){     
	  
         var message = new Message(param);         
	 console.log("Sending message: " + message);
         client.sendEvent(message, printResultFor('send'));
     };

var connectCallback = function (err) {
   if (err) {
     console.log('Could not connect: ' + err);
	Isconnected=false;
   } else {
     console.log('Client connected');
	Isconnected=true;
     // Create a message and send it to the IoT Hub every second
   // envio();
   }
 };

client.open(connectCallback);

app.post('/sendproduct',function(req,res){
	console.log(req.body)
	if(Isconnected){   envio(JSON.stringify({"Producto": req.body.Producto, "Cantidad": parseInt(req.body.Cantidad)}));}
	res.send('Cargue Exitoso');

});
app.post('/ayuda',function(req,res){
	if(Isconnected){envio(JSON.stringify(req.body));}	
	res.send('Cargue Exitoso');
});

app.get('*',function(req,res){
	res.send('Operacion invalida');
});


app.listen(8080,function(){
	console.log("Server run on 8080  port");
});
