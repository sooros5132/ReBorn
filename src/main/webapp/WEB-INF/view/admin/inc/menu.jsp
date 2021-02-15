<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script>
window.addEventListener("load", function() {
	var acc = document.getElementsByClassName("first-menu");
	var i;

	for (i = 0; i < acc.length; i++) {
	  acc[i].addEventListener("click", function() {
	    this.classList.toggle("active");
	    var panel = this.nextElementSibling;
	    if (panel.style.maxHeight) {
	      panel.style.maxHeight = null;
	    } else {
	      panel.style.maxHeight = panel.scrollHeight + "px";
	    } 
	  });
	}
}); 
</script>
</head>
<body>
<nav>
	    <h1 class="d-none">메인 메뉴</h1>
	    <ul class="main-menu">
	        <li>
	            <div class="first-menu">
	            	<i class="fas fa-link menu-img"></i>
	                <a href="/admin/chat/link">챗팅 링크 관리</a>    
	            </div>           
	     <!--        <ul class="second-menu">
	                <li><a href="/admin/member/list">회원 목록</a></li>
	                <li><a href="/admin/member/add">회원 추가</a></li>
	                <li><a href="/admin/member/message/list">메세지 목록</a></li>
	            </ul> -->
	        </li>
	        <li>
        	   <div class="first-menu">
	           		<i class="fas fa-users menu-img"></i>
	                <a href="/admin/chat/list">챗팅 대화 관리</a>    
	            </div>  
	        </li>
	    </ul>
	</nav> 
</body>
</html>