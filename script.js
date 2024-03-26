//<------ LOCAL STORAGE------->

// Funktion för att spara data i localStorage
function saveDataToLocalStorage() {
    // Använd `value` för textarea
    localStorage.setItem('notes', document.getElementById('noteInput').value);
    localStorage.setItem('background', document.body.style.backgroundImage);
    localStorage.setItem('username', document.getElementById('usernameDisplay').textContent);
}

// Funktion för att ladda sparad data från localStorage
function loadDataFromLocalStorage() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes !== null) {
        document.getElementById('noteInput').value = savedNotes;
    }
    const savedBackground = localStorage.getItem('background');
    if (savedBackground) {
        document.body.style.backgroundImage = savedBackground;
    }
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        document.getElementById('usernameDisplay').textContent = savedUsername;
    }
}


//<------ SNABBLÄNKAR ------->

// Funktion för att ta bort en specifik snabblänk
function removeQuickLink(event) {
    event.preventDefault();
    
    const button = event.target;
    const listElementToRemove = button.closest('li');
    listElementToRemove.parentNode.removeChild(listElementToRemove);

    // Uppdatera Local Storage
    saveQuickLinksToLocalStorage();
}

// Funktion för att visa modalen
function showModal() {
    document.getElementById('myModal').style.display = "block";
}

// Funktion för att dölja modalen
function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

// Funktion för att lägga till en snabblänk från modalen
function addQuickLinkFromModal() {
    const url = document.getElementById('modal-url').value;
    const title = document.getElementById('modal-title').value;
    if (url && title) {
        const quickLinksList = document.getElementById('quick-links-list');
        const newLink = document.createElement('li');
        newLink.innerHTML = `<a href="${url}">${title}<button class="removebtn">-</button></a>`;
        quickLinksList.appendChild(newLink);

        document.getElementById('modal-url').value = '';
        document.getElementById('modal-title').value = '';
        closeModal();
        saveQuickLinksToLocalStorage();
    } else {
        alert('Fyll i både URL och titel för länken.');
    }
}

// Funktion för att spara snabblänkar till Local Storage
function saveQuickLinksToLocalStorage() {
    const quickLinksList = document.getElementById('quick-links-list');
    // Ändra så att vi sparar hela innerHTML för varje länk
    const quickLinksHTML = quickLinksList.innerHTML;
    localStorage.setItem('quickLinksHTML', quickLinksHTML);
}

// Funktion för att ladda snabblänkar från Local Storage
function loadQuickLinksFromLocalStorage() {
    const quickLinksHTML = localStorage.getItem('quickLinksHTML');
    if (quickLinksHTML) {
        const quickLinksList = document.getElementById('quick-links-list');
        // Återställ hela innerHTML för snabblänklistan
        quickLinksList.innerHTML = quickLinksHTML;
    }
}

// Lyssna på klick för att ta bort en länk
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('removebtn')) {
        removeQuickLink(event);
    }
});

// Anropa funktionen setupListeners() när sidan är redo
document.addEventListener('DOMContentLoaded', function() {
    setupListeners();
    loadDataFromLocalStorage();
    loadQuickLinksFromLocalStorage();
});

// Funktion för att ställa in event listeners
function setupListeners() {
    document.getElementById('add-link-btn').addEventListener('click', showModal);
}





//<------ KLOCKA ------->

// Uppdatera klockan varje sekund
function updateClock() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    timeElement.textContent = now.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
    dateElement.textContent = now.toLocaleDateString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Spara tiden i localStorage
    saveDataToLocalStorage();
}

setInterval(updateClock, 1000);

// Funktion för att hämta och visa väderdata när sidan har laddats
window.onload = function() {
    fetchWeatherData();
    // Ladda sparad information från localStorage när sidan laddas
    loadDataFromLocalStorage();
};





//<------ ANTECKNING ------->

function removeNote(event) {
    // Lägg till en console.log() för att kontrollera om funktionen körs
    console.log("Försöker ta bort anteckning...");
    
    // Ta bort anteckningen från DOM:en
    event.target.parentNode.remove();
    
    // Uppdatera localStorage när en anteckning tas bort
    saveDataToLocalStorage();
}

    // Ladda befintlig anteckning från local storage när sidan laddas
    window.addEventListener('load', function() {
        loadNoteFromLocalStorage();
    });

    // Funktion för att ladda befintlig anteckning från local storage
    function loadNoteFromLocalStorage() {
        var note = localStorage.getItem('note');
        if (note) {
            document.getElementById('noteInput').value = note;
        }
    }

    // Funktion för att spara anteckning till local storage
    function saveNoteToLocalStorage(noteText) {
        localStorage.setItem('note', noteText);
    }

    // Lägga till eventlyssnare för ändringar i textfältet
    document.getElementById('noteInput').addEventListener('input', function() {
        var noteInput = document.getElementById('noteInput').value;
        saveNoteToLocalStorage(noteInput);
    });





    //<------ BAKGRUNDSBILD ------->

