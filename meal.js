const loadMeals = (searchText) =>{
    const url = `
    https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}
    `;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {
    //     )
    // step 1: container element
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';
    meals.forEach( meal => {
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
                      <button onclick="loadMealDetail2(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">
                      Details
                    </button>
                  </div>

        `;
        // step 4: appendChild
        mealsContainer.appendChild(mealDiv);
    });
}

// search meals
const searchMeals = () => {
    const searchText = document.getElementById('search-field').value;  
    loadMeals(searchText);
}
// modal part
// const loadMealDetail = idMeal => {
//     const url = `
//     https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}
//     `
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayMealDetails(data))
//     .catch(error => {
//         console.log(error)
//     })
// }

// async await
const loadMealDetail2 = async(idMeal) => {
    const url = `
    https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}
    `
    // main async await steps

    // const res = await fetch(url);
    // const data = await res.json();
    // displayMealDetails(data)

    // add error and async await
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayMealDetails(data)
    }
    catch(error){
        console.log('Error: ', error)
    }
}

const displayMealDetails = meal => {
    document.getElementById('mealDetailsLabel').innerText = meal.meals[0].strMeal;
    const modalDetails = document.getElementById('Modal-details-body')
    modalDetails.innerHTML = `
        <h4>ID: ${meal.meals[0].idMeal}</h4> </br>
        <h4>Category: ${meal.meals[0].strCategory}</h4> </br>
        <img src="${meal.meals[0].strMealThumb}" class="card-img-top img-fluid">
        Youtube: ${meal.meals[0].strYoutube}
        `
        // console.log(meal.meals);
};

loadMeals('rice');
