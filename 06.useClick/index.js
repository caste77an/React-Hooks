import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

const useClick = (onClick) => {
  if (typeof onClick !== "function") {
    return;
  }
  const element = useRef();
  useEffect(() => {
    // componentDidMount 시 eventListener를 추가함
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    // componentWillUnmount 시 eventListener를 제거함
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []);
  return element;
};

const App = () => {
  const sayHello = () => console.log("say hello!!");
  const title = useClick(sayHello);
  return (
    <div className="App">
      <h1 ref={title}>Hi</h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);