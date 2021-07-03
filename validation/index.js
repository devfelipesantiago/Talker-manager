module.exports = {
  verifyEmail: (email) => {
    const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    return emailRegex.test(email);
  },
  verifyPassword: (password) => {
    const passwordRegex = /^\d{6,8}$/gm;
    return passwordRegex.test(password);
  },
  verifyToken(token) {
    const tokenRegex = /^(\d|\w){16}$/gm;
    return tokenRegex.test(token);
  },
  verifyData(data) {
    const patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    return patternData.test(data);
  },
};