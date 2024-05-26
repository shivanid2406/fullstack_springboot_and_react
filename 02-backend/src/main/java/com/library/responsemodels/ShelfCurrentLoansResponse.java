package com.library.responsemodels;

import com.library.entity.Book;

public class ShelfCurrentLoansResponse {

    private int daysLeft;
    private Book book;

    public int getDaysLeft() {
        return daysLeft;
    }

    public void setDaysLeft(int daysLeft) {
        this.daysLeft = daysLeft;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public ShelfCurrentLoansResponse(Book book,int daysLeft) {
        this.daysLeft = daysLeft;
        this.book = book;
    }

    @Override
    public String toString() {
        return "ShelfCurrentLoansResponse{" +
                "daysLeft=" + daysLeft +
                ", book=" + book +
                '}';
    }
}
