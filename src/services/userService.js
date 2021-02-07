import authHeader from "../helpers/authHeader";
import { baseURL } from "../api/baseURL";
import { handleLoginResponse } from "../helpers/HandleResponse";

const login = (username, password) => {
  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${baseURL}/api/auth/signin`, reqOptions)
    .then(handleLoginResponse)
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = (username, firstName, surname, email, password) => {
  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, firstName, surname, email, password }),
  };

  return fetch(`${baseURL}/api/auth/signup`, reqOptions).then((res) =>
    handleLoginResponse(res)
  );
};

const sendToken = (email) => {
  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(
    `${baseURL}/api/auth/user/resetPassword?username=${email}`,
    reqOptions
  ).then((res) => handleTextResponse(res));
};

const checkToken = (token) => {
  const reqOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(
    `${baseURL}/api/auth/user/changePassword?token=${token}`,
    reqOptions
  ).then((res) => handleTextResponse(res));
};

const changePasswordWithToken = (newPassword, repeatedPassword, token) => {
  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newPassword, repeatedPassword, token }),
  };

  return fetch(
    `${baseURL}/api/auth/user/changePassword`,
    reqOptions
  ).then((res) => handleTextResponse(res));
};

const editPassword = (oldPassword, newPassword, repeatedNewPassword) => {
  const reqOptions = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify({ oldPassword, newPassword, repeatedNewPassword }),
  };

  return fetch(
    `${baseURL}/api/auth/user/editPassword`,
    reqOptions
  ).then((res) => handleTextResponse(res));
};

const handleTextResponse = (textResponse) => {
  return textResponse.text().then((text) => {
    if (!textResponse.ok) {
      let error = text || textResponse.statusText;
      return Promise.reject(error);
    }

    return text;
  });
};

export const userService = {
  login,
  logout,
  register,
  sendToken,
  checkToken,
  editPassword,
  changePasswordWithToken,
};
