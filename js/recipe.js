// Edamam API
const apiId = '086bc706';
const apiKey = '93ef899b6a19a965c8c69686bd84e4e7';

//Selectors

const searchInput = document.getElementById('searchButton');
const searchButton = document.getElementById('searchButton');

//Event Listeners
searchButton.addEventListener('click',searchForRecipes);


let searchTerm='chicken';

function searchForRecipes()
{
    //Connect to the API using XMLHttpRequest
    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.edamam.com/search?$q={searchTerm}&api_id={YOUR_APP_ID}&app_key={YOUR_APP_KEY}');

    request.onload = function(){
        var response = request.response;
        var parsedData = JSON.parse(response);
    
        foreach(item in parsedData)
        {
            let recipe = document.createElement('li');
            recipe.innerHTML = parsedData[item].name;
            document.body.appendChild(recipe);

            let image = document.createElement('img');
            image.setAttribute('src', parsedData[item].imgUrl);
            document.body.appendChild(image);
            }   
    }

    request.send();
}




/* //Connect to the API using AJAX
//------------------------------

$.ajax({
    url:'https://api.edamam.com/search?q=chickenpp_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}',
    success: function(response)
    {
        console.log(response)
    }
})

//Connect to the API using Fetch
//------------------------------

fetch('https://api.edamam.com/search?q=chickenpp_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}')
.then(function(response){
    return response.json();
}
)
.then(
    function(respData){
        console.log(respData);
    }
)



 */