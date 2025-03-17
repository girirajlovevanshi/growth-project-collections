let img; // Declare globally to avoid reloading

// Set background image and load quote
backgroundImg();
fetchQuote();

async function fetchQuote() {
    try {
        const response = await fetch("http://localhost:3000/api/quote");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Fetched Quote:", data);

        document.getElementById("quote-text").innerText = `"${data.content}"`;
        document.getElementById("quote-author").innerText = `- ${data.author || "Unknown"}`;
        
    } catch (error) {
        console.error("Error fetching quote:", error);
    }
}

// Copy quote to clipboard
document.getElementById("copy-btn").addEventListener("click", () => {
    const quoteText = document.getElementById("quote-text").innerText;
    navigator.clipboard.writeText(quoteText).then(() => {
        alert(`Quote copied to clipboard :- ${quoteText}`);
    });
});

// Function to set a background image
function backgroundImg() {
    let imageUrl = `https://picsum.photos/1600/900?nocache=${Date.now()}`;

    img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = function () {
        document.getElementById("container").style.backgroundImage = `url('${imageUrl}')`;
    };
}

// Change Image
document.getElementById("new-image-btn").addEventListener("click", () => {
    backgroundImg();
});

// Call functions on page load
document.addEventListener("DOMContentLoaded", fetchQuote);
document.getElementById("new-quote-btn").addEventListener("click", fetchQuote);