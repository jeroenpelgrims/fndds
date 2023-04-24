#!/usr/bin/env bash

if [ ! -f data.zip ]
then
    echo "Downloading latest data file"
    HTML=$(curl -s https://fdc.nal.usda.gov/fdc-datasets/)
    LAST_FILE=$(echo "$HTML" | rg '"(FoodData_Central_csv.*.zip)"' -or '$1' | tail -1)
    LAST_FILE_URL="https://fdc.nal.usda.gov/fdc-datasets/$LAST_FILE"
    curl -o data.zip $LAST_FILE_URL
else
    echo "Using existing data file"
fi

unzip -ud data data.zip

# If the zip file contained a directory (issue from 2023-04)
# copy files from this folder one level up
if [ "$(find data -maxdepth 1 -printf %y)" = "dd" ]; then
    echo "Fixing nested folder issue"
    FOLDER=$(find data -maxdepth 1 -type d| tail -n 1)
    cp "$FOLDER"/* data
    rm -rf "$FOLDER"
fi

rm food.db
sqlite3 -init ./import