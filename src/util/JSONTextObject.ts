
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

export function isJSONTextObject(object: any): object is JSONTextObject {
  switch (typeof object) {
    case 'string':
    case 'boolean':
    case 'number':
      return true;
    case 'object':
      if (object instanceof Array) {
        return object.reduce((prev, curr) => (prev && isJSONTextObject(curr)))
      }
      if (!object) return false;
      if (typeof object.text === 'string') return true;
      if (typeof object.translate === 'string') return true;
      if (typeof object.keybind === 'string') return true;
  }
  return false;
}