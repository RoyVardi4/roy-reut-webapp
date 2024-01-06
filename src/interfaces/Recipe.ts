interface IBasicRecipe {
  summary?: string;
  instructions?: string;
  readyInMinutes?: number;
  aggregateLikes?: number;
}

interface IRecipe extends IBasicRecipe {
  id: number;
  title: string;
  image?: string;
}

interface IMyRecipe extends IBasicRecipe {
  _id?: string;
  title?: string;
}

export type { IRecipe, IMyRecipe };
