<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script src="/js/community/list.js"></script>
<link href="/css/community/list.css" type="text/css" rel="stylesheet" />
<link href="/css/community/reset.css" type="text/css" rel="stylesheet" />


<c:set var ="page" value="${param.p}" />
<c:if test = "${empty param.p}">
	<c:set var = "page" value="1" />
</c:if>	

<c:set var="offset" value="${(page-1)%5}"> </c:set>
<c:set var="startNum" value="${page-offset}"> </c:set>
<%-- <div>
	offset: ${offset} </br>
	startNum: ${startNum} </br>
	param.p: ${param.p} </br>
	전체페이지 수pageCount: ${pageCount} </br>
	param.f: ${param.f}
</div> --%>

	<section class="main-container">
            <!-- <div class="major-subject mt20">
                <h1 class="major-subject-text bold">커뮤니케이션</h1>
            </div> -->
            <div class="wrapper">
                <div class="align-wrap">
                    <div class="align mt60">
                        <h2 class="hidden">게시판 정렬폼</h2>
                        <form class="category-align">
                            <fieldset>
                                <legend class="hidden">카테고리 정렬 필드</legend>
                                <select class="select-category select-box" name="c" >
                                    <option value="">카테고리</option>
                                    <option value="question">질문</option>
                                    <option value="post">입양후기</option>
                                    <option value="dog">우리집 멍이</option>
                                    <option value="cat">우리집 냥이</option>
                                </select>
                            </fieldset>
                        </form>
                        <form class="view-align">
                            <fieldset>
                                <legend class="hidden">View 정렬 필드</legend>
                                <select class="select-view select-box" name="v" >  
                                    <option value="10">10개씩</option>
                                    <option value="15">15개씩</option>
                                    <option value="30">30개씩</option>                            
                                </select>
                            </fieldset>
                        </form>
                    </div>
                </div>    
                <div class="list-common mt30">
                    <h2 class="hidden">목록</h2>
                    <ul class="list-data">
                    <%--AJAX 	<c:forEach var="n" items="${list}">
	                        <li class="list-article mt20">
	                            <a class="list-link" href="${n.id}">
	                                <div class="post-content has-image">
	                                    <strong class="subject bold word-color1">${n.title}</strong>
	                                    <div class="content mt10">${n.content}
	                                    </div>    
	                                    <span class="meta pt15">
	                                        <span class="name-txt">댓글 </span>
	                                        <span class="num-txt dot bold">${n.comment} </span>
	                                        <span class="name-txt">좋아요 </span>
	                                        <span class="num-txt dot bold">${n.like}</span>
	                                        <span class="hit">조회수</span>
	                                        <span class="num-txt bold dot">${n.hitCnt}</span>
	                                        <span class="ico">by</span>
	                                        <span class="num-txt bold dot">${n.nickname}</span>
	                                        <span class="hit">작성일</span>
	                                        <span class="num-txt bold" >
	                                        	<fmt:formatDate value="${n.regDate}" pattern="yyyy-MM-dd" />
	                                        </span>
	                                    </span>
	                                </div>
	                                <c:set var="imageViewType" value="${(empty n.files)?0:1}" />
	                                
	                                <c:if test="${imageViewType>0}" >
		                                <c:forEach var="i" begin="0" end="0" items="${fn:split(n.files, ',')}" varStatus="status" >
							                <div class="file-image">
							                 	<img src="/upload/community/2021/${n.id}/${i}" alt="이미지" />
							                </div>                
						                </c:forEach>
					                </c:if>
					                <c:if test="${imageViewType==0}" >
					                	<div class="file-image"></div>					                	
					                </c:if>
	                            </a>
	                        </li>
                        </c:forEach>  --%>                      
                    </ul>
                </div>
                <div class="write-common pt15">                
                    <%--AJAX <div><span class="text-red bold">1</span> / ${pageCount} pages</div>
                    <form action="">
                    	<a class="community-button bold" type="button" href="/community/reg" >글쓰기 </a>
                    </form> --%>
                </div>
            </div> <!-- wrapper -->
            <div class="pager-common mt30">
                <div class="pager">                
                    <div class="prev ">
                    	<a class="btn btn-prev">이전</a>
	                    <%-- <c:if test="${startNum > 1}">                    
	                        <a class="btn btn-prev" href="p=${startNum-5}&f=${param.f}&q=${param.q}&v=${param.v}">이전</a>
	                    </c:if>
	                    <c:if test="${startNum == 1}">                    
	                        <span class="btn btn-prev" onclick="alert('이전 페이지가 없습니다.');">이전</a>
	                    </c:if> --%>    
                    </div>
                    
                    <ul class="btn-center">
	                    <%-- <c:forEach var="i" begin="0" end="4" varStatus="st">
	                    	<c:set var="current" value="" />
	                    	<c:if test="${i+startNum == page}">
	                    		<c:set var="current" value="current"></c:set>
	                        </c:if>
							<c:if test="${i+startNum <= pageCount}">
	                        	<li class="${current}"><a class="bold " href="?p=${i+startNum}&f=${param.f}&q=${param.q}&v=${param.v}">${i+startNum}</a></li>
							</c:if>
	                    </c:forEach>   --%>
                    </ul>
                    
                    <div class="next">
                    	<a class="btn btn-next">다음</a>
                    	<%-- <c:if test="${startNum+5 <= pageCount}">
                        	<a class="btn btn-next" href="?p=${startNum+5}&f=${param.f}&q=${param.p}&v=${param.v}"></a>다음</span>
                        </c:if>
                        <c:if test="${startNum+5 > pageCount}">
                        	<span class="btn btn-next" onclick="alert('다음 페이지가 없습니다.');">다음 </span>                        	
                        </c:if> --%>
                    </div>
                    
                </div>
                <div class="search-form mt20"> 
                    <h2 class="hidden">커뮤니케이션 검색폼</h2>    
                    <form action="">
                        <fieldset>
                            <legend class="hidden">검색필드</legend>
                            <label class="hidden">검색분류</label>
                            <select class="search-select" name="f">
                                <option value="title">제목</option>
                                <option value="nickname">작성자</option>
                            </select>
                            <label class="hidden">검색어</label>
                            <input class="search-window"  type="text" name="q" value="${param.q}"/>
                            <input class="btn btn-search" type="submit" value="검색" />
                        </fieldset>
                    </form>
                </div>
            </div>
        </section>
	
