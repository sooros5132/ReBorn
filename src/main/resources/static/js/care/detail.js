

//import ModalBox from "/js/modules/ModalBox.js";
//console.log(ModalBox);

//(async ()=>{
//    const {ModalBox} = await import("/js/modules/ModalBox.js");
//    console.log(ModalBox);
//})();

class CareDetail extends React.Component{
	
	constructor(){
		super();
		
		this.state = {
			nickname: "",
			memberId: 0,
			care: {},
			animalList: [],
			review: {
				list: [],
				cnt: 0,
				pageCnt:0,
				scoreAvg:0,
				faceIcon: "far fa-smile",
			}
		}
		this.review = {
			score: 5,
			title: React.createRef(),
			content: React.createRef(),
			page: 1,
			range: 5,
			startNum: 1
		}
		this.careRegNo = /([0-9]*)$/.exec(window.location.pathname)[0];
		
		window.onpopstate = (e)=>{
			this.review.page = e.state?.p || 1;
			this.reviewInvalidate();
		}
		
		this.invalidate()
		.then(resolve=>{
			if(resolve != "sussess")
				return;
				
			this.kakaoMapSearch();
		});
		
//		(async ()=>{
//			console.log("1111111");
//		    let temp = await this.invalidate();
//			console.log("2222222");
//			console.log(this.state.care.name);
//		})();
//		console.log("3333333");
	}
	
	componentDidMount(){
		
	}
	
	kakaoMapSearch(){
		var mapContainer = document.querySelector('#kakao-map .map'), // 지도를 표시할 div 
		    mapOption = {
		        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		        level: 4 // 지도의 확대 레벨
		    };  
		// 지도를 생성합니다    
		var map = new kakao.maps.Map(mapContainer, mapOption); 
		// 주소-좌표 변환 객체를 생성합니다
		var geocoder = new kakao.maps.services.Geocoder();
		let happenPlace = this.state.care.addr || this.state.care.name;
		
		// 주소로 좌표를 검색합니다
		geocoder.addressSearch(happenPlace, (result, status) => {
		
			var infowindow;
			var coords;
		
		    // 정상적으로 검색이 완료됐으면 
		     if (status === kakao.maps.services.Status.OK) {
		        coords = new kakao.maps.LatLng(result[0].y, result[0].x);
		
		        // 인포윈도우로 장소에 대한 설명을 표시합니다
		        infowindow = new kakao.maps.InfoWindow({
		            content: `<div style="width:150px;text-align:center;padding:6px 0;">${this.state.care.name}</div>`
		        });
		    } else {
		       	coords = new kakao.maps.LatLng(37.572078, 126.987300);
	   			
				// 인포윈도우로 장소에 대한 설명을 표시합니다
		        infowindow = new kakao.maps.InfoWindow({
		            content: '<div style="width:150px;text-align:center;padding:6px 0;color:red;">발견 장소를 찾지 못했습니다</div>'
		        });
			}
			
			// 결과값으로 받은 위치를 마커로 표시합니다
	        var marker = new kakao.maps.Marker({
	            map: map,
	            position: coords
	        });
	        infowindow.open(map, marker);
	        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
	        map.setCenter(coords);
		});
		
		
	}
	
	invalidate(){
		console.log("invalidate");
		
		return new Promise((resolve, reject) => {
			
			fetch(`/api/care/${this.careRegNo}`)
			.then((response ) => {
				return response.json();
			})
			.then(({care, animalList, reviewList, reviewCnt, reviewPageCnt, reviewScoreAvg, nickname, memberId})=>{
				
				let review = this.state.review;
				review.list = reviewList;
				review.cnt = reviewCnt;
				review.pageCnt = reviewPageCnt;
				review.scoreAvg = reviewScoreAvg;
				
				this.review.startNum = this.review.page - ((this.review.page - 1) % this.review.range);
				this.setState({care, animalList, review, nickname, memberId});
				resolve("sussess");
			});
		});
		
	}
	
	reviewInvalidate(){
		let {page, range} = this.review;
		
		console.log("reviewInvalidate");
		fetch(`/api/care/${this.careRegNo}/review/list?p=${page}`)
		.then((response ) => {
			return response.json();
		})
		.then(({reviewList, reviewCnt, reviewPageCnt, reviewScoreAvg})=>{
			let review = this.state.review;
			review.list = reviewList;
			review.cnt = reviewCnt;
			review.pageCnt = reviewPageCnt;
			review.scoreAvg = reviewScoreAvg;
			this.review.startNum = page - ((page - 1) % range);
			this.setState({review});
			let scrollY = this.review.title.current.offsetTop;
			console.log(scrollY)
			window.scrollTo(0, scrollY);
		});
	}
	
