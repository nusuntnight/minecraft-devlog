import React, { useState, useEffect } from 'react';

const TextType = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse text-purple-200 ml-1">|</span>
    </span>
  );
};

export default TextType;
