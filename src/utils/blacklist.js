const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../database/blacklist.json");

let blacklist = {};
if (fs.existsSync(filePath)) {
  blacklist = JSON.parse(fs.readFileSync(filePath));
}

module.exports = {
  isBlacklisted(userID) {
    return !!blacklist[userID];
  },
  add(userID) {
    blacklist[userID] = true;
    fs.writeFileSync(filePath, JSON.stringify(blacklist, null, 2));
  },
  remove(userID) {
    delete blacklist[userID];
    fs.writeFileSync(filePath, JSON.stringify(blacklist, null, 2));
  }
};
