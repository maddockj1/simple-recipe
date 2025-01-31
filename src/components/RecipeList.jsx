import React, { useState } from 'react';
import Recipe from './Recipe';
import SearchBar from './SearchBar';

const RecipeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const recipes = [
    {
      title: 'Spaghetti Carbonara',
      category: 'food',
      ingredients: [
        '400g spaghetti',
        '200g pancetta',
        '4 large eggs',
        '100g Parmesan cheese',
        'Black pepper'
      ],
      instructions: [
        'Cook pasta according to package instructions',
        'Fry pancetta until crispy',
        'Mix eggs and cheese in a bowl',
        'Combine pasta with pancetta and egg mixture',
        'Season with black pepper'
      ],
      credit: 'Jamie Oliver'
    },
    {
      title: 'Classic Burger',
      category: 'food',
      ingredients: [
        '500g ground beef',
        'Burger buns',
        'Lettuce',
        'Tomato slices',
        'Cheese slices'
      ],
      instructions: [
        'Form beef into patties',
        'Season with salt and pepper',
        'Grill until desired doneness',
        'Assemble burger with toppings'
      ],
      credit: 'Gordon Ramsay'
    },
    {
      title: 'Mojito',
      category: 'drink',
      ingredients: [
        '2 oz white rum',
        '1 oz fresh lime juice',
        '0.75 oz simple syrup',
        '6-8 fresh mint leaves',
        'Soda water',
        'Ice'
      ],
      instructions: [
        'Muddle mint leaves with simple syrup in a glass',
        'Add lime juice and rum',
        'Fill glass with ice',
        'Top with soda water',
        'Garnish with mint sprig'
      ],
      credit: 'Classic Cocktail Recipe'
    },
    {
      title: 'Strawberry Smoothie',
      category: 'drink',
      ingredients: [
        '2 cups fresh strawberries',
        '1 banana',
        '1 cup yogurt',
        '1/2 cup milk',
        'Honey to taste',
        'Ice cubes'
      ],
      instructions: [
        'Clean and hull strawberries',
        'Combine all ingredients in blender',
        'Blend until smooth',
        'Adjust sweetness with honey if needed'
      ],
      credit: 'Healthy Smoothie Collection'
    }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory = activeCategory === 'all' || recipe.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="recipe-list">
      <h1>My Recipe Collection</h1>
      <div className="category-filters">
        <button 
          className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        <button 
          className={`category-btn ${activeCategory === 'food' ? 'active' : ''}`}
          onClick={() => setActiveCategory('food')}
        >
          Food
        </button>
        <button 
          className={`category-btn ${activeCategory === 'drink' ? 'active' : ''}`}
          onClick={() => setActiveCategory('drink')}
        >
          Drinks
        </button>
      </div>
      <SearchBar onSearch={setSearchTerm} />
      {filteredRecipes.map((recipe, index) => (
        <Recipe
          key={index}
          title={recipe.title}
          ingredients={recipe.ingredients}
          instructions={recipe.instructions}
          credit={recipe.credit}
          category={recipe.category}
        />
      ))}
    </div>
  );
};

export default RecipeList; 