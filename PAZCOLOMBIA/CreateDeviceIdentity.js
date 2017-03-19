'use strict';

var iothub = require('azure-iothub');

var connectionString = 'HostName=hubAgro.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=yH8XiPALg5XtTt8xsM00GhGvNigZjbyouyAISMfVdO4=';

var registry = iothub.Registry.fromConnectionString(connectionString);

var device = new iothub.Device(null);
 device.deviceId = 'DeviceTrabajador1';
 registry.create(device, function(err, deviceInfo, res) {
   if (err) {
     registry.get(device.deviceId, printDeviceInfo);
   }
   if (deviceInfo) {
     printDeviceInfo(err, deviceInfo, res)
   }
 });

 function printDeviceInfo(err, deviceInfo, res) {
   if (deviceInfo) {
     console.log('Device ID: ' + deviceInfo.deviceId);
     console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
   }
 }