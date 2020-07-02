const ROOT_URL = "http://localhost:8000/";

export const AuthUrls = {
    LOGIN: `${ROOT_URL}users/login/`,
    SIGNUP: `${ROOT_URL}users/register/`,
    USER_ACTIVATION: `${ROOT_URL}users/verify-registration/`,
    RESET_PASSWORD: `${ROOT_URL}users/send-reset-password-link/`,
    RESET_PASSWORD_CONFIRM: `${ROOT_URL}users/register-email/`,
    RESET_ID: `${ROOT_URL}users/send-reset-password-link/`,
    USER_USER: `${ROOT_URL}users/users/`,
    USER_PROFILE: `${ROOT_URL}users/profiles/`,
    PRODUCT_LIST: `${ROOT_URL}products/products/`,
        PRODUCT_ST: `${ROOT_URL}products/products/?name=&company=&skintype=`,
        PRODUCT_OR: `${ROOT_URL}products/products/?ordering=`,
    PRODUCT: `${ROOT_URL}products/products/`,
    INTEREST:`${ROOT_URL}users/interests/?author=`,
        DELETE_IP: `${ROOT_URL}users/interests/`,
    REVIEW_LIST: `${ROOT_URL}reviews/reviews/?author=&product=`,
    REVIEW: `${ROOT_URL}reviews/reviews/`,
        LIKE: `${ROOT_URL}reviews/likes/`,
    TOKEN: `${ROOT_URL}users/tokens/`,
    SEARCH:`${ROOT_URL}products/products-search/?search=`
};