import { JSONTextObject } from "./JSONTextObject";
import { Namespace } from "./Namespace";

interface MCMeta {
  pack: {
    description: JSONTextObject,
    packFormat: 4 | 5 | 6 | 7
  }
}
export class Datapack {
  mcMeta: MCMeta
  packPNG: string | null
  namespaces: {
    [key: string]: Namespace
  } = {};
  constructor(mcMeta: MCMeta, packPNG?: string)
  constructor(description: string, packFormat: 4 | 5 | 6 | 7, packPNG?: string)
  constructor(mcMetaOrDescription: MCMeta | string, packFormatOrPng?: 4 | 5 | 6 | 7 | string, packPNG?: string) {
    if (typeof mcMetaOrDescription === 'string' && typeof packFormatOrPng === 'number') {
      this.mcMeta = {
        pack: {
          description: mcMetaOrDescription,
          packFormat: packFormatOrPng
        }
      }
      this.packPNG = packPNG ? packPNG : null
    } else if (typeof mcMetaOrDescription === "object" && (typeof packFormatOrPng === "string" || typeof packFormatOrPng === "undefined")) {
      this.mcMeta = mcMetaOrDescription;
      this.packPNG = packFormatOrPng ? packFormatOrPng : null;
    }
  }

  addNamespace(name: string, namespace: Namespace): this {
    this.namespaces[name] = namespace;
    return this;
  }
}