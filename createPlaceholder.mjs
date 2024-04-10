import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

// const fs = require("node:fs/promises");
// const { getPlaiceholder } = require("plaiceholder");

(async () => {
  try {
    const file = await fs.readFile("./public/placeholder.png");

    const { base64 } = await getPlaiceholder(file);
  } catch (err) {
    err;
  }
})();
