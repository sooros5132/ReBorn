package com.reborn.web.service.member;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.reborn.web.dao.member.MemberDao;
import com.reborn.web.entity.member.Member;

@Service
public class MemberServiceImp implements MemberService{

	@Autowired
	MemberDao memberDao;
	
	//패스워드 암호화 
	 private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	public MemberServiceImp() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public int insert(Member member) {
		//패스워드 암호화 
		String encodePassword = passwordEncoder.encode(member.getPw());
		member.setPw(encodePassword); 
		
		
		return memberDao.insert(member);
	}

	@Override
	public String getpw(String loginId) {

		Member m= memberDao.get(loginId);
		String pw = m.getPw();
		
		return pw;
	}

	@Override
	public void checkId(String loginId, HttpServletResponse response) throws Exception {
		PrintWriter out = response.getWriter();
		out.println(memberDao.checkId(loginId));
		out.close();
	}

	@Override
	public void checkEmail(String email, HttpServletResponse response) throws Exception {
		PrintWriter out = response.getWriter();
		out.println(memberDao.checkEmail(email));
		out.close();
	}

	//이메일, 이름으로 회원확인하고 로그인 아이디 리턴
	@Override
	public void checkMember(String email,String name, HttpServletResponse response) throws Exception {
		PrintWriter out = response.getWriter();

		Member m = memberDao.getMember(email,name);
		JSONObject memberInfo = new JSONObject();
		if(m!=null) {
		memberInfo.put("loginId",m.getLoginId());
		}
		else {
			memberInfo.put("loginId",null);
		}
		out.println(memberInfo);
		out.close();
	}

	@Override
	public int updatePw(String loginId, String password) {
		
		Member m= memberDao.get(loginId);
		String encodePassword = passwordEncoder.encode(password);
		m.setPw(encodePassword); 
		
		System.out.println("생년월일"+m.getBirthDay());
		
		return memberDao.update(m);
		
	}
	
	//아이디, 이름 ,휴대폰 확인
	@Override
	public void checkMemberPhone(String loginId, String name, String phone, HttpServletResponse response) throws IOException {
		PrintWriter out = response.getWriter();
		out.println(memberDao.checkMemberPhone(loginId,name,phone));
		out.close();
	}

	//아이디, 이름 , 이메일 확인
	@Override
	public void checkMemberEmail(String loginId, String name, String email, HttpServletResponse response)
			throws IOException {
		PrintWriter out = response.getWriter();
		out.println(memberDao.checkMemberEmail(loginId,name,email));
		out.close();
		
	}

	@Override
	public Member get(String loginId) {
		
		return memberDao.get(loginId);
	}

	@Override
	public int update(Member m) {
		
		return memberDao.update(m);
	}

	// 회원 포인트 
	@Override
	public int pointUp(String loginId, int point) {
		
		Member m = get(loginId);
		int p = m.getPoint();
		m.setPoint(p+point);
		
		return memberDao.update(m);
	}

	//작명횟수 증가
	@Override
	public int nameCountUp(String loginId) {
		
		Member m = get(loginId);
		m.setNameCount(m.getNameCount()+1);
		
		return memberDao.update(m);
	}

	@Override
	public List<Member> getList() {
		// TODO Auto-generated method stub
		return memberDao.getList();
	}

	@Override
	public int checkPhone(String loginId,String phone) {
		
		Member m = memberDao.get(loginId);

		if(phone.equals(m.getPhone())) 
			return 1;
		else
			return 0;
			
	}
}
