const { registerStorage } = require("@firebase/storage");

const imageName = (name) => {
    const reg = new RegExp(/\d+/g);
    const originalNumber = Number(name.match(reg))
    const number = Number(name.match(reg)) + 1;
    const cathegory = name.split(reg)[0];
    const finalName = `${cathegory + number}`
    return [ cathegory ,finalName, number, originalNumber ];
}

module.exports.imageName = imageName;