
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const {inventory} = require('../data/inventory');

const getVault = (req, res) => {
    return res.json(inventory);
}

// const getVault = async (req, res, db) => {
//     const buffer = await readFile(FILE_INVENTORY, (err, buff) => {
//         console.log('Error', err);
//         if(err) throw err;
//         resolve(buff)
//     });      
//     return res.json(JSON.parse(buffer));
// }

module.exports = {
    getVault
}