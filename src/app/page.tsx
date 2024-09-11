"use client"

import React from "react";
import {redirect} from "next/navigation";

export default function Home() {

  React.useEffect(() =>{
    const hasSeenFirst = localStorage.getItem("seenFirst");
    if (!hasSeenFirst) {
      setTimeout(() =>{
        localStorage.setItem('seenFirst', 'true');
      }, 1000)
      redirect('start');
    }else{
      redirect('todo/list');
    }
  }, [])

}
