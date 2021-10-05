
var API_ENDPOINT = 'https://XXXXXXXX.execute-api.us-east-1.amazonaws.com/XXXXXXXX/XXXXXXXXXX';


var errorDiv = document.getElementById('error-message')
var successDiv = document.getElementById('success-message')
var resultsDiv = document.getElementById('results-message')

// output should return input button contents
function waitSecondsValue() { 
return "10"
}

function messageValue() { 
return document.getElementById('message').value 
}

function nameValue() { 
return document.getElementById('senderName').value 
}

function emailValueSender() { 
return document.getElementById('senderEmail').value 
}

function emailValue() { 
return "XXXXXX@XXXXX.com"
}


function clearNotifications() {
    errorDiv.textContent = '';
    resultsDiv.textContent = '';
    successDiv.textContent = '';
}

// On button click, these pass values to API Gateway call

document.getElementById('emailButton').addEventListener('click', function(e) { sendData(e, 'email'); });



function sendData (e, pref) {
    e.preventDefault()
    clearNotifications()
    fetch(API_ENDPOINT, {
        headers:{
            "Content-type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({
            waitSeconds: waitSecondsValue(),
            preference: pref,
			message: messageValue(),
			senderName: nameValue(),
			senderEmail: emailValueSender(),
            email: emailValue(),
     
        }),
        mode: 'cors'
    })
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data)
        successDiv.textContent = 'Submitted. But check the result below!';
        resultsDiv.textContent = JSON.stringify(data);
    })
    .catch(function(err) {
        errorDiv.textContent = 'Oops! Error Error:\n' + err.toString();
        console.log(err)
    });
};
