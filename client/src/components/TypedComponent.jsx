import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
const strings = [
  "<Welcome to Notiq!",
  "Your personal note-taking assistant.",
  "Capture, organize, and access your notes anytime, anywhere.",
  "Start managing your ideas effortlessly."
];

const TypedComponent = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const options = {
      strings: strings,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
      showCursor: true,
    };

    const typed = new Typed(typedElement.current, options);

    // Clean up Typed.js instance when the component is unmounted
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div>
      <span ref={typedElement} />
    </div>
  );
};

export default TypedComponent;
