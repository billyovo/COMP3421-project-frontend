
set -e
# build
npm run build

cd dist

git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/billyovo/COMP3421-project-frontend.git master:gh-pages
cd -