import { Module } from "./Module"
import { Recipe } from "./Recipe";

export class Namespace {
  modules: Module[]
  recipes: {
    [key: string]: Recipe
  }
  constructor(modules: Module[]) {
    this.modules = modules;
  }

  addRecipe(key: string, recipe: Recipe): this {
    let recipeValid = false;
    for (const module of this.modules) {
      for (const validRecipeConstructor of module.recipes) {
        if (recipe.constructor === validRecipeConstructor) {
          recipeValid = true;
          break;
        }
      }
      if (recipeValid) break;
    }
    if (!recipeValid) throw new Error("Invalid recipe at addRecipe: Please register module in surrounding Datapack.")
    this.recipes[key] = recipe;
    return this;
  }

}