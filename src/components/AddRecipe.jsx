import React, { useState } from 'react';
import { parseRecipeText } from '../utils/recipeScraper';

const AddRecipe = ({ onAddRecipe }) => {
  const [recipeInput, setRecipeInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: 'food',
    ingredients: [''],
    instructions: [''],
    credit: ''
  });

  const handleInputChange = (e) => {
    setRecipeInput(e.target.value);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleParse = () => {
    try {
      const parsedRecipe = parseRecipeText(recipeInput);
      setFormData({
        title: parsedRecipe.title,
        category: parsedRecipe.category,
        ingredients: parsedRecipe.ingredients.length ? parsedRecipe.ingredients : [''],
        instructions: parsedRecipe.instructions.length ? parsedRecipe.instructions : [''],
        credit: parsedRecipe.credit
      });
      setRecipeInput('');
    } catch (error) {
      alert('Could not parse recipe. Please check the format and try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    if (!formData.title.trim() || 
        !formData.ingredients[0].trim() || 
        !formData.instructions[0].trim()) {
      alert('Please fill in at least the title, one ingredient, and one instruction');
      return;
    }

    // Add the recipe
    onAddRecipe(formData);
    
    // Reset form
    setFormData({
      title: '',
      category: 'food',
      ingredients: [''],
      instructions: [''],
      credit: ''
    });
  };

  return (
    <div className="add-recipe-container">
      <h1>Add New Recipe</h1>
      
      <div className="input-section">
        <textarea
          className="recipe-input"
          placeholder="Paste your recipe here...

Example format:
Chocolate Chip Cookies

Ingredients:
- 2 1/4 cups flour
- 1 cup butter
- 2 eggs

Instructions:
1. Mix ingredients
2. Bake at 350°F

Credit: Grandma's Recipe"
          value={recipeInput}
          onChange={handleInputChange}
        />
        <button 
          className="submit-btn" 
          onClick={handleParse}
          disabled={!recipeInput.trim()}
        >
          Parse Recipe
        </button>
      </div>

      <form className="recipe-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleFormChange}>
            <option value="food">Food</option>
            <option value="drink">Drink</option>
          </select>
        </div>

        <div className="form-group">
          <label>Credit</label>
          <input
            type="text"
            name="credit"
            value={formData.credit}
            onChange={handleFormChange}
          />
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleArrayChange(index, 'ingredients', e.target.value)}
            />
          ))}
        </div>

        <div className="form-group">
          <label>Instructions</label>
          {formData.instructions.map((instruction, index) => (
            <input
              key={index}
              type="text"
              value={instruction}
              onChange={(e) => handleArrayChange(index, 'instructions', e.target.value)}
            />
          ))}
        </div>

        <button type="submit" className="submit-btn">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe; 