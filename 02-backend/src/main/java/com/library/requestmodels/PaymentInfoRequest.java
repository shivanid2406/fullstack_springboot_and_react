package com.library.requestmodels;

public class PaymentInfoRequest {

    private int amount;
    private String currency;
    private String receiptEmail;

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getReceiptEmail() {
        return receiptEmail;
    }

    public void setReceiptEmail(String receiptEmail) {
        this.receiptEmail = receiptEmail;
    }

    public PaymentInfoRequest(int amount, String currency, String receiptEmail) {
        this.amount = amount;
        this.currency = currency;
        this.receiptEmail = receiptEmail;
    }

    public PaymentInfoRequest() {
        super();
    }

    @Override
    public String toString() {
        return "PaymentInfoRequest{" +
                "amount=" + amount +
                ", currency='" + currency + '\'' +
                ", receiptEmail='" + receiptEmail + '\'' +
                '}';
    }
}
