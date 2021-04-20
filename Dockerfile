FROM node:12.13.0

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app
COPY package.json $HOME/
RUN chown -R app:app $HOME/*

USER root
WORKDIR $HOME
RUN npm i pm2 -g
RUN npm i -g @adonisjs/cli
RUN npm install
RUN apt-get update && apt-get install apt-file -y && apt-file update && apt-get install vim -y


CMD ["/bin/sh", "docker-start.sh"]