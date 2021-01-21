import * as fs from 'fs/promises';
import * as path from 'path';

import { JSONTextObject } from "./util/JSONTextObject";
import { Namespace } from "./Namespace";
import { Recipe } from "./Recipe";
type Module = {
  recipes: {
    [key: string]: (...args: any) => Recipe
  }
}
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

  getNamespace(name: string): Namespace {
    return this.namespaces[name]
  }

  async createDatapack(name: string, wipeFiles = true, dir = "out"): Promise<void> {
    try {
      // Delete old datapack root directory
      if (wipeFiles) {
        console.log(`Deleting old datapack root directory ${dir}/${name}...`)
        await fs.rm(path.join(process.cwd(), dir), { recursive: true, force: true })
      }

      // Create root directory
      console.log(`Creating datapack root directory ${dir}/${name}...`)
      await createDir(dir);
      await createDir(dir, name);

      const datapackDir = path.join(process.cwd(), dir, name)

      // Create pack.mcmeta file
      console.log(`Creating pack.mcmeta file...`);
      await fs.writeFile(path.join(datapackDir, 'pack.mcmeta'), JSON.stringify({
        "pack": {
          "pack_format": this.mcMeta.pack.packFormat,
          "description": this.mcMeta.pack.description
        }
      }, undefined, 2))

      // Copy pack.png
      if (this.packPNG) {
        console.log(`Copying pack.png file from ${this.packPNG} to ${path.join(dir, name)}...`)
        await fs.copyFile(path.join(process.cwd(), this.packPNG), path.join(datapackDir, 'pack.png'))
      }

      // Create `data` directory
      console.log(`Creating data directory ${dir}/${name}/data...`)
      await createDir(dir, name, "data")

      // Create namespace folders
      for (const namespace in this.namespaces) {
        console.log(`Creating namespace ${namespace}...`)
        await createDir(dir, name, "data", namespace)

        // Create recipe folder
        if (Object.keys(this.namespaces[namespace].recipes).length > 0) {
          console.log(`Creating recipe folder for namespace ${namespace}...`)
          await createDir(dir, name, "data", namespace, "recipes")

          for (const recipe in this.namespaces[namespace].recipes) {
            console.log(`Creating recipe ${recipe} for namespace ${namespace}...`)
            await fs.writeFile(path.join(process.cwd(), dir, name, "data", namespace, "recipes", recipe + ".json"), JSON.stringify(this.namespaces[namespace].recipes[recipe], undefined, 2))
          }
        }
      }

    } catch (err) {
      console.error(err)
    }
  }

}

async function createDir(...paths: string[]) {
  try {
    await fs.mkdir(path.join(process.cwd(), ...paths));
  } catch (e) {
    if (e.code === 'EEXIST') {
      console.log(`Directory ${paths.join('/')} already exists...`);
    } else {
      throw e;
    }
  }
}
