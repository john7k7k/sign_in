module.exports = async (req, res) => {
  try {
    const { type, data } = req.body;  //收資料
    console.log(data);
    res.status(200).send(data);
  } catch (e) {
    res.sendStatus(e);  // 錯誤處理
  }
}
