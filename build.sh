#!/bin/bash          

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

rm food.db
sqlite3 -init ./import