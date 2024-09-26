FROM node:20-alpine

ENV LOGOSAPI_PORT=8000
ENV APPDIR=/usr/src/app

WORKDIR $APPDIR

RUN apk update && apk add --no-cache tini

COPY package.json package-lock.json ./
RUN npm set-script prepare ""
RUN npm install --production

COPY bin/update-logos ${APPDIR}/bin/update-logos
RUN npm run update-logos

COPY . .

EXPOSE ${LOGOSAPI_PORT}

USER node

ENTRYPOINT ["/sbin/tini", "--"]
CMD [ "node", "bin/logos-api" ]