	reviewSubmitHandler(e){
		e.preventDefault();
		
		// let formData = new FormData();
		// formData.append("careRegNo", this.careRegNo);
		// formData.append("title", this.review.title.value);
		// formData.append("content", this.review.content.value);
		// formData.append("score", this.review.score);
		
		if( !this.state.memberId ){
			new ModalBox({content: "로그인을 먼저 해주세요", cancelBtnHide: true});
			return;
		}
		
		
		let title = this.review.title.current.value;
		let content = this.review.content.current.value;
		if ( title == "" || content == "" ){
			new ModalBox({content: "제목 또는 내용을 입력해주세요", cancelBtnHide: true});
			return;			
		}
		
		fetch(`/api/care/${this.careRegNo}/review/insert`, {
			body: `title=${title}&content=${content}&score=${this.review.score}`,
		    headers: {
		        "Content-Type": "application/x-www-form-urlencoded",
		    },
		    method: "POST",
		})
		.then((response ) => {
			return response.json()
		})
		.then(({result, reviewList, reviewCnt, reviewPageCnt, reviewScoreAvg})=>{
			if( result == "success" ){
				this.reviewFormReset();
				let review = this.state.review;
				review.list = reviewList;
				review.cnt = reviewCnt;
				review.pageCnt = reviewPageCnt;
				review.scoreAvg = reviewScoreAvg;
				
				this.setState({review});
			}
		});
	}
	
	reviewFormReset(){
		this.review.title.current.value = "";
		this.review.content.current.value = "";
	}
	
	scoreClickHandler(e){
		if(e.target.tagName != "I" || !e.target.classList.contains("fa-star"))
			return;

		let li = e.currentTarget;
		let scoreBox = e.target.parentElement;
		let finded = false;
		this.review.score = 0;
		
		// let faceIcon = li.firstElementChild.firstElementChild;
		
		for(let i = 0; i < 5; i++){
			scoreBox.children[i].classList.remove("fas", "far");

			if( finded ){
				scoreBox.children[i].classList.add("far");
			} else {
				scoreBox.children[i].classList.add("fas");
				this.review.score++;
			}

			if( scoreBox.children[i] === e.target ){
				finded = true;
			}
		}
		
		let faceIcon = this.scoreToFace(this.review.score);
		let review = this.state.review;
		
		review.faceIcon = faceIcon;
		this.setState({review});
	}
	
	scoreToFace(score){
		let className = "";
		switch(score){
			case 5:
			case 4:
				className = "far fa-smile";
				break;
			case 3:
			case 2:
				className = "far fa-meh";
				break;
			case 1:
				className = "far fa-frown";
				break;
		}
		return className;
	}
	
