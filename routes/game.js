const getGameData = (req, res, db) => {
    const {id} = req.body;
    res.json(`get game id ${id}`);
}

module.exports = {
    getGameData
}