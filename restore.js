const fs = require("fs");
// const analysis = require("./analysis.js");
// const h43z = require("./h43z");
const dataDir = process?.argv?.[2] ?? "output/data";
//const h43zFile = process?.argv?.[3] ?? null;
console.log("Restoring data from raw data.");
exports.fetchData = (async function () {
    // analysis.migrateCompression(dataDir, ".json", ".json.br", false);
    // analysis.migrateCompression(dataDir, ".json.gz", ".json.br");
    let hlidac = await fetch("https://www.hlidacsupermarketu.cz/data/latest-canonical.json");
    hlidac = JSON.parse(await hlidac.text());
    fs.writeFileSync(`${dataDir}/latest-canonical.json`, JSON.stringify(hlidac));
    // let items = fs.readFileSync(`${dataDir}/latest-canonical.json`).toString();
    // items = JSON.parse(items);
    let manItems = await fetch("https://drive.usercontent.google.com/download?id=1ImCsxh2n0avRcphULCpfee-GE0IlmM6c&export=download");
    manItems = await manItems.json();
    let items = hlidac.concat(manItems);
    await fs.writeFileSync(`${dataDir}/latest-canonical.json`, JSON.stringify(items));
    console.log(
        `Wrote ${items.length} items to ${dataDir}/latest-canonical.json`
    );
    // if (h43zFile && fs.existsSync(h43zFile)) {
    //     h43z.mergeWithLatestCanonical(h43zFile, `${dataDir}/latest-canonical.json`);
    // }
});
