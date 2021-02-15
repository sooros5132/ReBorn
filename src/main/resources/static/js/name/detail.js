
window.addEventListener("load", (e)=>{
	
	let vote = document.querySelector(".vote");
	let form = vote.querySelector("form");
	let voteBtn = vote.querySelector(".vote-btn");
	let revoteBtn = vote.querySelector(".revote-btn");
	
	/*let choiceSumInput = vote.querySelector(".choiceSum");
	.vote-progress .vote-progress-bar
	let */
	
	let desertionNo = document.querySelector(".desertionNo").innerText;
	
	if(voteBtn != null) {
		voteBtn.addEventListener("click", (e)=>{
			e.preventDefault();
			
			let radios = vote.querySelector("input[type='radio']:checked");
		
			if(radios == null) {
				new ModalBox(
					{content:"투표할 이름을 선택해주세요", cancelBtnHide: true}
				);
			} else {
				let name = radios.value;
				
				console.log(name);
					
				fetch(`/api/name/${desertionNo}`, {
						method: 'POST',
						body: `name=${name}`,
					    headers: {
					        "Content-Type": "application/x-www-form-urlencoded",
					    }					
					}
				)  
				.then(response=>response.json())
				.then(data => {
					if(data.success == true) {
						
						let infoHTML = `투표가 완료 되었습니다.<br>
										포인트 ${data.newPoint}점이 증가 되었습니다.(현재 포인트 : ${data.point})<br>
										참여해주셔서 감사합니다.`;
						
						new ModalBox({
							content: infoHTML,
							contentPadding: true,
							okBtnText: "확인",
							cancelBtnHide: true,
							removeOnBackgroundClick: true
						})
						.then(
							resolve => {
								if(resolve.result != "ok")
									return;
									
								location.reload();	// 페이지 새로 고침(투표 완료 형태로 변경되어야 함)
							}
						);
					}
				});					
				
			}
			
		});
	}


	if(revoteBtn != null) {
		revoteBtn.addEventListener("click", (e)=>{		
			e.preventDefault();	
			modalBox =  new ModalBox({
				content: "투표 취소 시 획득 한 포인트 10점이 감소됩니다.<br>다시 투표 하시겠습니까?",
				contentPadding: true,
				okBtnText: " 예",
				cancelBtnText: "아니오",
				removeOnBackgroundClick: true
			})
			.then(
				resolve => {
					if(resolve.result != "ok")
						return;
						
					location.href = `/name/${desertionNo}/revote`;
				}
			);
		});
	}	

	
});