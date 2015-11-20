var serverapp = require('http').createServer(handler);
var io = require('socket.io').listen(serverapp);
var fs = require('fs');
 
serverapp.listen(8888);
 
function handler (req, res) {
    fs.readFile("index.html",
        function (err, data) {
            if (err) {
                throw err; 
            }
            res.writeHead(200);
            res.end(data);
        });
    fs.readFile("in.html",
        function (err, data) {
            if (err) {
                throw err; 
            }
            res.writeHead(200);
            res.end(data);
        });
}
 
io.sockets.on("connection", function (socket) {
    socket.on("event_button_clicked", function (data) {
        console.log(data.text);
        io.sockets.emit("texto", {user: "nodesource", text: data.text});
    });

    socket.on("req_tomar_foto", function (data) {
        io.sockets.emit("tomar_foto", {user: "nodesource"});
    });
});