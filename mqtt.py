import paho.mqtt.client as mqtt
import time
import json
import random
import schedule

broker = "20.89.131.34" 
port = 1884  
username = "lab314"
password = "lab314fish"  
sub_topic = "Fish/set"  
pub_topic = "Fish/info"

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("連接成功")

        client.subscribe(sub_topic)
    else:
        print("連接失敗")

def on_message(client, userdata, msg):
    print("收到訊息: " + msg.payload.decode())
    client.publish(pub_topic,"hello john",0,False)



client = mqtt.Client()


client.username_pw_set(username, password)


client.on_connect = on_connect
client.on_message = on_message
client.connect(broker, port)

def job():
    data = {
            "2355":{"bc":random.randint(0,99),"err":random.randint(1,32),"active":random.randint(0,1)},
            "2316":{"bc":random.randint(0,99),"err":random.randint(1,32),"active":random.randint(0,1)}
            }
    client.publish(pub_topic,json.dumps(data),0,False)
    time.sleep(1)

schedule.every(15).minutes.do(job)
while True:
    schedule.run_pending()
    time.sleep(1)
 