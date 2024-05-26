package com.library.requestmodels;

import java.util.Optional;

//@Data
public class ReviewRequest {

    private double rating;

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public Optional<String> getReviewDescription() {
        return reviewDescription;
    }

    public void setReviewDescription(Optional<String> reviewDescription) {
        this.reviewDescription = reviewDescription;
    }

    private Long bookId;
    private Optional<String> reviewDescription;

    public ReviewRequest(double rating, Long bookId, Optional<String> reviewDescription) {
        this.rating = rating;
        this.bookId = bookId;
        this.reviewDescription = reviewDescription;
    }

    @Override
    public String toString() {
        return "ReviewRequest{" +
                "rating=" + rating +
                ", bookId=" + bookId +
                ", reviewDescription=" + reviewDescription +
                '}';
    }

    public ReviewRequest() {
        super();
    }
}
