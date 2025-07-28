import { useEffect } from "react";

export const useBodyLock = (isLocked) => {
  useEffect(() => {
    const className = "body-lock";

    const addLock = () => {
      document.body.classList.add(className);
    };

    const removeLock = () => {
      document.body.classList.remove(className);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        removeLock();
      }
    };

    if (isLocked && window.innerWidth < 1440) {
      addLock();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      removeLock();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLocked]);
};