// Funktion för att byta bakgrundsbild från Unsplash API med Fetch API
function changeBackground() {
    var apiKey = 'muqx79WboLNW5dwW5PHViRaBY_OFICRBysXzMQiwuR0';
    var apiUrl = 'https://api.unsplash.com/photos/random?query=architecture&client_id=' + apiKey;


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var newBackgroundUrl = data.urls.regular;

            // Ändra bakgrundsbilden på body-elementet
            document.body.style.backgroundImage = 'url(' + newBackgroundUrl + ')';

            // Spara den nya bakgrundsbilden i localStorage
            localStorage.setItem('background', 'url(' + newBackgroundUrl + ')');
        })
        .catch(error => console.error('Det uppstod ett fel:', error));
}



//<------ ANVÄNDARNAMN ------->

// Funktion för att ändra användarnamnet
function changeUsername() {
    // Fråga användaren efter det nya namnet
    var newUsername = prompt("Vänligen ange ditt nya namn:");

    // Kontrollera om användaren angav ett nytt namn och att det inte är tomt
    if (newUsername !== null && newUsername !== "") {
        // Hämta elementet för användarnamnet
        var usernameElement = document.getElementById("usernameDisplay");

        // Ändra texten till det nya namnet
        usernameElement.textContent = newUsername + " Dashboard";

        // Spara det nya användarnamnet i localStorage
        localStorage.setItem('username', newUsername);
    }
}








//<------ VÄDER ------->
// API-nyckel för OpenWeatherMap
const apiKey = "fcabde25a8b6494f7ac02d5dd8316f81";

// URL för att hämta väderdata från OpenWeatherMap API för tre dagar framöver
const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=${apiKey}`;

// Funktion för att hämta väderdata från API och uppdatera sidan
async function fetchWeatherData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Extrahera platsinformation från API-svar
        const city = data[0].name;
        const countryCode = data[0].country;

        // Uppdatera URL:en för att hämta väderdata baserat på plats
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&cnt=24&appid=${apiKey}`;

        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();

        // Loopa genom de tre första väderrapporterna för varje dag
        for (let i = 0; i < 3; i++) {
            const weather = weatherData.list[i * 8].weather[0];
            const temperature = weatherData.list[i * 8].main.temp;
            const weatherIcon = getWeatherIcon(weather.icon);
            const weatherDescription = translateWeatherDescription(weather.main);

            // Text för varje dag
            let dayText;
            if (i === 0) {
                dayText = "Idag";
            } else if (i === 1) {
                dayText = "Imorgon";
            } else if (i === 2) {
                dayText = "I övermorgon";
            }

            // Skapa en <li> med väderinformation, dagens text och ikon för varje dag
            const li = document.createElement('li');
            li.innerHTML = `<strong>${dayText}:</strong> <i class="fas ${weatherIcon}"></i> ${getFormattedTemperature(temperature)} ${weatherDescription}`;
            document.getElementById('weather-list').appendChild(li);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Funktion för att översätta väderbeskrivningen till svenska
function translateWeatherDescription(englishDescription) {
    switch (englishDescription) {
        case 'Clear':
            return 'Klart';
        case 'Clouds':
            return 'Molnigt';
            case 'Rain':
        return 'Regn';
    case 'Snow':
        return 'Snö';
    case 'Drizzle':
        return 'Duggregn';
    case 'Thunderstorm':
        return 'Åska';
    case 'Mist':
        return 'Duggregn';
    default:
        return englishDescription;
    }
}

// Funktion för att konvertera väderikonkoden från OpenWeatherMap till Font Awesome-ikonklass
function getWeatherIcon(iconCode) {
    switch (iconCode) {
        case '01d':
            return 'fa-sun';
        case '01n':
            return 'fa-moon';
        case '02d':
        case '02n':
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            return 'fa-cloud';
        case '09d':
        case '09n':
        case '10d':
        case '10n':
            return 'fa-cloud-rain';
        case '11d':
        case '11n':
            return 'fa-bolt';
        case '13d':
        case '13n':
            return 'fa-snowflake';
        case '50d':
        case '50n':
            return 'fa-smog';
        default:
            return 'fa-question-circle';
    }
}

// Funktion för att konvertera temperaturen från Kelvin till Celsius
function getFormattedTemperature(kelvinTemp) {
    const celsiusTemp = kelvinTemp - 273.15;
    return `${Math.round(celsiusTemp)}°C`;
}




//<------ CHUCK NORRIS SKÄMT ------->
// Function to fetch and display Chuck Norris jokes
async function fetchChuckNorrisJoke() {
    const apiUrl = 'https://api.chucknorris.io/jokes/random';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Extracting the Chuck Norris joke
        const joke = data.value;

        // Creating elements to display the Chuck Norris joke
        const jokeInfoElement = document.getElementById('chuck-norris-joke');
        const listItem = document.createElement('li');
        listItem.textContent = joke;

        // Appending the Chuck Norris joke to the existing content
        jokeInfoElement.appendChild(listItem);
    } catch (error) {
        console.error('Error fetching Chuck Norris joke:', error);
    }
}

// Call the fetchChuckNorrisJoke function after the DOM has loaded
document.addEventListener('DOMContentLoaded', fetchChuckNorrisJoke);
