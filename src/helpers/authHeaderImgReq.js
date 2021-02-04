export default function authHeaderImgReq() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.token ? { Authorization: "Bearer " + user.token } : {};
}
