const { createCanvas, loadImage } = require('canvas');

module.exports = async (imagePath, text) => {
    const img = await loadImage(imagePath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    ctx.font = '50px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(text, 50, 100);
    return canvas.toBuffer();
};
