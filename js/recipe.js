// Edamam API id and key, stored as constants because they will not change.
const APIID = '086bc706';
const APIKEY = '93ef899b6a19a965c8c69686bd84e4e7';

//Selectors
const searchInput = document.getElementById('searchTerm');
const searchButton = document.getElementById('searchButton');

//Event Listeners
searchButton.addEventListener('click',searchForRecipes);

function displayResult(result)
{
    console.log(result);  
}


function searchForRecipes()  //This is an example of a NAMED FUNCTION
{
    //1.  Connect to the API using XMLHttpRequest
    let request = new XMLHttpRequest();
    let parsedData;

    request.open('GET', `https://api.edamam.com/search?q=chicken&app_id=${APIID}&app_key=${APIKEY}`);

    request.onload = function(){  //This is an example of an anonymous function

        parsedData = JSON.parse(request.response);

        //2.  Display the results returned from the API
        displayResult(parsedData);  
    }

    request.send();
}
