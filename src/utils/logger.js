const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m"
};

module.exports = {
  info(msg) {
    console.log(colors.green + "[INFO]" + colors.reset, msg);
  },
  warn(msg) {
    console.log(colors.yellow + "[WARN]" + colors.reset, msg);
  },
  error(msg) {
    console.log(colors.red + "[ERROR]" + colors.reset, msg);
  }
};
