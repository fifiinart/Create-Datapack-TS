export interface RecipeObject {
  type: string
  group: string
}

export interface Recipe<R extends RecipeObject> {
  toJSON(): R
}