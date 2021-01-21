import { Recipe, RecipeObject } from "../Recipe";
import { Item } from "./Item";
export interface StonecuttingRecipeObject extends RecipeObject {
  ingredient: Item | Item[]
  result: Item & { count: number }
}
export class StonecuttingRecipe implements StonecuttingRecipeObject, Recipe<StonecuttingRecipeObject> {
  type = "minecraft:stonecutting"
  group: string
  ingredient: Item | Item[]
  result: Item & { count: number }

  constructor(recipeObject: Omit<StonecuttingRecipeObject, "type">)
  constructor(group: string, ingredients: Item | Item[], result: Item & { count: number })
  constructor(recipeObjectOrGroup: Omit<StonecuttingRecipeObject, "type"> | string, ingredient?: Item | Item[], result?: Item & { count: number }) {
    if (typeof recipeObjectOrGroup === "object") {
      this.group = recipeObjectOrGroup.group;
      this.ingredient = recipeObjectOrGroup.ingredient;
      this.result = recipeObjectOrGroup.result;
    } else {
      if (ingredient == undefined || result == undefined) throw new Error("Not all parameters were passed in at CraftingShapelessRecipe()")
      this.group = recipeObjectOrGroup;
      this.ingredient = ingredient;
      this.result = result;
    }
  }

  toJSON = () => ({
    type: this.type,
    group: this.group,
    ingredient: this.ingredient,
    result: this.result
  })
}