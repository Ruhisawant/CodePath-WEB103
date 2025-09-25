const renderFoods = async () => {
  const response = await fetch('/foods')
  const foods = await response.json()
  const mainContent = document.getElementById('main-content')

  // Floating animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    .food-card {
      animation: float 3s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);

  // Pre-defined static positions for each food
  const staticPositions = [
    { x: 5, y: 8 },     // Beef & Liver Puree
    { x: 45, y: 68 },   // Tang Drink Mix
    { x: 80, y: 50 },   // Shrimp Cocktail
    { x: 8, y: 43 },    // Tortillas
    { x: 65, y: 27 },   // Ramen Noodles
    { x: 18, y: 23 },   // Dried Seaweed
    { x: 85, y: 25 },   // Pizza
    { x: 30, y: 85 },   // Sushi
    { x: 50, y: 18 },   // Espresso
    { x: 65, y: 70 },   // Steak
    { x: 70, y: 5 },    // Corned Beef Sandwich
    { x: 33, y: 8 },    // Chocolate Pudding
    { x: 5, y: 80 },    // Ice Cream
    { x: 85, y: 80 },   // Lettuce
    { x: 18, y: 65 }    // Peanut Butter
  ];

  const container = document.createElement('div');

  // Create food cards with static positions
  foods.forEach((food, index) => {
    const foodCard = document.createElement('div');
    foodCard.className = 'food-card';

    const position = staticPositions[index] || { x: 50, y: 50 };
    const cardSize = window.innerWidth < 768 ? (window.innerWidth < 480 ? 100 : 120) : 150;
    
    const actualX = (position.x / 100) * window.innerWidth;
    const actualY = (position.y / 100) * window.innerHeight;

    foodCard.style.position = 'absolute';
    foodCard.style.left = actualX + 'px';
    foodCard.style.top = actualY + 'px';
    foodCard.style.width = cardSize + 'px';
    foodCard.style.height = cardSize + 'px';
    
    foodCard.style.animationDelay = (index * 0.2) + 's';

    foodCard.onclick = () => {window.location.href = `/foods/${food.id}`};
    foodCard.innerHTML = `<img src="${food.image}" alt="${food.name}">`;

    container.appendChild(foodCard);
  });
  mainContent.appendChild(container);
}

// Determine which function to run based on the current page
const currentPath = window.location.pathname;

if (currentPath.startsWith('/foods/') && currentPath !== '/foods/') {
  // This is a food detail page
  renderFood();
} else if (currentPath === '/' || currentPath === '/foods' || currentPath === '/foods/') {
  // This is the main foods list page
  document.addEventListener('DOMContentLoaded', renderFoods);
}