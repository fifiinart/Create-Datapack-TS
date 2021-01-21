import { Recipe, RecipeObject } from "../../../Recipe";
import { CountableItem, Item } from "../../../util/Item";
export interface CraftingShapelessObject extends RecipeObject {
  ingredients: Array<Item | Item[]>
  result: CountableItem
}
export class CraftingShapelessRecipe implements CraftingShapelessObject, Recipe {
  type = "minecraft:crafting_shapeless"
  group: string
  ingredients: Array<Item | Item[]>
  result: CountableItem

  constructor(recipeObject: Omit<CraftingShapelessObject, "type">)
  constructor(group: string, ingredients: Array<Item | Item[]>, result: CountableItem)
  constructor(recipeObjectOrGroup: Omit<CraftingShapelessObject, "type"> | string, ingredients?: Array<Item | Item[]>, result?: CountableItem) {
    if (typeof recipeObjectOrGroup === "object") {
      this.group = recipeObjectOrGroup.group;
      this.ingredients = recipeObjectOrGroup.ingredients;
      this.result = recipeObjectOrGroup.result;
    } else {
      if (ingredients == undefined || result == undefined) throw new Error("Not all parameters were passed in at CraftingShapelessRecipe()")
      if (ingredients.length < 1 || ingredients.length > 9) throw new Error("Invalid number of ingredients at CraftingShapelessRecipe()")
      this.group = recipeObjectOrGroup;
      this.ingredients = ingredients;
      this.result = result;
    }
  }

  toJSON = () => ({
    type: this.type,
    group: this.group,
    ingredients: this.ingredients,
    result: this.result
  })
}