# Build with:
#
# $ docker build --tag ethos/eds:1.0 .
#
FROM node:10.16.3-alpine

WORKDIR /usr/eds/src

COPY ./package.json ./

# The following assumes you've already pulled in the
# fonts to your local EDS checkout. If not, download
# `fonts.zip` from:
# [Google Drive](https://drive.google.com/drive/u/0/folders/1hvAAEUWEsz2Hq-Wmj09xOvCYeixkJ4_c)
# and unzip it in to `src/fonts`
COPY ./ ./

RUN yarn install

CMD ["yarn", "styleguide"]

