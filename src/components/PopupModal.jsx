import { forwardRef, useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const PopupModal = forwardRef( function PopupModal({title, targetTime, remainingTime, onReset}, ref) {
    const dialog = useRef();
    const formattedTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round(( 1-remainingTime / (targetTime * 1000)) * 100);
    const userLost = remainingTime <= 0;
    useImperativeHandle(ref, () => {
        return{ open() {
            dialog.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
        <h2>
            {title}
            
        </h2>
        <h3> {userLost ? "You lost : " : "You won : "} {score}</h3>

        <p>
            The target time was :: <strong>
            {targetTime} seconds{targetTime > 1 ? "s" : ""}
            </strong>
        </p>
        <p>
            You stoped the timer with <strong>{formattedTime} sec left</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>,
    document.getElementById("modal")
    )
});

export default PopupModal;
