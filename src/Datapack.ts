import * as fs from 'fs/promises';
import * as path from 'path';

import { isJSONTextObject, JSONTextObject } from "./util/JSONTextObject";
import { Namespace } from "./Namespace";
import { Recipe } from "./Recipe";

/**
 * Represents a list of recipes.
 */
type Module = {
  /**
   * The internal recipes in the Module.
   */
  recipes: {
    [key: string]: new (...args: any) => Recipe
  }
}
/**
 * Represents a `pack.mcmeta` file.
 */
interface MCMeta {
  pack: {
    /**
     * The description of the pack, in JSON text format.
     */
    description: JSONTextObject,
    /**
     * What Minecraft version to load it in.
     */
    packFormat: 4 | 5 | 6 | 7
  }
}
/**
 * A Datapack.
 */
export class Datapack {
  /**
   * An array of loaded modules.
   */
  modules: Module[]
  /**
   * A `pack.mcmeta` file.
   */
  private mcMeta: MCMeta
  /**
   * The path to the `pack.png` file to be used.
   */
  private packPNG: string | null
  /**
   * The list of namespaces to be used.
   */
  private namespaces: {
    [key: string]: Namespace
  } = {};
  /**
   * Creates a datapack.
   * @param modules The modules to be loaded into the datapack.
   * @param mcMeta The MCMeta file to be used.
   * @param packPNG The path to the PNG file to be used.
   */
  constructor(modules: Module[], mcMeta: MCMeta, packPNG?: string)
  /**
   * Creates a datapack.
   * @param modules The modules to be loaded into the datapack.
   * @param description The description of the datapack.
   * @param packFormat The pack format of the datapack.
   * @param packPNG The path to the PNG file to be used.
   */
  constructor(modules: Module[], description: JSONTextObject, packFormat: 4 | 5 | 6 | 7, packPNG?: string)
  constructor(modules: Module[], mcMetaOrDescription: MCMeta | JSONTextObject, packFormatOrPng?: 4 | 5 | 6 | 7 | string, packPNG?: string) {
    if (isJSONTextObject(mcMetaOrDescription) && typeof packFormatOrPng === 'number') {
      this.mcMeta = {
        pack: {
          description: mcMetaOrDescription,
          packFormat: packFormatOrPng
        }
      }
      this.packPNG = packPNG ? packPNG : null
    } else if (!isJSONTextObject(mcMetaOrDescription) && (typeof packFormatOrPng === "string" || typeof packFormatOrPng === "undefined")) {
      this.mcMeta = mcMetaOrDescription;
      this.packPNG = packFormatOrPng ? packFormatOrPng : null;
    }
    this.modules = modules;
  }
  /**
   * Adds a namespace to the namespace registry.
   * @param name The name to give the namespace.
   * @returns This.
   */
  addNamespace(name: string): this {
    this.namespaces[name] = new Namespace(this.modules);
    return this;
  }

  /**
   * Gets a namespace based on its name.
   * @param name The name to get the namespace for.
   * @returns The namespace.
   */
  getNamespace(name: string): Namespace {
    if (this.namespaces[name]) return this.namespaces[name]
    else throw new Error(`Namespace ${name} could not be found.`)
  }

  /**
   * Creates a datapack in a specified directory
   * @param name The name to give the datapack.
   * @param wipeFiles Whether to wipe the files in the directory first.
   * @param dir The directory to house the datapack in.
   */
  async createDatapack(name: string, wipeFiles = true, dir = "out"): Promise<void> {
    try {
      // Delete old datapack root directory
      if (wipeFiles) {
        console.log(`Deleting old datapack root directory ${dir}/${name}...`)
        await fs.rm(path.join(process.cwd(), dir), { recursive: true, force: true })
        console.log(`Finishing deleting old datapack root directory ${dir}/${name}\n`)
      }

      // Create root directory
      console.log(`Creating datapack root directory ${dir}/${name}...`)
      await createDir(dir);
      await createDir(dir, name);
      console.log(`Finishing creating datapack root directory ${dir}/${name}\n`)

      const datapackDir = path.join(process.cwd(), dir, name)

      // Create pack.mcmeta file
      console.log(`Creating pack.mcmeta file...`);
      await fs.writeFile(path.join(datapackDir, 'pack.mcmeta'), JSON.stringify({
        "pack": {
          "pack_format": this.mcMeta.pack.packFormat,
          "description": this.mcMeta.pack.description
        }
      }, undefined, 2))
      console.log(`Finishing creating pack.mcmeta file\n`);


      // Copy pack.png
      if (this.packPNG) {
        console.log(`Copying pack.png file from ${this.packPNG} to ${path.join(dir, name)}...`)
        await fs.copyFile(path.join(process.cwd(), this.packPNG), path.join(datapackDir, 'pack.png'))
        console.log(`Finishing copying pack.png file from ${this.packPNG} to ${path.join(dir, name)}\n`)
      }

      // Create `data` directory
      console.log(`Creating data directory ${dir}/${name}/data...`)
      await createDir(dir, name, "data")
      console.log(`Finishing creating data directory ${dir}/${name}/data\n`)

      // Create namespace folders
      for (const namespace in this.namespaces) {
        console.log(`--Creating namespace ${namespace}...`)
        await createDir(dir, name, "data", namespace)

        // Create recipe folder
        if (Object.keys(this.namespaces[namespace].recipes).length > 0) {
          console.log(`----Creating recipe folder for namespace ${namespace}...`)
          await createDir(dir, name, "data", namespace, "recipes")

          for (const recipe in this.namespaces[namespace].recipes) {
            console.log(`------Creating recipe ${recipe} for namespace ${namespace}...`)
            await fs.writeFile(path.join(process.cwd(), dir, name, "data", namespace, "recipes", recipe + ".json"), JSON.stringify(this.namespaces[namespace].recipes[recipe], undefined, 2))
            console.log(`------Finishing creating recipe ${recipe} for namespace ${namespace}\n`)
          }
          console.log(`----Finishing creating recipe folder for namespace ${namespace}\n`)
        }
        console.log(`--Finishing creating namespace ${namespace}\n`)
      }
      console.log("Done!")

    } catch (err) {
      console.error(err)
    }
  }

}

/**
 * Creates a directory and if it exists, log that out and keep on going.
 * @param paths The path to the directory, relative to `process.cwd()`.
 */
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
