## 3.1.1 (2022-07-03)

### :bug: Bugfix

- [#69 - Some pages cannot be converted correctly.](https://github.com/arx-6/swagger-viewer/issues/69)
- [#82 - Update GitHub DOM](https://github.com/arx-6/swagger-viewer/pull/82)

## 3.1.0 (2022-06-30)

### :hammer: Other

- Update to Manifest V3.
- Security update (Update all dependencies).
- Migrate from webextension-toolbox to vite.
- Reduce app size (Approx. 2.9 MB -> 1.3 MB)

## 3.0.0 (2021-11-03)

### :fire: Breaking changes

- Fix for breaking changes on GitHub.
  - There are still bugs. I have confirmed that the conversion behavior of some pages is not correct. This is being fixed now.
  - e.g. https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/uspto.yaml

## 2.0.2 (2021-02-20)

### :hammer: Other

- Security update (Update all dependencies).
- Improved error messages.

## 2.0.1 (2021-02-11)

### :bug: Bugfix

- [#50](https://github.com/arx-8/swagger-viewer/issues/50) Fix an error when installing.

### :hammer: Other

- [#47](https://github.com/arx-8/swagger-viewer/pull/47) Fix `npm run build` command. (Thank you, [@cubenoy22](https://github.com/cubenoy22) !)

## 2.0.0 (2021-01-29)

### :fire: Breaking changes

- Fix for breaking changes on GitHub.

## 1.2.1 (2021-01-01)

### :bug: Bugfix

- Fix design collapse with [GitHub Dark mode](https://github.blog/2020-12-08-new-from-universe-2020-dark-mode-github-sponsors-for-companies-and-more/).

### :hammer: Other

- Security update (Update all dependencies).

## 1.2.0 (2020-04-04)

### :rocket: New Features

- Add toggle when click App icon.
  - Toggle `src code` &lt;-> `swagger-ui`

### :bug: Bugfix

- Fix bugs of `Expand All / Collapse All` definitions button.

### :hammer: Other

- Security update (Update all dependencies).

## 1.1.1 (2019-12-15)

Security update (Update all dependencies).

## 1.1.0 (2019-05-03)

Improved stability.

### :rocket: New Features

- Display a more detailed error message when conversion fails.

### :bug: Bugfix

- Fix to some out-of-spec yaml convertable. PR #23

## 1.0.0 (2019-04-28)

Stable version release.

### :rocket: New Features

- Add `Expand All / Collapse All` definitions button. #6
- Add explicit message (alert) when no operation.
- Improve icon visibility, When Chrome in private mode.

### :bug: Bugfix

- Fix build issue. #1
- Add error handling. #15
- Fix issue of extract yaml src, When logged in as organization account.

### :hammer: Other

- Add unit test.
- Add linter & formatter.
- Reduce build size.
- Check & Add license.

## 0.0.3 (2019-03-31)

β version release.
