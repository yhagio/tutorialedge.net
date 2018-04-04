FROM nginx
ADD ./ /app/src

RUN apt-get update
ENV HUGO_VERSION=0.38
ADD https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz /tmp
RUN tar -xf /tmp/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz -C /tmp \
    && mkdir -p /usr/local/sbin \
    && mv /tmp/hugo /usr/local/sbin/hugo \
    && rm -rf /tmp/hugo_${HUGO_VERSION}_linux_amd64 \
    && rm -rf /tmp/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz \
    && rm -rf /tmp/LICENSE.md \
    && rm -rf /tmp/README.md

WORKDIR /app/src
RUN pwd
RUN ls
RUN hugo --buildDrafts
RUN rm -rf /usr/share/nginx/html \
    && mkdir /usr/share/nginx/html \
    && cp -r public/* /usr/share/nginx/html/

RUN echo 'complete'

EXPOSE 1313