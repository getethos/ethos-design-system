# Docker cheatsheet
#
# Build with (later we'll of course use docker-compose):
# $ docker build --tag ethos/eds:1.0 .
#
# Run w/following interactive switches so Control-C works:
# $ docker run -tip 9008:9008 ethos/eds:1.0 # longhand below:
# $ docker run --tty --interactive -p 9008:9008 ethos/eds:1.0
#
# Exec EDS shell:
# docker exec -it PID sh

# Install minimal node alpine using same version of node EDS is set to
FROM node:10.16.3-alpine

WORKDIR /usr/eds/src

# Install node modules
COPY ./package.json ./
RUN yarn install

# The following assumes you've already pulled in the fonts to your local
# EDS checkout. If not, download `fonts.zip` from:
# [Google Drive](https://drive.google.com/drive/u/0/folders/1hvAAEUWEsz2Hq-Wmj09xOvCYeixkJ4_c)
# and have unzip'd it into EDS's `src/fonts` directory
COPY ./ ./

CMD ["yarn", "styleguide"]
