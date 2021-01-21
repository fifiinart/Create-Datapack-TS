export type Item = { id: string } | { tag: string }
export type CountableItem = Item & { count?: number }