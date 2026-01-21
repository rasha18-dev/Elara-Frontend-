export const requireLogin = (navigate) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // ✅ current page path (example: /product/65ab...)
  const redirect = window.location.pathname;

  if (!userInfo?.token) {
    alert("Please login to continue!");
    navigate(`/login?redirect=${redirect}`);
    return false;
  }

  return true;
};
