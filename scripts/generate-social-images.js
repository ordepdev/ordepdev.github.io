const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, '..', '_posts');
const outputDir = path.join(__dirname, '..', 'assets', 'images', 'social');

const regularFontPath = path.join(__dirname, '..', 'assets', 'fonts', 'Outfit-Regular.ttf');
const boldFontPath = path.join(__dirname, '..', 'assets', 'fonts', 'Outfit-Bold.ttf');

async function generateImage(title, description, date, profileImageBuffer) {
  const width = 1200;
  const height = 630;
  const padding = 50;
  const profileImageSize = 40;
  const textOffset = 20; // Gap between text and image

  const titleLines = wrapText(title, 60, width - (padding * 2));
  const descriptionLines = wrapText(description, 40, width - (padding * 2));

  const titleHeight = titleLines.length * 70; // 70px per line for title
  const descriptionStartY = 150 + titleHeight;

  const svgImage = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        @font-face {
          font-family: 'Outfit';
          src: url('data:font/truetype;charset=utf-8;base64,${(await fs.readFile(regularFontPath)).toString('base64')}');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'Outfit';
          src: url('data:font/truetype;charset=utf-8;base64,${(await fs.readFile(boldFontPath)).toString('base64')}');
          font-weight: 700;
          font-style: normal;
        }
        .title { font-family: 'Outfit', sans-serif; font-size: 60px; fill: #e0def4; font-weight: 700; }
        .description { font-family: 'Outfit', sans-serif; font-size: 40px; fill: #908caa; font-weight: 400; }
        .footer-text { font-family: 'Outfit', sans-serif; font-size: 30px; fill: #e0def4; text-anchor: end; font-weight: 400; }
        .date-text { font-family: 'Outfit', sans-serif; font-size: 30px; fill: #6e6a86; font-weight: 400; }
      </style>
      <rect width="100%" height="100%" fill="#191724"/>
      ${titleLines.map((line, index) => `<text x="${padding}" y="${150 + (index * 70)}" class="title">${line}</text>`).join('')}
      ${descriptionLines.map((line, index) => `<text x="${padding}" y="${descriptionStartY + (index * 50)}" class="description">${line}</text>`).join('')}
      <text x="${padding}" y="${height - padding - 10}" class="date-text">${date}</text>
      <text x="${width - padding - profileImageSize - textOffset}" y="${height - padding - 10}" class="footer-text">ordep.dev</text>
    </svg>
  `;

  function wrapText(text, fontSize, maxWidth, startY) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';
    const lineHeight = fontSize * 1.2; // Adjust line height as needed

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine === '' ? word : currentLine + ' ' + word;
      // A rough estimation of text width. For more accurate results, you'd need a font metric library.
      // This assumes a monospace font or average character width.
      const testWidth = testLine.length * (fontSize * 0.5); 

      if (testWidth > maxWidth && currentLine !== '') {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  const svgBuffer = Buffer.from(svgImage);

  const roundedCorners = Buffer.from(
    `<svg><rect x="0" y="0" width="${profileImageSize}" height="${profileImageSize}" rx="${profileImageSize / 2}" ry="${profileImageSize / 2}"/></svg>`
  );

  const maskedProfileImage = await sharp(profileImageBuffer)
    .resize(profileImageSize, profileImageSize)
    .composite([{ input: roundedCorners, blend: 'dest-in' }])
    .png()
    .toBuffer();

  return sharp(svgBuffer)
    .composite([
      {
        input: maskedProfileImage,
        left: width - padding - profileImageSize,
        top: height - padding - profileImageSize,
      },
    ])
    .toFormat('png')
    .toBuffer();
}

async function main() {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    const profileImageBuffer = await fs.readFile(path.join(__dirname, '..', 'assets', 'images', 'me.jpeg'));
    const files = await fs.readdir(postsDir);

    for (const file of files) {
      const filePath = path.join(postsDir, file);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContent);

      if (data.title && data.description) {
        const date = path.basename(file, path.extname(file)).substring(0, 10);
        const imageBuffer = await generateImage(data.title, data.description, date, profileImageBuffer);
        const outputFilePath = path.join(outputDir, `${path.parse(file).name}.png`);
        await fs.writeFile(outputFilePath, imageBuffer);
        console.log(`Generated image for ${file}`);
      } else {
        console.log(`Skipping ${file} because it is missing a title or description.`);
      }
    }
  } catch (error) {
    console.error('Error generating images:', error);
  }
}

main();