import { useEffect, useRef, useState } from "react"

export const useInView = (threshold = 0.12) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if(!element) return;

    const observer = new IntersectionObserver(
      // Observer Callback: The callback runs whenever visibility changes. The observer returns an array of entries.
      ([entry]) => {
        if(entry.isIntersecting) setVisible(true);
      },

      // Threshold Option: Controls how much of the element must be visible before triggering.
      {threshold}
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold])

  return {ref, visible};
}
