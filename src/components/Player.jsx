import { useState, useRef } from "react";

export default function Player() {
  const name = useRef();
  const [playerName, setPlayerName] = useState(null);

  function handleClick() {
       setPlayerName(name.current.value);
  }

  return (
    <section id="player">
      {/* instead of ternary you can do this if its true it will take the same value if false value after ?? */}
      <h2>Welcome {playerName ?? "unknown entity"}</h2>
      <p>
        <input ref={name} type="text"/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
