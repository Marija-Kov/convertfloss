const flosses = require("./flossData.json")
const fs = require('fs');

function addNewFlossBrandHelper(existingFlossData, newBrand){
    const newFlossData = [];
    for (let color of existingFlossData) {
      color[newBrand.toLowerCase()] = "";
      newFlossData.push(color);
    }
    const output = JSON.stringify(newFlossData);

    return fs.writeFile(
      "/Users/marijak/Desktop/convertfloss/data/newFlossData.json",
      output, "utf8", () => {}
    );
   
}

addNewFlossBrandHelper(flosses, "ljubica")

