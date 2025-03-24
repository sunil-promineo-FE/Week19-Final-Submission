// Import StrictMode from React to enable strict mode for the application
// Strict mode helps identify potential issues in the application during development
import { StrictMode } from "react";

// Import createRoot from react-dom/client to create a root for rendering the application
// createRoot is used for concurrent mode rendering in React 18+
import { createRoot } from "react-dom/client";

// Import the root App component of the application
// Ensure this path is correct and points to the App component
import App from "./app.jsx"; // Ensure this path is correct

// Import the global CSS file for styling the application
import "./index.css";

// Select the root DOM element where the React application will be mounted
// The element should have a data-js attribute with the value "root"
const rootElement = document.querySelector('[data-js="root"]');

// Create a root for the React application using the selected DOM element
const root = createRoot(rootElement);

// Render the application inside the root element
// Wrap the App component in StrictMode to enable strict mode checks
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);