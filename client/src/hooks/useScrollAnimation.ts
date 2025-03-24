import { useEffect, useRef } from "react";
import { useInView, useAnimation } from "framer-motion";

export const useScrollAnimation = (
  threshold: number = 0.1,
  once: boolean = true
) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once,
    amount: threshold 
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return { ref, controls, isInView };
};
