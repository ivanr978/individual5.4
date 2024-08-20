// script.js

// Función asíncrona para obtener las categorías de recetas
async function fetchCategories() {
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const categories = data.categories;

    // Mostrar resultados en console.log
    console.log("Categorías de recetas:", categories);

    // Mostrar categorías en el DOM
    displayCategories(categories);

    // Ordenar categorías por 'strCategory' y mostrar en console.log
    const sortedCategories = sortCategoriesByCategory(categories);
    console.log("Categorías ordenadas por strCategory:", sortedCategories);
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
  }
}

// Función para mostrar las categorías en el DOM
function displayCategories(categories) {
  const container = document.getElementById("category-container");
  container.innerHTML = "";

  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `<h2>${category.strCategory}</h2>
                               <p>${category.strCategoryDescription}</p>
                               <img src="${category.strCategoryThumb}" alt="${category.strCategory}">`;
    container.appendChild(categoryDiv);
  });
}

// Función para ordenar las categorías por 'strCategory'
function sortCategoriesByCategory(categories) {
  return categories.slice().sort((a, b) => {
    if (a.strCategory < b.strCategory) return -1;
    if (a.strCategory > b.strCategory) return 1;
    return 0;
  });
}

// Event listener para el botón de búsqueda
document
  .getElementById("fetch-button")
  .addEventListener("click", fetchCategories);
