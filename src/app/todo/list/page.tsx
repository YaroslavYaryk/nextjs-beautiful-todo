"use client"

import React from 'react';
import axios from "axios";
import {SERVER_HOST, SERVER_PORT} from "@/lib/config";
import {useUserStore} from "@/lib/store/user";
import ChooseTaskColor from "@/app/todo/list/components/ChooseTaskColor";
import '../../styles/todo/list.css'
import {UserStruct} from "@/lib/structs/user";
import {NextResponse} from "next/server";
import {redirect, useRouter} from "next/navigation";

const availableColors = ['#24A19C', '#1B1C1F', '#EA4335', '#1877F2']


const Page = () => {

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showChooseColor, setShowChooseColor] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState<string>('#24A19C');
  const [currentUser, setCurrentUser] = React.useState<UserStruct>();

  const {setUser} = useUserStore();

  const router = useRouter();


  const loadUser = React.useCallback(async (token: string) => {
    setError(null);
    setLoading(true);
    try {

      const response = await axios.get(`${SERVER_HOST}:${SERVER_PORT}/api/user`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setCurrentUser(response.data);
      if (!response.data.task_color) {
        setShowChooseColor(true);
      }

    } catch (error: any) {
      if (error.response.status === 401) {
        document.cookie = `token=; Secure; SameSite=Strict; Path=/; Max-Age=0`;
        localStorage.removeItem("token");
        router.push('/auth/login');
      }
      setError(error.message);

    } finally {
      setLoading(false);
    }
  }, [setError, setLoading, setCurrentUser, currentUser]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUser(token);
    }

  }, [])


  const selectTaskColor = React.useCallback(async (color: string) => {
    setError(null);
    setLoading(true);
    try {
      let us = {...currentUser}
      // @ts-ignore
      setCurrentUser(prevState => ({
        ...prevState,
        task_color: color,
      }))
      us.task_color = color;

      const token = localStorage.getItem("token");
      const response = await axios.post(`${SERVER_HOST}:${SERVER_PORT}/api/user/edit`, {
        ...us
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setUser(response.data);
      if (!response.data.task_color) {
        setShowChooseColor(true);
      }else{
        setShowChooseColor(false);
      }

    } catch (error: any) {
      console.log(error);
      setError(error.message);

    } finally {
      setLoading(false);
    }
  }, [setError, setLoading, currentUser]);


  if (showChooseColor) {
    return (
      <ChooseTaskColor availableColors={availableColors} selectedColor={selectedColor}
                       setSelectedColor={setSelectedColor} selectTaskColor={selectTaskColor}/>
    )
  }

  return (
    <div>
      LIST
    </div>
  );
};

export default Page;