module.exports = async (req, res) => {
  const message = { "cmd": "./fish-eyes status" };

  // 發布mqtt訊息
  mqttConnection.publish('fish-eyes/cmd', JSON.stringify(message), (err) => {
    if (err) {
      console.error('mqtt發送失敗:', err);
      return res.status(500).send('mqtt發送失敗');
    } else {
      console.log('消息已發送:', message);
    }
  });

  try {
    // 接收mqtt訊息
    const responseMessage = await getMqttMessage(mqttConnection);
    console.log(responseMessage);

    const jsonMessage = parseFishData(responseMessage);
    console.log(jsonMessage);

    console.log(req.body.fishNumber);
    if (!(req.body.fishNumber in jsonMessage)) {
      return res.status(500).send('查無此魚');
    }

    res.status(200).send(jsonMessage);
  } catch (err) {
    console.error('接收訊息出錯:', err);
    res.status(500).send(`接收訊息出錯: ${err.message}`);
  }
};

function awaitMessage(client, topic, timeout = 5000) {
  return new Promise((resolve, reject) => {
    client.subscribe(topic, (err) => {
      if (err) {
        return reject('訂閱主題失敗');
      }
    });

    const timer = setTimeout(() => {
      reject('等待MQTT消息超時');
    }, timeout);

    // 當接收到消息時，檢查是否來自預期的主題
    client.on('message', (receivedTopic, message) => {
      if (receivedTopic === topic) {
        clearTimeout(timer);
        resolve(message.toString());
      }
    });
  });
}

async function getMqttMessage(client) {
  const topic = 'fish-eyes/stdout';
  try {
    const message = await awaitMessage(client, topic);
    return message;
  } catch (err) {
    throw new Error('無法獲取訊息: ' + err);
  }
}

function parseFishData(data) {
  const lines = data.split('\n');
  const result = {};

  lines.forEach((line) => {
    const match = line.match(/\[ ssh-fish-(\d+)[^\]]*\ ]: (\w+)(?:, (\d+))?/);

    if (match) {
      const id = match[1];
      const statusOrPort = match[3] ? match[3] : match[2];
      result[id] = statusOrPort;
    }
  });

  return result;
}
