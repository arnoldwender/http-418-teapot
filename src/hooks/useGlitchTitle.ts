import { useState, useEffect } from 'react';
import { glitchText } from '../data/teapot-content';

const BASE_TITLE = 'I AM A TEAPOT';

export function useGlitchTitle() {
  const [titleText, setTitleText] = useState(BASE_TITLE);

  useEffect(() => {
    const iv = setInterval(() => {
      setTitleText(glitchText(BASE_TITLE, 0.12));
      setTimeout(() => setTitleText(BASE_TITLE), 120);
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  return titleText;
}
