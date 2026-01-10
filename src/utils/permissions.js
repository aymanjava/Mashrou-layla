module.exports = {
  isOwner(senderID) {
    return senderID === global.Layla.owner.ownerID;
  }
};
