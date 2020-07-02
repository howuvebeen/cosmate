import axios from "axios";
import { SubmissionError } from "redux-form";
import history from "../utils/historyUtils";
import { actions as notifActions } from "redux-notifications";
import { AuthTypes } from "../constants/actionTypes";
import { AuthUrls } from "../constants/urls";
import store from "../store";
import { getUserToken } from "../utils/authUtils";
const { notifSend } = notifActions;

export function authLogin(token) {
  return {
    type: AuthTypes.LOGIN,
    payload: token,
  };
}

export function loginUser(formValues, dispatch, props) {
  const loginUrl = AuthUrls.LOGIN;

  return axios
    .post(loginUrl, formValues)
    .then((response) => {
      const token = response.data.token;
      dispatch(authLogin(token));
      dispatch(getTokenUser(token));
      localStorage.setItem("token", token);
      const lastlogin = localStorage.getItem("lastlogin");

      // redirect to the route '/'
      if (lastlogin=="null"){
        history.push("/profile/complete");
      } else {
        history.push("/");
      }
    })
    .catch((error) => {
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

function setTokenUser(payload) {
  return {
    type: AuthTypes.TOKEN,
    payload: payload
  };
}

export function getTokenUser(token) {
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

        dispatch(setTokenUser(response.data));
      })
      .catch((error) => {
        // If request is bad...
        // Show an error to the user
        // TODO: send notification and redirect
      });
  };
}

export function logoutUser() {
  // Remove the token from localStorage
  localStorage.removeItem("userpk");
  localStorage.removeItem("token");
  localStorage.removeItem("influencer");

  history.push("/login");
  return {
    type: AuthTypes.LOGOUT,
  };
}

