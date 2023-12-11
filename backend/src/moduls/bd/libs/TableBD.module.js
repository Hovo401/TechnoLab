import { query } from './bd.module.js';

class TableSelectError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TableSelectError';
  }
}

class TableInsertError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TableInsertError';
  }
}

class TableDeleteRowError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TableDeleteRowError';
  }
}

class TableUpdateRowError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TableUpdateRowError';
  }
}

async function tableSelect({ offset = 0, pageSize = 3 }, tableName) {
  try {
    const result = await query(
      `SELECT * FROM ${tableName} ORDER BY date_create DESC LIMIT $1 OFFSET $2`,
      [pageSize, offset]
    );
    return result;
  } catch (error) {
    throw new TableSelectError('Ошибка при выборе данных из таблицы. : ' + error.message);
  }
}

async function tableInsert(data, tableName) {
  try {
    const VALUES = [];
    const insertColumnNames = Object.entries(data)
      .filter(([_, value]) => value !== undefined && _ !== 'id')
      .map(([key], index) => {
        VALUES.push(data[key]);
        return key;
      })
      .join(', ');
    if (!insertColumnNames) throw new TableInsertError('data error');

    const result = await query(
      `INSERT INTO ${tableName} (${insertColumnNames}) VALUES (${VALUES.map((_, index) => '$' + (index + 1)).join(', ')})`,
      VALUES
    );

    return result;
  } catch (error) {
    throw new TableInsertError('Ошибка при вставке данных в таблицу. : ' + error.message);
  }
}

async function tableDeleteRow( id , tableName) {
  try {
    if (!id) throw new TableDeleteRowError('ID обязателен для операции удаления.');

    const result = await query(
      `DELETE FROM ${tableName} WHERE ID = $1`,
      [id]
    );

    return result;
  } catch (error) {
    throw new TableDeleteRowError('Ошибка при удалении строки из таблицы. : ' + error.message);
  }
}

async function tableUpdateRow(data, tableName) {
  try {
    const { id, ...updateData } = data;

    if (!id) throw new TableUpdateRowError('ID обязателен для операции обновления.');

    const VALUES = [];
    const updateFields = Object.entries(updateData)
      .filter(([_, value]) => value !== undefined)
      .map(([key], index) => {
        VALUES.push(updateData[key]);
        return `${key} = $${index + 1}`;
      })
      .join(', ');

    const result = await query(
      `UPDATE ${tableName} SET ${updateFields} WHERE ID = $${VALUES.length + 1}`,
      [...VALUES, id]
    );
    console.log(result)
    if(result.rowCount === 0){
        throw new TableUpdateRowError('нет строки, id: '+ id);
    }
    console.log(result)
    return result;
  } catch (error) {
    throw new TableUpdateRowError('Ошибка при обновлении строки в таблице. : ' + error.message);
  }
}

async function getItemsCountByName(tableName) {
  const result = await query(
      `SELECT COUNT(*) FROM ${tableName}`
  );
  if(result?.rows[0]?.count){
      return result.rows[0].count;
  }
  return null;
}

async function query_(sql , params) {
  try {

    const result = await query(sql, params);
    return result;

  } catch (error) {
    throw new Error('Ошибка при запросе. : ' + error.message);
  }
}

export { tableSelect, tableInsert, tableDeleteRow, tableUpdateRow, getItemsCountByName, query_ };
