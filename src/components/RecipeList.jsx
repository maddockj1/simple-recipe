import React, { useState } from 'react';
import Recipe from './Recipe';
import SearchBar from './SearchBar';
import { recipes } from '../data/recipes';

const RecipeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

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
      <h1>Enzo's Family Cookbook</h1>
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