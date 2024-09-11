// src/app/middleware.js
import {NextResponse, NextRequest} from 'next/server';
import {useAuthStore} from "@/lib/store";
// import useLocalStorage from "@/lib/hooks";
import React, {useEffect} from "react";
import { cookies } from "next/headers";


export async function middleware(request: NextRequest) {

  const authToken = request.cookies.get('token');

  if (!authToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: '/todo/:path*',
}