import { Recipe, RecipeObject } from "../../../Recipe";
import { CountableItem, Item } from "../../../util/Item";
export interface CraftingShapedObject extends RecipeObject {
  pattern: string[];
  key: ShapedCraftingKey
  result: CountableItem
}

interface ShapedCraftingKey {
  [key: string]: Item | Item[]
}

export class CraftingShapedRecipe implements CraftingShapedObject, Recipe {
  type = "minecraft:crafting_shaped"
  group: string
  pattern: string[]
  key: ShapedCraftingKey
  result: CountableItem

  constructor(group: string, pattern: string[], key: ShapedCraftingKey, result: CountableItem)
  constructor(recipeObject: Omit<CraftingShapedObject, "type">)
  constructor(recipeObjectOrGroup: string | Omit<CraftingShapedObject, "type">, pattern?: string[], key?: ShapedCraftingKey, result?: CountableItem) {
    if (typeof recipeObjectOrGroup === "object") {
      this.pattern = recipeObjectOrGroup.pattern;
      this.group = recipeObjectOrGroup.group;
      this.key = recipeObjectOrGroup.key;
      this.result = recipeObjectOrGroup.result;
    } else {
      if (pattern == undefined || key == undefined || result == undefined) throw new Error("Not all parameters were passed in at CraftingShapelessRecipe()")
      this.pattern = pattern;
      this.group = recipeObjectOrGroup;
      this.key = key;
      this.result = result;
    }
  }

  toJSON = () => ({
    type: this.type,
    pattern: this.pattern,
    group: this.group,
    key: this.key,
    result: this.result
  })
}