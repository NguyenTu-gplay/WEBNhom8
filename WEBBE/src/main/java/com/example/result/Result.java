package com.example.result;

import com.example.Exam.Exam;
import com.example.subject.Subject;
import com.example.user.User;
import jakarta.persistence.*;

@Entity
public class Result {
 
	   @Id
	   @GeneratedValue(strategy = GenerationType.IDENTITY)
	   private int id;
	   
	   @Column(name="result_status")
	   private String status;
	   
	   @Column(name="result_score")
	   private String score;
	   
	   @Column(name="exam_date")
	   private String edate;
	   
	   @Column(name="total_marks")
	   private String totalMarks;
	   
	   @Column(name="total_question")
	   private String totalQuestion;

	   @Column(name = "total_time")
	   private int total_time;
	   @ManyToOne
	   @JoinColumn(name= "exam_name")
	   private Subject sname;
	   
	   @ManyToOne
	   @JoinColumn(name= "user_email")
	   private User email;
	   
	   @ManyToOne
	   @JoinColumn(name= "exam_id")
	   private Exam examId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getScore() {
		return score;
	}

	public void setScore(String score) {
		this.score = score;
	}

	public String getEdate() {
		return edate;
	}

	public void setEdate(String edate) {
		this.edate = edate;
	}

	public String getTotalMarks() {
		return totalMarks;
	}

	public void setTotalMarks(String totalMarks) {
		this.totalMarks = totalMarks;
	}

	public String getTotalQuestion() {
		return totalQuestion;
	}
	public int getTotalTime() {
		return total_time;
	}

	public void setTotalQuestion(String totalQuestion) {
		this.totalQuestion = totalQuestion;
	}

	public Subject getSname() {
		return sname;
	}

	public void setSname(Subject sname) {
		this.sname = sname;
	}

	public User getEmail() {
		return email;
	}

	public void setEmail(User email) {
		this.email = email;
	}

	public Exam getExamId() {
		return examId;
	}

	public void setExamId(Exam examId) {
		this.examId = examId;
	}
	public void setTotalTime(int time) {
		this.total_time = time;
	}

	   
	   
	   
	   
	   
	   
}
