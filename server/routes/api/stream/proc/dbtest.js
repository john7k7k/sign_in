const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const directoryPath = path.join(__dirname, "../../../../uploads/ota"); // 替换为你的实际路径

module.exports = async (req, res) => {
  try {
    // 检查目录是否存在
    if (!fs.existsSync(directoryPath)) {
      console.error(`目录不存在: ${directoryPath}`);
      return res.status(404).send('目录不存在');
    }

    // 读取目录内容
    const folderNames = await fs.promises.readdir(directoryPath);
    const data = {};

    // 解析文件夹名并收集数据
    for (const folder of folderNames) {
      // 只匹配有效版本号（格式为 x.y.z，不带 V）
      const match = folder.match(/(\d+)_([1-9]\d*\.[0-9]+\.[0-9]+)/);
      if (match) {
        const timestamp = parseInt(match[1]);
        const version = match[2];

        // 如果版本已存在，取最大时间戳
        if (!data[version] || data[version].time < timestamp) {
          data[version] = { time: timestamp, version: version };
        }
      }
    }

    // 如果没有有效数据
    if (Object.keys(data).length === 0) {
      return res.status(204).send('没有可写入的数据');
    }

    const results = []; // 存储写入结果

    // 将筛选后的数据写入数据库
    for (const versionData of Object.values(data)) {
      const result = await prisma.bin.upsert({
        where: { version: versionData.version },
        update: { time: versionData.time },
        create: { time: versionData.time, version: versionData.version },
      });
      results.push(result); // 收集结果
    }

    console.log('数据已成功写入 Bin 表');
    res.status(200).json({
      message: '数据已成功写入 Bin 表',
      writtenVersions: results.map(r => ({
        version: r.version,
        time: r.time,
      })),
    });
  } catch (error) {
    console.error('发生错误:', error);
    res.status(500).json({
      error: '发生错误',
      details: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};
