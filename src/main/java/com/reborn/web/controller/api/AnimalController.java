package com.reborn.web.controller.api;

import java.io.BufferedReader;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.ibatis.annotations.Param;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
//import org.json.JSONObject;
//import org.json.XML;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.google.gson.Gson;
import com.reborn.web.entity.animal.AnimalAPIResponseData;
import com.reborn.web.entity.animal.AnimalKind;
import com.reborn.web.entity.animal.AnimalUpKind;
import com.reborn.web.service.animal.AnimalKindService;
import com.reborn.web.service.animal.AnimalService;


@RestController("/apiAnimalController")             // REST ful의 형식?을 따르는 컨트롤러. 데이터 전달이 목적
@RequestMapping("/api/animal/")
public class AnimalController {

	@Autowired
	AnimalService animalService;

	@Autowired
	AnimalKindService kindService;
	
	//@RequestMapping(value = "list", produces = MediaType.APPLICATION_XML_VALUE)
	@RequestMapping(value = "list")
	public String list(
			@RequestParam(name="p", defaultValue="1") int page,
			@RequestParam(name="s", defaultValue = "10") int size,
			@RequestParam(name="upkind", required=false) String upkind,		//축종 코드
			@RequestParam(name="kind", required=false) 	 String kind,		//품종 코드
			@RequestParam(name="bgnde", required=false)	 Date startDate, 	//유기 시작 날짜
			@RequestParam(name="endde", required=false)	 Date endDate, 		//유기 종료 날짜
			@RequestParam(name="neuter", required=false) String neuter) {		//중성화여부
	
		
		AnimalAPIResponseData apiData = animalService.getListFromAPI(page, size, upkind, kind, startDate, endDate, neuter);
		
		StringBuilder result = new StringBuilder(); 
		Gson gson = new Gson();
		
		gson.toJson(apiData);
		
		return gson.toJson(apiData);
	}
	
	
	// select 박스 변경 시 갖고오는데 사용
	@RequestMapping(value = "kind")
	public String kindList(@RequestParam(name="upkind", defaultValue = "417000") String upkind_cd) {
		
		
		AnimalUpKind upKind = kindService.getUpKindByCode(upkind_cd);
		List<AnimalKind> list = kindService.getKindListByUpKindCode(upKind.getCode());
		
		Gson gson = new Gson();
		
		return gson.toJson(list);		
	}
	
	
}