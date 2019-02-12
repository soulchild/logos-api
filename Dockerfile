FROM node:10

ENV LOGOSAPI_PORT=8000
ENV USER=logos
ENV HOME=/home/${USER}
ENV APPDIR=${HOME}

RUN useradd --user-group --create-home --shell /bin/false ${USER}

WORKDIR $APPDIR

COPY package.json ${APPDIR}
COPY bin/update-logos ${APPDIR}/bin/update-logos

# --unsafe-perm to allow postinstall script to run as root (instead of nobody)
RUN npm install --unsafe-perm --production

COPY . ${APPDIR}

EXPOSE ${LOGOSAPI_PORT}

USER ${USER}

CMD [ "npm", "start" ]
