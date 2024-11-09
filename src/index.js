import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalWrapper from "./pages/GlobalWrapper";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";

// Create a root element in the DOM and render the app
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* GlobalWrapper wraps the application, providing context and state management */}
    <GlobalWrapper>
      {/* Main app component that manages routing and UI */}
      <App />
    </GlobalWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
