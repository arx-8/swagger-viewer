export const sleep = (milliSecs: number) => {
  return new Promise((r) => {
    setTimeout(() => r(), milliSecs)
  })
}
