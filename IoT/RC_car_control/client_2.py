import socket
import cv2
import numpy
import time
import base64
import sys
from datetime import datetime
import threading


class ClientSocket:
    def __init__(self, ip, port):
        self.TCP_SERVER_IP = ip
        self.TCP_SERVER_PORT = port
        self.connectCount = 0
        self.connectServer()

    def connectServer(self):
        print("initial connecting...")
        try:
            self.sock = socket.socket()
            self.sock.connect((self.TCP_SERVER_IP, self.TCP_SERVER_PORT))
            print(
                u'Client socket is connected with Server socket [ TCP_SERVER_IP: ' + self.TCP_SERVER_IP + ', TCP_SERVER_PORT: ' + str(
                    self.TCP_SERVER_PORT) + ' ]')
            self.connectCount = 0
            recv_thread = threading.Thread(target=self.recv)
            recv_thread.start()
            send_thread = threading.Thread(target=self.sendImages)
            send_thread.start()

        except Exception as e:
            print(e)
            self.connectCount += 1
            if self.connectCount == 10:
                print(u'Connect fail %d times. exit program' % (self.connectCount))
                sys.exit()
            print(u'%d times try to connect with server' % (self.connectCount))
            self.connectServer()

    def sendImages(self):
        try:
            cnt = 0
            while True:
                string = input()
                stringData = string.encode()
                length = str(len(stringData))
                self.sock.sendall(length.encode('utf-8').ljust(128))
                self.sock.send(stringData)
                print(u'send images %d' % (cnt))
        except Exception as e:
            print(e)
            self.sock.close()
            time.sleep(1)
            self.connectServer()
            self.sendImages()

    def recv(self):
        while True:
            data = self.sock.recv(1)
            print(data)


def main():
    TCP_IP = 'i8a403.p.ssafy.io'
    # TCP_IP = 'localhost'
    TCP_PORT1 = 8082
    client1 = ClientSocket(TCP_IP, TCP_PORT1)

if __name__ == "__main__":
    main()
