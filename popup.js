var APIKEY = 'de003cd15db240a7ab4e0943f7dacdd6';


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

function displayIngredients(d)
{
    try
    {
        var ingredients = d.outputs[0].data.concepts;
        var filteredIngredients = [];
        for (i = 0; i < ingredients.length; i++)
        {
            if (ingredients[i].value > 0.75) filteredIngredients.push(ingredients[i].name);
        }
        setChildTextNode('languageSpan', filteredIngredients);
    } catch (e) {
        alert(e.message);
    }
}

document.addEventListener('DOMContentLoaded', function() {


    setChildTextNode('languageSpan', "Finding your recipe...");

    chrome.tabs.captureVisibleTab(null, null,function (image)
    {
        try
        {
            var app = new Clarifai.App({
                apiKey: APIKEY
            });
            image = image.replace("data:image/jpeg;base64,", "");
            image.replace(" ", "+");

            app.models.predict(Clarifai.FOOD_MODEL, image)
            .then(displayIngredients)
            .catch(log);
        }
        catch (e)
        {
            log(e);
        }
    });
});
