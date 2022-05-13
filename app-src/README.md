# package-info

## Why separate `app/scripts` and `app-src/*` ?

- It is because to reduce the size of the zip.
- When `.ts` files under the `scripts` folder, `webextension-toolbox` build TypeScript, also output the `.ts` file together. (Even test files!)
- This folder is to suppress this issue.
