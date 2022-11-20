import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import script from "./script.json";

function App() {
  const [dialogueContent, setDialogContent] = useState({
    id: 0,
    message: "Click next to start!",
  });

  script.forEach((item, i) => {
    item.id = i + 1;
  });

  let dialogueList = script;

  const next = (value) => {
    if (dialogueList.length <= dialogueContent.id) {
      setDialogContent({
        id: dialogueList.length,
        message: "This is the end! Bye!",
      });
      return;
    } else if (dialogueContent?.skipEvent) {
      setDialogContent(dialogueList.find((item) => item.eventName == value));
      return;
    } else {
      setDialogContent(dialogueList[dialogueContent.id]);
    }
  };

  const restart = () => {
    setDialogContent({
      id: 0,
      message: "Click next to start!",
    });
  };

  var i = 0;
  var speed = 50;
  let typedMessage = "";

  // function typeWriter() {
  //   console.log(txt);
  //   const txt = dialogueContent?.message;
  //   if (txt && i < txt.length) {
  //     typedMessage += txt.charAt(i);
  //     i++;
  //     setTimeout(typeWriter, speed);
  //   }
  // }

  return (
    <div className="App">
      <header className="App-header">
        <div className="dialogue-box">
          <p className="typewriter" key={dialogueContent.id}>
            {dialogueContent?.message}
          </p>
        </div>
        {!dialogueContent?.input && (
          <button className="next-button button-56" onClick={() => next()}>
            Next
          </button>
        )}
        {dialogueContent?.input?.type === "text" && (
          <div className="input-wrapper">
            <input type="text" />
            <button className="button-56" type="submit" onClick={() => next()}>
              Submit
            </button>
          </div>
        )}
        {dialogueContent?.input?.type === "buttons" && (
          <div className="button-container">
            {dialogueContent.input.buttons.map((button) => (
              <div className="button-wrapper">
                <button
                  className="button-56"
                  key={button.value}
                  onClick={() => next(button.nextEventName)}
                >
                  {button.text}
                </button>
              </div>
            ))}
          </div>
        )}
        {/* {dialogueList?.length <= dialogueContent.id && (
          <button className-="restart-button" onClick={() => restart(index)}>
            Restart
          </button>
        )} */}
      </header>
    </div>
  );
}

export default App;
