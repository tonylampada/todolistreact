FROM node:16.19.1

ARG UID=502

RUN apt update && apt-get install --no-install-recommends -y \
    git git-cola gitk nano zip unzip telnet sudo terminator meld \
    gcc g++ make libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev \
    && npm install -g firebase-tools@11.23.1
#    && apt-get clean && rm -rf /tmp/* /var/tmp/*
RUN apt-get install -y openjdk-11-jdk ca-certificates-java
RUN groupadd -g $UID -r developer \
    && useradd -u $UID -g $UID -ms /bin/bash -r developer \
    && mkdir /cdev && chown -R developer:developer /cdev
COPY --chown=developer:developer docker/bashrc_ext /cdev/bashrc_ext
USER developer
RUN echo "source /cdev/bashrc_ext" >> ~/.bashrc

WORKDIR /home/developer
RUN npm install -u firebase-tools@11.23.1

CMD [ "sleep", "infinity" ]
