const fs = require('fs');

const fetch = require('node-fetch');
const FuzzySearch = require('fuzzy-search');
const FILE_STEAM_APPLIST = './data/steam_applist.json';

const URL_STEAM_APPLIST =
  'http://api.steampowered.com/ISteamApps/GetAppList/v2';
const URL_STEAM_APPDETAILS =
  'https://store.steampowered.com/api/appdetails?appids=';

const util = require('util');
const readFile = util.promisify(fs.readFile);

let searcher;

const refreshIdList = async () => {
  console.log('refresh');

  const response = await fetch(URL_STEAM_APPLIST);
  const json = await response.json();
  const data = json.applist.apps;
  return await new Promise((resolve, reject) => {
    fs.writeFile(FILE_STEAM_APPLIST, JSON.stringify(data), err => {
      if (err) {
        reject('Could not save file');
      }
      resolve(data);
    });
  });
};

const getAppList = async () => {
  try {
    const buffer = await readFile(FILE_STEAM_APPLIST, (err, buff) => {
      console.log('Error', err);
      if (err) throw err;
      resolve(buff);
    });
    return JSON.parse(buffer);
  } catch (err) {
    console.log('File read error caught', err);
    return await refreshIdList();
  }
};

const searchGames = async query => {
  if (!searcher) {
    console.log('no searcher');
    const appList = await getAppList();
    console.log(appList.length);
    searcher = new FuzzySearch(appList, ['name'], { sort: true });
    console.log('new searcher');
  }

  return searcher.search(query);
};

const getGameInfo = async appid => {
  const response = await fetch(URL_STEAM_APPDETAILS + appid);
  return await response.json();
};

module.exports = {
  searchGames,
  getGameInfo,
  getAppList
};
