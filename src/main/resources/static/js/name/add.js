
// jquery로 해보긔
$(document).ready( e=>{
	
	console.log('ㅎㅎㅎㅎ');
		
	let addBtn = $(".add-btn");
	let desertionNo = $(".desertionNo");

	addBtn.bind("click", (e)=>{
		e.preventDefault();

		let name = $(".nameInput");
		let reason = $(".reasonInput");
		let nameValue = name.val() || null;
		let reasonValue = reason.val() || null;
		
		if (nameValue == null || reasonValue == null) {
			new ModalBox(
				{ content: "이름 및 이유를 입력 해주세요", cancelBtnHide: true }
			);
		} else {

			console.log(nameValue);

			fetch(`/api/name/${desertionNo.val()}/add`, {
				method: 'POST',
				body: `name=${nameValue}&reason=${reasonValue}`,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				}
			})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				if (data.success == true) {
					let infoHTML = `이름 등록이 완료 되었습니다.<br>
									${data.newPoint}포인트를 추가적으로 획득하셨습니다.<br>
									참여해주셔서 감사합니다.(현재 포인트 : ${data.point + data.newPoint})`;

					new ModalBox({
						content: infoHTML,
						contentPadding: true,
						okBtnText: " 확인",
						cancelBtnHide: true,
						removeOnBackgroundClick: true
					})
					.then(
						resolve => {
							if (resolve.result != "ok")
								return;

							location.reload();	// 페이지 새로 고침(투표 완료 형태로 변경되어야 함)
						}
					);
				} else {
					new ModalBox({
						content: `중복되거나 유효하지 않은 이름을 입력하셨습니다.<br>입력 하신 이름을 확인해주세요.`,
						contentPadding: true,
						okBtnText: " 확인",
						cancelBtnHide: true,
						removeOnBackgroundClick: true
					});	
				}
				
			});
		}
		
		
		
	});

});