var socket=io("http://localhost:7000");
	var sp=1;
	var count=0;
//	var currentclient=1;

			socket.on("server-send-data",function(data){
					$(".noidungFind").append(data+",");
			});
			socket.on("server-send-dataUSB",function(data){
				console.log(data);
				 
			});

			socket.on("server-gui-driver",function(data){

					data.mangID.forEach(function(i){
						console.log(i);
					});
					var chisoIDsocket=0;
					data.mang.forEach(function(i){
							
							var chiso=i.replace("Client: ","");
							var client="#client"+chiso;	
						//	var length=data.mang.length;
							
							if($(client).length==0)//kiem tra th div có tồn tại
							{
								
									$("#right").append(
									"<div  class='client' id='client"+chiso+"'>"
									+"<h3><img id='imageclient'src='/image/client.png'>CLIENT "+chiso+"</h3>"
									
									

									+"<input type='button'  value= 'Tắt máy' class='shutdown' name='" + data.mangID[chisoIDsocket]+"' ></input>"
									+"<a href='./kinne' target='_blank'><input type='button'  value= 'Kiểm tra dữ liệu USB' class='dulieuUSB' name='" + data.mangID[chisoIDsocket]+"' ></input></a>"
									+"<div class='find' id='noidungFind"+chiso+"'>"+

									

									"</div>"
									+"<h3><img id='imageclient'src='/image/client.png'>ADD/REMOVE CLIENT "+chiso+"</h3>"
									+"<div class='change' id='noidungChange"+chiso+"'></div>"
									+"</div>");

							}

							chisoIDsocket+=1;

					});




				var theDivFind="#noidungFind"+data.idclient;

					count="Tìm thấy "+data.devices.length+" thiết bị ngoại vi";
					
				console.log("Find of"+data.idclient);
				$(theDivFind).html("");
				$(theDivFind).append(
					"<p class='thep' id='theP"+data.idclient+"'></div>"
					);
				thePFind="#theP"+data.idclient;
				$(thePFind).html(count);
				data.devices.forEach(function(i){
				$(theDivFind).append(

					
					"<div id='usb'>"+
					"USB : "+i.deviceAddress+"<br>"+
					"<div class='sp"+
					"'>"+"vendorId: "+i.vendorId+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"productId: "+i.productId+
					"</div>"
					
					+
					"<div class='sp"+
					"'>"+"deviceName: "+i.deviceName+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"manufacturer: "+i.manufacturer+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"serialNumber: "+i.serialNumber+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"deviceAddress: "+i.deviceAddress+
					"</div>"
					
					+"</div>"



					
					);
					//sp=sp+1;
				});
			});

			socket.on("server-send-disconnect",function(data){
				var client="#client"+data.idclient;
				console.log(client);
				$(client).html("");
				$(client).css("border","none");
				$("#thongbao").html("Đã ngắt kết nối với "+client).show(3000);
				$("#thongbao").hide(3000);
			});

			socket.on("server-gui-driver-xoa",function(data){
					
				console.log("xoa cua"+data.idclient);
				var theDivChange="#noidungChange"+data.idclient;
				$(theDivChange).html("");
				$(theDivChange).append(

					"<div id='usb'>"+
					"REMOVE USB : "+data.devices.deviceAddress+"<br>"+
					"<div class='sp"+
					"'>"+"vendorId: "+data.devices.vendorId+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"productId: "+data.devices.productId+
					"</div>"
					
					+
					"<div class='sp"+
					"'>"+"deviceName: "+data.devices.deviceName+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"manufacturer: "+data.devices.manufacturer+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"serialNumber: "+data.devices.serialNumber+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"deviceAddress: "+data.devices.deviceAddress+
					"</div>"
					
					+"</div>"



					
					);



			});

			socket.on("server-send-danhsach",function(data){
				$("#listclient").html("");
				data.forEach(function(i){
					$("#listclient").append(
						"<tr>"+
					"<td>"+i+"</td>"+
				"</tr>"
				);
				console.log(i);
						
				});

				//them client moi divright

			
			});


			socket.on("server-send-new-client",function(data){//data  là i


					$("#right").append(
					"<div  class='client' id='client"+data.idclient+"'>"
					+"<h3><img id='imageclient'src='/image/client.png'>CLIENT "+data.idclient+"</h3>"
					
					
					
					+"<input type='button'  value= 'Tắt máy' class='shutdown' name='" + data.idsocket+"' ></input>"
					
					+"<a href='./kinne' target='_blank'><input type='button'  value= 'Kiểm tra dữ liệu USB' class='dulieuUSB' name='" + data.idsocket+"' ></input></a>"

					+"<div class='find' id='noidungFind"+data.idclient+"'>"+

					

					"</div>"
					+"<h3><img id='imageclient'src='/image/client.png'>ADD/REMOVE CLIENT "+data.idclient+"</h3>"
					+"<div class='change' id='noidungChange"+data.idclient+"'></div>"
					+"</div>   "

					


				//	"<ul><li class ='"+data.idclient+"'>Tắt máy</li></ul>"
					
					//"<div id='shutdown1'>tắt máy</div>"


					);


						$("#thongbao").html("Đã kết nối với Client "+data.idclient).show(3000);
						$("#thongbao").hide(3000);
					//currentclient=data.idclient;

			});

			socket.on("server-them-usb",function(data){
				console.log("change cua"+data.idclient);
				var theDivChange="#noidungChange"+data.idclient;
				$(theDivChange).html("");
				$(theDivChange).append(

					"<div id='usb'>"+
					"ADD USB : "+data.devices.deviceAddress+"<br>"+
					"<div class='sp"+
					"'>"+"vendorId: "+data.devices.vendorId+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"productId: "+data.devices.productId+
					"</div>"
					
					+
					"<div class='sp"+
					"'>"+"deviceName: "+data.devices.deviceName+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"manufacturer: "+data.devices.manufacturer+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"serialNumber: "+data.devices.serialNumber+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"deviceAddress: "+data.devices.deviceAddress+
					"</div>"
					
					+"</div>"



					
					);
				
			});

			$(document).ready(function(){
				socket.emit("danhsach");
				$("#the").click(function(){
						socket.emit("client-send-data","hello kin");//emit là phat su kien
				
							console.log("ádadadas")
				});

				$("#shutdown1").click(function(){
						   var id= $(this).attr("id");
						socket.emit("tatmay",{idclient:id});
						console.log("cc");
				});
				$("#right").on("click",".shutdown", function(){
					 	var id= $(this).attr("name");
					 	socket.emit("tatmay",{idclient:id});
					 	console.log(id);
				});

				$("#right").on("click",".dulieuUSB", function(){
					 	var id= $(this).attr("name");
					 	socket.emit("dulieuUSB",{idclient:id});
					 	console.log(id);
				});
/*
				$("input:button.shutdown").on('click', function(event){
					    event.stopPropagation();
					    event.stopImmediatePropagation();
					    //(... rest of your JS code)
					    var id= $(this).attr("name");
						socket.emit("tatmay",{idclient:id});
						console.log("dâd");
					});*/
			});
