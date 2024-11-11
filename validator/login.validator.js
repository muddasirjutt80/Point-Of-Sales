function isValidLoginEmail(email) {
  if (!email) return false;
  const myEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return myEmail.test(email);
}

function isValidLoginPassword(password) {
  if (!password) return false;
  const minLength = 8;
  return password && password.trim().length >= minLength;
}

module.exports = {
  isValidLoginEmail,
  isValidLoginPassword,
};
