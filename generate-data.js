const path = require("path");
const generateData = require("./test/generate-data");

generateData(path.join(__dirname, "data"), (err) => {
  if (err) {
    console.error("ERROR: ", err);
    return;
  }
  console.log("generated data");
});