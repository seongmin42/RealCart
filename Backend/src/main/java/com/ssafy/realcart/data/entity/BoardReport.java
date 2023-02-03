package com.ssafy.realcart.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.ssafy.realcart.config.BaseTime;
import com.ssafy.realcart.data.dto.AdDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Table(name="BOARD_REPORT_TB")
public class BoardReport extends BaseTime{
	
	@Id
    @Column(name="BOARD_REPORT_PK")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 500, nullable = false, name="title")
    private String title;
    @Column(columnDefinition = "integer default 0", name="hit")
    private int hit;
    @Column(columnDefinition = "TEXT", nullable = false, name="content")
    private String content;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn (name="USER_FK")
    @ToString.Exclude
    private User user;

}
