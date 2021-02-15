<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>    
<link href="/css/community/detail.css" type="text/css" rel="stylesheet" />
<link href="/css/community/community-style.css" type="text/css" rel="stylesheet" />


	<section class="main-container">
           <!--  <div class="major-subject mt20">
                <h1 class="major-subject-text bold">커뮤니케이션</h1>
            </div> -->
            <div class="wrapper" >
                <section class="article-header mt60">
                    <span class="category">category: <span>${b.category}</span></span> 
                    <span class="title bold word-color1 mt10">${b.title}</span>
                    <div class="write-info mt10">
                        <span class="writer-id bar mr10">by ${b.nickname }</span> 
                        <span class="regdate bar mr10"> 
                        	<fmt:formatDate value="${b.regDate}" pattern="yyyy.MM.dd[E] a hh:mm:ss"/>                        	
                        </span>
                        <c:if test="${b.memberId == sessionScope.id}">
                        	<a class="edit-btn bar mr10" href="${b.id}/edit">수정</a>
                        	<a class="delete-btn" >삭제</a>
                        	<%-- href="${b.id}/del" --%>
                        </c:if>
                        
                        
                    </div>
                    <%-- 게시글의 멤버: ${b.memberId} </br>
                    게시글의  id: ${b.id} --%>
                </section>
                <!-- 파일업로드 -->
                <c:if test="${not empty b.files}">
	      			<c:forEach var="imageItems" items="${fn:split(b.files, ',')}" varStatus="status" >
	                <div class="file-image">
	                 	<img class="mr10" src="/upload/community/2021/${b.id}/${imageItems}" alt="상품이미지" />
	                </div>                
	                </c:forEach>
                </c:if>

                <section class="article-content mt50">
                    ${b.content}
                                       
                </section>

                <div class="reaction-info mt50">
                    <span>댓글 <span class="comment-count bold">${commentCount}</span></span> 
                    <span>
	                    <input class="like-btn" type="button" value="좋아요" /> 
	                    <span class="like-img"></span>
	                    <span class="like-count bold">${likeCount}</span>
                    </span>
                </div>
                				
                <!-- 댓글 리스트 -->
                <div class="comment-list">
	                <c:forEach items="${comment}" var="c" >
		                <div class="comment-view-box padding10 mt5">
		                    <div class="comment-info mt10">
		                        <span class="comment-nickname word-color1 dot" >${c.nickname}</span>
		                        <span class="comment-regdate dot">
		                        	<fmt:formatDate value="${c.regDate}" pattern="yyyy.MM.dd[E] a hh:mm:ss"/>
		                        </span>
		                        
		                        <!-- memberId 조건에 따라 수정버튼 show -->
		                        <c:if test="${sessionScope.id == c.memberId}">
			                        <form method="post" action="${b.id}/comment/edit">
			                        	<span class="comment-edit dot">수정</span>
			                        </form>
		                        	<span class="comment-delete"><a href="${b.id}/comment/${c.id}/del">삭제</a></span>
		                        </c:if>		                        
		                        <!-- <span class="comment-report"><a href="">신고</a></span> -->
		                    </div>
		                    <div class="comment-content mt10"> 
		                        ${c.content}
		                    <input class="comment-id" type="hidden" name="commentId" value="${c.id}" />
		                    <input class="comment-member-id" type="hidden" name="commentMemberId" value="${c.memberId}" />	                    
		                    </div>
		                    <!-- <a class="comment-reply" href="">답글</a> -->
		                    	<%-- 멤버ID: ${memberId}
		                        스코프아이디: ${sessionScope.id}
		                        코멘트멤버ID: ${c.memberId}
		                        코멘트 아이디: ${c.id} --%>
		                </div>
	                </c:forEach>
                </div>
                
				<!-- 댓글 작성 -->
                <form method="post" action="${b.id}/comment/write" >
                    <div class="comment-form mt20">                                                   
                        <textarea name="comment" cols="" rows="4" placeholder="여러분의 소중한 댓글을 입력해주세요."></textarea>
                        <div class="comment-button-box mt20">
			               	<a class="a-button" href="../community/list">목록</a>
                            <button class="button" type="submit" >댓글</button>
                        </div>
                        	<input class="member-id" type="hidden" name="memberId" value="${b.memberId}" />
                        	<input class="board-id" type="hidden" name="boardId" value="${b.id}" />
                    	</div>
                </form>
                

            </div> <!-- wraaper end-->
        </section>

		<script src="/js/community/detail.js"></script>