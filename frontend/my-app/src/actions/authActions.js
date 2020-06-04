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
      // If request is good update state to indicate user is authenticated
      // Store key from data to const token
      const token = response.data.key;
      // Dispatch token to function authLogin() and AuthTypes.LOGIN
      dispatch(authLogin(token));

      // Store the changed token to token in localStorage
      localStorage.setItem("token", token);

      // redirect to the route '/'
      history.push("/");
    })
    .catch((error) => {
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

export function logoutUser() {
  // Remove the token from localStorage
  localStorage.removeItem("token");
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
      history.push("/signup_done");
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
    payload: payload,
  };
}

export function getUserProfile() {
  return function (dispatch) {
    const token = getUserToken(store.getState());
    if (token) {
      axios
        .get(AuthUrls.USER_PROFILE, {
          headers: {
            authorization: "Token " + token,
          },
        })
        .then((response) => {
          dispatch(setUserProfile(response.data));
        })
        .catch((error) => {
          // If request is bad...
          // Show an error to the user
          console.log(error);
          // TODO: send notification and redirect
        });
    }
  };
}

export function updateUserProfile(formValues, dispatch, props) {
  const token = getUserToken(store.getState());

  return axios
    .patch(AuthUrls.USER_PROFILE, formValues, {
      headers: {
        authorization: "Token " + token,
      },
    })
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

function setproductList(payload) {
  return {
    type: AuthTypes.PRODUCT_LIST,
    payload: payload,
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
  const productUrl = AuthUrls.PRODUCT+product;

  return function (dispatch) {
    axios
      .get("http://www.mocky.io/v2/5ed8991b3100006700c4e590") //"http://www.mocky.io/v2/5ed8991b3100006700c4e590"
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
  const reviewListUrl = AuthUrls.REVIEW_LIST+product;
  
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

export function newReview(formValues) {
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
