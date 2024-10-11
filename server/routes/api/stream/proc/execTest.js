const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  // 使用當前時間創建一個時間戳
  const time = Math.floor(Date.now() / 1000); // 以秒為單位的時間戳

  try {
    // 驗證輸入
    if (!req.body.version) {
      return res.status(400).send('Version is required');
    }

    // 在 bin 表中創建條目
    await prisma.bin.create({
      data: {
        time: time, // 現在是整數型
        version: req.body.version
      }
    });

    // 發送成功響應
    res.status(201).send({ message: 'Bin created successfully' });
  } catch (err) {
    console.error(err); // 記錄錯誤以便調試
    res.status(500).send({ error: 'Internal server error' });
  }
};
