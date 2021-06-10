import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

const useNetwork = (onChange) => {
  // navigator.onLine 은 browser의 network를 boolean형으로 반환함
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);
  return status;
};

const App = () => {
  // network 상태를 받아와서 함수로 실행시키기 위해서 handleNetworkChange() 구현
  const handleNetworkChange = (online) => {
    console.log(online ? "We just went online" : "We are offline");
  };
  const onLine = useNetwork(handleNetworkChange);
  return (
    <div className="App">
      {/* onLine의 return값이 status 이므로 online, offline 확인 가능 */}
      <h1>{onLine ? "Online" : "Offline"}</h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
