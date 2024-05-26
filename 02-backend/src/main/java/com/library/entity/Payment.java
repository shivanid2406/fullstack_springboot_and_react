package com.library.entity;

import javax.persistence.*;

@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "amount")
    private double amount;

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

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Payment(Long id, String userEmail, double amount) {
        this.id = id;
        this.userEmail = userEmail;
        this.amount = amount;
    }

    public Payment() {
        super();
    }

    @Override
    public String toString() {
        return "Payment{" +
                "id=" + id +
                ", userEmail='" + userEmail + '\'' +
                ", amount=" + amount +
                '}';
    }
}
