/*
:: PROTECTED --> authToken Header Needed 
:: TOKEN     --> /token (token comes in email)
*/
const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log("BASE URL ", BASE_URL);
const LOGIN_URL = BASE_URL + "api/user/login"; // POST
const REGISTER_URL = BASE_URL + "api/user/register"; // POST
const GET_LOGGED_IN_USER_DETAILS = BASE_URL + "api/user"; // GET :: PROTECTED
const VERIFY_EMAIL = BASE_URL + "api/user/verify/"; // POST :: TOKEN
const PASSWORD_RESET_REQUEST = BASE_URL + "api/user/reset-request"; // POST
const CHANGE_PASSWORD = BASE_URL + "api/user/change-password"; // POST

const GET_USER_PROGRESS = BASE_URL + "api/progress/"; // GET :: PROTECTED
const QUESTION_MARK_AS_DONE_OR_NOT = BASE_URL + "api/progress/mark"; // PUT :: PROTECTED
const QUESTION_BOOK_MARK_OR_NOT = BASE_URL + "api/progress/book-mark"; // PUT :: PROTECTED
const UPDATE_QUESTION_NOTES = BASE_URL + "api/progress/update-notes"; // PUT :: PROTECTED

export {
  BASE_URL,
  LOGIN_URL,
  REGISTER_URL,
  GET_LOGGED_IN_USER_DETAILS,
  VERIFY_EMAIL,
  PASSWORD_RESET_REQUEST,
  CHANGE_PASSWORD,
  GET_USER_PROGRESS,
  QUESTION_MARK_AS_DONE_OR_NOT,
  QUESTION_BOOK_MARK_OR_NOT,
  UPDATE_QUESTION_NOTES,
};
