<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/security/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<header class="header">
		<h1 class="d-none">심리플리</h1>

		<section class="logo-menu">
			<h1 class="d-none">HOME</h1>
			<img class="logo" src="/images/logo_w.svg" alt="홈" />
		</section>


		<div class="title">ADMIN DASHBOARD</div>


		<form action="login" method="get" class="login-menu">
			<s:authorize access="isAnonymous()">
				<input type="submit" value="LOGIN" class="bg-button-s login" />
			</s:authorize>

			<s:authorize access="isAuthenticated()">
				<div class="profile-img"
					style="background: center / cover no-repeat url('/admin/common/profile?id=${login.id}');"></div>
				<!-- 물리주소 안됨 프로젝트로부터 갖고와야됨 -->
				<div class="loginName-box">
				<div class="loginInfo">
					<span class="loginName"><a href="/mypage/info">${loginId}</a></span> <span>님 반가워요!&emsp; </span>
					</div>
					<button class="bg-button-s login">
						<a href="/member/logout">LOGOUT</a>
					</button>
				</div>
			</s:authorize>
		</form>
	</header>

</body>
</html>