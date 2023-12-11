import { query, pool } from './libs/bd.module.js';

async function addDownloadQuantity() {

  const result = await query(`INSERT INTO downloads DEFAULT VALUES`);
  console.log(result)

}

async function getDownloadQuantity() {

  const result = await query(`SELECT date_create FROM downloads`);
  return result?.rows ;

}

export { addDownloadQuantity, getDownloadQuantity };