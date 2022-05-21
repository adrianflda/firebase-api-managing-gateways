#!/bin/bash

if [ -z $1 ] || [ -z $2 ] || [ -z $3 ]; then
  echo "Missing arguments. Usage: config.env.sh PRIVATE_KEY CLIEN_ID CLIENT_EMAIL"
  exit 1
fi

PRIVATE_KEY=$1
CLIENT_ID=$2
CLIENT_EMAIL=$3

echo "You are setting up function config with PRIVATE_KEY:\"$PRIVATE_KEY\", CLIENT_ID:\"$CLIENT_ID\", CLIENT_EMAIL:\"$CLIENT_EMAIL\"."

firebase functions:config:set private.key=$PRIVATE_KEY project.id=$CLIENT_ID client.email=$CLIENT_EMAIL
