function translateMessagesInContentScript(targetLang) {
    console.log(`Starting translation to: ${targetLang}`);

    const apiKey = "64d9aebfbe67459e87401a106aa0fa3a"; // Replace with your actual API key

 
    const messages = document.querySelectorAll(".message-in, .message-out");

    messages.forEach(message => {
        const originalText = message.innerText;
        if (originalText) {
            translateTextUsingAPI(apiKey, originalText, targetLang, translatedText => {
                console.log(`Original: ${originalText}, Translated: ${translatedText}`);

                message.innerText = translatedText;
            });
        }
    });
}

function translateTextUsingAPI(apiKey, text, targetLang, callback) {
    const apiUrl = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLang}`;

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify([{ 'Text': text }]),
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': apiKey,
            'Ocp-Apim-Subscription-Region': "centralindia"
        }
    })
        .then(response => response.json())
        .then(data => {
            const translatedText = data[0]?.translations[0]?.text || text; 
            callback(translatedText);
        })
        .catch(error => {
            console.error('Error during translation:', error);
            callback(text); 
        });
}


