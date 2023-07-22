import {useEffect, useMemo} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

const useKeyboardKit = () => {
  const promise = useMemo(() => {
    let promiseResolve: (value: number) => void = () => {};
    const newPromise = new Promise<number>(resolve => {
      promiseResolve = resolve;
    });
    return {
      promise: newPromise,
      resolve: promiseResolve,
    };
  }, []);

  useEffect(() => {
    function onKeyboardDidShow(e: KeyboardEvent) {
      const nextHeight = e.endCoordinates.height;
      promise.resolve?.(nextHeight);
    }

    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    return () => {
      showSubscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return promise;
};

export default useKeyboardKit;
