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

#### Instance methods:

create table with methods

| Method                               | Description                                           |
| ------------------------------------ | ----------------------------------------------------- |
| call(action, props)                  | Call a modal by its action name and pass props to it. |
|                                      |
| close('all')                         | Close all modals.                                     |
|                                      |
| close(-1)                            | Close last modals.                                    |
|                                      |
| close(0)                             | Close first modals.                                   |
|                                      |
| close()                              | Close last modals. (default)                          |
|                                      |
| haveOpenModal                        | (getter) Is there at least one window open now        |
|                                      |
| addEventListener(event, callback)    | Add an event listener to the modal manager.           |
|                                      |
| removeEventListener(event, callback) | Remove an event listener from the modal manager.      |
|                                      |

#### ModalProvider props

| Prop               | Type     | Description                                                                |
| ------------------ | -------- | -------------------------------------------------------------------------- |
| modalList          | Object   | An object containing modal actions as keys and modal components as values. |
| className          | string   |                                                                            |
| isOverflow         | boolean  | Set "overflow: hidden" on body                                             |
| onModalStateChange | function | Callback function that is called when modal state changes.                 |

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

import { Manager } from "@4i/modal-manager";
import { v4 as uuidv4 } from "uuid";

export const constants = {
  OPEN: "open-bottom-modal",
  CLOSE: "close-bottom-modal",
};

class CustomModalManager extends Manager {
  name: string;
  data: any;

  constructor() {
    super();
    this.name = "";
    this.data = {};
  }

  create(name: string, data) {
    this.name = name;
    this.data = data;
    this.emitter.emit(constants.OPEN, this.name, this.data);
  }

  call(name: string, data: any = {}) {
    this.create(name, { modalId: uuidv4(), data });
  }

  close(position?: number | string) {
    this.emitter.emit(constants.CLOSE, position);
  }
}

const customModalManager = new CustomModalManager();

export default customModalManager;
```

#### Custom Provider

```javascript
import { memo, useEffect, useRef, useState } from "react";
import bottomModal, { constants } from "../../service/BottomModal";
import widgets from "../../config/modal/modal-list";

const initialData = {
  data: null,
};

const BottomModalProvider = () => {
  const [data, setData] = useState(initialData);
  const [name, setName] = useState < string > null;
  const modalRef = useRef < HTMLDivElement > null;

  useEffect(() => {
    function handleOpenModal(name, data) {
      console.log("LOG", name);
      setName(name);
      setData(data);
    }

    function handleClose() {
      console.log("LOG", "close");
      setName(null);
      setData(initialData);
    }

    bottomModal.addEventListener(constants.OPEN, handleOpenModal);
    bottomModal.addEventListener(constants.CLOSE, handleClose);

    return () => {
      bottomModal.removeEventListener(constants.OPEN, handleOpenModal);
      bottomModal.removeEventListener(constants.CLOSE, handleClose);
    };
  }, []);

  const handleCloseModal = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      console.log("LOG", "close");
      bottomModal.close();
    }
  };

  const Widget = widgets[name];

  return (
    <>
      {name && Widget && (
        <div
          onClick={handleCloseModal}
          className="animate-backdrop fixed z-[1000] h-full w-full  overflow-hidden flex items-end"
        >
          <div className="animate-fromBottom w-full" ref={modalRef}>
            <Widget {...data.data} />
          </div>
        </div>
      )}
    </>
  );
};

export default memo(BottomModalProvider);
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
import { modal } from "@4i/modal-manager";

// Get props
const ModalPrompts = ({ title, content }) => {
  const handleClose = () => {
    modal.close();
  };

  return (
    <div className="w-[400px] h-[300px] bg-slate-50 p-[24px] flex flex-col justify-center items-center">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default ModalPrompts;
```

Feel free to tailor this documentation to better fit your package's specific features and capabilities.
