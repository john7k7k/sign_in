const path = require('path');

module.exports = function(req, res) {
    res.sendFile(path.join(__dirname, '../../../public/index.html'));
}