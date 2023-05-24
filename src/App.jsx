import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useLongPress from "./hooks/onhold";

function Form({ page, setPage, goal, setGoal }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setGoal(e.target.number.value);
        setPage("counter");
      }}
    >
      <label htmlFor="number">Set your goal</label>
      <input type="number" name="number" required />
      <button type="submit">Submit</button>
    </form>
  );
}
function Counter({ page, setPage, count, setCount, goal }) {
  const [win, setWin] = useState(false);
  // const [stopCount, setStopCount] = useState(false);
  let stopCount = false;
  const successSound = new Audio("./src/assets/success.mp3");
  const onLongPress = () => {
    setPage("settings");
  };
  const onClick = () => {
    if (count + 1 == goal) {
      successSound.play();
      setWin(true);
    }
    console.log(count, goal);
    setCount((count) => count + 1);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
  return (
    <>
      <button className="main-btn" {...longPressEvent}>
        {count} / {goal}
      </button>
      {win ? <h2>Congratulations!</h2> : <p></p>}
      <audio id="myAudio">
        <source src="src/assets/success.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}
function App() {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState("settings");
  const [goal, setGoal] = useState(0);

  if (page === "counter") {
    return (
      <Counter
        page={page}
        setPage={setPage}
        count={count}
        setCount={setCount}
        goal={goal}
      />
    );
  } else {
    return <Form page={page} setPage={setPage} goal={goal} setGoal={setGoal} />;
  }
}

export default App;
