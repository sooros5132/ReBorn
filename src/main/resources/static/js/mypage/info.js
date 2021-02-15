window.addEventListener("load", () => {
	let form = document.querySelector(".form-group");
	let subBtn = document.querySelector(".submit-button");

	let conf = [false, false];
	let [pwConf, phoneConf] = conf;

	//패스워드 확인 검사
	let pw = form.querySelector(".pw");
	let pwC = form.querySelector(".pw-conf ");
	subBtn.addEventListener("click", (e) => {
		if (pw.value != pwC.value || pw.value == "") {
			e.preventDefault();
			pwConf = false;
		}
		else
			pwConf = true;
	})

	//console.log(pwC );

	//휴대폰 인증 구현
	let confBtn = form.querySelector(".confirm-btn");
	let phone = form.querySelector(".phone");
	let phoneConfirm = form.querySelector(".phoneConfirm");
	let confirmResult;
	
	let idInput = form.querySelector(".loginId");
	let id = idInput.value;
/*	// 폰 번호 변경 시에만 인증하도록
	phone.addEventListener("input", () => {
		let or;
		//데이터 확인
		fetch("../member/get-phone?loginId=" + id+"&phoen="+phone.value, {
			method: 'post'
		})
			.then(response => response.text())
			.then(text => {
				console.log(text);
				if (text < 1) {
					console.log("변경없음");
					idInput.style["margin-bottom"] = "5px";
					result.classList.remove("d-none");
				}
				else {
					idInput.style["margin-bottom"] = "22px";
					result.classList.add("d-none");
					console.log(text);
				}
			});


	})*/
	confBtn.onclick = () => {

		let request = new XMLHttpRequest();
		request.onload = () => {
			confirmResult = JSON.parse(request.responseText);
			console.log(confirmResult);
		}
		let phoneNumber = phone.value;
		console.log(phone.value);
		let url = "../member/sendSMS?page=정보수정&phone=" + phoneNumber;

		request.open("Post", url, true);
		request.send();

	}

	//인증번호 확인
	phoneConfirm.addEventListener("input", () => {
		if (phoneConfirm.value != confirmResult || phoneConfirm.value == null) {
			console.log("dd");
			phoneConf = false;
		}
		else {
			phoneConf = true;
			subBtn.classList.remove("disabled");
			subBtn.classList.add("able");
		}
	})

	//버튼 비활성화
	subBtn.addEventListener('click', (e) => {
		if (!pwConf || !phoneConf) {
			e.preventDefault();

			//경고창 띄우기
			let alertMS = "";
			if (!pwConf) {
				alertMS = "동일한 비밀번호를 입력해주세요";
			}
			else if (!phoneConf) {
				alertMS = "인증번호를 확인해주세요.";
			}
			new ModalBox({ content: alertMS, cancelBtnHide: true });
		}
		else {
			subBtn.classList.remove("disabled");
			subBtn.classList.add("able");
		}
	})
})

//이메일 직접입력 
window.addEventListener("load", () => {
	let emailAddress = document.getElementsByName("emailAddress")[0];
	let customAddress = document.querySelector(".customAddress");

	emailAddress.addEventListener("change", () => {

		if (emailAddress.value == "none") {
			customAddress.removeAttribute("disabled");
			return;
		}
		customAddress.setAttribute("disabled", "disabled");
		customAddress.value = null;
	})
})