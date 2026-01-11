const users = {};

module.exports = {
  name: "SpamController",

  check(event) {
    const id = event.senderID;
    const now = Date.now();
    if (users[id] && now - users[id] < 1200) throw "";
    users[id] = now;
  }
};
