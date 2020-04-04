import { CastAny } from "./utils"

export type OpenApi2Json = Readonly<{
  info: Record<string, CastAny>
  openapi: undefined
  paths: Record<string, CastAny>
  swagger: "2.0"
}>

export type OpenApi3Json = Readonly<{
  info: Record<string, CastAny>
  openapi: "3.0" | "3.0.0" | string
  paths: Record<string, CastAny>
  servers: ReadonlyArray<Record<string, CastAny>>
  swagger: undefined
}>

export type NotOpenApiJson = Readonly<{
  openapi: undefined
  swagger: undefined
}>

export type MaybeSwaggerJson = OpenApi2Json | OpenApi3Json | NotOpenApiJson
