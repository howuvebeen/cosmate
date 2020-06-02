const ROOT_URL = "http://localhost:8000/";

export const AuthUrls = {
    LOGIN: `${ROOT_URL}users/login/`,
    SIGNUP: `${ROOT_URL}users/register/`,
    USER_ACTIVATION: `${ROOT_URL}users/verify-registration/`,
    RESET_PASSWORD: `${ROOT_URL}users/send-reset-password-link/`,
    RESET_PASSWORD_CONFIRM: `${ROOT_URL}users/register-email/`,
    RESET_ID: `${ROOT_URL}users/send-reset-password-link/`,
    USER_PROFILE: `${ROOT_URL}users/users/`,
    PRODUCT_LIST: `${ROOT_URL}products/products/`,
    PRODUCT: `${ROOT_URL}products/products/`,
    REVIEW_LIST: `${ROOT_URL}reviews/reviews/`
};