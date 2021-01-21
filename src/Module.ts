import { Recipe } from "./Recipe";

export class Module {
  recipes: (new (...args: any) => Recipe)[]
  constructor(recipes: (new (...args: any) => Recipe)[]) {
    this.recipes = recipes;
  }

  addRecipe(recipe: (new (...args: any) => Recipe)): this {
    this.recipes.push(recipe);
    return this;
  }
}

