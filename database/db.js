const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./autopujcovna.db');

module.exports = db;