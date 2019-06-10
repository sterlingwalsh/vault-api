const getVaultPage = (req, res, db) => {
    const {page} = req.body;
    res.json(`get page ${page}`);
}

module.exports = {
    getVaultPage
}