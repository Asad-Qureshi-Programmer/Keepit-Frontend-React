import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export const useLongPress = (callback, ms = 500) => {
  const [startLongPress, setStartLongPress] = useState(false);
  const timerRef = useRef();
  const eventRef = useRef(); // To store the event for the callback

  useEffect(() => {
    if (startLongPress) {
      timerRef.current = setTimeout(() => {
        if (eventRef.current) callback(eventRef.current);
      }, ms);
    } else {
      clearTimeout(timerRef.current);
    }
    return () => clearTimeout(timerRef.current);
  }, [startLongPress, callback, ms]);

  return {
    onMouseDown: (e) => { eventRef.current = e; setStartLongPress(true); },
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: (e) => { eventRef.current = e; setStartLongPress(true); },
    onTouchEnd: () => setStartLongPress(false),
    // CRITICAL: This stops the browser menu from opening
    onContextMenu: (e) => {
      if ('ontouchstart' in window) {
        e.preventDefault(); 
      }
    }
  };
};