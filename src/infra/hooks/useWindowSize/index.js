import { useEffect, useState } from 'react';

export default function useWindowSize() {
  const [isDesktop, setDesktop] = useState(false);

  const updateMedia = () => {
    if (window.innerWidth > 768) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }
  };

  useEffect(() => {
    updateMedia();

    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  return {
    isDesktop,
  };
}
