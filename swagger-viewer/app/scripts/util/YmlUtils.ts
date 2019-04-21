import YAML from "yaml"
import { MaybeSwaggerJson } from "../types/Swagger"

/**
 * @param str yml string | json string
 */
export const convertToObject = (str: string): MaybeSwaggerJson | null => {
  if (str == null) {
    // type check しているが、元ネタが信用できないケースがあるため
    return null
  }

  const maybe = YAML.parse(str)
  if (maybe == null) {
    return null
  }
  if (typeof maybe === "string") {
    return null
  }
  return maybe
}