	reviewClickHandler(e){
		if(e.target.tagName != "I")
			return;
			
		if(e.target.classList.contains("fa-edit")){
			
			let li = e.target.closest('li');
			if (!li) return; 
			if (!e.currentTarget.contains(li)) return;
			if (li.dataset.reviewId == undefined) return;
			
			let reviewId = li.dataset.reviewId;
			let contentNode = document.createElement("div");
			
			let score = li.querySelector(".box .score");
			let title = li.querySelector(".box .title");
			let content = li.querySelector(".box .content");
			
			contentNode.classList.add("review-edit");
			contentNode.dataset.reviewId = reviewId;
			
			let insertHtml = `<div class="box">
					<form method="POST">
						<div class="score">${score.innerHTML}</div>
						<div class="title"><input required="" type="text" name="title" value="${title.innerText}" placeholder="제목"></div>
						<div class="content"><textarea required="" placeholder="내용">${content.innerText}</textarea></div>
					</form>
				</div>`;
				
			contentNode.insertAdjacentHTML("beforeend", insertHtml);
			
			contentNode.addEventListener("click", (e)=>{
				// 별 클릭하면
				if( e.target.tagName == "I" && e.target.classList.contains("fa-star")){
					let scoreBox = e.target.closest('div.score');
					if (!scoreBox) return; 
					if (!e.currentTarget.contains(scoreBox)) return;
					
					let finded = false;
					for(let i = 0; i < 5; i++){
						scoreBox.children[i].classList.remove("fas", "far");
			
						if( finded )
							scoreBox.children[i].classList.add("far");
						else
							scoreBox.children[i].classList.add("fas");
			
						if( scoreBox.children[i] === e.target )
							finded = true;
					}
				}
				
			});
			
			
			// 모달창 띄우기 ====================================================== 
			let modalBox =  new ModalBox({
				content: contentNode,
				contentPadding: false,
				okBtnText: "편집",
				removeOnBackgroundClick: false
//				footerHide: true
			});
			
			modalBox
			.then(
				resolve => {
					//resolve.instance.close();
					if(resolve.result != "ok")
						return;
						
						
					let modalTitle = resolve.instance.contentNode.querySelector(".title input").value;
					let modalContent = resolve.instance.contentNode.querySelector(".content textarea").value;
					let modalScore = resolve.instance.contentNode.querySelectorAll("form .score i.fas").length;
					fetch(`/api/care/${this.careRegNo}/review/${reviewId}/edit`, {
						body: `title=${modalTitle}&content=${modalContent}&score=${modalScore}`,
					    headers: {
					        "Content-Type": "application/x-www-form-urlencoded",
					    },
					    method: "POST",
					})
					.then((response ) => {
						return response.json()
					})
					.then(({result, review, reviewScoreAvg})=>{
						if( result == "success" ){
							console.log(review);
							
							let list = this.state.review.list;
							
							list = list.map(origin => {
								if( origin.id == review.id ){
									origin.title = modalTitle;
									origin.content = modalContent;
									return;
								}
							});
							
							score.innerHTML = resolve.instance.contentNode.querySelector("form .score").innerHTML;
							li.querySelector(".icon i").className = this.scoreToFace(modalScore);
							
							li.classList.remove("highlight");
							setTimeout(()=>{li.classList.add("highlight")})
							
							let reviewTemp = this.state.review; 
							reviewTemp.scoreAvg = reviewScoreAvg;
							
							this.setState({reviewTemp});
							
						}else {
							new ModalBox({
								content: `변경에 실패하였습니다.`,
								cancelBtnHide: true,
								okBtnBackgroundColor: "var(--red-pink)"
							});	
						}
					});
				}
			)
			return;
		}
		
		if(e.target.classList.contains("fa-trash-alt")){
			
			let modalBox =  new ModalBox({
				content: `리뷰를 삭제하겠습니까??`,
				okBtnBackgroundColor: "var(--red-pink)"
			});
			
			// 담아놓지 않으면 promise 기다리는 동안 currentTarget이 삭제된다.
			let { target, currentTarget } = e;
			
			modalBox
			.then(
				resolve => {
					// console.log(resolve.result)
					if(resolve.result != "ok")
						return;
					
					let li = target.closest('li');
					if (!li) return; 
					if (!currentTarget.contains(li)) return;
					
					let reviewId = li.dataset.reviewId; 
					if (reviewId == undefined) return;
					
					fetch(`/api/care/${this.careRegNo}/review/${reviewId}/delete`, {method: "post"})
					.then((response) => {
						return response.json()
					})
					.then(({result, reviewCnt, reviewScoreAvg, reviewPageCnt})=>{
						if( result == "success" ){
							
							let reviewTemp = this.state.review;
							
							reviewTemp.list = reviewTemp.list.filter( 
								review => review.id != reviewId 
							);
							reviewTemp.cnt = reviewCnt;
							reviewTemp.scoreAvg = reviewScoreAvg;
							reviewTemp.pageCnt = reviewPageCnt;
							
							this.setState({review: reviewTemp});
							
							return "삭제되었습니다";
						} 
						else if( result == "fail"){
							return "실패하였습니다";
						}
					})
					.then(message =>{
						new ModalBox({
							content: message,
							cancelBtnHide: true,
							okBtnBackgroundColor: message == "실패하였습니다" ? "var(--red-pink)" : ""
						});
					});
					
				}
			)
		}
	}
	
	reviewMouseOverHandler(e){
		let li = e.target.closest('li');
		if (!li) return; 
		if (!e.currentTarget.contains(li)) return;
		
		if( li.dataset.reviewId == undefined )
			return;
			
		let editNode = li.querySelector(".member .edit");
		
		editNode.classList.remove("d-none");
	}
	
	reviewMouseOutHandler(e){
		let li = e.target.closest('li');
		if (!li) return; 
		if (!e.currentTarget.contains(li)) return;
		
		if( li.dataset.reviewId == undefined )
			return;
		
		let editNode = li.querySelector(".member .edit");
		
		editNode.classList.add("d-none");
	}
	
	pagerHandler(e){
		if( e.target.tagName == "A" ){
			e.preventDefault();
			let page = e.target.dataset.page;
			
			if( page == undefined ) 
				return;
			
			this.review.page = page;
			history.pushState({p: page}, "", `?p=${page}`);
			this.reviewInvalidate();
		}
	}
	
