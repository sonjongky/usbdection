var socket=io("http://localhost:7000");
socket.on("server-send-dataUSB",function(data){
				console.log(data);
				$("#container").append("Client "+data.idsocket

					+"<div>"
					+data.data


					+"</div>");
				 
});