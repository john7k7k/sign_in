const { prisma } = require('../../../../modules/util/myPrisma.js');

module.exports = async (req, res) => {
  try {
    const bins = await prisma.bin.findMany({
      select: {
        version: true,
        time: true,
        message: true
      },
      orderBy: { time: 'desc' }
    });
    res.status(200).json(bins);
  } catch (error) {
    console.error('查詢出現錯誤:', error);
    res.status(500).json({
      error: '查詢出現錯誤',
      details: error.message
    });
  }
};
