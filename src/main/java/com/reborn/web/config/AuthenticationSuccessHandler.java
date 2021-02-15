package com.reborn.web.config;

import java.io.IOException;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;

import com.reborn.web.entity.member.Member;
import com.reborn.web.service.member.MemberService;

@Component
public class AuthenticationSuccessHandler
		extends SavedRequestAwareAuthenticationSuccessHandler /* implements AuthenticationSuccessHandler */ {

	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

	@Autowired
	MemberService service;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {

		HttpSession session = request.getSession();

		System.out.println("success..");

		if (session != null) {

			User authUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

			String uid = authUser.getUsername();
			Member m=service.get(uid);

			// 세션에 필요한 정보를 담기
			session.setAttribute("loginId", uid);
			session.setAttribute("id", m.getId());
			
			System.out.println("handler....");

			Set<String> authorities = AuthorityUtils.authorityListToSet(authentication.getAuthorities());

			// 다시 돌아갈 url을 받아옴 
			SavedRequest savedRequest = (SavedRequest)session.getAttribute("SPRING_SECURITY_SAVED_REQUEST");
			
			if (savedRequest != null) {
				String returnURL = savedRequest.getRedirectUrl();
				redirectStrategy.sendRedirect(request, response, returnURL);
			} else if (authorities.contains("ROLE_ADMIN")) {
				redirectStrategy.sendRedirect(request, response, "/admin/chat/link");
			} else if (authorities.contains("ROLE_MEMBER")) {
				redirectStrategy.sendRedirect(request, response, "/main");
			} else { // throw
				new IllegalStateException();
				super.onAuthenticationSuccess(request, response, authentication);
			}

		}

	}
}