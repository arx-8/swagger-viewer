export const sleep = (milliSecs: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), milliSecs)
  })
}
