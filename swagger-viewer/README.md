# swagger-viewer for developer

## Install

```sh
npm i
```

## npm scripts

### Development

```sh
npm run dev
```

And load `dist/chrome` as Chrome extension.

### Build

~~npm run build~~

- Currently, Can not build because `npm run build` has a problem.
  - Ref. https://github.com/arx-8/swagger-viewer/issues/1

#### Alternative build way

1. `npm run dev`
2. Stop watch. (ctrl + c)
3. Delete dev files.
   ```sh
   find ./dist/chrome/ -name "*.ts" | xargs rm -f
   find ./dist/chrome/ -name "*.js.map" | xargs rm -f
   find ./dist/chrome/ -name "*react-syntax-highlighter*.js" | xargs rm -f
   rm -rf ./dist/chrome/webextension-toolbox
   ```
4. Edit `./dist/chrome/manifest.json`
   - Remove value of `.background.scripts[] == "webextension-toolbox/client.js"`
5. Zip `./dist/chrome` to `swagger-viewer.v${version}.chrome.zip`
   ```sh
   cd ./dist
   zip -r "swagger-viewer.v${version}.chrome.zip" chrome
   ```

And register builded zip as Chrome extension.

### UnitTest

```sh
npm t
```

### Lint (ESLint autofix + type check)

```
npm run lint
```

## Docs

- [webextension-toolbox](https://github.com/HaNdTriX/webextension-toolbox)

## Swagger examples

https://github.com/OAI/OpenAPI-Specification/tree/master/examples

## License

See: [License (Apache-2.0)](./LICENSE)

### Notice

This app contains the deliverables distributed under the Apache License Version 2.0 license.
