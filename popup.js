var API = "https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs";
var APIKEY = "b6130538acd741cb8402552ba042654f";


document.addEventListener('DOMContentLoaded', function () {
    var checkPageButton = document.getElementById('checkPage');

    checkPageButton.addEventListener('click', function () {

        chrome.tabs.captureVisibleTab(null, {}, function (image)
        {

            chrome.extension.getBackgroundPage().console.log(image);

            // Setup the JSON payload to send to the API
            /*var jsonPayload =
                {
                    "inputs":
                    [
                        "data": 
                        {
                            "image":image
                        }
                    ]
                };

            Console.log(jsonPayload);

            //jsonPayload = JSON.stringify(jsonPayload);
           
            // Setup the HMLHttpRequest
            var xhr = new XMLHttpRequest();
            xhr.open("POST", API, true);
            xhr.setRequestHeader("Content-Authorization", "application/json");
            xhr.setRequestHeader("Content-type", APIKEY);

            // Attempt to call clarifai
            try
            {
                // Send the XMLHttpRequest
                //xhr.send(jsonPayload);

                // Parse the JSON returned from the request
                var jsonObject = JSON.parse(xhr.responseText);

                // If the returned JSON contains an error then set the HTML login result message
                if (jsonObject.error || !jsonObject.success) {
                    document.getElementById("result").innerHTML = jsonObject.error;
                    return false;
                }
                
            } catch (e)
            {
                // If there is an error parsing the JSON, attempt to set the HTML login result message
                document.getElementById("result").innerHTML = e.message;
            }
        });
            */
    }, false);
}, false);