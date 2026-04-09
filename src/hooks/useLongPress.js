import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export const useLongPress = (callback, ms = 500) => {
  const [startLongPress, setStartLongPress] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    if (startLongPress) {
      timerRef.current = setTimeout(callback, ms);
    } else {
      clearTimeout(timerRef.current);
    }
    return () => clearTimeout(timerRef.current);
  }, [startLongPress, callback, ms]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
};