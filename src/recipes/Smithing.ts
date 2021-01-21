import { Recipe, RecipeObject } from "../Recipe";
import { Item } from "./Item";
export interface SmithingRecipeObject extends RecipeObject {
  base: Item,
  addition: Item,
  result: Item
}
export class SmithingRecipe implements SmithingRecipeObject, Recipe<SmithingRecipeObject> {
  type = "minecraft:stonecutting"
  group: string
  base: Item
  addition: Item
  result: Item

  constructor(recipeObject: Omit<SmithingRecipeObject, "type">)
  constructor(group: string, base: Item, addition: Item, result: Item)
  constructor(recipeObjectOrGroup: Omit<SmithingRecipeObject, "type"> | string, base?: Item, addition?: Item, result?: Item) {
    if (typeof recipeObjectOrGroup === "object") {
      this.group = recipeObjectOrGroup.group;
      this.base = recipeObjectOrGroup.base;
      this.addition = recipeObjectOrGroup.addition;
      this.result = recipeObjectOrGroup.result;
    } else {
      if (base == undefined || addition == undefined || result == undefined) throw new Error("Not all parameters were passed in at SmithingRecipe()")
      this.group = recipeObjectOrGroup;
      this.base = base;
      this.addition = addition;
      this.result = result;
    }
  }

  toJSON = () => ({
    type: this.type,
    group: this.group,
    base: this.base,
    addition: this.addition,
    result: this.result
  })
}