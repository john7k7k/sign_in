'''
UART communication on Raspberry Pi using Pyhton
https://www.qutaojiao.com
'''
import serial
from time import sleep
ser = serial.Serial ("/dev/ttyS0", 115200)    #Open port with baud rate
i=0
while True:
    ser.write([109, 112, 117, 115, 101, 110, 100,i,ord('\n')])
    if i>254:
      i=0
    else:
      i=i+1
    received_data = ser.read()              #read serial port
    sleep(0.03)
    data_left = ser.inWaiting()             #check for remaining byte
    received_data += ser.read(data_left)
    print (received_data)                   #print received data

    