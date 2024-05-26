package com.library.entity;

import javax.persistence.*;

@Entity
@Table(name = "checkout")
public class Checkout {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "user_email")
	private String userEmail;

	@Column(name = "checkout_date")
	private String checkoutDate;

	@Column(name = "return_date")
	private String returnDate;

	@Column(name = "book_id")
	private Long bookId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getCheckoutDate() {
		return checkoutDate;
	}

	public void setCheckoutDate(String checkoutDate) {
		this.checkoutDate = checkoutDate;
	}

	public String getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(String returnDate) {
		this.returnDate = returnDate;
	}

	public Long getBookId() {
		return bookId;
	}

	public void setBookId(Long bookId) {
		this.bookId = bookId;
	}

	public Checkout() {

	}

	@Override
	public String toString() {
		return "Checkout [id=" + id + ", userEmail=" + userEmail + ", checkoutDate=" + checkoutDate + ", returnDate="
				+ returnDate + ", bookId=" + bookId + "]";
	}

	public Checkout(String userEmail, String checkoutDate, String returnDate, Long bookId) {
		this.userEmail = userEmail;
		this.checkoutDate = checkoutDate;
		this.returnDate = returnDate;
		this.bookId = bookId;
	}
}
