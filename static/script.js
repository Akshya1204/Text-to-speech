
var count = 0;
document.addEventListener("DOMContentLoaded", () => {
  // Select the slider and value display elements
  const volumeSlider = document.getElementById("volume-slider");
  const volumeValue = document.getElementById("volume-value");

  // Add event listener to update the displayed value
  volumeSlider.addEventListener("input", () => {
    volumeValue.textContent = volumeSlider.value;
  });
});

// Update Rate Value
document.addEventListener("DOMContentLoaded", () => {
  // Select the slider and value display elements
  const rateSlider = document.getElementById("rate-slider");
  const rateValue = document.getElementById("rate-value");

  // Add event listener to update the displayed value
  rateSlider.addEventListener("input", () => {
    rateValue.textContent = `${rateSlider.value}x`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("input-text");
  const genderDropdown = document.getElementById("gender-dropdown");
  const accentDropdown = document.getElementById("accent-dropdown");
  const historyList = document.getElementById("history-list");
  const rateSlider = document.getElementById("rate-slider");
  const volumeSlider = document.getElementById("volume-slider");
  const convertButton = document.getElementById("convert-button");
  const volumeValue = document.getElementById("volume-value");
  const rateValue = document.getElementById("rate-value");

  // Update slider values dynamically
  volumeSlider.addEventListener("input", () => {
    volumeValue.textContent = volumeSlider.value;
  });

  rateSlider.addEventListener("input", () => {
    rateValue.textContent = `${rateSlider.value}x`;
  });

  // Convert Button Click Event
  convertButton.addEventListener("click", async () => {
    const text = inputText.value.trim();
    const gender = genderDropdown.value;
    const accent = accentDropdown.value;
    const volume = volumeSlider.value;
    const rate = rateSlider.value;

    if (text && gender !== "" && accent !== "") {
      try {
        const response = await fetch('/convert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, gender, accent, rate, volume }),
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Conversion failed');

        // Create history entry
        const listItem = document.createElement("li");
        listItem.className = "p-2 bg-gray-50 rounded-md text-sm text-gray-800";
        listItem.textContent = `file-${count}`;
        count++;

        const audioPlayer = document.createElement("audio");
        audioPlayer.controls = true; // Show playback controls (play, pause, etc.)
        audioPlayer.className = "width-audio";
        const audioSource = document.createElement("source");
        audioSource.src = data.url;
        audioSource.type = "audio/mpeg";
        if (historyList.children[0].textContent.trim() === "No history yet") {
          historyList.removeChild(historyList.children[0]);
        }
        audioPlayer.appendChild(audioSource);
        listItem.appendChild(audioPlayer);

        historyList.prepend(listItem);
        inputText.value = "";
        genderDropdown.value = "";
        accentDropdown.value = "";
        volumeSlider.value = 50;
        rateSlider.value = 1;
        volumeValue.textContent = "50";
        rateValue.textContent = "1x";

        const placeholder = historyList.querySelector('li:first-child');
      } catch (error) {
        console.error('Error:', error);
        alert(`Conversion failed: ${error.message}`);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  });
});
