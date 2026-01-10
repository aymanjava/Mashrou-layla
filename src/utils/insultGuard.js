// يحمي البوت من الإهانة ويرد بردود ذكية
const insults = ["غباء", "تافه", "سخيف"];
module.exports = {
  check(message, api, threadID) {
    if (insults.some(word => message.includes(word))) {
      api.sendMessage("🖤 ليلى لا ترد على الإهانات… ولكنني لاحظت ذلك.", threadID);
    }
  }
};
