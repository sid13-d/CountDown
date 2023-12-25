import React, { useState, useRef } from "react";
import PopupModal from "./PopupModal";
import { createPortal } from "react-dom";

export default function TimerChallenge({title, targetTime}) {

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const timeActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
    const timmer = useRef();
    const dialog = useRef();

    if(timeRemaining <= 0) {
        clearInterval(timmer.current);
        dialog.current.open();
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart() {
       

       timmer.current = setInterval(() => {
              setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
              console.log("The time is ::" , timeRemaining);
       }, 10);

       
    }

    function handleStop() {
        clearInterval(timmer.current);
        console.log("stop called");
        dialog.current.open();
        setTimeRemaining(targetTime * 1000);
      
    }

    return (
        <>
        
        <PopupModal ref={dialog} title={title} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset}/>
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} seconds{targetTime > 1 ? "s" : ""}
            </p>
            <p>
            <button onClick={timeActive ? handleStop: handleStart}>
                {timeActive ? "Stop" : "Start"}
            </button>
            </p>
            <p className={timeActive ? 'active': undefined}>
                {timeActive ? "Timer is running" : "Timer is stopped"}
            </p>
        </section>
        </>
    );
}