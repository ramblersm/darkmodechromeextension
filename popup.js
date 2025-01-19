document.getElementById("toggle-dark-mode").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: toggleDarkMode
    });
  });
  
  function toggleDarkMode() {
    const darkModeStyles = `
      html {
        filter: invert(1) hue-rotate(180deg);
        background-color: #000;
      }
      img, video {
        filter: invert(1) hue-rotate(180deg);
      }
    `;
  
    let styleTag = document.getElementById('dark-mode-style');
  
    if (styleTag) {
      styleTag.remove();
    } else {
      styleTag = document.createElement('style');
      styleTag.id = 'dark-mode-style';
      styleTag.textContent = darkModeStyles;
      document.head.appendChild(styleTag);
    }
  }
  