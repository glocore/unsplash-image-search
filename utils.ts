import { isEqual } from "lodash";
import {
  DependencyList,
  EffectCallback,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
  }: Args
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current; // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
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
