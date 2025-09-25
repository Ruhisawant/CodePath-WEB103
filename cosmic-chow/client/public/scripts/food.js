const renderFood = async () => {
  const requestedID = parseInt(window.location.href.split('/').pop())
  const response = await fetch('/foods')
  const data = await response.json()
  
  let food
  if (data && Array.isArray(data)) {food = data.find(food => food.id === requestedID)}
  
  if (food) {
    document.getElementById('image').src = food.realPhoto
    document.getElementById('name').textContent = food.name
    document.getElementById('spacecraft').textContent = `${food.spacecraft}, ${food.when}`
    document.getElementById('description').textContent = food.description
    document.getElementById('how').textContent = 'How? ' + food.how
    document.title = food.name
  }
  else {
    window.location.href = '/404.html'
  }
}

renderFood()