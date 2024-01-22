const fs = require("fs");
const dataDir = process?.argv?.[2] ?? "output/data";
console.log("Restoring data from raw data.");
exports.fetchData = (async function () {
    let hlidac = await fetch("https://www.hlidacsupermarketu.cz/data/latest-canonical.json");
    hlidac = JSON.parse(await hlidac.text());
    fs.writeFileSync(`${dataDir}/latest-canonical.json`, JSON.stringify(hlidac));
    let manItems = await fetch("https://drive.usercontent.google.com/download?id=1ImCsxh2n0avRcphULCpfee-GE0IlmM6c&export=download");
    manItems = await manItems.json();
    let items = hlidac.concat(manItems);
    await fs.writeFileSync(`${dataDir}/latest-canonical.json`, JSON.stringify(items));
    console.log(
        `Wrote ${items.length} items to ${dataDir}/latest-canonical.json`
    );
});
