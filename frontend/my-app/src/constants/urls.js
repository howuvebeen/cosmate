const ROOT_URL = "http://localhost:8000/";

export const AuthUrls = {
    LOGIN: `${ROOT_URL}users/login/`,
    SIGNUP: `${ROOT_URL}users/register/`,
    USER_ACTIVATION: `${ROOT_URL}users/verify-registration/`,
    RESET_PASSWORD: `${ROOT_URL}users/send-reset-password-link/`,
    RESET_PASSWORD_CONFIRM: `${ROOT_URL}users/reset-password/`,
};