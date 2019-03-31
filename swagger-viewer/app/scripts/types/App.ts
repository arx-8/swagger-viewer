export type OpenApi2Json = Readonly<{
  swagger: "2.0"
  openapi: undefined
  info: Object
  paths: Object
}>

export type OpenApi3Json = Readonly<{
  swagger: undefined
  openapi: "3.0" | "3.0.0" | string
  info: Object
  paths: Object
  servers: ReadonlyArray<Object>
}>

export type NotOpenApiJson = Readonly<{
  swagger: undefined
  openapi: undefined
}>

export type MaybeSwaggerJson = OpenApi2Json | OpenApi3Json | NotOpenApiJson
