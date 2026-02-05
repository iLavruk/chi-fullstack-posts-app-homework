#!/bin/bash
set -e

EC2_USER="ubuntu"
EC2_HOST="13.61.11.130"
KEY_PATH="${DEPLOY_KEY}"

ssh -i "$KEY_PATH" "$EC2_USER@$EC2_HOST" "~/deploy.sh"
