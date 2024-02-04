"use client"

import { useState, useEffect } from 'react'

export default function Login() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient &&
        <ul>
          <p>로그인 없음</p>
        </ul>
      }
    </>
  )
}
