// Uppdatera klockan varje sekund
function updateClock() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    timeElement.textContent = now.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
    dateElement.textContent = now.toLocaleDateString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

setInterval(updateClock, 1000);

// Funktion för att lägga till snabblänk
function addQuickLink(url, text) {
    const quickLinksList = document.getElementById('quick-links');
    const newLink = document.createElement('li');
    newLink.innerHTML = `<a href="${url}">${text}</a>`;
    quickLinksList.appendChild(newLink);
}

// Funktion för att ta bort senaste snabblänk
function removeLastQuickLink() {
    const quickLinksList = document.getElementById('quick-links');
    const lastLink = quickLinksList.lastElementChild;
    if (lastLink) {
        quickLinksList.removeChild(lastLink);
    }
}

// API-nyckel för OpenWeatherMap
const apiKey = "fcabde25a8b6494f7ac02d5dd8316f81";

// URL för att hämta väderdata från OpenWeatherMap API för tre dagar framöver
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Varberg,SE&cnt=24&appid=${apiKey}`;

// Funktion för att hämta väderdata från API och uppdatera sidan
async function fetchWeatherData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Loopa genom de tre första väderrapporterna för varje dag
        for (let i = 0; i < 3; i++) {
            const weather = data.list[i * 8].weather[0];
            const temperature = data.list[i * 8].main.temp;
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

// Hämta och visa väderdata när sidan har laddats
window.onload = fetchWeatherData;

function addNote() {
    var noteInput = document.getElementById('noteInput');
    var noteText = noteInput.value;

    if (noteText.trim() === '') {
        alert("Du måste skriva en anteckning!");
        return;
    }

    var li = document.createElement('li');
    li.textContent = noteText;

    var removeButton = document.createElement('button');
    removeButton.textContent = 'Ta bort';
    removeButton.className = 'remove-button'; // Lägg till en klass för knappen
    removeButton.onclick = function() {
        this.parentNode.remove();
    };
    li.appendChild(removeButton);

    var noteList = document.getElementById('noteList');
    noteList.appendChild(li);

    noteInput.value = '';
}


function changeBackground() {
    // Lista med tillgängliga bakgrundsbilder
    var backgrounds = [
        '/img/vatten.jpg',
        '/img/berg.jpg',
        '/img/berg1.jpg',
        '/img/blad.jpg',
        '/img/blad1.jpg',
        '/img/motorcykel.jpg'
        // Lägg till fler sökvägar till dina bilder här
    ];

    // Slumpa en ny bakgrundsbild från listan
    var randomIndex = Math.floor(Math.random() * backgrounds.length);
    var newBackground = backgrounds[randomIndex];

    // Ändra bakgrundsbilden på body-elementet
    document.body.style.backgroundImage = 'url(' + newBackground + ')';
}
