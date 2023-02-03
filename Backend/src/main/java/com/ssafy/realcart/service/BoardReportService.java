package com.ssafy.realcart.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.realcart.data.dao.inter.IBoardReportDAO;
import com.ssafy.realcart.data.dao.inter.IUserDAO;
import com.ssafy.realcart.data.dto.BoardReportDto;
import com.ssafy.realcart.data.dto.BoardReportRequestDto;
import com.ssafy.realcart.data.entity.BoardReport;
import com.ssafy.realcart.service.inter.IBoardReportService;
@Service
public class BoardReportService implements IBoardReportService {

	IBoardReportDAO boardReportDAO;
	IUserDAO userDAO;
	private final Logger LOGGER = LoggerFactory.getLogger(BoardReportService.class);
	@Autowired
	public BoardReportService(IBoardReportDAO boardReportDAO, IUserDAO userDAO) {
		this.boardReportDAO = boardReportDAO;
		this.userDAO = userDAO;
	}
	
	@Override
	@Transactional
	public boolean createReport(BoardReportRequestDto boardDto) {
		BoardReport boardReport = new BoardReport();
		boardReport.setContent(boardDto.getContent());
		boardReport.setTitle(boardDto.getTitle());
		boardReport.setUser(userDAO.checkNickname(boardDto.getNickname()));
		boardReport.setCategory(boardDto.getCategory());
		return boardReportDAO.saveReport(boardReport);
	}

	@Override
	@Transactional(readOnly = true)
	public List<BoardReportDto> getBoardReportAll() {
		List<BoardReport> boardReports = boardReportDAO.getBoardReportAll();
		List<BoardReportDto> boardReportDtos = new ArrayList<BoardReportDto>();
		for (BoardReport boardReport : boardReports) {
			BoardReportDto boardReportDto = new BoardReportDto();
			boardReportDto.setCreatedTime(boardReport.getCreatedDate());
			boardReportDto.setHit(boardReport.getHit());
			boardReportDto.setId(boardReport.getId());
			boardReportDto.setModifiedTime(boardReport.getModifiedDate());
			boardReportDto.setNickname(boardReport.getUser().getNickname());
			boardReportDto.setTitle(boardReport.getTitle());
			boardReportDto.setCategory(boardReport.getCategory());
			boardReportDto.setIsEnd(boardReport.getIsEnd());
			boardReportDto.setIsPrivate(boardReport.getIsPrivate());
			boardReportDtos.add(boardReportDto);
		}
		return boardReportDtos;
	}

	@Override
	@Transactional(readOnly = true)
	public BoardReportDto getBoardReport(int id) {
		BoardReport boardReport = boardReportDAO.getBoardReport(id);
		if(boardReport == null) return null;
		BoardReportDto boardReportDto = new BoardReportDto();
		boardReportDto.setContent(boardReport.getContent());
		boardReportDto.setCreatedTime(boardReport.getCreatedDate());
		boardReportDto.setHit(boardReport.getHit());
		boardReportDto.setId(boardReport.getId());
		boardReportDto.setModifiedTime(boardReport.getModifiedDate());
		boardReportDto.setNickname(boardReport.getUser().getNickname());
		boardReportDto.setTitle(boardReport.getTitle());
		boardReportDto.setCategory(boardReport.getCategory());
		boardReportDto.setIsEnd(boardReport.getIsEnd());
		boardReportDto.setIsPrivate(boardReport.getIsPrivate());
		return boardReportDto;
	}

	@Override
	@Transactional
	public boolean changeReport(int id, BoardReportRequestDto boardDto) {
		BoardReport boardReport = boardReportDAO.getBoardReport(id);
		if(boardReport != null) {
			boardReport.setContent(boardDto.getContent());
			boardReport.setTitle(boardDto.getTitle());
			boardReport.setCategory(boardDto.getCategory());
			boardReportDAO.saveReport(boardReport);
			return true;
		}
		return false;
	}

	@Override
	@Transactional
	public boolean deleteReport(int id) {
		return boardReportDAO.deleteReport(id);
	}

}
