import { JSONTextObject } from "./util/JSONTextObject";
import { Module } from "./Module";
import { Namespace } from "./Namespace";

interface MCMeta {
  pack: {
    description: JSONTextObject,
    packFormat: 4 | 5 | 6 | 7
  }
}
export class Datapack {
  modules: Module[]
  mcMeta: MCMeta
  packPNG: string | null
  namespaces: {
    [key: string]: Namespace
  } = {};
  constructor(modules: any[], mcMeta: MCMeta, packPNG?: string)
  constructor(modules: any[], description: string, packFormat: 4 | 5 | 6 | 7, packPNG?: string)
  constructor(modules: any[], mcMetaOrDescription: MCMeta | string, packFormatOrPng?: 4 | 5 | 6 | 7 | string, packPNG?: string) {
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
    this.modules = modules;
  }
  addNamespace(name: string): this {
    this.namespaces[name] = new Namespace(this.modules);
    return this;
  }

}