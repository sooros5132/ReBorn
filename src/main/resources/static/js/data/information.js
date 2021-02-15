window.addEventListener('load', (e)=>{
	let infoTabList = document.querySelector('.info-tab-list');
	let infoBoard = document.querySelector('.info-board > ul');
	let pagerBtn = document.querySelector('.pager .btn-center');
	let prev = document.querySelector('.prev');
	let next = document.querySelector('.next');
	
	
	let page = 1;
	let categroy = 0;
	let pageCount = 1;
	let offset = (page-1)%5;
	let startNum = page - offset;
	
	fetch(`/api/data/information?p=${page}&categroy=${categroy}`)
			.then(response =>response.json())
			.then(json => {
				pageCount = json.pageCount
			})

	infoTabList.addEventListener('click', (e)=>{
		e.preventDefault();
		if(e.target.tagName =='A'){
			page = 1;
			categroy = e.target.dataset.category;

			let tabs = Array.prototype.slice.call(infoTabList.children);
			tabs.forEach(item =>{
				item.classList.remove('active')
			});
			e.target.parentElement.classList.add('active');
			
			fetch(`/api/data/information?p=${page}&categroy=${categroy}`)
			.then(response =>response.json())
			.then(json => {
				//console.log(json.list)
				infoBoard.innerHTML="";
				
				for(let n of json.list){
					let imgbox = `<div class="info-img-box"></div>`;
					if(json.imgUrlList[n.id]){
						imgbox = `<div class="info-img-box" style="background-image:url(${json.imgUrlList[n.id]})"></div>`
					}
					let date = getFormatDate(new Date(n.regDate));
					let li =`<li>
						${imgbox}
						<div class="info-txt-box">
		                     <ul class="info-ex">
		                         <li>#${n.cateName}</li>
		                         <li>${date}</li>
		                         <li>조회수 ${n.hitCnt}</li>
		                     </ul>
		                     <a href ="${n.id}">
		                         <h4 class="info-tit">${n.title}</h4>
		                         <p class="info-txt">
		                          ${n.content}
		                         </p>
		                     </a>
		                 </div>
		             </li>`;
					
					infoBoard.insertAdjacentHTML('beforeend', li);
				}
				return json.pageCount;
			})
			.then(item => {
				pagerBtn.innerHTML = "";
				prev.innerHTML ="";
				next.innerHTML ="";
				
				page = 1;
				pageCount = item;
				offset = (page-1)%5;
				startNum = page - offset;
				
				/*console.log("pageCount :" +pageCount +"item : " + item);
				console.log("offset :" +offset);
				console.log("startNum :" +startNum);*/

				let pagePre;
				let pageNext;
				let pageLi;
				
				
				if(startNum > 1) {
					pagePre = `<a class="btn btn-prev" href="?p=${startNum-5}&categroy=${categroy}">이전</a>`
				}else {
					pagePre = `<span class="btn btn-prev">이전</a>`
				}
				prev.insertAdjacentHTML('beforeend', pagePre);
				
				
				for(let i = 0; i < 5; i++){
					if(page == startNum+i){
						pageLi = `<li class="current"><a href="?p=${i+startNum}&categroy=${categroy}">${startNum + i}</a></li>`
					}else {
						pageLi = `<li class=""><a href="?p=${i+startNum}&categroy=${categroy}">${startNum + i}</a></li>`
					}
					if(i+startNum <= pageCount){
						pagerBtn.insertAdjacentHTML('beforeend', pageLi);
					}
				}
				
				if(startNum+5 <= pageCount){
					pageNext = `<a class="btn btn-next" href="?p=${startNum+5}&categroy=${categroy}"></a>다음</span>`
				}else{
					pageNext = `<span class="btn btn-next">다음 </span>`
				}
				
				next.insertAdjacentHTML('beforeend', pageNext);
			})
		}
		
	});
	
	
	pagerBtn.addEventListener('click', (e)=>{
		e.preventDefault();
		page = e.target.innerText;
		
		fetch(`/api/data/information?p=${page}&categroy=${categroy}`)
			.then(response =>response.json())
			.then(json => {
				console.log();
				//console.log(json.list)
				infoBoard.innerHTML="";
				
				for(let n of json.list){
					let imgbox = `<div class="info-img-box"></div>`;
					if(json.imgUrlList[n.id]){
						imgbox = `<div class="info-img-box" style="background-image:url(${json.imgUrlList[n.id]})"></div>`
					}
					let date = getFormatDate(new Date(n.regDate));
					let li =`<li>
						${imgbox}
						<div class="info-txt-box">
		                     <ul class="info-ex">
		                         <li>#${n.cateName}</li>
		                         <li>${date}</li>
		                         <li>조회수 ${n.hitCnt}</li>
		                     </ul>
		                     <a href ="${n.id}">
		                         <h4 class="info-tit">${n.title}</h4>
		                         <p class="info-txt">
		                          ${n.content}
		                         </p>
		                     </a>
		                 </div>
		             </li>`;
					
					//console.log(li)
					
					infoBoard.insertAdjacentHTML('beforeend', li);
				}
				return json.pageCount;
			})
			.then(item => {
				pagerBtn.innerHTML = "";
				prev.innerHTML ="";
				next.innerHTML ="";
				
				pageCount = item;
				offset = (page-1)%5;
				startNum = page - offset;

				let pagePre;
				let pageNext;
				let pageLi;
				
				
				if(startNum > 1) {
					pagePre = `<a class="btn btn-prev" href="#">이전</a>`
				}else {
					pagePre = `<span class="btn btn-prev">이전</a>`
				}
				prev.insertAdjacentHTML('beforeend', pagePre);
				
				
				for(let i = 0; i < 5; i++){
					
					if(page == startNum+i){
						pageLi = `<li class="current"><a href="?p=${i+startNum}&categroy=${categroy}">${startNum + i}</a></li>`
					}else {
						pageLi = `<li class=""><a href="?p=${i+startNum}&categroy=${categroy}">${startNum + i}</a></li>`
					}
					if(i+startNum <= pageCount){
						pagerBtn.insertAdjacentHTML('beforeend', pageLi);
					}
				}
				
				if(startNum+5 <= pageCount){
					pageNext = `<a class="btn btn-next" href="?p=${startNum+5}&categroy=${categroy}"></a>다음</span>`
				}else{
					pageNext = `<span class="btn btn-next">다음 </span>`
				}
				
				next.insertAdjacentHTML('beforeend', pageNext);
			})
			
			window.scrollTo(0,0);
	});
	
	
	
	
	//다음버튼
	next.addEventListener('click', (e)=>{
		e.preventDefault;
		if(startNum+5 <= pageCount){
			page = startNum+5;
			console.log(`${page} dddd`);
			fetch(`/api/data/information?p=${page}&categroy=${categroy}`)
				.then(response =>response.json())
				.then(json => {
					console.log();
					//console.log(json.list)
					infoBoard.innerHTML="";
					
					for(let n of json.list){
						let imgbox = `<div class="info-img-box"></div>`;
					
						if(json.imgUrlList[n.id]){
							imgbox = `<div class="info-img-box" style="background-image:url(${json.imgUrlList[n.id]})"></div>`
						}
						
						let date = getFormatDate(new Date(n.regDate));
						let li =`<li>
							${imgbox}
							<div class="info-txt-box">
			                     <ul class="info-ex">
			                         <li>#${n.cateName}</li>
			                         <li>${date}</li>
			                         <li>조회수 ${n.hitCnt}</li>
			                     </ul>
			                     <a href ="${n.id}">
			                         <h4 class="info-tit">${n.title}</h4>
			                         <p class="info-txt">
			                          ${n.content}
			                         </p>
			                     </a>
			                 </div>
			             </li>`;
						infoBoard.insertAdjacentHTML('beforeend', li);
					}
					return json.pageCount;
				})
				.then(item => {
					pagerBtn.innerHTML = "";
							prev.innerHTML ="";
							next.innerHTML ="";
							
							pageCount = item;
							offset = (page-1)%5;
							startNum = page - offset;
							
							console.log("pageCount :" +pageCount +"item : " + item);
							console.log("offset :" +offset);
							console.log("startNum :" +startNum);
			
							let pagePre;
							let pageNext;
							let pageLi;
							
							
							if(startNum > 1) {
								pagePre = `<a class="btn btn-prev" href="#">이전</a>`
							}else {
								pagePre = `<span class="btn btn-prev">이전</a>`
							}
							prev.insertAdjacentHTML('beforeend', pagePre);
							
							
							for(let i = 0; i < 5; i++){
									if(page == startNum+i){
										pageLi = `<li class="current"><a href="?p=${i+startNum}&categroy=${categroy}">${startNum + i}</a></li>`
									}else {
										pageLi = `<li class=""><a href="?p=${i+startNum}&categroy=${categroy}">${startNum + i}</a></li>`
									}
								if(i+startNum <= pageCount){
									pagerBtn.insertAdjacentHTML('beforeend', pageLi);
								}
							}
							
							if(startNum+5 <= pageCount){
								pageNext = `<a class="btn btn-next" href="#"></a>다음</span>`
							}else{
								pageNext = `<span class="btn btn-next");">다음 </span>`
							}
							
							next.insertAdjacentHTML('beforeend', pageNext);
				})
		}else {
			alert("다음페이지가 없습니다.");
		}
		
	});
	
	
	
	
	
	
	
	//이전버튼
	prev.addEventListener('click', (e)=>{
		e.preventDefault;
		if(startNum > 1){
			page = startNum-5;
			fetch(`/api/data/information?p=${page}&categroy=${categroy}`)
				.then(response =>response.json())
				.then(json => {

					infoBoard.innerHTML="";
					
					for(let n of json.list){
						let imgbox = `<div class="info-img-box"></div>`;
					
						if(json.imgUrlList[n.id]){
							imgbox = `<div class="info-img-box" style="background-image:url(${json.imgUrlList[n.id]})"></div>`
						}
						
						let date = getFormatDate(new Date(n.regDate));
						let li =`<li>
							${imgbox}
							<div class="info-txt-box">
			                     <ul class="info-ex">
			                         <li>#${n.cateName}</li>
			                         <li>${date}</li>
			                         <li>조회수 ${n.hitCnt}</li>
			                     </ul>
			                     <a href ="${n.id}">
			                         <h4 class="info-tit">${n.title}</h4>
			                         <p class="info-txt">
			                          ${n.content}
			                         </p>
			                     </a>
			                 </div>
			             </li>`;
						infoBoard.insertAdjacentHTML('beforeend', li);
					}
					return json.pageCount;
				})
				.then(item => {
					pagerBtn.innerHTML = "";
							prev.innerHTML ="";
							next.innerHTML ="";
							
							pageCount = item;
							offset = (page-1)%5;
							startNum = page - offset;
							
							let pagePre;
							let pageNext;
							let pageLi;
							
							
							if(startNum > 1) {
								pagePre = `<a class="btn btn-prev" href="#">이전</a>`
							}else {
								pagePre = `<span class="btn btn-prev">이전</a>`
							}
							prev.insertAdjacentHTML('beforeend', pagePre);
							
							
							for(let i = 0; i < 5; i++){
									if(page == startNum+i){
										pageLi = `<li class="current"><a href="?p=${i+startNum}&categroy=${categroy}">${startNum + i}</a></li>`
									}else {
										pageLi = `<li class=""><a href="?p=${i+startNum}&categroy=${categroy}">${startNum + i}</a></li>`
									}
								if(i+startNum <= pageCount){
									pagerBtn.insertAdjacentHTML('beforeend', pageLi);
								}
							}
							
							if(startNum+5 <= pageCount){
								pageNext = `<a class="btn btn-next" href="#"></a>다음</span>`
							}else{
								pageNext = `<span class="btn btn-next");">다음 </span>`
							}
							
							next.insertAdjacentHTML('beforeend', pageNext);
				})
		}else {
			alert("이전페이지가 없습니다.");
		}
		
	})
	
	function getFormatDate(data){
		let year = data.getFullYear();
		let month = (1 + data.getMonth());
		month = month >= 10 ? month : '0' + month;
		let day = data.getDate();
		
		data = data>=10 ? data:'0' + day;
		return year +'-' + month + '-' + day;
	}
	
	



})