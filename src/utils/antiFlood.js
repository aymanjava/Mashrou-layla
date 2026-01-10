// حماية ضد الرسائل السريعة جداً (Flood)
const floodMap = new Map();
const FLOOD_LIMIT = 5; // 5 رسائل خلال 10 ثواني
const INTERVAL = 10000;

module.exports = {
  check(senderID) {
    const now = Date.now();
    const record = floodMap.get(senderID) || [];
    const filtered = record.filter(t => now - t < INTERVAL);
    filtered.push(now);
    floodMap.set(senderID, filtered);
    return filtered.length > FLOOD_LIMIT;
  }
};
