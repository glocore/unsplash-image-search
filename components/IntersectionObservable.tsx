import React, { useEffect, useRef } from "react";
import { useIntersectionObserver } from "../utils";

export const IntersectionObservable = ({
  onVisible,
}: IntersectionObservableProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true });
  const isVisible = !!entry?.isIntersecting;

  console.log(`Render IntersectionObservable isVisible: `, { isVisible });

  useEffect(() => {
    if (isVisible) {
      onVisible();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <span
      ref={ref}
      style={{
        height: 0,
        width: 0,
        display: "inline",
      }}
    />
  );
};

export type IntersectionObservableProps = {
  onVisible: () => void;
};
