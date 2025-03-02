document.addEventListener("DOMContentLoaded", function () {
    // Automatically classify the current URL
    classifyCurrentURL();

    // Tab switching logic
    document.getElementById("tab-url").addEventListener("click", function () {
        showTab("url");
    });

    document.getElementById("tab-text").addEventListener("click", function () {
        showTab("text");
    });

    function showTab(tab) {
        document.getElementById("url-tab").classList.remove("active");
        document.getElementById("text-tab").classList.remove("active");
        document.getElementById("tab-url").classList.remove("active");
        document.getElementById("tab-text").classList.remove("active");

        if (tab === "url") {
            document.getElementById("url-tab").classList.add("active");
            document.getElementById("tab-url").classList.add("active");
        } else {
            document.getElementById("text-tab").classList.add("active");
            document.getElementById("tab-text").classList.add("active");
        }
    }

    // Automatically get the active tab's URL and classify it
    function classifyCurrentURL() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) {
                document.getElementById("result").innerText = "No active tab found.";
                return;
            }

            let url = tabs[0].url;
            document.getElementById("url").innerText = "URL: " + url;

            // Check if URL is valid
            if (!url || url.startsWith('chrome://')) {
                document.getElementById("result").innerText = "Cannot analyze this type of URL";
                return;
            }

            fetch("http://127.0.0.1:8000/classify-url", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ url: url })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                document.getElementById("result").innerText = data.is_phishing ? "Phishing Detected!" : "Safe URL";
            })
            .catch(error => {
                console.error("Detailed error:", error);
                if (error.message.includes('Failed to fetch')) {
                    document.getElementById("result").innerText = "Error: Server is not running. Please start the Python server.";
                } else {
                    document.getElementById("result").innerText = "Error: " + error.message;
                }
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("text-button").addEventListener("click", classifyText);
});
// Function to classify text message
function classifyText() {
    const text = document.getElementById("text-input").value;
    
    if (!text) {
        document.getElementById("text-result").innerText = "Please enter a message.";
        return;
    }

    fetch("http://127.0.0.1:8000/detect", { // Adjust URL to match your Flask endpoint
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ TEXT: text })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("text-result").innerText = data.prediction;
    })
    .catch(error => {
        document.getElementById("text-result").innerText = "Error: Could not process request.";
        console.error("Error:", error);
    });
}
