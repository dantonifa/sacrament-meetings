'use client';

import { useEffect, useState } from 'react';
import NavLinks from './NavLinks';

export default function Header() {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

  return (
    <header className="...">
      {/* Keep your existing JSX here, rendering {currentDate} */}
    </header>
  );
}