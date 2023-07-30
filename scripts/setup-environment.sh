#!/bin/bash

FILE_PATH="$(dirname "$(realpath $0)")"

echo "Give execute permissoions to pre-commit file"
chmod +x $FILE_PATH/git_hooks/pre-commit
echo "Finished giving permissions"

echo ""

echo "Copy pre-commit hook to .git folder"
ln -s $FILE_PATH/git-hooks/pre-commit $FILE_PATH/../.git/hooks/pre-commit
echo "Finished copiying pre-commit to .git folder"