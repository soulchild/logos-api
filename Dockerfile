FROM node:6.2

ENV HOME=/home/logos
ENV APPDIR=${HOME}

RUN useradd --user-group --create-home --shell /bin/false logos

WORKDIR $APPDIR

COPY package.json ${APPDIR}
RUN npm install --production && \
  npm cache clean

COPY . ${APPDIR}

EXPOSE 8000

USER logos

CMD [ "npm", "start" ]
