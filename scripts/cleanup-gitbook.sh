#!/usr/bin/env bash
# This script is used to cleanup edits made through gitbook

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR/../content"

# remove readme files and summary
rm **/gitbook-readme.md
rm gitbook-summary.md

# move assets to the public folder
mv $SCRIPT_DIR/../.gitbook/assets/* $SCRIPT_DIR/../public/assets/

# Cleanup new files
ADD_FRONTMATTER='s/# (.+)/---\ntitle: \1\naliases: []\nseeAlso: []\nexternalReferences: {}\n---/'
REMOVE_TRAILING_SLASH='s/\\$//'
REMOVE_EMBEDS='s/\{% embed url="(.+)" %\}/\1/g'
FIX_IMAGES='s/!\[]\(<.+\/.gitbook\/assets\/(.+)>\)/!\[](\/assets\/\1)/g'
find . -name "*.md" -exec sed -i '' -E "$ADD_FRONTMATTER; $REMOVE_TRAILING_SLASH; $REMOVE_EMBEDS; $FIX_IMAGES" {} +

# change md files to mdx
find . -name "*.md" -exec rename 's/\.md$/.mdx/' '{}' +

# unescape wikilinks all over the place
find . -name "*.mdx" -exec sed -i '' 's/\\\[\\\[/[[/g' '{}' +