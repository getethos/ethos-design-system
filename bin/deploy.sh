#!/bin/bash

echo $BASH_SOURCE

# Create absolute paths so this script can be run from _anywhere_
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
REPO_DIR=$(dirname "$SCRIPT_DIR")

# Start timing how long our deployment takes
export DEPLOY_START=$(date +%s)

# Ensure dependencies are installed
# Use `--production=false` to include `devDependencies`.
cd $REPO_DIR
yarn install --check-files --production=false

# Note: Fonts are not stored locally because EDS is a public repo and the
# fonts are proprietary so need to be protected.

# Note: If you have never used AWS CLI, you must first configure your default
# profile via `aws configure`.

# Download fonts from S3 bucket
aws s3 cp s3://eds.ethoslabs.io/fonts.zip bin/fonts.zip
if [[ ! -f "bin/fonts.zip" ]]; then
  echo "Error: \`bin/fonts.zip\` does not exist."
  echo "Cannot continue with deployment."
  exit 1
fi

unzip -o bin/fonts.zip -d src/

# Bundle
yarn styleguide:build
if [[ $? -ne 0 ]]; then
  echo "Error: \`yarn styleguide:build\` exited with error code."
  echo "Cannot continue with deployment."
  exit 1
fi

# Sync to S3, delete files that exist in destination but not in source,
# except for fonts.zip.
aws s3 sync ./styleguide s3://eds.ethoslabs.io/ --delete --exclude "fonts.zip"
# Note: This check can cause the script to error when run by user without
# aws delete permissions.
if [[ $? -ne 0 ]]; then
  echo "Error: \`aws s3 sync\` exited with error code."
  echo "Cannot continue with deployment."
  exit 1
fi

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id EFXVH59BN2ASQ --paths "/*"

# Cleanup
rm bin/fonts.zip
rm -rf styleguide/build/
rm styleguide/index.html

# Finish timing how long our deployment takes
export DEPLOY_END=$(date +%s)
export DEPLOY_TIME=$(($DEPLOY_END - $DEPLOY_START))

echo "Done in ${DEPLOY_TIME}s."
