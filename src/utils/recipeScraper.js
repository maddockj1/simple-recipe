// Basic recipe scraping utility
export const scrapeRecipe = async (url) => {
  try {
    // Due to CORS restrictions, we'll need a proxy or backend service
    // For now, we'll use a free CORS proxy (not recommended for production)
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');
    
    // Look for common recipe schema markup
    const jsonLd = doc.querySelector('script[type="application/ld+json"]');
    if (jsonLd) {
      const schemaData = JSON.parse(jsonLd.textContent);
      if (schemaData['@type'] === 'Recipe') {
        return {
          title: schemaData.name,
          ingredients: Array.isArray(schemaData.recipeIngredient) ? 
            schemaData.recipeIngredient : [],
          instructions: Array.isArray(schemaData.recipeInstructions) ?
            schemaData.recipeInstructions.map(instruction => 
              typeof instruction === 'string' ? instruction : instruction.text
            ) : [],
          credit: schemaData.author?.name || url
        };
      }
    }
    
    // Fallback to basic HTML parsing
    const title = doc.querySelector('h1')?.textContent;
    const ingredientsList = Array.from(doc.querySelectorAll('ul li, ol li'))
      .map(el => el.textContent.trim())
      .filter(text => text.length > 0);
    const instructionsList = Array.from(doc.querySelectorAll('ol li'))
      .map(el => el.textContent.trim())
      .filter(text => text.length > 0);
    
    return {
      title,
      ingredients: ingredientsList,
      instructions: instructionsList,
      credit: url
    };
  } catch (error) {
    throw new Error('Failed to scrape recipe from URL');
  }
};

// Enhanced text parsing utility
export const parseRecipeText = (text) => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  const recipe = {
    title: '',
    ingredients: [],
    instructions: [],
    credit: '',
    category: 'food'
  };

  let currentSection = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lowerLine = line.toLowerCase();

    // Skip empty lines
    if (!line) continue;

    // First non-empty line is usually the title
    if (!recipe.title) {
      recipe.title = line;
      continue;
    }

    // Check for section headers
    if (lowerLine.includes('ingredient')) {
      currentSection = 'ingredients';
      continue;
    } else if (lowerLine.includes('instruction') || lowerLine.includes('method')) {
      currentSection = 'instructions';
      continue;
    } else if (lowerLine.includes('credit') || lowerLine.includes('recipe by')) {
      currentSection = 'credit';
      continue;
    }

    // Process line based on current section
    if (currentSection === 'ingredients') {
      const cleanLine = line.replace(/^[\d\.\-\•\*]+\s*/, '').trim();
      if (cleanLine) recipe.ingredients.push(cleanLine);
    } else if (currentSection === 'instructions') {
      const cleanLine = line.replace(/^[\d\.\-]+\s*/, '').trim();
      if (cleanLine) recipe.instructions.push(cleanLine);
    } else if (currentSection === 'credit') {
      recipe.credit = line;
    }

    // Check if it's a drink recipe
    if (lowerLine.includes('drink') || lowerLine.includes('cocktail') || 
        lowerLine.includes('smoothie') || lowerLine.includes('juice')) {
      recipe.category = 'drink';
    }
  }

  return recipe;
}; 