"use client"; // This is a client component 👈🏽

import React from 'react';
import '../../styles/start/main.css'
import '../../styles/auth/login.css'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useRouter} from "next/navigation";
import axios from 'axios';
import Swal from 'sweetalert2'

import {SERVER_HOST, SERVER_PORT} from "@/lib/config";
import getCookieValue from "@/lib/functions";

const Page = (props: any) => {

  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [isSafari, setIsSafari] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [textLeft, setTextLeft] = React.useState<number>(0);

  React.useEffect(() =>{
    let tokenToUse = null;
    const token = getCookieValue('token')
    if (token) {
      tokenToUse = token;
    }else{
      const localStorageToken = localStorage.getItem('token');
      if (localStorageToken){
        tokenToUse = localStorageToken;
      }
    }

    if (tokenToUse){
      document.cookie = `token=${tokenToUse}; Secure; SameSite=Strict;  Path=/; Max-Age=36000`;
      return router.push('/todo/list');
    }

  }, [])

  const [formValidity, setFormValidity] = React.useState({
    password: true,
    username: true,
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const redirectToRegister = () => {
    router.push('register');
  }

  React.useEffect(() => {
    const userAgent = navigator.userAgent;
    const safari = userAgent.includes('Safari') && !userAgent.includes('Chrome') && !userAgent.includes('Chromium');
    setIsSafari(safari);

    const buttonBlock = document.getElementsByClassName('page-bottom-button')[0];
    if (buttonBlock){
      setTextLeft(buttonBlock.getBoundingClientRect().left + 7)
    }
  }, [])

  const checkFormValidity = () => {
    if (!username) {
      setFormValidity(prevState => ({
        ...prevState,
        username: false
      }))
    } else {
      setFormValidity(prevState => ({
        ...prevState,
        username: true
      }))
    }

    if (!password) {
      setFormValidity(prevState => ({
        ...prevState,
        password: false
      }))
    } else {
      setFormValidity(prevState => ({
        ...prevState,
        password: true
      }))
    }

    return password && username;
  }

  const handleLogin = React.useCallback(async () =>{

    if (!checkFormValidity()){
      return;
    }

    setLoading(true);
    setError(null);
    try{
      const response = await axios.post(`${SERVER_HOST}:${SERVER_PORT}/auth/sign-in/`,{
         username,
         password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.token){
        document.cookie = `token=${response.data.token}; Secure; SameSite=Strict;  Path=/; Max-Age=36000`;
        localStorage.setItem('token', response.data.token);
        router.push('/todo/list');
      }
    }catch (error: any){
      if (error.response && error.response.data.error === "sql: no rows in result set"){
        setError("There are no user with these credentials")
      }else{
        setError(error.message)
      }
    }finally {
      setLoading(false);
    }
  }, [ checkFormValidity, password, router, username])


  if (error){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
    });

  }

  return (
    <div className="content-page2">
      <div className="page-header">
        <div className="page-header-auth">
          <div className="page-header-auth-main">Welcome back!</div>
          <div className="page-header-auth-subset">Your work faster and structured with Todyapp</div>

        </div>
      </div>
      <div className="content-center-auth">
        <div className="content-center-auth">
          <FormControl sx={{m: 1, width: '90%'}} variant="outlined">
            <div className="input-label">Username</div>
            <OutlinedInput
              id="outlined-adornment-username"
              type="text"
              value={username}
              onInput={(val: any) => {
                setUsername(val.target.value)
              }}
              error={!formValidity.username}
            />
          </FormControl>
          <FormControl sx={{m: 1, width: '90%'}} variant="outlined">
            <div className="input-label">Passoword</div>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onInput={(val: any) => {
                setPassword(val.target.value)
              }}
              error={!formValidity.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
      <div className={`page-bottom-footer ${isSafari ? 'safari-footer' : ''}`}>
        <div style={{left: textLeft}} className="register-account">Don`t have an account? <span onClick={redirectToRegister}>Register</span>
        </div>
        <div className="page-bottom-button" onClick={handleLogin}>
          {loading ? 'Logging in': 'Login'}
        </div>
      </div>
    </div>
  );
};

export default Page;