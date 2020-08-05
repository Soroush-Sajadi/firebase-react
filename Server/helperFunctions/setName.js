const { registerStorage } = require("@firebase/storage");

const imageName = (name) => {
    const reg = new RegExp(/\d+/g);
    const number = Number(name.match(reg)) + 1;
    const cathegory = name.split(reg)[0];
    const finalName = `${cathegory + number}`
    return [ cathegory ,finalName ];
}

module.exports.imageName = imageName;