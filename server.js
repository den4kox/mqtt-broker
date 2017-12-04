var sys = require('sys');
var net = require('net');
var mqtt = require('mqtt');
 
var io  = require('socket.io').listen(5000);
var client = mqtt.connect('mqtt://localhost');
 
io.sockets.on('connection', function (socket) {
  socket.on('subscribe', function (data) {
    console.log('Subscribing to '+data.topic);
    client.subscribe(data.topic);
  });

  socket.on('publish', function (data) {
    console.log('Publish to '+data.topic);
    client.publish(data.topic, data.message);
  });
});
 
client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    io.sockets.emit('mqtt',{'topic':String(topic),
    'payload':String(message)});
})