package com.reborn.web.controller.community;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.http.HttpRequest;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.reborn.web.entity.community.Board;
import com.reborn.web.entity.community.BoardView;
import com.reborn.web.entity.community.Comment;
import com.reborn.web.entity.community.CommentView;
import com.reborn.web.entity.community.Like;
import com.reborn.web.service.community.BoardService;

@Controller
@RequestMapping("/community/")
public class BoardController {
	
	@Autowired
	private BoardService service;
	
	//글 리스트
	@RequestMapping("list")
	public String list(
		@RequestParam(name="p", defaultValue ="1") int page,
		@RequestParam(name="v", defaultValue = "10") int view,		
		@RequestParam(name="f", defaultValue ="title") String field,
		@RequestParam(name="q", required = false) String query, 
		@RequestParam(name="c", required = false) String option,
		Model model) {
		
		List<BoardView> list = service.getViewList(page, view, field, query, option);
		System.out.println(page + ","+ view +","+field+","+query+","+option);
		int count = service.getCount(field, query, option); //전체 게시물의 수.
			
		//int size = view;
		int pageCount = (int)Math.ceil(count/(float)view);
		model.addAttribute("list", list);
		model.addAttribute("pageCount", pageCount);
		
		return "home.community.list";
	}
	
	//글 상세페이지
	@GetMapping("{id}")
	public String detail(Model model, @PathVariable("id") int id,
			HttpServletRequest request, HttpSession session) {
//		int memberId = ((Member) httpRequest.getSession().getAttribute("login")).
		session = request.getSession();
		int memberId = (Integer) session.getAttribute("id");
		
		BoardView board = service.get(id);		
		model.addAttribute("b", board);
		
		System.out.println("memberId"+ memberId);
		System.out.println("보드Id" + board.getId());
		
		List<CommentView> comment = service.getCommentViewList(id);
		model.addAttribute("comment", comment);
		
		int commentCount = service.getCommentCount(id);
		model.addAttribute("commentCount", commentCount);
		
		
		int likeCount = service.getLikeCount(id);
		model.addAttribute("likeCount", likeCount);
				
		service.hitUp(id);
		
		return "home.community.detail";		
	}
	
	//좋아요 토글 방식 +- 
	@PostMapping("{boardId}/like" )
	@ResponseBody
	public Map<String, Object> like(Model model, @PathVariable("boardId") int boardId,						
			HttpServletRequest httpRequest, HttpSession session) {
		String toggleLike;		
		
		session = httpRequest.getSession();
		int memberId = (Integer) session.getAttribute("id");
		System.out.println(memberId);
		
		Like like = new Like();
		like.setBoardId(boardId);
		like.setMemberId(memberId);
		
		int result = service.getCount(boardId, memberId);
		
		if(result == 0) { 		
		  service.insert(like);
		  toggleLike = "insert";
		} else {
			service.delete(boardId, memberId);
			toggleLike = "delete";
		}		
		int likeCount = service.getLikeCount(boardId);		
		Map<String, Object> dto = new HashMap<>();
		dto.put("likes", toggleLike);
		dto.put("likeCount", likeCount);
		
		return dto;		
	}
	
	
	//글 수정 Get
	@GetMapping("{id}/edit")
	public String edit(Model model, @PathVariable("id") int id) {
		
		BoardView board = service.get(id);
		model.addAttribute("b", board);
		
		return "home.community.edit";
	}
	
	//글 수정 Post
	@PostMapping("{id}/edit")
	public String edit(Board board, @RequestParam(name="category", defaultValue ="1") int category,
			@RequestParam(name="file", defaultValue = "", required = false) Part filePart,
			HttpServletRequest request) throws IOException {
		int id = board.getId();
		String title = board.getTitle();
		String content = board.getContent();
		String fileName = ""; 
		
		if(filePart != null) {
			fileName = filePart.getSubmittedFileName();
			board.setFiles(fileName);
		
			String pathTemp = request.getServletContext().getRealPath("/upload/community/2021/"+id);
			System.out.println(pathTemp);
			
			File path = new File(pathTemp);
			if(!path.exists())	
				path.mkdirs();
			
			String filePath = pathTemp + File.separator + fileName;
			
			InputStream fis = filePart.getInputStream();
			FileOutputStream fos = new FileOutputStream(filePath);
			
			byte[] buf = new byte[1024];
			int size = 0;
			while((size = fis.read(buf)) != -1)
					fos.write(buf, 0, size);
			
			fos.close();
			fis.close();
		}//end if
		
		
		Board origin = service.get(board.getId());
		origin.setTitle(title);
		origin.setContent(content);
		origin.setBoardCategoryId(category);
		origin.setFiles(fileName);
		System.out.println(content + "/" + category);
		System.out.println(board.getId());
		
		service.update(origin);
		
		return "redirect:../"+board.getId();
	} 
	
	
	
	//글 삭제
	@RequestMapping("{id}/del")
	public String delete(@PathVariable("id") int id) {
		System.out.println("========="+id);
		service.delete(id);
		
		return "redirect:../list";
	}
	
