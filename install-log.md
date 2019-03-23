```sh
# init
mkdir swagger-viewer-installer && cd $_
npm init
npm i

curl https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore --output .gitignore

# install
npm install yo generator-web-extension
mkdir swagger-viewer && cd $_
npx yo web-extension

# TypeScript
npm i -D typescript
npx tsc --init
```
