const md5 = require('blueimp-md5');

module.exports = function(req, res) {
    console.log(req.body)
    if (req.body.code === randCode) {
        sqlConnection.revisePasscode(req.body.account, md5(req.body.password))
        res.sendStatus(200);
        console.log("重設密碼成功");
        randCode = getRand();
        return;
    }
    res.sendStatus(403);
    console.log("重設密碼失敗，驗證碼錯誤")
}