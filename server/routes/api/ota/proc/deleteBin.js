const { prisma } = require('../../../../modules/util/myPrisma.js');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  const time = parseInt(req.query.time, 10); // 10 表示以十进制解析
  const { version } = req.query;


  if (!time || !version) {
    return res.status(400).json({ error: '參數不完整' });
  }

  try {
    await prisma.bin.deleteMany({
      where: {
        time: time,
        version: version,
      },
    });

    const filePath = path.join(__dirname, '../../../../uploads/ota/', `${time}_${version}`);

    fs.unlink(filePath, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.warn('檔案不存在:', err);
          return res.status(200).json({
            message: '檔案不存在',
          });
        } else {
          console.error('刪除檔案失敗:', err);
          return res.status(500).json({
            error: '刪除檔案失敗',
            details: err.message,
          });
        }
      }

      res.status(200).json({
        message: '資料和檔案已成功刪除',
      });
    });
  } catch (error) {
    console.error('刪除資料失敗:', error);
    res.status(500).json({
      error: '刪除資料失敗',
      details: error.message,
    });
  }
};
