module.exports = {
    stylize: (text) => {
        const map = { A: 'ᗩ', B: 'ᗷ', C: 'ᑕ', D: 'ᗪ', E: 'ᗴ', F: 'ᖴ', G: 'ᘜ' };
        return text.split('').map(ch => map[ch.toUpperCase()] || ch).join('');
    }
};
