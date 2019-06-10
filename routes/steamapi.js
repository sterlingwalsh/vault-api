const fs = require('fs');
const util = require('util');
const fetch = require('node-fetch')

const readFile = util.promisify(fs.readFile);
const nameToIdMap_File = './data/nameToIdMap.json';

let idList;


const refreshIdList = async () => {
    console.log('refresh');
    
    const response = await fetch('http://api.steampowered.com/ISteamApps/GetAppList/v2')
    const data = await response.json();
    return await new Promise((resolve, reject) => {
        let namesToIds = {};
        data.applist.apps.forEach(item => {
            namesToIds[item.name] = item.appid;
        });
        fs.writeFile(nameToIdMap_File, JSON.stringify(namesToIds), (err) => {
            if(err){
                reject('Could not save file');
            }
            resolve(namesToIds);
        });
    });
}

const getIdList = async () => {
    let data;
    try{
        const buffer = await readFile(nameToIdMap_File, (err, buff) => {
                        console.log('Error', err);
                        if(err) throw err;
                        resolve(buff)
                    });      
        data = JSON.parse(buffer);
    }catch(err){
        console.log(err);
        console.log("get new");
        data = await refreshIdList();
    }
    return await Promise.resolve(data);
}

const getGameId = async (name) => {
    if(!idList){
        idList = await getIdList();
    }
    console.log(name, idList[name]);
    return await Promise.resolve(idList[name]);
}

module.exports = {
    getGameId
}