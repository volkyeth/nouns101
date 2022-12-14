#!/usr/bin/env bash
# This script is used to cleanup edits made through gitbook

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR/../content"

# remove readme files and summary
rm **/gitbook-readme.md
rm gitbook-summary.md

# move assets to the public folder
mv $SCRIPT_DIR/../.gitbook/assets/* $SCRIPT_DIR/../public/assets/

# change md files to mdx
find . -name "*.md" -exec rename 's/\.md$/.mdx/' '{}' +

# Cleanup all files
ADD_FRONTMATTER='s/# (.+)/---\ntitle: \1\naliases: []\nseeAlso: []\nexternalReferences: {}\n---/'
REMOVE_TRAILING_SLASH='s/\\$//'
FIX_IMAGES='s/!\[]\(<.+\/.gitbook\/assets\/(.+)>\)/!\[](\/assets\/\1)/g'
UNESCAPE_WIKILINKS='s/\\\[\\\[/[[/g'
REMOVE_EMBEDS='s/\{% embed url="(.+)" %\}/\1/g'
find . -name "*.mdx" -exec sed -i '' -E "$ADD_FRONTMATTER; $REMOVE_TRAILING_SLASH; $FIX_IMAGES;$UNESCAPE_WIKILINKS;$REMOVE_EMBEDS" {} +