	render(){
		return <div>
			<section className="intro-height position-relative" style={{backgroundColor:"transparent", padding: 0}}>
		        <section className="intro intro-height position-absolute position-top position-left">
		            <div className="intro-blur-image position-absolute position-top position-left" style={{backgroundImage: this.state.care.thumb ? `url('../images/care/thumb/${this.state.care.careRegNo}/${this.state.care.thumb}')` : `url('../images/care/search-back.png')` }}>
		                {
		                    // <!-- <img src="/images/1d47dc4b58bd0023f49152347e221051_20160513111715_srgxlzpg.jpg"> -->
		                }
		            </div>
		            <div className="intro-image position-absolute position-center section-max-width" style={{backgroundImage: this.state.care.thumb ? `url('../images/care/thumb/${this.state.care.careRegNo}/${this.state.care.thumb}')` : `url('../images/care/search-back.png')` }}>
		                {
		                    // <!-- <img src="/images/1d47dc4b58bd0023f49152347e221051_20160513111715_srgxlzpg.jpg"> -->
		                }
		            </div>
		            <div className="intro-inner">
		                <div className="intro-title box-center section-max-width">
		                    {this.state.care.name}
		                </div>
		            </div>
		        </section>
		        <div className="cloud position-absolute position-bottom position-left">
		            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="50" viewBox="0 0 192.22 33.99" preserveAspectRatio="none">
		                <path d="M0,8C33.65-10.84,50.37,29.77,68.88,29.77S117.26,0,149.26,0,200,25.55,200,25.55V45.68H0Z"/>
		            </svg>
		        </div>
		    </section>
		    { /* <section className="greeting">
		        <div className="greeting-inner box-center section-max-width">
		            <div><img className="greeting-logo"src="/images/care/info/1/카라동물권교육로고.75a97ef1.png" alt="" /></div>
		            <h1>인권을 넘어 생명권으로!</h1>
		            <div className="greeting-text">
		                <br />
		                2002년 4월 15일, “아름품”을 설립하였습니다.<br />
		                2006년“KARA” (Korea Animal Rights Advocates)란 새 이름으로<br />
		                비영리 시민단체로 등록하고, 2010년 3월에는 농림부에 사단법인으로 등록하여<br />
		                보다 강력하고 효율적인 동물권 활동의 발판을 만들게 되었습니다.<br />
		            </div>
		        </div>
		    </section> */ }
		    <section className="animal-list">
		        <div className="animal-list-inner box-center section-max-width">
		            <h1>보호중인 동물</h1>
		            <div className="">
		                <ul>
		                    {
		                        this.state.animalList?.length > 0
		                        ? this.state.animalList.map(
		                            animal => <li key={animal.noticeNo}><div><a href={`../../animal/${animal.desertionNo}`}><img src={animal.popfile} alt={animal.noticeNo} /></a></div><div>{animal.noticeNo}</div></li>
		                        )
		                        : <li style={{flexGrow: 1, fontSize: "3vw"}} className="search-empty">보호중인 동물 없습니다</li>
		                    }
		                </ul>
		            </div>
		        </div>
		    </section>
		    <section id="kakao-map" ref={this.kakaoMapContainer}>
		        <div className="map-inner box-center section-max-width">
		            <div className="flex-center map">
		            </div>
		            <div>
		                <br /><br />
		                <span className="bold">Addr.</span> {this.state.care.addr}<br />
		                <br /><br />
		                <span className="bold">Tel.</span> {this.state.care.tel}<br />
		                { /* <br />
		                <span className="bold">Email.</span> info@ekara.org<br />
		                <br />
		                <span className="bold">Page.</span> <a href="http://ekara.org/">http://ekara.org/</a><br />*/ }
		            </div>
		        </div>
		    </section>
		    <section className="review">
		        <div className="review-inner box-center section-max-width">
		            <h1 style={{paddingBottom: "6px"}}>리뷰</h1>
					<div className="score-avg"><i className="fas fa-star"></i> {(this.state.review.scoreAvg).toFixed(1)}</div>
		            <ul onClick={this.reviewClickHandler.bind(this)} onMouseOver={this.reviewMouseOverHandler.bind(this)} onMouseOut={this.reviewMouseOutHandler.bind(this)}>
		                <li onClick={this.scoreClickHandler.bind(this)}>
		                    <div className="icon"><i className={this.state.review.faceIcon}></i></div>
		                    <div className="container">
		                        <div className="writer">{this.state.nickname ? this.state.nickname : "로그인을 해주세요"}</div>
		                        <div className="box">
		                            <form method="POST" onSubmit={this.reviewSubmitHandler.bind(this)}>
		                                <div className="score"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
		                                <div className="title"><input className={this.state.nickname ? "" : "input-disabled" } disabled={this.state.nickname ? "" : "disabled" } required type="text" name="title" ref={this.review.title} placeholder="제목"/></div>
		                                <div className="content"><textarea className={this.state.nickname ? "" : "input-disabled" } disabled={this.state.nickname ? "" : "disabled" } required ref={this.review.content} placeholder="내용" ></textarea></div>
		                                <div className="submit-icon"><label htmlFor="review-submit" className={this.state.nickname ? "pointer" : "input-disabled" }><i className="fas fa-arrow-alt-circle-down"></i></label></div>
		                                <input id="review-submit" className="d-none" type="submit" value="전송" />
		                            </form>
		                        </div>
		                    </div>
		                </li>
		                <li className="line"></li>
						{
							this.state.review.list.length != 0
							?this.state.review.list.map(
								review => <li key={review.id} data-review-id={review.id}>
			                    <div className="icon"><i className={this.scoreToFace(review.score)}></i></div>
			                    <div className="container">
			                        <div className="member">
										<div className="writer">{review.nickname}</div>
										{
											review.memberId == this.state.memberId
											? <div className="edit d-none">
												<div><i className="far fa-edit"></i></div>
												<div><i className="far fa-trash-alt"></i></div>
											</div>
											: <div className="edit d-none"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{width: "18px"}}><path fill="currentColor" d="M128.21,134.94a8,8,0,0,1,9-6.87l15.86,2.13a8,8,0,0,1,6.87,9L135.82,320H400L375,120.06A64,64,0,0,0,311.5,64h-175A64,64,0,0,0,73,120.06L48,320h55.54ZM432,352H16A16,16,0,0,0,0,368v64a16,16,0,0,0,16,16H432a16,16,0,0,0,16-16V368A16,16,0,0,0,432,352Z" ></path></svg></div></div>
										}
									</div>
			                        <div className="box">
			                            <div className="title">{review.title}</div>
			                            <div className="score">
											{
												[1, 2, 3, 4, 5].map(
													score => review.score >= score 
													?<i key={score} className="fas fa-star"></i> 
													:<i key={score} className="far fa-star"></i>
												)
											}
										</div>
			                            <div className="content">{review.content}</div>
			                            <div className="regDate">{MMddHHmm(new Date(review.regDate.slice(0,19)))}</div>
			                        </div>
			                    </div>
			                </li>
							)
							:<li><div className="search-empty">리뷰가 없습니다</div></li>
						}
		            </ul>
		            <div className="pager-common mt30">
		                <div className="pager" onClick={this.pagerHandler.bind(this)}>
		                
