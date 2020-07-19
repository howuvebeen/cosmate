import axios from "axios";
import { SubmissionError } from "redux-form";
import history from "../utils/historyUtils";
import { actions as notifActions } from "redux-notifications";
import { AuthTypes } from "../constants/actionTypes";
import { AuthUrls } from "../constants/urls";

import store from "../store";
import { getToken, getUser } from "../utils/authUtils";
const { notifSend } = notifActions;

// dispatched by loginUser
// return token 
export function authLogin(token) {
  return {
    type: AuthTypes.LOGIN,
    payload: token,
  };
}

// post the login form
export function loginUser(formValues, dispatch) {
  const loginUrl = AuthUrls.LOGIN;

  return axios
    .post(loginUrl, formValues)
    .then((response) => {
      const token = response.data.token;
      // dispatch the token to authLogin()
      dispatch(authLogin(token));
      localStorage.setItem("token", token);

      dispatch(getUserInfo(token));

      // redirect to the home page
      history.push("/");
    })
    .catch((error) => {
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

// dispatched by getUser
// return user information 
export function authUser(payload) {
  return {
    type: AuthTypes.TOKEN,
    payload: payload
  };
}

// get user information
export function getUserInfo(token) {
  const tokenUrl = AuthUrls.TOKEN+token+"/";

  return function (dispatch) {
    axios
      .get(tokenUrl)
      .then((response) => {
        const userpk = response.data.user_pk;
        localStorage.setItem("userpk", userpk);

        const username = response.data.username;
        localStorage.setItem("username", username);

        const influencer = response.data.influencer;
        localStorage.setItem("influencer", influencer);

        const lastlogin = response.data.last_login;
        localStorage.setItem("lastlogin", lastlogin);

        // dispatch the data to getUser()
        dispatch(authUser(response.data));
      })
  };
}

// remove token from local storage
export function logoutUser() {
  localStorage.removeItem("token");

  // redirect to the login page
  history.push("/login");

  return {
    type: AuthTypes.LOGOUT
  };
}

// post signup form
export function signupUser(formValues) {
  const signupUrl = AuthUrls.SIGNUP;

  return axios
    .post(signupUrl, formValues)
    .then((response) => {
      // redirect to signup done page.
      history.push("/signup/done");
    })
    .catch((error) => {
      console.log(error);
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

//  post activation user information
export function activateAccount(formValues, props) {
  const params = new URLSearchParams(props.location.search);
  const activateUserUrl = AuthUrls.USER_ACTIVATION;

  // assign user_id, timestamp, signature to the formValues
  const data = Object.assign(formValues, {
    user_id: params.get("user_id"),
    timestamp: params.get("timestamp"),
    signature: params.get("signature"),
  });

  return axios
    .post(activateUserUrl, data)
    .then((response) => {
      // redirect to login page
      history.push("/login");
    })
    .catch((error) => {
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

// post reset password form
export function resetPassword(formValues) {
  const resetPasswordUrl = AuthUrls.RESET_PASSWORD;

  return axios
    .post(resetPasswordUrl, formValues)
    .then((response) => {
      // redirect to reset done page
      history.push("/password/reset/done");
    })
    .catch((error) => {
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

// post reset password form
export function confirmPassword(formValues, props) {
  const params = new URLSearchParams(props.location.search);
  const resetPasswordConfirmUrl = AuthUrls.CONFIRM_PASSWORD;

  // assign user_id, timestamp, signature to the formValues
  const data = Object.assign(formValues, {
    user_id: params.get("user_id"),
    timestamp: params.get("timestamp"),
    signature: params.get("signature"),
  });

  return axios
    .post(resetPasswordConfirmUrl, data)
    .then((response) => {
      // redirect to login page
      history.push("/login");
    })
    .catch((error) => {
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

// post reset id form 
export function resetId(formValues) {
  const resetIdUrl = AuthUrls.RESET_ID;

  return axios
    .post(resetIdUrl, formValues)
    .then((response) => {
      // redirect to reset done page
      history.push("/id/reset/done");
    })
    .catch((error) => {
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}







// dispatched from getUserProfile
function setUserProfile(payload) {
  return {
    type: AuthTypes.USER_PROFILE,
    payload: payload
  };
}

// get the profile information
export function getUserProfile() {
  const userpk = getUser(store.getState()).user_pk;
  const profileUrl = AuthUrls.USER_PROFILE+userpk+"/";

  if (userpk != null){
    return function (dispatch) {
      axios
        .get(profileUrl)
        .then((response) => {
          dispatch(setUserProfile(response.data));
        })
        .catch((error) => {
          const processedError = processServerError(error.response.data);
          throw new SubmissionError(processedError);
        });
    };
  }
}

// patch the edited user & profile information
export function editUserProfile(formValues) {
  const userpk = getUser(store.getState()).user_pk;
  const profileUrl = AuthUrls.USER_PROFILE+userpk+"/";
  const userUrl = AuthUrls.USER_USER+userpk+"/";

  // assign skintype to the formValues
  const data = Object.assign(formValues, {
    skintype: type(formValues)
  });
  
  const requestOne = axios.patch(profileUrl, data);
  const requestTwo = axios.patch(userUrl, data);

  return axios
    .all([requestOne, requestTwo])
    .then((response) => {
      history.push("/profile");
    })
    .catch((error) => {
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

// patch the edited skin information
export function editSkinProfile(formValues) {
  const profileUrl = AuthUrls.USER_PROFILE+userpk+"/";

  const userpk = getUser(store.getState()).user_pk;
  // assign skintype to the formValues
  const data = Object.assign(formValues, {
    skintype: type(formValues)
  });
  
  return axios
    .patch(profileUrl, data)
    .then((response) => {
      history.push("/profile");
    })
    .catch((error) => {
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

// post signup influencer form 
export function signupInfluencer(formValues) {
  const userpk = getUser(store.getState()).user_pk;
  const userprofileUrl = AuthUrls.USER_PROFILE+userpk+"/";

  return axios
    .post(userprofileUrl, formValues)
    .catch((error) => {
      console.log(error);
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

export function userProfileComplete(formValues) {
  const userpk = getUser(store.getState()).user_pk;
  const profileUrl = AuthUrls.USER_PROFILE+userpk+"/";

  return axios
    .put(profileUrl, formValues)
    .then((response) => {
      // redirect to the home page
      history.push("/");
    })
    .catch((error) => {
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}







// dispatched from getproductList
// return list of posts
function setProductList(payload) {
  return {
    type: AuthTypes.PRODUCT_LIST,
    payload: payload
  };
}

// get list of posts
export function getProductList() {
  const productListUrl = AuthUrls.PRODUCT_LIST;
  return function (dispatch) {
    axios
      .get(productListUrl)
      .then((response) => {
        dispatch(setProductList(response.data));
      })
      .catch((error) => {
        // const processedError = processServerError(error.response.data);
        // throw new SubmissionError(processedError);
      });
  };
}

// dispatched from getProduct
// return specific product
function setProduct(payload) {
  return {
    type: AuthTypes.PRODUCT,
    payload: payload,
  };
}

// get a specific product
export function getProduct(props) {
  const { product } = props.match.params;
  const productUrl = AuthUrls.PRODUCT+product+"/";

  return function (dispatch) {
    axios
      .get(productUrl)
      .then((response) => {
        dispatch(setProduct(response.data));
      })
      .catch((error) => {
        const processedError = processServerError(error.response.data);
        throw new SubmissionError(processedError);
      });
  };
}

// dispatched from getReviewList
// return list of reviews
function setReviewList(payload) {
  return {
    type: AuthTypes.REVIEW_LIST,
    payload: payload,
  };
}

// get list of reviews
export function getReviewList(props) {
  const { product } = props.match.params;
  const reviewListUrl = AuthUrls.REVIEW_LIST + product;

  return function (dispatch) {
    axios
      .get(reviewListUrl)
      .then((response) => {
        dispatch(setReviewList(response.data));
      })
      .catch((error) => {
        const processedError = processServerError(error.response.data);
        throw new SubmissionError(processedError);
      });
  };
}

// post a new review
export function uploadReview(formValues, dispatch, props) {
  const { category } = "Moisturizers";
  const { product } = props.UR.match.params;
  const uploadReviewUrl = AuthUrls.REVIEW;

  const userpk = getUser(store.getState()).user_pk;
  const influencer = getUser(store.getState()).influencer;
  // assign star, product, author, influencer to the formValues
  const data = Object.assign(formValues, {
    star: formValues.star.value,
    product: product,
    author: userpk,
    influencer: influencer
  });

  return axios
    .post(uploadReviewUrl, data)
    .then((response) => {
      // redirect to specific product page
      history.push("/skincare/"+category+"/"+product);
    })
    .catch((error) => {
      // If request is bad...
      // Show an error to the user
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

// get a review primary key
// patch edited review
export function editReview(formValues, dispatch, props) {
  const { category } = "1";
  const { product } = props.match.params;
  const userpk = localStorage.getItem("userpk");
  const deleteReviewUrl = AuthUrls.REVIEW+"?author="+userpk+"&product="+product+"&author__influencer="+influencer;

  const influencer = localStorage.getItem("influencer");
  const stars = formValues.star.value;
  // assign influencer, star to the formValues
  const data = Object.assign(formValues, {
    influencer: influencer,
    star: stars
  });

  return axios
    .get(deleteReviewUrl)
    .then((response) => {
      const reviewpk = response.data[0].pk;
      axios.patch(AuthUrls.REVIEW+reviewpk+"/", data);

      // redirect to specific product page
      history.push("/skincare/"+category+"/"+product);
    })
}

// get a review primary key
// delete a review
export function deleteReview(formValues, dispatch, props) {
  const { category } = "1";
  const { product } = props.match.params;
  const deleteReviewUrl = AuthUrls.REVIEW+"?author="+userpk+"&product="+product+"&author__influencer="+influencer;

  const userpk = localStorage.getItem("userpk");
  const influencer = localStorage.getItem("influencer");
  // assign product, author, influencer to the formValues
  const data = Object.assign(formValues, {
    product: product,
    author: userpk,
    influencer: influencer
  });

  return axios
    .get(deleteReviewUrl)
    .then((response) => {
      const reviewpk = response.data[0].pk;
      axios.delete(AuthUrls.REVIEW+reviewpk+"/", data);
      
      // redirect to specific product page
      history.push("/skincare/"+category+"/"+product);
    })
}

// 
export function sorting(formValues, dispatch) {
  const skintype = type(formValues);
  const price_min = formValues.price_min;
  const price_max = formValues.price_max;

  const ordering = (formValues.sortby != null) ? formValues.sortby.value : null;
  const sortingUrl = url(skintype, ordering, price_min, price_max);

  return axios
    .get(sortingUrl)
    .then((response) => {
      dispatch(setProductList(response.data));
    })
    .catch((error) => {
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

export function sortingReview(formValues, dispatch) {
  const skintype = type(formValues);
  const ordering = (formValues.sortby != null) ? formValues.sortby.value : null;

  const sortingUrl = url(skintype, ordering);

  return axios
    .get(sortingUrl)
    .then((response) => {
      // redirect to reset done page
      dispatch(setProductList(response.data));
    })
    .catch((error) => {
      // If request is bad...
      // Show an error to the user
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

function setInterestedProduct(payload) {
  return {
    type: AuthTypes.INTEREST,
    payload: payload
  };
}

export function getInterestedProduct() {
  const userpk = localStorage.getItem("userpk");
  const interestproductUrl = AuthUrls.INTEREST+userpk;

  return function (dispatch) {
    axios
      .get(interestproductUrl)
      .then((response) => {
        dispatch(setInterestedProduct(response.data));
      })
      .catch((error) => {
        // If request is bad...
        // Show an error to the user
        // TODO: send notification and redirect
      });
  };
}

function setReviewHistory(payload) {
  return {
    type: AuthTypes.REVIEW_HISTORY,
    payload: payload
  };
}

export function getReviewHistory() {
  const userpk = localStorage.getItem("userpk");
  const reviewHistoryUrl = AuthUrls.REVIEW+"?author="+userpk+"&product=&author__influencer=&age_range=";
    
  return function (dispatch) {
    axios
      .get(reviewHistoryUrl)
      .then((response) => {
        dispatch(setReviewHistory(response.data));
      })
      .catch((error) => {
        // If request is bad...
        // Show an error to the user
        // TODO: send notification and redirect
      });
  };
}

function setLikedReviews(payload) {
  return {
    type: AuthTypes.LIKED_REVIEWS,
    payload: payload
  };
}

export function getLikedReviews() {
  const userpk = localStorage.getItem("userpk");
  const likedReviewsUrl = AuthUrls.LIKE+"?author="+userpk;

  return function (dispatch) {
    axios
      .get(likedReviewsUrl)
      .then((response) => {
        dispatch(setLikedReviews(response.data));
      })
      .catch((error) => {
        // If request is bad...
        // Show an error to the user
        // TODO: send notification and redirect
      });
  };
}

export function deleteInterestedProduct(formValues, dispatch, props) {
  const pk = props.pk;

  const deleteInterestedProductUrl = AuthUrls.DELETE_IP+pk;
  return axios.delete(deleteInterestedProductUrl)
}

export function addInterestedProduct(formValues, dispatch, props) {
  const userpk = localStorage.getItem("userpk");
  const { product } = props.UR.match.params;

  const data = Object.assign(formValues, {
    product: product,
    author: userpk
  });

  const deleteInterestedProductUrl = AuthUrls.DELETE_IP;

  return axios
    .post(deleteInterestedProductUrl, data)
}

function setLike(payload) {
  return {
    type: AuthTypes.LIKE,
    payload: payload
  };
}

export function getLike() {
  const userpk = localStorage.getItem("userpk");
  const likeReviewUrl = AuthUrls.LIKE+"?author="+userpk;

  return function (dispatch) {
    axios
      .get(likeReviewUrl)
      .then((response) => {
        dispatch(setLike(response.data));
      })
      .catch((error) => {
        // If request is bad...
        // Show an error to the user
        // TODO: send notification and redirect
      });
  };
}

export function unlikeReview(formValues, dispatch, props) {
  const reviewpk = props.pk;

  const likeReviewUrl = AuthUrls.LIKE+reviewpk+"/";
  return axios.delete(likeReviewUrl)
}

export function likeReview(formValues, dispatch, props) {
  const reviewpk = props.pk;
  const userpk = localStorage.getItem("userpk");

  const data = Object.assign(formValues, {
    review: reviewpk,
    author: userpk
  });
  const likeReviewUrl = AuthUrls.LIKE;

  return axios
    .post(likeReviewUrl, data)
}

function setSearch(payload) {
  return {
    type: AuthTypes.SEARCH,
    payload: payload
  };
}

export function getSearch(props) {
  const { product } = props.match.params;
  const searchUrl = AuthUrls.SEARCH+product;

  return function (dispatch) {
    axios
      .get(searchUrl)
      .then((response) => {
        dispatch(setSearch(response.data));
      })
      .catch((error) => {
      });
  };
}

function setEvents(payload) {
  return {
    type: AuthTypes.EVENT,
    payload: payload
  };
}

export function getEvents() {
  const eventUrl = AuthUrls.EVENT;

  return function (dispatch) {
    axios
      .get(eventUrl)
      .then((response) => {
        dispatch(setEvents(response.data));
      })
      .catch((error) => {
        // If request is bad...
        // Show an error to the user
        // TODO: send notification and redirect
      });
  };
}


function setInstagram(payload) {
  return {
    type: AuthTypes.INSTAGRAM,
    payload: payload
  };
}

export function getInstagram() {
  const instagramUrl = AuthUrls.INSTAGRAM;

  return function (dispatch) {
    axios
      .get(instagramUrl)
      .then((response) => {
        dispatch(setInstagram(response.data));
      })
      .catch((error) => {
        // If request is bad...
        // Show an error to the user
        // TODO: send notification and redirect
      });
  };
}

export function search(formValues, dispatch, props) {
  const product = (props.match != null) ? props.match.params : "";
  const result = (formValues.result != null) ? (formValues.result).replace(/\s/g,"+") : "";
  const searchUrl = AuthUrls.SEARCH+result;

  return axios
    .get(searchUrl)
    .then((response) => {
      dispatch(setSearch(response.data));
      if (product != ""){
        history.push("search/"+result);
      } else {
        history.replace(result);
      }
    })
    .catch((error) => {
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

function type(skintype){
  if (skintype.oily == true){
    return 2;
  } else if (skintype.dry == true){
    return 1;
  } else if (skintype.neutral == true){
    return 4;
  } else if (skintype.combinational == true){
    return 3;
  } else {
    return null;
  }
}

function url(skintype, ordering, price_min, price_max){
  let result = AuthUrls.PRODUCT+"?";
  let i;

  if (skintype != null){
    result += "&skintype="+skintype;
  } 
  if (ordering != null){
    result += "&ordering="+ordering;
  } 
  if (price_min != null){
    result += "&min_price="+price_min;
  } 
  if (price_max != null){
    result += "&max_price="+price_max;
  } 
  
  return result;
}

// util functions
function processServerError(error) {
  return Object.keys(error).reduce(
    function (newDict, key) {
      if (key === "non_field_errors") {
        newDict["_error"].push(error[key]);
      } else if (key === "token") {
        // token sent with request is invalid
        newDict["_error"].push("The link is not valid any more.");
      } else {
        newDict[key] = error[key];
      }

      return newDict;
    },
    { _error: [] }
  );
}
