#!/bin/bash

TARGET=$1
MODE=$2

if [ -z "$TARGET" ]; then
  echo "Please specify a target"
  echo "Usage:"
  echo "  ./run.sh all"
  echo "  ./run.sh desktop"
  echo "  ./run.sh mobile"
  echo "  ./run.sh chromium"
  echo "  ./run.sh chromium headed"
  exit 1
fi

HEADED=""
if [ "$MODE" == "headed" ]; then
  HEADED="--headed"
fi

run() {
  echo "▶️ Running: $1"
  npx playwright test --project="$1" $HEADED
}

case "$TARGET" in
  all)
    run chromium
    run firefox
    run samsung-galaxy-s21
    run iphone-14
    run iphone-14-pro-max
    ;;
  desktop)
    run chromium
    run firefox
    ;;
  mobile)
    run samsung-galaxy-s21
    run iphone-14
    run iphone-14-pro-max
    ;;
  *)
    run "$TARGET"
    ;;
esac
