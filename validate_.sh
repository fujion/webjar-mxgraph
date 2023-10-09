file_exists "import-map.json"
file_exists "README.md"
file_contains "LICENSE" "Apache License"

file_exists "dist/mxClient.js"
dir_exists "dist/css"
dir_exists "dist/images"
dir_exists "dist/resources"
