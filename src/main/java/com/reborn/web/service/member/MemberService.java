package com.reborn.web.service.member;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.reborn.web.entity.member.Member;

public interface MemberService {

	int insert(Member member);

	String getpw(String loginId);
	
	public void checkId(String id, HttpServletResponse response) throws Exception;

	public void checkEmail(String email, HttpServletResponse response) throws Exception;
	
	public void checkMember(String email,String name,HttpServletResponse response) throws Exception;

	void checkMemberPhone(String loginId, String name, String phone, HttpServletResponse response) throws IOException;

	int updatePw(String loginId, String password);

	void checkMemberEmail(String loginId, String name, String email, HttpServletResponse response) throws IOException;

	Member get(String loginId);

	int update(Member member);
	
	int pointUp(String loginId,int point);
	
	int nameCountUp(String loginId);

	List<Member> getList();

	int checkPhone(String id,String phone);

}
