const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { exec, spawn , execSync, execFile} = require('child_process');
const fs = require('fs')
const path = require('path');
const multer = require('multer');
const fetch = require('node-fetch');
const axios = require('axios');

const execute = async (req,res,next) => {
    const { time, version } = (await prisma.bin.findMany({
        take: 1,
        orderBy: { time: 'desc' }
    }))[0]
    const otaBinName = path.join(__dirname, `sh/flash/aifi_core_stm32_MPU_loopTest_20230920.bin`);
    fs.rename(path.join(__dirname,`../../../../uploads/ota/${req.time  + '_' + req.body.version}`), otaBinName, async () => {
        const binName = `${time}_${version}`;
        const options = {
            cwd: path.join(__dirname,'/sh','/flash')
        };
        console.log(`start flash`);
        const apiUrl = 'https://frp.aifish.cc/api/proxy/tcp'; // 替换为实际的API端点
        const username = 'frpslab314';
        const password = 'lab314frp';
        const basicAuth = 'Basic ZnJwc2xhYjMxNDpsYWIzMTRmcnA=';
        let ports = 0;
        let data = 0;
        await axios.get(apiUrl)
            .then(response => {
                // 處理回應數據
                console.log('成功取得資料:', response.data);
                data = response.data
                //console.log(data.proxies[0].conf);
                fishFrp = data.proxies.find(fishesFrp => fishesFrp.name === `ssh-fish-xxxx-pizero_OTATEST`);
                if(!fishFrp) return res.status(503).send(`沒有${req.body.fishesUID}`)
                console.log(fishFrp)
                if(!fishFrp.conf) return res.status(503).send(`${req.body.fishesUID}不在線`)
                ports = fishFrp.conf.remote_port
                
                const bash = `remote_flash.sh 4.216.216.249 ${ports}`;
                //const bash = `test.sh`
                console.log(bash)
                exec(bash, options,  (err, stdout, stderr) => {
                    if(err) { console.log("錯誤"+err)}
                    console.log('輸出'+stdout);
                    console.log('輸'+stderr);
                    next(); 
                })
            //next(); 
            })
            .catch(error => {
            // 處理錯誤
            console.error('錯誤:', error);
            res.status(500).send("frp出錯")
        });
        
    })
    
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
    setTimeout( () => res.sendStatus(200),10);
}

module.exports = {
    execute,
    process
}