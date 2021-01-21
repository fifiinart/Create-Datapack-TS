
interface JSONTextOptions {
  extra?: JSONTextObject,
  color?: string,
  font?: string,
  bold?: boolean,
  italic?: boolean,
  underlined?: boolean,
  strikethrough?: boolean,
  obfuscated?: boolean,
  insertion?: string,

}

type JSONTextContent = {
  text: string
} | {
  translate: string,
  with?: string[]
} | {
  keybind: string
}
export type JSONTextObject = string | boolean | number | JSONTextObject[] | (JSONTextContent & JSONTextOptions)