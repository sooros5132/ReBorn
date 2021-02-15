<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/security/tags"%>

<header>
	<h1 class="d-none">상단 바</h1>
	<nav class="main-menu">
		<h1 class="d-none">메인 메뉴</h1>
		<div class="menu-container">
			<a href="/"><img src="/images/logo.svg"></a>
			<ul class="menu-list">
				<!-- <li>
					<div class="menu-btn">
						<a href="/main">HOME</a>
					</div>
					<div class="hover-line"></div>
				</li> -->
				<li>
					<div class="menu-btn">
						<span>유기동물</span>
					</div>
					<div class="hover-line"></div>
					<div class="dropdown-menu">
						<ul>
							<li><a href="/animal/list">유기동물 목록</a></li>
                            <li><a href="/name/recruit">이름 지어주기</a></li>
							<li><a href="/name/list">이름 투표</a></li>
						</ul>
					</div>
				</li>

				<li>
					<div class="menu-btn">
						<a href="/care/list">보호소</a>
					</div>
					<div class="hover-line"></div>
				</li>
				<li class="drop">
					<div class="menu-btn">
						<span>커뮤니티</span>
					</div>
					<div class="hover-line"></div>
					<div class="dropdown-menu">
						<ul>
							<li><a href="/community/list">게시판</a></li>
							<li><a href="/report/list">실종신고</a></li>
						</ul>
					</div>
				</li>
				<li>
					<div class="menu-btn">
						<span>정보</span>
					</div>
					<div class="hover-line"></div>
					<div class="dropdown-menu">
						<ul>
							<li><a href="/data/introduce">리본 소개</a></li>
							<li><a href="/data/information">동물 기본상식</a></li>
						</ul>
					</div>
				</li>
			</ul>
			<s:authorize  access="isAnonymous()">
				<button>
					<a href="/member/info/join">SIGN UP</a>
				</button>
				<button>
					<a href="/member/login">SIGN IN</a>
				</button>
			</s:authorize>
			
			<s:authorize access="isAuthenticated()">
			<div>
	<!-- 		<div><a href="/member/info/message">쪽지함</a>  /   --><span class="loginName"><a href="/mypage/info">${loginId}</a></span>
	       				<span>님 반가워요!&emsp; </span> <!-- </div> -->
				<button>
					<a href="/member/logout">LOGOUT</a>
				</button>
			</div>
			</s:authorize>
		</div>
	</nav>

</header>