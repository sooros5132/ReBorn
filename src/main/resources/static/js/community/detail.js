window.addEventListener("load", (e)=>{
	const likeBtn = document.querySelector(".like-btn");
	const boardId = document.querySelector(".board-id");
	const likeCount = document.querySelector(".like-count");		
	const commentList = document.querySelector(".comment-list");//댓글수정버튼을 감싼 부모.
	const writeInfo = document.querySelector(".write-info");
	
	if(writeInfo.classList.contains(".delete-btn")){
		const delBtn = document.querySelector(".delete-btn");	
		delBtn.addEventListener("click", (e)=>{
			if(confirm("이 글을 삭제 할까요?")==true){
				delBtn.href = `${boardId.value}/del`;
			} else{
				return ;
			}		
		});	
	}
	
	console.log(boardId);
	let boardNumber = boardId.value;  //jsp에서 hidden으로 숨긴 boardId 값
	
	
	//let win;
	//좋아요 버튼
	likeBtn.addEventListener("click", (e)=>{
						
		fetch(`/community/${boardNumber}/like`, {
			method : "post"
		})
		.then(function(response){

			return response.json();	
		})		
		.then(json => {
			console.log(json);
			if(json.likes == "insert"){
				likeBtn.style.color = "green";
				likeCount.innerText = parseInt(likeCount.innerText) + 1;
			}
			else{
				likeBtn.style.color = "black";
				likeCount.innerText = parseInt(likeCount.innerText) - 1;
			}
		})		
	});
	
		//e.target          //이벤트발생
		//e.currentTarget   //이벤트를 달아준 객체를 반환
	//댓글 수정
	commentList.addEventListener("click", (e)=>{
		
		
		if(!e.target.classList.contains('comment-edit'))
			return;
		console.log(e.target.innerText);
		console.log(e.currentTarget);
		
		let commentViewBox = e.target.closest('div.comment-view-box'); // (1)	
	    
	    if (!commentViewBox) return; // (2)
		
		if (!commentList.contains(commentViewBox)) return; 
		    
		let cId = commentViewBox.querySelector("input.comment-id");	
		    console.log("댓글 번호" + cId.value);
		    console.log("게시글 번호" + boardNumber);
		let cContent = commentViewBox.querySelector("div.comment-content");
		let message = prompt('message');
			
			fetch(`/api/community/${boardNumber}/commentEdit`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: `content=${message}&commentId=${cId.value}`
			})
			.then(function(response){
				
				return response.json();
			})
			.then(json => {
				console.log(cContent.innerText = message);
				cContent.innerText = message;
			})	
	});
	
});	
	//코멘트 수정.
	/*commentEditBtn[0].addEventListener("click", (e)=>{
		for(let i=0;i<commentIds.length;i++)
			console.log(commentIds[i].value);
		
		
		e.preventDefault();
				
		let message = prompt('message');
				
		fetch(`/api/community/${boardValue}/commentEdit`, {
			method : "post",
			headers: {                              //작성하지 않으면 formdata:multipart
            //'Content-Type': 'application/json'    //서버에서 어떻게 읽을 건지: 
            'Content-Type': 'application/x-www-form-urlencoded'  //text/html, text/stylesheet
         	},
			body: `content=${message}&commentId=${commentValue}`			
         })
		.then(function(response){				
				return response.json();						
		})
		.then(json => {
			
			//console.log(input);
			//console.log(boardValue);
			//console.log("코멘트멤버ID "+commentMemberValue);
			//console.log("commentId  "+ commentValue);
			
			commentContent.innerText = message;
		})*/
		//댓글이 여러개일 경우: 부모선택자, 자식선택자
		
		
		
		/*let message = `
					<div>
						<input type="text" />
					</div>
		`;
		commentForm.insertAdjacentHTML("beforebegin", message);*/
		
		
		//win = open(`/community/commentEdit`, "width=400px", "height=400px", "left=550px", "top=400px");
		

	
	
