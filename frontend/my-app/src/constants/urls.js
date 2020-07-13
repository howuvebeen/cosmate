const ROOT_URL = "http://localhost:8000/";

export const AuthUrls = {
    // post from loginUser
    LOGIN: `${ROOT_URL}users/login/`,

    // get from getUserInfo
    TOKEN: `${ROOT_URL}users/tokens/`,

    // get from signupUser
    SIGNUP: `${ROOT_URL}users/register/`,

    // get from activateAccount
    USER_ACTIVATION: `${ROOT_URL}users/verify-registration/`,

    // get from resetPassword
    RESET_PASSWORD: `${ROOT_URL}users/send-reset-password-link/`,

    // get from confirmPassword
    CONFIRM_PASSWORD: `${ROOT_URL}users/register-email/`,

    // get from resetId
    RESET_ID: `${ROOT_URL}users/send-reset-password-link/`,

    // get from signupInfluencer
    // get from getUserProfile
    // patch from userProfileEdit
    // patch from skinProfileEdit
    // post from signupInfluencer
    USER_PROFILE: `${ROOT_URL}users/profiles/`,
    
    // patch from userProfileEdit
    // patch from skinProfileEdit
    USER_USER: `${ROOT_URL}users/users/`,



    PRODUCT_LIST: `${ROOT_URL}products/products/`,
        PRODUCT_ST: `${ROOT_URL}products/products/?name=&company=&skintype=`,
        PRODUCT_OR: `${ROOT_URL}products/products/?ordering=`,
    PRODUCT: `${ROOT_URL}products/products/`,
    INTEREST:`${ROOT_URL}users/interests/?author=`,
        DELETE_IP: `${ROOT_URL}users/interests/`,
    REVIEW_LIST: `${ROOT_URL}reviews/reviews/?author=&product=`,
    REVIEW: `${ROOT_URL}reviews/reviews/`,
        LIKE: `${ROOT_URL}reviews/likes/`,
    SEARCH:`${ROOT_URL}products/products-search/?search=`,
    EVENT: `${ROOT_URL}products/events/`,
    INSTAGRAM: `${ROOT_URL}products/instagram/`
};