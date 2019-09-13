FROM node:12

ENV LOGOSAPI_PORT=8000
ENV USER=logos
ENV HOME=/home/${USER}
ENV APPDIR=${HOME}

RUN useradd --user-group --create-home --shell /bin/false ${USER}

WORKDIR $APPDIR

COPY package.json ${APPDIR}
COPY bin/update-logos ${APPDIR}/bin/update-logos

RUN npm install --production
RUN npm run update-logos

COPY . ${APPDIR}

EXPOSE ${LOGOSAPI_PORT}

USER ${USER}

CMD [ "npm", "start" ]
