async function fetchQuote() { 
    try {
        const response = await fetch("http://localhost:3000/api/quote"); 
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Fetched Quote:", data);

        document.getElementById("quote-text").innerText = `"${data.content}"`;
        document.getElementById("quote-author").innerText = `- ${data.author || "Unknown"}`;
        
        // get and Set a random background image
        /*
        issue with the code :- the image updates every time the function is called due to browser caching
        let image = `https://picsum.photos/1600/900?random=${Math.random()}`;
        
        // Generate a new image URL with timestamp to prevent caching ( not work ) 
        let image = `https://picsum.photos/1600/900?nocache=${Date.now()}`;
        //document.getElementById("container").style.backgroundImage = `url('${image}')`;

        */

        // Generate a new image URL to force reload
        let imageUrl = `https://picsum.photos/1600/900?nocache=${Date.now()}`;

        // Create an Image object to ensure loading before setting background
        let img = new Image();
        img.src = imageUrl;

        img.onload = function () {
            document.getElementById("container").style.backgroundImage = `url('${imageUrl}')`;
        };


    } catch (error) {
        console.error("Error fetching quote:", error);
    }
}

// Copy quote to clipboard
document.getElementById("copy-btn").addEventListener("click", () => {
    const quoteText = document.getElementById("quote-text").innerText;
    navigator.clipboard.writeText(quoteText).then(() => {
        alert("Quote copied to clipboard!");
    });
});

// Share on Twitter
document.getElementById("twitter-btn").addEventListener("click", () => {
    const quoteText = document.getElementById("quote-text").innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText)}`;
    window.open(tweetUrl, "_blank");
});

// Export as image
document.getElementById("export-btn").addEventListener("click", () => {
    html2canvas(document.getElementById("quote-box")).then(canvas => {
        let link = document.createElement("a");
        link.download = "quote.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});

// Call when the page loads
document.addEventListener("DOMContentLoaded", fetchQuote);

// Attach event listener for new quote button
document.getElementById("new-quote-btn").addEventListener("click", fetchQuote);
