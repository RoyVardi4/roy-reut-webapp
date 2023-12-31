interface IRecipe {
  id: number;
  title: string;
  image: string;
  summary?: string;
  instructions?: string;
  readyInMinutes?: number;
  aggregateLikes?: number;
}

export type { IRecipe };
