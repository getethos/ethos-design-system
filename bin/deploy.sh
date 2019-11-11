#!/bin/bash

echo $BASH_SOURCE

# Create absolute paths so this script can be run from _anywhere_
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
REPO_DIR=$(dirname $SCRIPT_DIR)

# Start timing how long our deployment takes
export DEPLOY_START=$(date +%s)
echo $DEPLOY_START

# Ensure dependencies are installed
cd $REPO_DIR
yarn --check-files

# Note: Fonts are not stored locally because EDS is a public repo and the
# fonts are proprietary so need to be protected.

# Note: If you have never used AWS CLI, you must first configure your default
# profile via `aws configure`.

# Download fonts from S3 bucket
aws s3 cp s3://eds.ethoslabs.io/fonts.zip bin/fonts.zip
if [[ ! -f "bin/fonts.zip" ]]; then
  echo "Error: bin/fonts.zip does not exist."
  echo "Cannot continue with deployment."
  exit 1
fi

unzip bin/fonts.zip -C src/

# Bundle
yarn styleguide:build

# Sync to S3, delete files that exist in destination but not in source,
# except for fonts.zip.
aws s3 sync ./styleguide s3://eds.ethoslabs.io/ --delete --exclude "fonts.zip"

# Cleanup
rm bin/fonts.zip
rm -rf styleguide/build/
rm styleguide/index.html

# Finish timing how long our deployment takes
export DEPLOY_END=$(date +%s)
export DEPLOY_TIME=$(($DEPLOY_END - $DEPLOY_START))

echo "Done in ${DEPLOY_TIME}s."
