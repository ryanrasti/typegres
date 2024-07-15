#!/usr/bin/env bash
set -e

dir="pg_data"
if [[ ! -d $dir ]]; then
    initdb -D "$dir" --auth=trust --username=postgres
fi

pg_ctl start -D "$dir" -o "--unix_socket_directories=/tmp -p 1234"