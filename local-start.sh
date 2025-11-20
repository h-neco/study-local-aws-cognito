#!/bin/bash

BACKEND_DIR="./backend"
FRONTEND_DIR="./frontend"

kill_all() {
  echo "===== Killing npm run dev processes ====="
  pkill -f "npm run dev" || true
  pkill -f "node .*dev"  || true
  echo "===== Kill complete ====="
}

start_services() {
  kill_all

  echo "===== Starting Backend ====="
  cd "$BACKEND_DIR"
  npm run dev &
  cd ..

  echo "===== Starting Frontend ====="
  cd "$FRONTEND_DIR"
  npm run dev &
  cd ..

  echo "===== All services started ====="
}

stop_services() {
  kill_all
}

case "$1" in
  start)
    start_services
    ;;
  stop)
    stop_services
    ;;
  restart)
    stop_services
    sleep 1
    start_services
    ;;
  *)
    echo "Usage: ./start.sh {start|stop|restart}"
    ;;
esac
