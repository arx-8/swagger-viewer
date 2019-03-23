import { extractYamlText, isAcceptableLocation } from "./util/utils";

const main = (): void => {
  if (!isAcceptableLocation(document.location.href)) {
    return;
  }

  const yaml = extractYamlText();

  const html = `
<div style="
  color: red;
  font-size: xx-large;
">
  Hello Chrome Extension
</div>
  `;

  const injWrapper = document.createElement("div");
  injWrapper.innerHTML = html;
  document.body.appendChild(injWrapper);
};

main();
