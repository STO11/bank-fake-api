#!/bin/bash

#echo "\n\n\nNpm install:"
#npm install

# echo "\n\n\nCopy .env file:"
# file="./.env.docker"
# fileEnv="./.env"
# if [ -f "$fileEnv" ]
# then
# 	echo "$fileEnv found and not created"
# else
# 	cp $file ./.env
# 	echo ".env created"
# 	#exit 1
# fi

# echo "\n\n\Bank sqlite test file:"
# databaseTeste = "./database/bank.sqlite"
# if [ -f "$databaseTeste" ]
# then
# 	echo "$databaseTeste found and not created"
# else
# 	touch ./database/bank.sqlite
# 	echo "bank.sqlite created"
# 	#exit 1
# fi

echo "\n\n\nGraphql install:"
npm install graphql adonis-apollo-server graphql-tools slugify --save

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

echo "\n\n\nStart testing:"
adonis serve --dev --polling
