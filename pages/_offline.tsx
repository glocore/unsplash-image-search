import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./offlineFallback.module.css";

// Source: https://usehooks.com/useEventListener/
function useEventListener(
  eventName: string,
  handler: EventListenerOrEventListenerObject,
  element?: Window
) {
  // Create a ref that stores handler
  const savedHandler = useRef<typeof handler>();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      const _element = element || window;

      const isSupported = _element && _element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = savedHandler.current;

      if (!eventListener) return;

      // Add event listener
      _element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        _element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}

const Eyes = ({
  mouseCoordinates,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  mouseCoordinates: { x: number; y: number };
}) => {
  const eyesRef = useRef<HTMLDivElement>(null);

  const getEyeStyle = () => {
    if (eyesRef.current) {
      const left = eyesRef.current.getBoundingClientRect().left;
      const top = eyesRef.current.getBoundingClientRect().top;

      // distance from eyes to mouse pointer
      const mouseX = mouseCoordinates.x - left;
      const mouseY = mouseCoordinates.y - top;

      const rotationRadians = Math.atan2(mouseX, mouseY);
      const rotationDegrees = rotationRadians * (180 / Math.PI) * -1 + 180;

      return { transform: `rotate(${rotationDegrees}deg)` };
    }
  };

  return (
    <div ref={eyesRef} className={styles["eyes"]} {...rest}>
      <div className={styles["eye"]} style={getEyeStyle()} />
      <div className={styles["eye"]} style={getEyeStyle()} />
    </div>
  );
};

const OfflineFallback = () => {
  const [eyes, setEyes] = useState([
    {
      left: "calc(50% - 50px)",
      top: "calc(50% - 50px)",
    },
  ]);
  const [mouseCoordinates, setMouseCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const handler = useCallback(
    ({ clientX, clientY }) => {
      setMouseCoordinates({ x: clientX, y: clientY });
    },
    [setMouseCoordinates]
  );

  const clickHandler = useCallback(({ clientX, clientY }) => {
    setEyes((oldValue) =>
      oldValue.concat({
        left: `calc(${clientX}px - 50px)`,
        top: `calc(${clientY}px - 25px)`,
      })
    );
  }, []);

  const reset = () => {
    setEyes([]);
  };

  useEventListener("mousemove", handler);
  useEventListener("mousedown", clickHandler);

  return (
    <>
      <div className={styles["mouse-area"]}>
        {eyes.map((eye, index) => (
          <Eyes mouseCoordinates={mouseCoordinates} style={eye} key={index} />
        ))}
        <Text className={styles["background-text"]}>Are you offline?</Text>
        <Text textAlign="center" fontSize="xl" color="gray.500">
          Please check your network connection.
        </Text>
        <Button pos="absolute" bottom={10} right={10} onClick={reset}>
          CLEAR
        </Button>
      </div>
    </>
  );
};

export default OfflineFallback;