export function signupUser(formValues) {
  const signupUrl = AuthUrls.SIGNUP;

  return axios
    .post(signupUrl, formValues)
    .then((response) => {
      // email need to be verified, so don't login and send user to signup_done page.
      // redirect to signup done page.
      history.push("/signup/done");
    })
    .catch((error) => {
      console.log(error);
      // If request is bad...
      // Show an error to the user
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

export function signupUserInfluencer(formValues) {
  const userpk = localStorage.getItem("userpk");
  const userprofileUrl = AuthUrls.USER_PROFILE+userpk+"/";

  return axios
    .post(userprofileUrl, formValues)
    .then((response) => {
      // history.push("/signup/done");
    })
    .catch((error) => {
      console.log(error);
      // If request is bad...
      // Show an error to the user
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

export function activateUserAccount(formValues, dispatch, props) {
  // Slice :key from the link
  const params = new URLSearchParams(props.location.search);

  const activateUserUrl = AuthUrls.USER_ACTIVATION;
  const data = Object.assign(formValues, {
    user_id: params.get("user_id"),
    timestamp: params.get("timestamp"),
    signature: params.get("signature"),
  });

  return axios
    .post(activateUserUrl, data)
    .then((response) => {
      dispatch(
        notifSend({
          message:
            "Your account has been activated successfully, please log in",
          kind: "info",
          dismissAfter: 5000,
        })
      );

      history.push("/login");
    })
    .catch((error) => {
      // If request is bad…
      // Show an error to the user
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

export function resetPassword(formValues) {
  const resetPasswordUrl = AuthUrls.RESET_PASSWORD;

  return axios
    .post(resetPasswordUrl, formValues)
    .then((response) => {
      // redirect to reset done page
      history.push("/reset_password_done");
    })
    .catch((error) => {
      // If request is bad...
      // Show an error to the user
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

export function confirmPasswordChange(formValues, dispatch, props) {
  const params = new URLSearchParams(props.location.search);

  const resetPasswordConfirmUrl = AuthUrls.RESET_PASSWORD_CONFIRM;
  const data = Object.assign(formValues, {
    user_id: params.get("user_id"),
    timestamp: params.get("timestamp"),
    signature: params.get("signature"),
  });

  return axios
    .post(resetPasswordConfirmUrl, data)
    .then((response) => {
      dispatch(
        notifSend({
          message: "Password has been reset successfully, please log in",
          kind: "info",
          dismissAfter: 5000,
        })
      );

      history.push("/login");
    })
    .catch((error) => {
      // If request is bad...
      // Show an error to the user
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

export function resetId(formValues) {
  const resetIdUrl = AuthUrls.RESET_ID;

  return axios
    .post(resetIdUrl, formValues)
    .then((response) => {
      // redirect to reset done page
      history.push("/reset_id_done");
    })
    .catch((error) => {
      // If request is bad...
      // Show an error to the user
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

function setUserProfile(payload) {
  return {
    type: AuthTypes.USER_PROFILE,
    payload: payload
  };
}

export function getUserProfile() {
  const userpk = localStorage.getItem("userpk");
  const profileUrl = AuthUrls.USER_PROFILE+userpk+"/";

  if (userpk != null){
    return function (dispatch) {
      axios
        .get(profileUrl)
        .then((response) => {
          dispatch(setUserProfile(response.data));
        })
        .catch((error) => {
          // If request is bad...
          // Show an error to the user
          // TODO: send notification and redirect
        });
    };
  }
}

export function userProfileEdit(formValues, dispatch, props) {
  const userpk = localStorage.getItem("userpk");
  const profileUrl = AuthUrls.USER_PROFILE+userpk+"/";
  const userUrl = AuthUrls.USER_USER+userpk+"/";

  const data = Object.assign(formValues, {
    skintype: type(formValues)
  });
  

  const requestOne = axios.patch(profileUrl, data);
  const requestTwo = axios.patch(userUrl, data);

  return axios
    .all([requestOne, requestTwo])
    .then((response) => {
      dispatch(
        notifSend({
          message: "Your profile has been updated successfully",
          kind: "info",
          dismissAfter: 5000,
        })
      );

      history.push("/profile");
    })
    .catch((error) => {
      // If request is bad...
      // Show an error to the user
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}


export function skinProfileEdit(formValues, dispatch, props) {
  const userpk = localStorage.getItem("userpk");
  const profileUrl = AuthUrls.USER_PROFILE+userpk+"/";

  const data = Object.assign(formValues, {
    skintype: type(formValues)
  });
  

  return axios
    .patch(profileUrl, data)
    .then((response) => {
      dispatch(
        notifSend({
          message: "Your profile has been updated successfully",
          kind: "info",
          dismissAfter: 5000,
        })
      );

      history.push("/profile");
    })
    .catch((error) => {
      // If request is bad...
      // Show an error to the user
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

export function userProfileComplete(formValues, dispatch, props) {
  const userpk = localStorage.getItem("userpk");
  const profileUrl = AuthUrls.USER_PROFILE+userpk+"/";

  return axios
    .put(profileUrl, formValues)
    .then((response) => {
      dispatch(
        notifSend({
          message: "Your profile has been updated successfully",
          kind: "info",
          dismissAfter: 5000,
        })
      );

      history.push("/");
    })
    .catch((error) => {
      // If request is bad...
      // Show an error to the user
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

function setproductList(payload) {
  return {
    type: AuthTypes.PRODUCT_LIST,
    payload: payload
  };
}

export function getproductList() {
  const productListUrl = AuthUrls.PRODUCT_LIST;
  return function (dispatch) {
    axios
      .get(productListUrl)
      .then((response) => {
        dispatch(setproductList(response.data));
      })
      .catch((error) => {
        // If request is bad...
        // Show an error to the user
        // TODO: send notification and redirect
      });
  };
}

function setProduct(payload) {
  return {
    type: AuthTypes.PRODUCT,
    payload: payload,
  };
}

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
        // If request is bad...
        // Show an error to the user
        // TODO: send notification and redirect
      });
  };
}

function setReviewList(payload) {
  return {
    type: AuthTypes.REVIEW_LIST,
    payload: payload,
  };
}

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
        // If request is bad...
        // Show an error to the user
        // TODO: send notification and redirect
      });
  };
}

export function uploadReview(formValues, dispatch, props) {
  const { category } = "Moisturizers";
  const { product } = props.match.params;

  const userpk = localStorage.getItem("userpk");
  const influencer = localStorage.getItem("influencer");

  const uploadReviewUrl = AuthUrls.REVIEW;

  const data = Object.assign(formValues, {
    star: formValues.star.value,
    product: product,
    author: userpk,
    influencer: influencer
  });

  return axios
    .post(uploadReviewUrl, data)
    .then((response) => {
      dispatch(
        notifSend({
          message:
            "Your review has been uploaded successfully",
          kind: "info",
          dismissAfter: 5000,
        })
      );
      // redirect to reset done page
      history.push("/skincare/"+category+"/"+product);
    })
    .catch((error) => {
      // If request is bad...
      // Show an error to the user
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

export function editReview(formValues, dispatch, props) {
  const { category } = "1";
  const { product } = props.match.params;

  const userpk = localStorage.getItem("userpk");
  const influencer = localStorage.getItem("influencer");
  const stars = formValues.star.value;

  const data = Object.assign(formValues, {
    influencer: influencer,
    star: stars
  });

  const deleteReviewUrl = AuthUrls.REVIEW+"?author="+userpk+"&product="+product+"&author__influencer="+influencer;

  return axios
    .get(deleteReviewUrl)
    .then((response) => {
      const reviewpk = response.data[0].pk;
      axios.patch(AuthUrls.REVIEW+reviewpk+"/", data);
      history.push("/skincare/"+category+"/"+product);
      // redirect to reset done page
    })
}

export function deleteReview(formValues, dispatch, props) {
  const { category } = "1";
  const { product } = props.match.params;
  const userpk = localStorage.getItem("userpk");
  const influencer = localStorage.getItem("influencer");

  const data = Object.assign(formValues, {
    product: product,
    author: userpk,
    influencer: influencer
  });

  const deleteReviewUrl = AuthUrls.REVIEW+"?author="+userpk+"&product="+product+"&author__influencer="+influencer;

  return axios
    .get(deleteReviewUrl)
    .then((response) => {
      const reviewpk = response.data[0].pk;
      axios.delete(AuthUrls.REVIEW+reviewpk+"/", data);
      history.push("/skincare/"+category+"/"+product);
      // redirect to reset done page
    })
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

function url(skintype, ordering){
  if (skintype == null){
    return AuthUrls.PRODUCT_OR+ordering;
  } else if (ordering == null){
    return AuthUrls.PRODUCT_ST+skintype;
  } else {
    return AuthUrls.PRODUCT+"?average_star=&company=&name=&ordering="+ordering+"&skintype="+skintype;
  }
}

export function sorting(formValues, dispatch) {
  const skintype = type(formValues);

  const ordering = (formValues.sortby != null) ? formValues.sortby.value : null;
  const sortingUrl = url(skintype, ordering);

  return axios
    .get(sortingUrl)
    .then((response) => {
      dispatch(setproductList(response.data));
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
      dispatch(setproductList(response.data));
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

export function deleteInterestedProduct(formValues, dispatch, props) {
  const userpk = localStorage.getItem("userpk");
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

  console.log(likeReviewUrl);
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


export function search(formValues, dispatch, props) {
  const product = (props.match != null) ? props.match.params : null;
  const result = formValues.result;
  const searchUrl = AuthUrls.SEARCH+result;

  return axios
    .get(searchUrl)
    .then((response) => {
      dispatch(setSearch(response.data));
      if (product != null){
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
