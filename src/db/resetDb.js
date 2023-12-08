import { initDb } from "./initDb.js";
import { dropDb } from "./dropDb.js";

const resetDb = async () => {
  try {
    await dropDb();

    await initDb();

    console.log("¡Base de datos reiniciada satisfactoriamente!");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

resetDb();
