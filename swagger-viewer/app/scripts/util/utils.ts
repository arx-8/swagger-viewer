const RX_YML_PAGE = /^https:\/\/github\.com\/.*\.ya?ml$/

export const isAcceptableLocation = (locationHref: string): boolean => {
  return RX_YML_PAGE.test(locationHref)
}

export const extractYamlText = (): string => {
  const element = document.querySelector(
    "#js-repo-pjax-container > div.container.new-discussion-timeline.experiment-repo-nav > div.repository-content > div.Box.mt-3.position-relative > div.Box-body.px-0.blob-wrapper.data.type-yaml > table > tbody",
  )

  if (
    element == null ||
    element.textContent == null ||
    element.textContent.length === 0
  ) {
    return ""
  }

  return (
    element.textContent
      .trim()
      .split("\n")
      // 半角スペースだけの空行が取得できてしまうため
      .filter((line) => line.trim().length !== 0)
      // 余分なインデントの削除
      .map((line) => line.replace(/^        /, ""))
      .join("\n")
  )
}
