<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<link href="/css/community/reg.css" type="text/css" rel="stylesheet" />
<link href="/css/community/reset.css" type="text/css" rel="stylesheet" />
<link href="/css/community/community-style.css" type="text/css" rel="stylesheet" />
<script type="module" src="/js/community/reg.js"></script>

	<section class="main-container">
           <!--  <section class="item-tool-bar">
                <div class="item-toolkit">
                    <span class="image-item mr15">image</span>
                    <span class="video-item mr15">video</span>
                    <select class="category-item mr10" name="글꼴" id="">
                        <option value="">나눔고딕</option>
                        <option value="">고딕</option>
                        <option value="">신명조</option>
                        <option value="">궁서</option>
                    </select>
                    <span class="bold-item">bold</span>
                    <span class="italic-item">italic</span>
                    <span class="underline-item">underline</span>
                    <span class="align-left-item">align-left</span>
                    <span class="align-center-item">align-center</span>
                    <span class="align-right-item">align-right</span>                    
                </div>
            </section> -->
            <section class="wrapper">
                <form method="post" enctype="multipart/form-data">
	                <div class="category-option mt60">
	                    <select name="category" id="">
	                        <option value="1">질문</option>
	                        <option value="2">입양후기</option>
	                        <option value="3">강아지와함께</option>
	                        <option value="4">고양이와함께</option>
	                    </select>
	                </div>
	                <!-- 제목 입력부분 -->
	                    <div class="article-title mt30">
	                        <input type="text" name="title" placeholder="제목을 입력해주세요." />	                        
	                    </div><!-- contenteditable="true" -->
	                  
					<!-- 드래그 앤 드랍 방식 -->
	                 	<!-- <div class="drop-box mt10">
	                 		업로드 할 파일을 드롭하세요.
	                 		<input type="file" />
	                 	</div>
	                 	<div class="drop-file-name mt5"></div> -->
	                 	
	                 	
	                 	
	                 	
	                 
	                 <!-- 파일 첨부 방식 -->
	                    <div class="file-box mt10">		                    
		                    <span class="upload-button">업로드</span>
		                    <input class="upload-file" type="file" name="file" />
		                    <span class="file-name"></span>		                    
	                    </div>
	                    	                    
	                    <!-- <div>
	                    	<input class="mt10 add-button" type="button" value="add" />
	                    </div> -->
	                    
	                 <!-- 내용입력부분 -->   
	                    <div class="article-content mt30">
	                        <textarea class="content-place" name="content"  >
	
	                        </textarea>
	                    </div>
	                    <div class="article-confirm mt20">
	                        <div>
	                            <input class="community-button" type="submit" value="등록" />
	                           <!--  <a class="reg-button" href="list">취소</a> -->
	                        </div>
	                    </div>
                </form>
            </section>

        </section>
      