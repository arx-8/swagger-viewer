import jsYaml from "js-yaml"
import { MaybeSwaggerJson } from "../types/Swagger"

/**
 * @param str yml string | json string
 */
export const convertToObject = (str: string): MaybeSwaggerJson | null => {
  const maybe = jsYaml.safeLoad(str)
  if (maybe == null) {
    return null
  }
  if (typeof maybe === "string") {
    return null
  }
  return maybe
}
