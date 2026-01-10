module.exports = {
  isAdmin(api, threadID, userID) {
    return new Promise((resolve) => {
      api.getThreadInfo(threadID, (err, info) => {
        if (err) return resolve(false);
        resolve(info.adminIDs.some(a => a.id === userID));
      });
    });
  }
};
