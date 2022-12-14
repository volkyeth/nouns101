#!/usr/bin/env bash
# This script is used to cleanup edits made through gitbook

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR/../content"

# remove readme files and summary
rm **/README.md
# @TODO replace after first cleanup:
#rm **/gitbook-readme.md
#rm gitbook-summary.md

# move assets to the public folder
mv $SCRIPT_DIR/../.gitbook/assets/* $SCRIPT_DIR/../public/assets/

# Process new files
ADD_FRONTMATTER='s/# (.+)/---\ntitle: \1\naliases: []\nseeAlso: []\nexternalReferences: {}\n---/'
find . -name "*.md" -exec sed -i '' -E "$ADD_FRONTMATTER" {} +

# change md files to mdx
find . -name "*.md" -exec rename 's/\.md$/.mdx/' '{}' +

# Cleanup all files
REMOVE_TRAILING_SLASH='s/\\$//'
FIX_IMAGES='s/!\[]\(<.+\/.gitbook\/assets\/(.+)>\)/!\[](\/assets\/\1)/g'
UNESCAPE_WIKILINKS='s/\\\[\\\[/[[/g'
REMOVE_HEADINGS='s/^# .+//g'
REMOVE_EMBEDS='s/\{% embed url="(.+)" %\}/\1/g'
find . -name "*.mdx" -exec sed -i '' -E "$REMOVE_TRAILING_SLASH; $FIX_IMAGES;$UNESCAPE_WIKILINKS;$REMOVE_EMBEDS;$REMOVE_HEADINGS" {} +
# Remove leading, trailing and duplicated line breaks
find . -name "*.mdx" -exec sed -i '' '/^$/N;/^\n$/D;s/^\n*//;s/\n*$//' {} +
