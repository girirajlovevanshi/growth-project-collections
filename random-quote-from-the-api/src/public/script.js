let img; // Declare globally to avoid reloading

// Set background image and load quote
backgroundImg();
fetchQuote();

async function fetchQuote() {
    try {
        const response = await fetch("http://localhost:8000/api/quote");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Fetched Quote:", data);

        document.getElementById("quote-text").innerText = `"${data.content}"`;
        document.getElementById("quote-author").innerText = `- ${data.author || "Unknown"}`;
        
    } catch (error) {
        console.error("Error fetching quote:", error);
    }
}

// new-quote-btn fetch new quote
document.getElementById("new-quote-btn").addEventListener("click",()=>{
    fetchQuote();
})

// Copy quote to clipboard
document.getElementById("copy-btn").addEventListener("click", () => {
    const quoteText = document.getElementById("quote-text").innerText;
    navigator.clipboard.writeText(quoteText).then(() => {
        alert(`Quote copied to clipboard: ${quoteText}`);
    });
});

// Function to set a background image
function backgroundImg(){
    let imageUrl = `https://picsum.photos/1600/900?nocache=${Date.now()}`;

    img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = function () {
        document.getElementById("container").style.backgroundImage = `url('${imageUrl}')`;
    };
}

// Change Image
document.getElementById("new-image-btn")?.addEventListener("click", () => {
    backgroundImg();
});

// Call functions on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchQuote();
    backgroundImg();
});

function captureScreen() {
    return new Promise((resolve, reject) => {
        const quoteBox = document.querySelector("#quote-box");

        if (!quoteBox) {
            console.error("Element #quote-box not found!");
            reject("Element not found");
            return;
        }

        html2canvas(quoteBox)
            .then(canvas => {
                const dataURL = canvas.toDataURL("image/png");
                resolve(dataURL); // Resolve with the captured image URL
            })
            .catch(error => {
                console.error("Error capturing screen:", error);
                reject(error);
            });
    });
}

// Export Button Click Handler
document.getElementById("export-btn").addEventListener("click", async () => {
    try {
        const dataURL = await captureScreen(); // Wait for image capture

        // Create a temporary download link
        const downloadLink = document.createElement("a");
        downloadLink.href = dataURL;
        downloadLink.download = "screenshot.png"; // Set filename
        document.body.appendChild(downloadLink);

        // Trigger the download
        downloadLink.click();

        // Clean up
        document.body.removeChild(downloadLink);
    } catch (error) {
        console.error("Canvas capture failed:", error);
    }
});

// Function to share quote as text on Twitter
function shareQuoteAsText() {
    const quoteText = document.querySelector("#quote-box").innerText.trim(); // Get the text content
    const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText)}`;
    
    // Open Twitter share in a new tab
    window.open(twitterURL, "_blank");
}

// Share Quote Text button click handler
document.getElementById("x-btn").addEventListener("click", shareQuoteAsText);
