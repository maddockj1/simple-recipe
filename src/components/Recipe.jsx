import React from 'react';

const Recipe = ({ title, ingredients, instructions, credit, category }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-header">
        <h2 className="recipe-title">{title}</h2>
        <span className={`recipe-category ${category}`}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>
      {credit && <p className="recipe-credit">Recipe from: {credit}</p>}
      <div className="recipe-content">
        <div className="recipe-section ingredients">
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="recipe-section instructions">
          <h3>Instructions</h3>
          <ol>
            {instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Recipe; 