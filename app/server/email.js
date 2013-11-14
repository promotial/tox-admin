Accounts.emailTemplates.resetPassword.subject = function (user) {
  return "Tox Operator: Password Reset";
};

Accounts.emailTemplates.resetPassword.text = function (user, url) {
  var urlArray = url.split("/");
  var token = urlArray[urlArray.length - 1];
  return "Hi " + user.username.split(" ")[0] + ", \n\nA request has been made to reset your account's password.\n\nIf it wasn't you who made this request then you can simply ignore this email, otherwise your reset token is:\n\n\n" + token;
};