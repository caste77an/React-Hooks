import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
		//title태그를 사용하는 첫번째 요소를 htmlTitle에 반환
    const htmlTitle = document.querySelector("title");
		//반환받은 title태그의 innerText에 title변수 값 할당
    htmlTitle.innerText = title;
  };
	//title의 값이 바뀌면(componentDidUpdate) updateTitle을 실행함
  useEffect(updateTitle, [title]);
  return setTitle;
};

const App = () => {
  const titleUpdater = useTitle("Loading...");
	//titleUpdater의 return 값이 setTitle이므로 setTitle("Home") 처리함
  setTimeout(() => titleUpdater("Home"), 5000);
  return (
    <div className="App">
      <div>Hi</div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);