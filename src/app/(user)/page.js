'use client'

import Image from "next/image";
import { useRouter, redirect } from 'next/navigation'
import { useEffect } from "react";

export default function Home() {  

  useEffect(()=>{
    // redirect('/admin'); 
  }, [])
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-blue-500 text-3xl">Welcome to my site</h1>
    </div>
  );
}
