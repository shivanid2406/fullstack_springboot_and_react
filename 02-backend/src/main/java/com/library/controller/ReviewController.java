package com.library.controller;

import com.library.requestmodels.ReviewRequest;
import com.library.service.ReviewService;
import com.library.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService){
        this.reviewService=reviewService;
    }

    @PostMapping("/secure")
    public void postReview(@RequestHeader(value = "Authorization") String token,
                           @RequestBody ReviewRequest reviewRequest) throws Exception{

        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        if(userEmail == null){
            throw new Exception("User email is missing");
        }
        reviewService.postReview(userEmail,reviewRequest);
    }

    @GetMapping("/secure/user/book")
    public Boolean reviewBookByUser(@RequestHeader(value = "Authorization") String token,
                                    @RequestParam Long bookId) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        if(userEmail == null){
            throw new Exception("User email is missing");
        }
        return reviewService.userReviewListed(userEmail,bookId);
    }
}
