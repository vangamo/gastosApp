#!/usr/bin/env bash
# Purpose: Install and deploy GastosApp
#          Should work into a Docker container
# Author: VanGamo
# --------------------------------------

if [ ! -d web ]
then
  echo "web directory doesn't exist"
  exit 1
fi
if [ ! -d server ]
then
  echo "server directory doesn't exist"
  exit 1
fi

cd web
npm install && npm run build
if [ ! -d build ]
then
  echo "Build doesn't work."
  exit 1
fi

cp -r build ../server/static
cd ../server
npm install

if [ ! -f mydatabase.db ]
then
  echo "CREATING DATABASE..."
  node createdb.js
  node loaddb.js
else
  echo "BACKUP DATABASE..."
  filename="mydatabase.$(date '+%Y%m%d').db"
  counter=0

  while [ -f "$filename" ]
  do
    ((counter++))
    filename="mydatabase.$(date '+%Y%m%d').$counter.db"
  done

  cp mydatabase.db $filename
  echo "UPDATING DATABASE..."
fi