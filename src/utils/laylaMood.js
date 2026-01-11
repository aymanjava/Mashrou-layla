module.exports = {
    moods: ['Happy', 'Sad', 'Excited', 'Angry', 'Neutral'],
    calculate: (event) => {
        // مثال: تحليل الحدث لتحديد المزاج
        if(event.type === 'message' && event.body.includes('!happy')) return 'Happy';
        if(event.type === 'message' && event.body.includes('!sad')) return 'Sad';
        return 'Neutral';
    }
};
