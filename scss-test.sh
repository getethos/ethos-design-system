#!/bin/bash 

if grep -r --include "*.module.scss" "//" . 
then 
  printf "\nSCSS test failed. Please only use /* */ comment syntax in .module.scss files, never //.\n\n" 
  exit 1
else
  printf "SCSS test succeeded\n" 
fi
