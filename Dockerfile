FROM node:6.9.1

# install lib for use
RUN  apt-get update \
  && apt-get install -y wget \
  && rm -rf /var/lib/apt/lists/*

# set timezone
RUN rm -f /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Bangkok /etc/localtime

# Create app directory
WORKDIR /usr/src/app

# Bundle app source

COPY . /usr/src/app
RUN npm install

CMD ["node","index"]

EXPOSE 5000
