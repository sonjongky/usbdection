var express=require('express');
var app= express();
app.use(express.static("public"));//tat ca request cua client vao public
app.set("view engine","ejs");
app.set("views","./views");


var server=require("http").Server(app);
var io= require("socket.io")(server);
server.listen(7000);

var i=1;

var arrayClient=[];
var arrayIDSocket=[];
io.on("connection",function(socket){

	console.log("co nguoi kết nối đến:"+socket.id);
	

	socket.on("disconnect",function(){
			console.log( socket.id+"  ngắt kết nối !");
	});

	socket.on("client-send-data",function(data){
		console.log(socket.id+" vừa gửi "+data);
		io.sockets.emit("server-send-data",data+"777");
	});

	socket.on("client-gui",function(device){

			



		io.sockets.emit("server-gui-driver",{idclient:socket.stt,devices:device,mang:arrayClient,idsocket:socket.id,mangID:arrayIDSocket});
	});
	socket.on("client-gui-xoa",function(device){
		io.sockets.emit("server-gui-driver-xoa",{idclient:socket.stt,devices:device});
	});
	socket.on("client-them-usb",function(device){
		io.sockets.emit("server-them-usb",{idclient:socket.stt,devices:device});
	});

	socket.on("ket-noi-server",function(){
		var data="Client: "+i;
		if(arrayClient.indexOf(data)<0){

			arrayClient.push(data);
		socket.name=data;
		socket.stt=i;

				i=i+1;
				//idsocket
		arrayIDSocket.push(socket.id);




		io.sockets.emit("server-send-danhsach",arrayClient);
		io.sockets.emit("server-send-new-client",{idclient:socket.stt,idsocket:socket.id});
		}
		

	});

	socket.on("dataUSB", function(data){
		io.sockets.emit("server-send-dataUSB",{data:data,idsocket:socket.stt});
	});


	socket.on("tatmay",function(data){
	console.log('server lang nge dang tat may');
	var socid=data.idclient;
		io.to(socid).emit("clienttatmay",data);

	});

	socket.on('dulieuUSB',function(data){
			console.log('server đang đọc dữ liệu USB cắm vào từ Client');
			var socid=data.idclient;
		io.to(socid).emit("clientDulieu",data);
	});


	socket.on("danhsach",function(){
			io.sockets.emit("server-send-danhsach",arrayClient);

	});



	socket.on("disconnect",function(){
		var client="Client: "+socket.stt;
		if(arrayClient.indexOf(client)>=0)//client có trong mảng
		{
						var nameclient= "Client: "+socket.stt;
				console.log(nameclient);
				var index=arrayClient.indexOf(nameclient);
				arrayClient.splice(index,1);
				var indexIDsocket=arrayIDSocket.indexOf(socket.id);
				arrayIDSocket.splice(indexIDsocket,1);

				socket.broadcast.emit("server-send-danhsach",arrayClient);

				socket.broadcast.emit("server-send-disconnect",{idclient:socket.stt});

		}
		else console.log("wed browser thoat" +i);
	

});


});

app.get("/",function(req,res){

	res.render("trangchu");
});
app.get("/kinne",function(req,res){

	res.render("thongtinUSB");
});