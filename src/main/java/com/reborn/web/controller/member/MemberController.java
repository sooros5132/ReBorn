package com.reborn.web.controller.member;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.reborn.web.service.email.EmailUtil;
import com.reborn.web.service.member.CertificationService;
import com.reborn.web.service.member.MemberService;

@Controller
@RequestMapping("/member/")
public class MemberController {

	@Autowired
	MemberService service;

	@GetMapping("login")
	public String login() {
		return "member.login";
	}

	/*
	 * @PostMapping("login") public String login(String loginId, String pw ) {
	 * 
	 * System.out.println(loginId+pw); return "member.login"; }
	 */

	@RequestMapping("find-id")
	public String findId() {
		return "member.find-id";
	}

	@RequestMapping("find-id-result")
	public String findIdResult(@RequestParam(value = "loginId") String loginId) {
		System.out.println(loginId);
		return "member.find-id-result";
	}

	@RequestMapping("find-pw")
	public String findPw() {
		return "member.find-pw";
	}

	@RequestMapping("reset-pw")
//	public String findPwResult(@RequestParam(value = "loginId") String loginId) {
	public String findPwResult() {
	return "member.reset-pw";
	}

	// 패스워드 재설정
	@PostMapping("update-pw")
	public String update(String loginId, String password) {

		service.updatePw(loginId, password);
		return "redirect:./login";
	}

	// 휴대전화 인증
	@Autowired
	CertificationService certificationService;

	@PostMapping("/sendSMS")
	@ResponseBody
	public String sendSMS(@RequestParam(value = "phone") String phone, @RequestParam(value = "page") String page) {

		return certificationService.certifiedPhoneNumber(phone, page);
	}

	// 이메일인증
	@PostMapping("/sendEmail")
	@ResponseBody
	public String sendEmail(@RequestParam(value = "email") String email, @RequestParam(value = "page") String page) {

		System.out.println("이메일을 보냈습니당");
		return certificationService.certifiedEmailNumber(email, page);
	}

	// 아이디 중복 검사
	@PostMapping("/check-id")
	public void checkId(@RequestParam("id") String id, HttpServletResponse response) throws Exception {
		service.checkId(id, response);
	}
	
	// 휴대폰 변경 검사
	@PostMapping("/get-phone")
	public String getPhone(@RequestParam("loginId") String loginId,@RequestParam("phoen") String phoen, HttpServletResponse response)  throws Exception{
		System.out.println("하하");
		//System.out.println(service.getPhone(id));
		int check=service.checkPhone(loginId, phoen);
		return	Integer.toString(check);
	}

	// 이메일 중복 검사
	@PostMapping("/check-email")
	public void checkEmail(@RequestParam("email") String email, HttpServletResponse response) throws Exception {
		service.checkEmail(email, response);
	}

	// 회원 정보 조회
	@PostMapping("/check-member")
	public void checkMember(@RequestParam("email") String email, @RequestParam("name") String name,
			HttpServletResponse response) throws Exception {

		service.checkMember(email, name, response);
	}

	// 패스워드 회원 확인
	@PostMapping("/check-member/pw")
	public void checkMember(@RequestParam("loginId") String loginId, @RequestParam("name") String name,
			@RequestParam(name = "phone", required = false) String phone,
			@RequestParam(name = "email", required = false) String email, HttpServletResponse response)
			throws Exception {

		System.out.println("phone: " + phone);
		System.out.println("email: " + email);
		
		if(email ==null ||email=="")
			service.checkMemberPhone(loginId,name,phone, response);
		else
			service.checkMemberEmail(loginId,name,email, response);
	}
}