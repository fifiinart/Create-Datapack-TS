export interface RecipeObject {
  type: string
  group: string
}

export abstract class Recipe {
  abstract toJSON(): object
}