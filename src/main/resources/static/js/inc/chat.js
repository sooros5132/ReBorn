window.addEventListener('load', ()=>{           
    let chatBtn = document.querySelector('.chat-btn');
    let chatbox = document.querySelector('.chat-box');

    let chatBot = document.querySelector('.chat-bot');
    let botQnaBox = document.querySelector('.bot-qna-box');
    let chatbody = document.querySelector('.chat-body');
	let chatList = chatbody.querySelector('.chat-list');
	
   	let chatInput = document.querySelector('.chat-input');
	let chatSend= document.querySelector('.chat-send-btn');
	let uid =  document.querySelector('.session-id').innerHTML;
	
	let localhost = "localhost:8080";
	let = roomId = uid;
	console.log(roomId)
	//json으로 보내기 사용자아이디, 메시지내용. 전달.
	let userId =uid;
	
	let message ={
		userId,
		chatData:"",
		roomId
	};
	
	
	chatInput.addEventListener('keydown', (e)=>{
		if (e.keyCode === 13) {
			e.preventDefault();
			console.log("엔터 침");
			
			 let event = new MouseEvent('click', {
		        'view':window,
		        'bubbles': true,
		        'cancelable': true
		    });
		
		    chatSend.dispatchEvent(event);
		}
	})
	
	
	
	
	
	
	chatSend.addEventListener('click', (e)=>{
		let message = {
			senderId: userId,
			chatData:chatInput.value,
			roomId : roomId
		}
		
		console.log(socket.readyState);
		if(socket != undefined && socket.readyState ==1){
			socket.send(JSON.stringify(message));
			console.log("메시지 보냄");
			chatInput.value ="";
			chatScroll();
		}else{
			console.log('재연결')
			connect();
			//alert("연결이 끊겼습니다 새로고핌 해주세요.");
		}
		
		//html표사ㅣ
		/*let chatTemplateLestRight =`
			<li class="right">
                  <span class="thumb">Q</span>
                  <p class="chat-con">${chatInput.value}</p>
            </li>
		`
		chatList.insertAdjacentHTML("beforeend", chatTemplateLestRight);*/
		
		
	});	
	
	//chat버튼
    chatBtn.addEventListener('click', (e)=>{
        if(chatBtn.classList.contains('show')){
            chatBtn.classList.remove('show');
            chatbox.classList.remove('show');
        }else {
            
			/*데이터 블러오기 */
			fetch(`/api/chat/list?id=${userId}`)
			.then(response =>response.json())
			.then(json => {
				console.log(json);
				chatList.innerHTML="";
				
				for(let n of json){
					let li;
					if( userId == n.senderId){
						li = `
							<li class="right">
	                      		<span class="thumb">Q</span>
	                      		<p class="chat-con">
                          		${n.content}
	                      		</p>
                  			</li>
							`
					}else {
						li = `
							<li class="left">
	                      		<span class="thumb">A</span>
	                      		<p class="chat-con">
	                      		${n.content}
	                      		</p>
	              			</li>
						`
					}
					
					chatList.insertAdjacentHTML('beforeend', li);
						
				}
							
				chatScroll();
			});
			
			chatBtn.classList.add('show');
            chatbox.classList.add('show');
            
        }
    });
	
	
	
	//qna버튼
    chatBot.addEventListener('click', (e)=>{      
        e.preventDefault();
/*        if(botQnaBox.classList.contains('show')){
            botQnaBox.classList.remove('show');
        }else {
            botQnaBox.classList.add('show');
        }*/
		fetch(`/api/chat/link/list`)
		.then(response => response.json())
		.then(result =>{
			console.log("aaa")
			let li = `<li class="center"><dl><dt>자주 묻는 질문 Top</dt>`;
			
			for(n of result){
			    li += `<dd><a href="http://${n.address}" target="_blank">${n.title}</a></dd>`
			}
			
			li += `</dl></li>`;

			chatList.insertAdjacentHTML('beforeend', li);
	        chatScroll();
		})
    });

	

	
	//스크롤 제일 아래로..
    function chatScroll (){
        chatbody.scrollTop = chatbody.scrollHeight;
    }
    chatScroll();


//====================== 소켓은 바로 연결...======================
	let socket = new WebSocket(`ws://${localhost}/chatting/${roomId}`);
	console.log(socket)
	connect();
	
/*	socket.addEventListener('open', function (e) {		
		console.log("소켓 연결됨!!!");
	});*/
	
	
	//메시지 받음
	socket.addEventListener('message', function (e) {
		console.log(e.data);
		let message = JSON.parse(e.data);
		let {senderId, chatData, roomId} = message;



		if( userId == senderId){
			li = `
				<li class="right">
              		<span class="thumb">Q</span>
              		<p class="chat-con">
              		${chatData}
              		</p>
      			</li>
				`
		}else {
			li = `
				<li class="left">
              		<span class="thumb">A</span>
              		<p class="chat-con">
              		${chatData}
              		</p>
      			</li>
			`
		}
		
		chatList.insertAdjacentHTML("beforeend", li);
		chatScroll();
	});
	
	
		//소캣 재연결
	function connect(){
		
		socket = new WebSocket(`ws://${localhost}/chatting/${roomId}`);
		console.log(socket)
		
		socket.addEventListener('open', function (e) {		
			console.log("소켓 연결됨!!!");
		});
	}


	
})