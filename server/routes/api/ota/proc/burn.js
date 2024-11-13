const { prisma } = require('../../../../modules/util/myPrisma.js');
const { exec } = require('child_process');
const fs = require('fs')
const path = require('path');
const multer = require('multer');
const fetch = require('node-fetch');
const axios = require('axios');
const mqttConnection = require('../../../../modules/util/mqtt');

const awaitMqtt = (req, res) => {
  try {
    global.awaitMqttTime += 1;
    if (global.fishPort) {
      if (global.fishPort.slice(0, 6) === "faiied") return res.status(503).send(`取得魚資料失敗`);
      else if (global.fishPort === "offline") return res.status(503).send(`${req.body.fishesUID}不在線`);
      else if (global.fishPort === "no_fish") return res.status(503).send(`${req.body.fishesUID}未啟用OTA`);
      ports = Number(global.fishPort);
      delete global.fishPort;
      global.awaitMqttTime = 0;
      const bash = `bash remote_flash.sh 4.216.216.249 ${ports}`;
      console.log(bash);
      const options = { cwd: path.join(__dirname, 'sh/flash/') }
      console.log(`start flash`);
      exec(bash, options, (err, stdout, stderr) => {
        if (err) { console.log("錯誤" + err); return res.status(500).send('燒錄時發生問題') }
        console.log('輸出' + stdout);
        res.status(200).send("燒錄成功");
      })

    }
    else if (global.awaitMqttTime > 30) {
      global.awaitMqttTime = 0;
      return res.status(500).send('iot端逾時30秒');
    }
    else setTimeout(() => awaitMqtt(req, res), 1000);
  } catch (e) { console.log(e); return res.status(500).send('不明問題') }
}

const execute = async (req, res, next) => {
  if (!req.body.fishesUID[0]) return res.status(403).send('請選擇一條魚');
  const otaBinName = path.join(__dirname, `sh/flash/aifi_core_stm32_MPU_loopTest_20230920.bin`);
  try {
    await new Promise((resolve, reject) => {
      fs.copyFile(path.join(__dirname, `../../../../uploads/ota/${req.body.time + '_' + req.body.version}`), otaBinName, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    console.log('bin檔成功複製');
  } catch (err) {
    console.error(`bin複製失敗,錯誤: ${err.message}`);
    return res.status(500).send('無此bin檔');
  }

  const apiUrl = 'https://frp.aifishf.cc/api/proxy/tcp';
  let ports = 0;
  let data = 0;

  await axios.get(apiUrl)
    .then(response => {
      // 處理回應數據
      console.log('成功取得資料:', response.data);
      data = response.data;

      const fishFrp = data.proxies.find(fishesFrp => fishesFrp.name === `ssh-fish-${req.body.fishesUID[0].slice(3)}-pizero`);
      if (!fishFrp) return res.status(503).send(`沒有${req.body.fishesUID}`);
      if (!fishFrp.conf) return res.status(503).send(`${req.body.fishesUID}不在線`);

      ports = fishFrp.conf.remote_port;

      const bash = `remote_flash.sh 4.216.216.249 ${ports}`;
      console.log(bash);
      const options = { cwd: path.join(__dirname, '/sh', '/flash') };
      exec(bash, options, (err, stdout, stderr) => {
        if (err) {
          console.log("錯誤:", err);
          return res.status(500).send("執行升級指令失敗");
        }
        console.log('輸出:', stdout);
        console.log('錯誤輸出:', stderr);
        next();
      });
    })
    .catch(error => {
      const topic = `Ota/fishid`;
      const message = { id: req.body.fishesUID[0].slice(3) };
      console.log(message);
      mqttConnection.publish(topic, JSON.stringify(message));
      console.log(`已發布: ${topic}, 消息: ${JSON.stringify(message)}`);
      global.awaitMqttTime = 0;
      delete global.fishPort;
      awaitMqtt(req, res);
    });
}


const process = async (req, res) => {
  await prisma.fish.updateMany({
    where: {
      fishUID: {
        in: req.body.fishesUID
      }
    },
    data: {
      version: req.body.version
    }
  })
  setTimeout(() => res.sendStatus(200), 10);
}



module.exports = {
  execute,
  process
}