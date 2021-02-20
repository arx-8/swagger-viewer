import jsYaml from "js-yaml"
import { MaybeSwaggerJson } from "../../../shared/types/Swagger"

/**
 * @param str yml string | json string
 */
export const convertToObject = (
  str: string | undefined
): MaybeSwaggerJson | undefined => {
  if (str == null) {
    return
  }

  const maybe = jsYaml.load(str)
  if (maybe == null || typeof maybe === "string" || typeof maybe === "number") {
    return
  }

  return maybe as MaybeSwaggerJson
}
