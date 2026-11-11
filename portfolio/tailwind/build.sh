#!/usr/bin/env bash
# Rebuilds ../catalog.css from input.css. Needs Node.js.
set -e
cd "$(dirname "$0")"
npx --yes tailwindcss@3.4.17 -c tailwind.config.js -i input.css -o ../catalog.css --minify
