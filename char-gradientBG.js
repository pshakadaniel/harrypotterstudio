const config = {
  colors: [
    { color: "#1a472a", enabled: true },
    { color: "#00001b", enabled: true },
    { color: "#0e1a40", enabled: true },
  ],
  speed: 7, // Animation duration (in seconds)
  waveFrequencyX: 1,
  waveFrequencyY: 12,
  waveAmplitude: 14,
  backgroundColor: "#00001b",
};

const background = document.querySelector(".gradient-bg");

// Generate gradient colors
const enabledColors = config.colors
  .filter((color) => color.enabled)
  .map((color) => color.color);
const gradient = `linear-gradient(to bottom left, ${enabledColors.join(", ")})`;

// Apply dynamic gradient and animation properties
background.style.background = gradient;
background.style.backgroundSize = "500% 500%"; // Ensure space for animation
background.style.animation = `waveMotion ${config.speed}s infinite ease-in-out`;

// Create a <style> element to define keyframes dynamically
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerHTML = `
  @keyframes waveMotion {
    0% { background-position: 0% 50%; }
    25% { background-position: 50% 60%; }
    50% { background-position: 100% 50%; }
    75% { background-position: 50% 40%; }
    100% { background-position: 0% 50%; }
  }
`;
document.head.appendChild(styleSheet);
