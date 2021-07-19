import { useState } from "react";

const useNotificationState = (props = null) => {
  const [text, setText] = useState(props);

  const setTextWithTimer = (newText, ms=5000) => {
    setText(newText);
    setTimeout(() => {
      setText(null);
    }, ms);
  };

  return [text, setTextWithTimer];
};

export default useNotificationState;
