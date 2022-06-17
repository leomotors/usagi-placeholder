const fs = require("node:fs").promises;

const allMenus = [];

async function processFile(filename, displayname) {
  const obj = JSON.parse((await fs.readFile(filename)).toString());

  for (const [category, menus] of Object.entries(obj)) {
    for (const menu of menus) {
      allMenus.push({
        ...menu,
        category,
        restaurant: displayname,
      });
    }
  }
}

async function main() {
  await processFile("data/raw/rabbit_house.json", "Rabbit House");
  await processFile("data/raw/fleur_de_lapin.json", "Fleur de Lapin");

  await fs.writeFile("data/menus.g.json", JSON.stringify(allMenus, null, 4));
}

main();
