import { useToast } from "@chakra-ui/react";
import { isEqual } from "lodash";
import {
  DependencyList,
  EffectCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export const useNetworkStatus = () => {
  const [isOffline, setIsOffline] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const networkToastId = "networkToastId";

    const handleGoingOffline = () => {
      setIsOffline(true);
      if (!toast.isActive(networkToastId)) {
        toast({
          id: networkToastId,
          title: "Offline",
          description: "Please check your network connection.",
          duration: null,
          isClosable: false,
          status: "warning",
          variant: "left-accent",
        });
      }
    };

    const handleGoingOnline = () => {
      setIsOffline(false);
      toast.close(networkToastId);
    };

    window.addEventListener("offline", handleGoingOffline);
    window.addEventListener("online", handleGoingOnline);

    return () => {
      window.removeEventListener("offline", handleGoingOffline);
      window.removeEventListener("online", handleGoingOnline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isOffline };
};

/**
 * Does a deep comparison of object dependencies
 * instead of referential equality.
 */
export const useDeeplyComparedEffect = (
  callback: EffectCallback,
  dependencies: DependencyList | undefined
) => {
  const useDeepCompareMemoize = (value: any) => {
    const ref = useRef();

    if (!isEqual(value, ref.current)) {
      ref.current = value;
    }

    return ref.current;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(
    callback,
    dependencies?.map(useDeepCompareMemoize) as typeof dependencies
  );
};

/**
 * Reference: https://css-tricks.com/converting-color-spaces-in-javascript/#hex-to-hsl
 */
export const hexToHSL = (H: string) => {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = Number("0x" + H[1] + H[1]);
    g = Number("0x" + H[2] + H[2]);
    b = Number("0x" + H[3] + H[3]);
  } else if (H.length == 7) {
    r = Number("0x" + H[1] + H[2]);
    g = Number("0x" + H[3] + H[4]);
    b = Number("0x" + H[5] + H[6]);
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
};

/**
 * Lighten a color to be used as background color.
 */
export const lighten = (hex: string) => {
  let { h, s, l } = hexToHSL(hex);

  l = 85;

  return `hsl(${h}, ${s}%, ${l}%)`;
};

/**
 * Darken a color to be used as foreground color.
 */
export const darken = (hex: string) => {
  let { h, s, l } = hexToHSL(hex);

  l = 15;

  return `hsl(${h}, ${s}%, ${l}%)`;
};
