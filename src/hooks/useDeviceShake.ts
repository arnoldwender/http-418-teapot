import { useEffect, useRef } from 'react';

/* === Device shake detection for mobile easter egg === */
/* Detects shake gesture via DeviceMotion API */

const SHAKE_THRESHOLD = 15;
const SHAKE_TIMEOUT = 1000;

export function useDeviceShake(onShake: () => void) {
  const lastShake = useRef(0);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;

    function handleMotion(e: DeviceMotionEvent) {
      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

      const deltaX = Math.abs(acc.x - lastX);
      const deltaY = Math.abs(acc.y - lastY);
      const deltaZ = Math.abs(acc.z - lastZ);

      if (
        (deltaX > SHAKE_THRESHOLD || deltaY > SHAKE_THRESHOLD || deltaZ > SHAKE_THRESHOLD) &&
        Date.now() - lastShake.current > SHAKE_TIMEOUT
      ) {
        lastShake.current = Date.now();
        onShake();
      }

      lastX = acc.x;
      lastY = acc.y;
      lastZ = acc.z;
    }

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [onShake]);
}
