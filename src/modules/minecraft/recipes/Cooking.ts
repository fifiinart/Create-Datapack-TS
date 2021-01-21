import { Recipe, RecipeObject } from "../../../Recipe";
import { Item } from "../../../util/Item";
export interface CookingObject extends RecipeObject {
  ingredient: Item | Item[],
  result: string,
  experience: number,
  cookingtime?: number
}

export class CookingRecipe implements Recipe, CookingObject {
  type: string;
  group: string
  ingredient: Item | Item[]
  result: string
  experience: number
  cookingtime?: number

  constructor(recipeObject: Omit<CookingObject, "type">)
  constructor(group: string, ingredient: Item | Item[], result: string, experience: number, cookingtime?: number)
  constructor(recipeObjectOrGroup: Omit<CookingObject, "type"> | string, ingredient?: Item | Item[], result?: string, experience?: number, cookingtime?: number) {
    if (typeof recipeObjectOrGroup === "object") {
      this.group = recipeObjectOrGroup.group;
      this.ingredient = recipeObjectOrGroup.ingredient;
      this.result = recipeObjectOrGroup.result;
      this.experience = recipeObjectOrGroup.experience;
      this.cookingtime = recipeObjectOrGroup.cookingtime
    } else {
      if (ingredient == undefined || result == undefined || experience == undefined) throw new Error("Not all parameters were passed in at CookingRecipe()")
      this.group = recipeObjectOrGroup;
      this.ingredient = ingredient;
      this.result = result;
      this.experience = experience;
      this.cookingtime = cookingtime
    }
  }

  toJSON() {
    return {
      type: this.type,
      group: this.group,
      ingredient: this.ingredient,
      result: this.result,
      experience: this.experience,
      cookingtime: this.cookingtime
    }
  }
}