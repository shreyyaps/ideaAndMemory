// src/Components/VantaHalo.jsx
import { useEffect, useRef } from "react";

const VantaHalo = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
    script1.async = true;

    const script2 = document.createElement("script");
    script2.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js";
    script2.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    script2.onload = () => {
      if (window.VANTA && window.THREE) {
        window.VANTA.HALO({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          baseColor: 0x301934, 
          backgroundColor: 0x0f0f0f,
          amplitudeFactor: 0.9,
          size: 1.3,
        });
      }
    };

    return () => {
      script1.remove();
      script2.remove();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 -z-10 pointer-events-none"
      style={{
    filter: "blur(2px)",
   
    background: "black"
  }}
    ></div>
  );
};

export default VantaHalo;
