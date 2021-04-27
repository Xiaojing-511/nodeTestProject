const { query } = require('./server');
const fs = require('fs')
const { getSqlFilePath } = require('../api/communication');
async function createTableHandle() {
    let createTable = fs.readFileSync(getSqlFilePath('create_table.sql'), 'binary');
    let tableArr = createTable.split(';');
    // console.log(tableArr);
    for (var item of tableArr) {
        // console.log(typeof (item),item);
        await query(item);
    }
}
createTableHandle();
