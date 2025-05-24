import { useEffect, useRef } from "react";

function Background() {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect = null;

    const loadVanta = () => {
      if (window.VANTA && window.VANTA.FOG) {
        vantaEffect = window.VANTA.FOG({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          highlightColor: 0x0,
          midtoneColor: 0x0,
          lowlightColor: 0x0,
          baseColor: 0xaa8282,
          blurFactor: 0.56,
          speed: 3.10,
          zoom: 2.60
        });
      }
    };

    // wait a little bit to make sure VANTA is loaded
    const timeout = setTimeout(loadVanta, 100);

    return () => {
      if (vantaEffect) vantaEffect.destroy();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div ref={vantaRef} style={{ width: "100vw", height: "100vh" }}>
      {/* Your content */}
    </div>
  );
}

export default Background;
