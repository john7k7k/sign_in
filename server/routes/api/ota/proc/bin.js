const { prisma } = require('../../../../modules/util/myPrisma.js');

const path = require('path');
const multer = require('multer');
const fs = require('fs')

const uploadBin = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/ota`);
    },
    filename: (req, file, cb) => {
      req.time = Math.floor((new Date()).getTime() / 1000)
      cb(null, req.time + '_' + req.body.version);
    }
  })
})

const get = async (req, res) => {
  fs.readdir(path.join(__dirname, `../../../../uploads/ota`), () => { })
  const bins = await prisma.bin.findMany({
    select: {
      version: true,
      time: true
    },
    take: 1,
    orderBy: { time: 'desc' }
  });
  res.send(bins);
}

const preProcess = async (req, res, next) => {
  try {
    await prisma.bin.create({
      data: {
        time: req.time,
        version: req.body.version
      }
    })
  } catch (err) { res.status(403).send('版本名已存在'); return }
  next();
}

const process = async (req, res) => {
  const otaBinName = path.join(__dirname, `sh/flash/aifi_core_stm32_MPU_loopTest_20230920.bin`)
  await fs.copyFile(path.join(__dirname, `../../../../uploads/ota/${req.time + '_' + req.body.version}`), otaBinName, () => {
  })
  res.sendStatus(200);
}

module.exports = {
  uploadBin,
  preProcess,
  process,
  get
}