const sql = require('sqlite3').verbose();
const db = new sql.Database('temp.db');



module.exports = { db };


