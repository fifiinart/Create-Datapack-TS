import { Module } from "../../Module";
import { BlastingRecipe } from "./recipes/Blasting";
import { CampfireCookingRecipe } from "./recipes/CampfireCooking";
import { CraftingShapedRecipe } from "./recipes/CraftingShaped";
import { CraftingShapelessRecipe } from "./recipes/CraftingShapeless";
import { SmeltingRecipe } from './recipes/Smelting'
import { SmithingRecipe } from "./recipes/Smithing";
import { SmokingRecipe } from "./recipes/Smoking";
import { StonecuttingRecipe } from "./recipes/Stonecutting";

export const Minecraft = new Module([
  BlastingRecipe,
  CampfireCookingRecipe,
  CraftingShapedRecipe,
  CraftingShapelessRecipe,
  SmeltingRecipe,
  SmithingRecipe,
  SmokingRecipe,
  StonecuttingRecipe
])