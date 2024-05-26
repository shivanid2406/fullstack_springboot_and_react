import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { StarReviews } from "../utils/StarReviews";
import { CheckoutReviewBook } from "./CheckoutReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReview";
import { useOktaAuth } from "@okta/okta-react";
import { error } from "console";
import ReviewRequestModel from "../../models/ReviewRequestModel";

export const BookCheckoutPage = () => {
  const { authState } = useOktaAuth();
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  //Review State

  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const [isReviewLeft, setIsReviewLeft] = useState(false);
  const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

  //Loans Count State
  const [currentLoansCount, setCurrentLoansCount] = useState(0);
  const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] =
    useState(true);

  //Is Book Checked out?
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState(true);

  //Payment
  const [displayError, setDisplayError] = useState(false);

  const bookId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBook = async () => {
      const baseURL: string = `${process.env.REACT_APP_API}/books/${bookId}`;
      const response = await fetch(baseURL);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await response.json();
      const loadedBook: BookModel = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };
      setBook(loadedBook);
      setIsLoading(false);
    };
    fetchBook().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [isCheckedOut]);

  useEffect(() => {
    const fetchBookReviews = async () => {
      const reviewUrl: string = `${process.env.REACT_APP_API}/reviews/search/findByBookId?bookId=${bookId}`;
      const responseReviews = await fetch(reviewUrl);
      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJsonReviews = await responseReviews.json();
      const resposeData = responseJsonReviews._embedded.reviews;
      const loadedReviews: ReviewModel[] = [];
      let weightedStarReviews: number = 0;
      for (const key in resposeData) {
        loadedReviews.push({
          id: resposeData[key].id,
          userEmail: resposeData[key].userEmail,
          date: resposeData[key].date,
          rating: resposeData[key].rating,
          book_id: resposeData[key].book_Id,
          reviewDescription: resposeData[key].reviewDescription,
        });
        weightedStarReviews += resposeData[key].rating;
      }
      if (loadedReviews) {
        const round = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(Number(round));
      }
      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };
    fetchBookReviews().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });
  }, [isReviewLeft]);

  useEffect(() => {
    const fetchUserReviewBooks = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${process.env.REACT_APP_API}/reviews/secure/user/book/?bookId=${bookId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const userReview = await fetch(url, requestOptions);
        if (!userReview.ok) {
          throw new Error("Something went wrong!");
        }
        const userReviewResponseJson = await userReview.json();
        setIsReviewLeft(userReviewResponseJson);
      }
      setIsLoadingUserReview(false);
    };
    fetchUserReviewBooks().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });
  }, [authState]);
  useEffect(() => {
    const fetcUserCurrenLoansCount = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${process.env.REACT_APP_API}/books/secure/currentLoans/count`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const currentLoansCountResponse = await fetch(url, requestOptions);
        if (!currentLoansCountResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const currentLoansCountResponseJson =
          await currentLoansCountResponse.json();
        setCurrentLoansCount(currentLoansCountResponseJson);
      }
      setIsLoadingCurrentLoansCount(false);
    };
    fetcUserCurrenLoansCount().catch((error: any) => {
      setIsLoadingCurrentLoansCount(false);
      setHttpError(error.message);
    });
  }, [authState, isCheckedOut]);

  useEffect(() => {
    const fetchUserCheckedOutBook = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${process.env.REACT_APP_API}/books/secure/ischeckedout/byuser/?bookId=${bookId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const bookCheckedOut = await fetch(url, requestOptions);
        if (!bookCheckedOut.ok) {
          throw new Error("Something went wrong!");
        }

        const bookCheckedOutResponseJson = await bookCheckedOut.json();
        setIsCheckedOut(bookCheckedOutResponseJson);
      }
      setIsLoadingBookCheckedOut(false);
    };
    fetchUserCheckedOutBook().catch((error: any) => {
      setIsLoadingBookCheckedOut(false);
      setHttpError(error.message);
    });
  }, [authState]);
  if (
    isLoading ||
    isLoadingReview ||
    isLoadingCurrentLoansCount ||
    isLoadingBookCheckedOut ||
    isLoadingUserReview
  ) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function checkoutBook() {
    const url = `${process.env.REACT_APP_API}/books/secure/checkout/?bookId=${book?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const checkoutResponse = await fetch(url, requestOptions);
    if (!checkoutResponse.ok) {
      setDisplayError(true);
      throw new Error("Something went wrong!");
    }
    setDisplayError(false);
    setIsCheckedOut(true);
  }

  async function submitReview(starInput: number, reviewDescription: string) {
    let bookId: number = 0;
    if (book?.id) {
      bookId = book.id;
    }

    const reviewRequestModel = new ReviewRequestModel(
      starInput,
      bookId,
      reviewDescription
    );
    const url = `${process.env.REACT_APP_API}/reviews/secure`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewRequestModel),
    };
    const returnResponse = await fetch(url, requestOptions);
    if (!returnResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setIsReviewLeft(true);
  }
  return (
    <div>
      <div className="container d-none d-lg-block">
        {displayError && (
          <div className="alert alert-danger mt-3" role="alert">
            Please pay outstanding fees and/or return late book(s).
          </div>
        )}
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book.img} width="226" height="349" alt="Book"></img>
            ) : (
              <img
                src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
                width="226"
                height="349"
                alt="Book"
              />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              <StarReviews rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutReviewBook
            submitReview={submitReview}
            isReviewLefft={isReviewLeft}
            checkoutBook={checkoutBook}
            isCheckedOut={isCheckedOut}
            isAuthenticated={authState?.isAuthenticated}
            currentLoansCount={currentLoansCount}
            book={book}
            mobile={false}
          />
        </div>
        <hr></hr>
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
      {/* Mobile view */}
      <div className="container d-lg-none mt-5">
        {displayError && (
          <div className="alert alert-danger mt-3" role="alert">
            Please pay outstanding fees and/or return late book(s).
          </div>
        )}
        <div className="d-flex justify-content-center align-items-center">
          {book?.img ? (
            <img src={book.img} width="226" height="349" alt="Book"></img>
          ) : (
            <img
              src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
              width="226"
              height="349"
              alt="Book"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarReviews rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutReviewBook
          submitReview={submitReview}
          isReviewLefft={isReviewLeft}
          checkoutBook={checkoutBook}
          isCheckedOut={isCheckedOut}
          isAuthenticated={authState?.isAuthenticated}
          currentLoansCount={currentLoansCount}
          book={book}
          mobile={true}
        />
        <hr></hr>
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
};
