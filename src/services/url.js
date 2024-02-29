/*
:: PROTECTED --> authToken Header Needed 
:: TOKEN     --> /token (token comes in email)
*/
const BASE_URL = "http://localhost:8081";
const LOGIN_URL = BASE_URL + "/api/user/login"; // POST
const REGISTER_URL = BASE_URL + "/api/user/register"; // POST
const GET_LOGGED_IN_USER_DETAILS = BASE_URL + "/api/user"; // GET :: PROTECTED
const VERIFY_EMAIL = BASE_URL + "/api/user/verify/"; // POST :: TOKEN
const PASSWORD_RESET_REQUEST = BASE_URL + "/api/user/reset-request"; // POST
const CHANGE_PASSWORD = BASE_URL + "/api/user/change-password"; // POST

export {
  BASE_URL,
  LOGIN_URL,
  REGISTER_URL,
  GET_LOGGED_IN_USER_DETAILS,
  VERIFY_EMAIL,
  PASSWORD_RESET_REQUEST,
  CHANGE_PASSWORD,
};
