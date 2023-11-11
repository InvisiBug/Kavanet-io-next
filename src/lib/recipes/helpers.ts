export const sum = (ingredientSearch: string, recipes: recipe[]) => {
  let counter = 0;
  recipes.forEach((recipie: any) => {
    const { ingredients } = recipie;

    ingredients.forEach((ingredient: any) => {
      if (ingredient.name === ingredientSearch) {
        counter += ingredient.quantity;
      }
    });
  });
  return counter;
};

export const generateUniqueIngredientArray = (recipes: recipe[]) => {
  const ingredients: Array<Ingredients> = [];

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.push({
        name: ingredient.name,
        unit: ingredient.unit,
      });
    });
  });

  const uniqueIngredients = ingredients.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name));

  return uniqueIngredients;
};

type recipe = {
  name: string;
  ingredients: Array<Ingredients>;
};

export type Ingredients = {
  name: string;
  quantity?: number;
  unit: string;
};

export default null;