		                    <div className="prev mr15">
		
							{
								this.review.startNum > 1
								? <a className="btn btn-prev" data-page={`${parseInt(this.review.startNum) - this.review.range}`} href={`?p=${parseInt(this.review.startNum) - this.review.range}`}>이전</a>
								: <span className="btn btn-prev" onClick={()=>{new ModalBox({content:"이 페이지가 없습니다.", cancelBtnHide: true})}}>이전</span>
							}
		                        
		                    </div>
		                    <ul className="btn-center">
		
							{
								this.state.review.cnt != 0
								? [0, 1, 2, 3, 4].map(
									i => 
									this.review.startNum + i <= this.state.review.pageCnt
									?<li key={i} className={i + this.review.startNum == this.review.page ? "current" : ""}>
										<a className="bold " data-page={`${parseInt(this.review.startNum) + i}`} href={`?p=${parseInt(this.review.startNum) + i}`}>{i+this.review.startNum}</a>
									</li>
									: ""
								)
								: <li className="current"><a>1</a></li>
							}
		                    </ul>
		                    
		                    <div className="next mr15">
							{
								this.review.startNum + this.review.range <= this.state.review.pageCnt
								? <a className="btn btn-next" data-page={`${parseInt(this.review.startNum) + this.review.range}`} href={`?p=${parseInt(this.review.startNum) + this.review.range}`}>다음</a>
								: <span className="btn btn-next" onClick={()=>{new ModalBox({content:"다음 페이지가 없습니다.", cancelBtnHide: true})}}>다음 </span>
							}
							</div>
		                </div>
						<div className="pager-info">검색된 리뷰 수: {this.state.review.cnt}, 페이지 수: {this.state.review.pageCnt}</div>
		            </div>
		        </div>
		    </section>
		</div>;
	}
}

ReactDOM.render(
	<CareDetail />,
	document.getElementById("detail")
);