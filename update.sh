#!/bin/bash
# 在本地端執行 bash update.sh 即可更新網站

REMOTE_USER="aifi-lab314-n"
REMOTE_HOST="20.205.133.140"
REMOTE_PORT="22" 
SSH_KEY="/path/to/your/private/key" 

REMOTE_COMMANDS="
cd aifish_web/sign_in/;
git pull;
sudo pm2 restart 0;
"

ssh -i $SSH_KEY -p $REMOTE_PORT $REMOTE_USER@$REMOTE_HOST "$REMOTE_COMMANDS"
