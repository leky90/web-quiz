'use client';

import { useAppStore } from 'datas';
import { useEffect } from 'react';

export const useTabActivity = () => {
  const [tabActive, browserActive, setTabActive, setBrowserActive] =
    useAppStore((state) => [
      state.tabActive,
      state.browserActive,
      state.setTabActive,
      state.setBrowserActive,
    ]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setTabActive(!document.hidden);
    };

    const handleWindowFocus = () => {
      setBrowserActive(true);
    };

    const handleWindowBlur = () => {
      setBrowserActive(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  const isActive = browserActive || tabActive;

  return {
    tabActive,
    browserActive,
    isActive,
  };
};

export default useTabActivity;