	//글 등록Get
	@GetMapping("reg")
	public String reg() {
		return "home.community.reg";
	}
	
	//글 등록Post
	@PostMapping("reg")
	public String reg(@RequestParam(name="title", required=false) String title,
			@RequestParam(name="content" ,required=false) String content,
			@RequestParam(name="category", required=false) int category,
			//@RequestParam(name="memberId", required=false ) int member,
			@RequestParam(name="file", defaultValue = "", required = false) Part filePart,
			HttpServletRequest request,
			HttpSession session) throws IOException, ServletException {
		
		session = request.getSession();
		int memberId = (Integer) session.getAttribute("id");
		System.out.println(memberId);
		
		Board board = new Board();
		board.setTitle(title);
		board.setContent(content);
		board.setBoardCategoryId(category);
		Board lastId = service.getLastId();
		int newBoardId = lastId.getId()+1;
		board.setId(newBoardId);
		System.out.println(newBoardId);
		//멤버ID는 멤버가 주는 값으로 수정해야 함.		
		board.setMemberId(memberId);
		String fileName = ""; 
				
		if(filePart != null) {
			fileName = filePart.getSubmittedFileName();
			board.setFiles(fileName);
		
			String pathTemp = request.getServletContext().getRealPath("/upload/community/2021/"+newBoardId);
			System.out.println("파일경로"+pathTemp);
			
			File path = new File(pathTemp);
			if(!path.exists())	
				path.mkdirs();
			
			String filePath = pathTemp + File.separator + fileName;
			
			InputStream fis = filePart.getInputStream();
			FileOutputStream fos = new FileOutputStream(filePath);
			
			byte[] buf = new byte[1024];
			int size = 0;
			while((size = fis.read(buf)) != -1)
					fos.write(buf, 0, size);
			
			fos.close();
			fis.close();
		}//end if
		
//		Collection<Part> fileParts = request.getParts();
//		String fileName = "";
//		String fileNames = "";
//		for(Part p : fileParts) {
//			if(p.getName().equals("file") && p.getSize()>0 ) {
//				filePart = p;
//				fileName = filePart.getSubmittedFileName();
//				fileNames += fileName;
//				fileNames += ",";
//				
//				String url = "/upload/community/2021/"+newBoardId;
//				String pathTemp = request.getServletContext().getRealPath(url);
//				System.out.println("pathTemp"+pathTemp);
//				
//				File path = new File(pathTemp);
//				if(!path.exists())
//						path.mkdirs();
//				
//				String filePath = pathTemp + File.separator + fileName;
//				System.out.println(filePath);
//				
//				InputStream fis = filePart.getInputStream();
//				FileOutputStream fos = new FileOutputStream(filePath);
//				
//				byte[] buf = new byte[1024];
//				int size = 0;
//				while((size = fis.read(buf)) != -1)
//						fos.write(buf, 0, size);
//				
//				fos.close();
//				fis.close();
//			}
//		}
			
		board.setFiles(fileName);
				
		service.insert(board);
		
		return "redirect:list";
	}
	
	//댓글 작성
	@PostMapping("{id}/comment/write")
	public String commentWrite(
			@PathVariable("id") int id,
			@RequestParam(name="comment") String commentContent,			
			HttpServletRequest request, HttpSession session) {
		session = request.getSession();
		int memberId =  (Integer) session.getAttribute("id");
		System.out.println("댓글 memberIdId"+ memberId);
		
		Comment comment = new Comment();
		comment.setContent(commentContent);
		comment.setMemberId(memberId);
		comment.setBoardId(id);
		
		service.commentInsert(comment);
		return "redirect:../../"+id;
	
	}
	
	//댓글 삭제
	@RequestMapping("{id}/comment/{commentId}/del")
	public String commentDelete(@PathVariable("id") int id,
			@PathVariable("commentId") int commentId) {
		
		System.out.println(id);
		service.commentDelete(commentId);
		
		return "redirect:../../../"+id;
	}
	

	//드래그 파일 업로드
	@PostMapping("upload")
	@ResponseBody
	public String upload(MultipartFile file, HttpServletRequest request) throws IllegalStateException, IOException {
		

		Board lastId = service.getLastId();
		int newBoardId = lastId.getId()+1;
		
		String url = "/upload/community/2021/";
		
		String realPath = request.getServletContext().getRealPath(url);
		
		File realPathFile = new File(realPath);
		if(!realPathFile.exists())
			realPathFile.mkdirs();
		
		String uploadedFilePath = realPath + File.separator+file.getOriginalFilename();
		File uploadedFile = new File(uploadedFilePath);
		file.transferTo(uploadedFile);
		
		System.out.println("file upload ok");
		System.out.println("파일이름"+file.getOriginalFilename());
		System.out.println("파일경로"+realPath);
		//여기에서 파일이름을 어떻게 받지? => file.getOriginalFilename() 으로 받음
		
		
		return "ok";
	}
	
}
