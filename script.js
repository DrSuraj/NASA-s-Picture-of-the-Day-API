document.addEventListener("DOMContentLoaded", function () {
    getCurrentImageOfTheDay();
    loadSearchHistory();

    document.getElementById("search-form").addEventListener("submit", function (event) {
        event.preventDefault();
        getImageOfTheDay();
    });

    document.getElementById("search-history").addEventListener("click", function (event) {
        if (event.target && event.target.tagName === "LI") {
            const date = event.target.textContent;
            getImageOfTheDay(date);
        }
    });
});

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    getImage(currentDate);
}

function getImageOfTheDay(date) {
    const selectedDate = date || document.getElementById("search-input").value;
    getImage(selectedDate);
    saveSearch(selectedDate);
}

function getImage(date) {
    const apiKey = "nEtO3qkJDQj6IgqqlYRFhlha2ePhFWm3vVcgBsa0"; // Replace with your actual API key
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayImage(data))
        .catch(error => console.log(error));
}

function displayImage(data) {
    const container = document.getElementById("current-image-container");
    container.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="${data.title}" width="500">
        <p>${data.explanation}</p>
    `;
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
    addSearchToHistory(date);
}

function loadSearchHistory() {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.forEach(date => addSearchToHistory(date));
}

function addSearchToHistory(date) {
    const historyList = document.getElementById("search-history");
    const listItem = document.createElement("li");
    listItem.textContent = date;
    historyList.appendChild(listItem);
}
