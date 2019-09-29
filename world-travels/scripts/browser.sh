#!/bin/bash

OS=$(uname)
DIR=$(dirname "${BASH_SOURCE[0]}" )
CHROME_USER_DATA_DIR=".chrome"

if [[ ${DIR} = '.' ]]; then
    # Places chrome user data directory in project root
    CHROME_USER_DATA_DIR="../${CHROME_USER_DATA_DIR}"
fi

if [[ ${OS} = "Linux" ]]; then
    google-chrome --user-data-dir=${CHROME_USER_DATA_DIR} --profile-directory="Debugzor" --remote-debugging-port="9222"
fi

if [[ ${OS} = "Darwin" ]]; then
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir=${CHROME_USER_DATA_DIR} --profile-directory="Debugzor" --remote-debugging-port="9222"
fi

