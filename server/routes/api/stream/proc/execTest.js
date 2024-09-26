const { exec } = require('child_process');
const path = require('path');

module.exports = async (req, res) => {
  // 雲端的檔案路徑
  const sourceFile = 'pi@192.168.137.172:/home/pi/AIFI_fish_24-03-12_16-12-09.h264';

  // 本地目標資料夾，使用 path 處理，確保兼容性
  const destination = path.join(__dirname, '../../../../uploads');

  // SCP 命令，從雲端複製檔案到本地
  const scpCommand = `scp -C ${sourceFile} ${destination}`;
  // 執行 SCP 命令
  exec(scpCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing SCP: ${error.message}`);
      res.status(500).send(`Error executing SCP: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`SCP stderr: ${stderr}`);
      res.status(500).send(`SCP stderr: ${stderr}`);
      return;
    }

    res.status(200).sendFile(path.join(__dirname, '../../../../uploads/AIFI_fish_24-03-12_16-12-09.h264'));
  });
};
