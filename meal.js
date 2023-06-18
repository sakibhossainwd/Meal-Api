const loadMeals = (searchText) =>{
    const url = `
    https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}
    `;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {
    // console.log(meals[0].strMeal
    //     )
    // step 1: container element
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';
    meals.forEach( meal => {
        // console.log(meal)
        // step 2: create child for each element
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        // step 3: set content of the child
        mealDiv.innerHTML =`
                  <div class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <p class="card-text">${meal.strInstructions}</p>
                      <button onclick="loadMealDetail(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">
                      Details
                    </button>
                  </div>

        `;


        // step 4: appendChild
        mealsContainer.appendChild(mealDiv);
    });
}
 
const searchMeals = () => {
    const searchText = document.getElementById('search-field').value;
    // search meals
    console.log(searchText);  
    loadMeals(searchText);
}

const loadMealDetail = idMeal => {
    console.log(idMeal);
    const url = `
    https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}
    `
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data))
}
const modalDetails = document.getElementById('Modal-details-body')

const displayMealDetails = meal => {
    document.getElementById('mealDetailsLabel').innerText = meal.meals[0].strMeal;
    
     modalDetails.innerHTML = `
        ID: ${meal.meals[0].idMeal} </br>
        Category: ${meal.meals[0].strCategory} </br>
        <img src="${meal.meals[0].strMealThumb}" class="card-img-top img-fluid">
        Youtube: ${meal.meals[0].strYoutube}
        `
        // console.log(meal.meals[0].strMeal);
};

loadMeals('fish');
