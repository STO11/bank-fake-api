#!/bin/bash

#echo "\n\n\nNpm install:"
#npm install

echo "\n\n\nCopy .env file:"
file="./.env.docker"
fileEnv="./.env"
if [ -f "$fileEnv" ]
then
	echo "$fileEnv found not created"
else
	cp $file ./.env
	echo ".env created"
	#exit 1
fi

echo "\n\n\nMysql install:"
npm install mysql@^2.18.1 --save

echo "\n\n\nSqlite3 install:"
npm install sqlite3@^5.0.2 --save

echo "\n\n\nInstall vow for tests:"
adonis install @adonisjs/vow

echo "\n\n\nGenerate key:"
adonis key:generate

echo "\n\n\nRun migration:"
adonis migration:run --force

echo "\n\n\nStart node server:"
adonis serve --dev --polling
