// Edamam API
const APIID = '086bc706';
const APIKEY = '93ef899b6a19a965c8c69686bd84e4e7';

//Selectors
const searchInput = document.getElementById('searchTerm');
const searchButton = document.getElementById('searchButton');
const searchList = document.getElementById('recipes'); 

parsedRecipes:any = [];
recipesList:any = [];

//Event Listeners
searchButton.addEventListener('click',searchForRecipes);

//Object Constructors
function Recipe(label,source,url,image,ingredients)
{
    this.label = label;
    this.source = source;
    this.url=url;
    this.image = image;
    this.ingredients = ingredients;
}

function Ingredient(id,name,measurement)
{
    this.name = name;
    this.measurement = measurement;
}

//Functions
function searchForRecipes()
{  
    //Remove existing search result if it exists
    while(searchList.hasChildNodes()){
        searchList.removeChild(searchList.lastChild);
    }

    //Connect to the API using XMLHttpRequest
    var request = new XMLHttpRequest();
    
    request.open('GET', `https://api.edamam.com/search?q=${searchInput.value}&app_id=${APIID}&app_key=${APIKEY}`);

    request.onreadystatechange = function(){ //Use anonymous function to observe request states

        if(request.readyState == 4 && request.status == 200){ //Check if request state is on complete(4) and request status is successful (200)
            
            //Get request response and assign it to an array
            let response = request.response;
            parsedRecipes = JSON.parse(response);
            recipesList = parsedRecipes.hits;

            //Loop through the array that contains recipes and push them to the list

            recipesList.forEach(element => {  
                
                let single = element.recipe;
                let recipe = new Recipe(single.label,single.source,single.url,single.image);

                let ingredientlist=single.ingredients;
                let ingredients = [];
                
                ingredientlist.forEach(element=>{
                    let ingredient = new Ingredient(element.text,element.weight);
                    
                    ingredients.append(ingredient)
                });
                
                recipe.ingredients = ingredients;

                let item = document.createElement('li'); 
                let link  = document.createElement('a');  
                link.textContent = element.recipe.label; 
                link.href = element.recipe.url;
                item.appendChild(link);  
                searchList.append(item)
            }); 
            //Check if search was found
            if(recipesList.length == 0){
                searchList.append('Search result not found...');
            }
        }
    } 
    request.send();
}
 