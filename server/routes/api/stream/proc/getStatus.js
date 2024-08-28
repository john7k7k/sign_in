const { exec } = require('child_process');
const path = require('path');

module.exports = async (req, res) => {
  const bash = path.join(__dirname, '../../../../script/fish-eyes.exe');
  const command = `${bash} status`;
  console.log(command);
  exec(command, (err, stdout, stderr) => {
    if (err) { console.log("錯誤" + err) }
    const jsonData = parseData(stdout);
    console.log(jsonData);
    return res.status(200).send(jsonData);
  })
}

function parseData(data) {
  const lines = data.trim().split('\n');
  const result = [];

  lines.forEach(line => {
    const match = line.match(/\[.*?(\d+).*?\]: (\w+)(?:, (\d+))?/);
    if (match) {
      const id = match[1];
      const status = match[3] || match[2];
      result.push({ id, status });
    }
  });

  return result;
}
