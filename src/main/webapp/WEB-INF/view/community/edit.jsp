<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>   
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<link href="/css/community/reset.css" type="text/css" rel="stylesheet" />
<link href="/css/community/community-style.css" type="text/css" rel="stylesheet" />
<link href="/css/community/edit.css" type="text/css" rel="stylesheet" />

	<section class="main-container">
           <!--  <div class="major-subject mt20">
                <h1 class="major-subject-text bold">커뮤니케이션</h1>
            </div> -->
            <div class="wrapper" >
	             <form method="post" enctype="multipart/form-data">
	            	<div class="category-option mt30">
	                    <select name="category" id="">
	                        <option value="1">질문</option>
	                        <option value="2">입양후기</option>
	                        <option value="3">강아지와함께</option>
	                        <option value="4">고양이와함께</option>
	                    </select>
	                </div>
	                
	                <section class="article-header mt30">
	                    <%-- <span class="category">category: <span>${b.category}</span></span> --%> 
	                    <span class="article-title bold">
	                    	<input type="text" name="title" value="${b.title}"/>
	                    </span>
	                    <div class="write-info">
	                        <span class="writer-id bar mr10">by ${b.nickname }</span> 
	                        <span class="regdate bar mr10"> 
	                        	<fmt:formatDate value="${b.regDate}" pattern="yyyy.MM.dd[E] a hh:mm:ss"/>
	                        </span>                        
	                    </div>
	                </section>
	                <div class="file-add-box mt10">
               			<input type="file" name="file" value=""/>
          			</div>                
					
	                <section class="article-content mt50">
	                    <textarea class="content-place" name="content"  >
							${b.content}
		                </textarea>	                                       
	                </section>
	                <div class="file-box mt10"> 
		                 <img src="/upload/community/2021/${b.id}/${b.files}" alt="">		
               		</div> 
	
	            <div class="transfer-button-box mt60">
	            	<input type="hidden" name="id" value="${b.id}"/>
	            	<input class="edit-save-button" type="submit" value="저장"/>
	            	<a class="a-button ml1" href="../list">취소</a>
	            </div>	
	            </form>
            </div> <!-- wraaper end-->
            
        </section>

	