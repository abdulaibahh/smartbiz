export function isLoggedIn() {
  return typeof window !== "undefined" && !!localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}
