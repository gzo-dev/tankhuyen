const AdmZip = require("adm-zip");

console.time("Zip done after");

var zip = new AdmZip();

zip.addLocalFolder("./.next");

zip.writeZip("bundle.zip");

console.timeEnd("Zip done after");
