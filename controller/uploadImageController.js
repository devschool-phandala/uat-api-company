const fs = require('fs');
const path = require('path');

// save image to folder uploads with base64 encoded string
exports.saveImage = async (baseImage) => {
  const projectPath = path.join(__dirname, '../uploads');
  const ex = baseImage.substring(baseImage.indexOf('/') + 1, baseImage.indexOf(';base64'));

  // set file name
  let fileName = "";
  if (ex === 'svg+xml') {
    fileName = `${Date.now()}.svg`;
  }else{
    fileName =`${Date.now()}.${ex}`;
  }
  
  let image = decodeBase64Image(baseImage);
  // save image to folder uploads
  await fs.writeFileSync(`${projectPath}/${fileName}`, image.data, { encoding: 'base64' });

  return fileName;
}

// decode base64 string to image
const decodeBase64Image = (dataString) => {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  if (matches.length !== 3 || !matches) {
    return new Error('Invalid input string')
  }
  console.log(matches);
  let image = {}
  image.type = matches[1]
  image.data = matches[2]
  return image
}