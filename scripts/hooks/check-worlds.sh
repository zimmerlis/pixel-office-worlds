#!/bin/sh
# Reads file paths on stdin and fails if any lies in a character world that is
# not listed in public-worlds.txt. Used by the pre-commit and pre-push hooks.
root=$(git rev-parse --show-toplevel) || exit 1
list="$root/public-worlds.txt"
if [ ! -f "$list" ]; then
  echo "public-worlds.txt is missing; refusing to commit or push character worlds." >&2
  allowed=""
else
  allowed=$(tr -d '\r' < "$list" | sed -e 's/#.*//' -e 's/[[:space:]]//g' | grep -v '^$')
fi

blocked=$(grep '^characters/[^/]*/' | cut -d/ -f2 | sort -u | while read -r world; do
  echo "$allowed" | grep -qx "$world" || echo "$world"
done)

if [ -n "$blocked" ]; then
  echo "" >&2
  echo "Blocked: these character worlds are not public:" >&2
  echo "$blocked" | sed 's/^/  - characters\//' >&2
  echo "" >&2
  echo "Unstage them with:  git restore --staged characters/<world>" >&2
  echo "To publish a world on purpose, add it to public-worlds.txt and .gitignore." >&2
  exit 1
fi
exit 0
