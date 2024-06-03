import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

export const HeartPopup = () => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`heartPopup ${animate ? "animate" : ""}`}>
      <FaHeart className="heart" />
    </div>
  );
};
