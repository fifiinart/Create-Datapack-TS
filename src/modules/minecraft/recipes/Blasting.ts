import { CookingRecipe, CookingObject } from "./Cooking";
import { Item } from "../../../util/Item";

export class BlastingRecipe extends CookingRecipe {
  type: "minecraft:blasting";
  constructor(recipeObject: Omit<CookingObject, "type">)
  constructor(group: string, ingredient: Item | Item[], result: string, experience: number, cookingtime?: number)
  constructor(recipeObjectOrGroup: Omit<CookingObject, "type"> | string, ingredient?: Item | Item[], result?: string, experience?: number, cookingtime?: number) {
    if (typeof recipeObjectOrGroup === 'string') {
      if (result !== undefined && experience !== undefined && ingredient !== undefined) {
        super(recipeObjectOrGroup, ingredient, result, experience, cookingtime)
      } else {
        throw new Error("Not all parameters were passed in at Blasting()")
      }
    } else {
      super(recipeObjectOrGroup);
    }
    this.type = "minecraft:blasting";
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