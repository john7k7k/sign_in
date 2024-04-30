module.exports = async (req, res) => {
  try {
    const type = req.body.type;  //收資料
    const data = req.body.data;
    res.send(data) // 回傳資料
    console.log(data) // 在終端機上印出資料
  } catch (e) {
    res.sendStatus(e);  // 錯誤處理
  }
}
