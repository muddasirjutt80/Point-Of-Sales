function isValidFirstName(firstName) {
  if (!firstName) return false;
  const minLength = /.{2,}/;
  return minLength.test(firstName);
}

function isValidLastName(lastName) {
  if (!lastName) return false;
  const minLength = /.{2,}/;
  return minLength.test(lastName);
}

function isValidUserName(username) {
  if (!username) return false;
  const myUserName = /^[a-z0-9._]/;
  return myUserName.test(username);
}
function isValidEmail(email) {
  if (!email) return false;
  const myEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return myEmail.test(email);
}

function isValidPassword(password) {
  if (!password) return false;
  const minLength = /.{8,}/;
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const number = /[0-9]/;
  const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;
  const noSpaces = /^\S*$/;

  return (
    minLength.test(password) &&
    upperCase.test(password) &&
    lowerCase.test(password) &&
    number.test(password) &&
    specialCharacter.test(password) &&
    noSpaces.test(password)
  );
}

module.exports = {
  isValidFirstName,
  isValidLastName,
  isValidUserName,
  isValidEmail,
  isValidPassword,
};
