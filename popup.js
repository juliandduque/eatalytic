//var APIKEY = 'de003cd15db240a7ab4e0943f7dacdd6';
var APIKEY = 'b9ed14166e594539a9265dc27a63ab2a';
var FOODAPIKEY = '03faadccf572f75070b43d8b34c17487';
var FOODAPI = 'http://food2fork.com/api/search';
var STDLIBAPI = 'https://juliandduque.lib.id/eatMessages@dev/';

function sendText(phone, ingredients, recipeName)
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST", FOODAPI + "?" + "recipient=" + phone + "&body=Recipe Name: " + recipeName + " Ingredients:" + ingredients, false);
    xhr.setRequestHeader("Content-Type", "application/json");

    try {
        xhr.send(null);
    }
    catch (e) {
        alert(e.message);
    }
}


function queryFoodApi(ingredients) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", FOODAPI + "?" + "key=" + FOODAPIKEY + "&sort=r&q=" + ingredients.slice(0, 3), false);

    setChildTextNode('languageSpan', '');
    setChildTextNode('ingreidentsTitle', "Ingredients: ");
    setChildTextNode('ingreidentsText', "\n" + ingredients);

    try {
        xhr.send(null);

        var jsonObject = JSON.parse(xhr.responseText);

        var RecipeURL = jsonObject.recipes[0].f2f_url;
        setChildTextNode('recipeTitle', "\n\nRecipe:");
        setChildTextNode('recipeText', "\n" + RecipeURL);

        sendText("17863188066", ingredients, jsonObject.recipes[0].title);
        //chrome.tabs.create({ active: true, url: RecipeURL });

    }
    catch (e) {
        setChildTextNode('recipeText', '\n\nCould not find a recipe for this particular image');
        alert(e.message);
    }

}

function setChildTextNode(elementId, text) {
    document.getElementById(elementId).innerText = text;
}

function log(d) {
    try {
        alert(JSON.stringify(d, null, 2));
    } catch (e) {
        alert(d);
    }
}

function displayIngredients(d) {
    try {
        var ingredients = d.outputs[0].data.concepts;
        var filteredIngredients = [];
        for (i = 0; i < ingredients.length; i++) {
            if (ingredients[i].value > 0.85) filteredIngredients.push(ingredients[i].name);
        }
        queryFoodApi(filteredIngredients);

    } catch (e) {
        alert(e.message);
    }
}

document.addEventListener('DOMContentLoaded', function () {


    setChildTextNode('languageSpan', "Finding your recipe...");

    chrome.tabs.captureVisibleTab(null, null, function (image) {
        try {
            var app = new Clarifai.App({
                apiKey: APIKEY
            });
            image = image.replace("data:image/jpeg;base64,", "");
            image.replace(" ", "+");

            app.models.predict(Clarifai.FOOD_MODEL, image)
                .then(displayIngredients)
                .catch(log);
        }
        catch (e) {
            log(e);
        }
    });
});
