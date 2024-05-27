const { prisma } = require('../../../../modules/util/myPrisma.js');
const md5 = require('blueimp-md5');

module.exports = async (req, res) => {
  try {
    function padNumber(num) {
      return num.toString().padStart(4, '0');
    }
    const { type, data } = req.body;
    for (let i = 1; i < 10; i++) {
      await prisma.component.create({
        data: {
          id: `FE-${padNumber(i)}`,
          type: data["type"],
          local: data["local"],
          hours: data["hours"],
          state: data["state"],
          time: Math.floor((new Date()).getTime() / 1000)
        }
      });
    }
    console.table(await prisma.component.findMany());
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(e);  //錯誤處理
  }
}

