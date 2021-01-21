import { Recipe, RecipeObject } from "./Recipe"

export class Namespace {
  recipies: {
    [key: string]: Recipe<any>
  } = {};
  addRecipe<R extends RecipeObject>(name: string, recipe: Recipe<R>): this {
    this.recipies[name] = recipe;
    return this;
  }
}