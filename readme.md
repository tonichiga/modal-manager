# Modal manager

[![npm version](https://badge.fury.io/js/%404i%2Fmodal-manager.svg)](https://badge.fury.io/js/%404i%2Fmodal-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Usage in Managing Multiple Modals, Popups, Notifications

This package simplifies the management of multiple modals, popups, notifications, and similar UI elements within a project. It achieves this by leveraging events, maintaining a centralized list of modals, and assigning actions to them.

## Installation

```bash
npm install @4i/modal-manager
```

## Usage

#### Define Modal Actions:

In your project, define modal actions as keys in the modalAction object. Each key represents a specific modal or UI element.

```javascript
export const modalAction = {
  MODAL_PROMPT: "modal-prompt",
  // Additional modal actions...
};
```

#### Create Modal List:

Create a list of modals in the list object, where keys are modal actions, and values are the corresponding modal components.

```javascript
const list = {
  [modalAction.MODAL_PROMPT]: ModalPrompts,
  // Additional modals...
};
```

#### Call modals

Call modals in your components by invoking modal.call with the desired modal action.

```javascript
modal.call(modalAction.MODAL_PROMPT, {
  // Recieve props in your modal component
  title: "Modal title",
  content: "Modal content",
});
```

#### Extensibility

If desired, you can inherit from the Manager class to create your own classes for handling custom notifications, popups, and more. And then pass your custom class to the CustomProvider component using ModalProvider as an example

```javascript
import { Manager } from "@4i/modal-manager";

class CustomManager extends Manager {
  // Custom methods and logic here
}

const customManager = new CustomManager();
```

### index.js

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ModalPrompts from "./modals/prompt";
import { ModalProvider } from "@4i/modal-manager";
import "@4i/modal-manager/src/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Define your modal actions here
export const modalAction = {
  MODAL_PROMPT: "modal-prompt",
};

// Your modal list should be an object with modal names
// as keys and modal components as values.
const list = {
  [modalAction.MODAL_PROMPT]: ModalPrompts,
};

root.render(
  <React.StrictMode>
    <App />
    <ModalProvider modalList={list} />
  </React.StrictMode>
);
```

### App.js

```javascript
import { modalAction } from ".";
import "./App.css";
import { modal } from "@4i/modal-manager";

const App = () => {
  const handleClick = () => {
    // Call the modal by its action name
    modal.call(modalAction.MODAL_PROMPT, {
      // You can pass any props to your modal component
      title: "Modal title",
      content: "Modal content",
    });
  };

  return (
    <div className="app">
      <button
        onClick={handleClick}
        className="w-[200px] h-[80px] mx-auto bg-teal-800 text-white"
      >
        Click to call modal
      </button>
    </div>
  );
};

export default App;
```

### ModalPrompts.js

```javascript
import React from "react";

// Get props
const ModalPrompts = ({ title, content }) => {
  return (
    <div className="w-[400px] h-[300px] bg-slate-50 p-[24px] flex flex-col justify-center items-center">
      <h1>{title}</h1>
      <p>{content}</p>
      <button>Close</button>
    </div>
  );
};

export default ModalPrompts;
```

Feel free to tailor this documentation to better fit your package's specific features and capabilities.
