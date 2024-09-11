"use client"; // This is a client component 👈🏽

import React from 'react';
import '../../styles/start/main.css'
import '../../styles/auth/login.css'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useRouter} from "next/navigation";
import axios from "axios";
import {SERVER_HOST, SERVER_PORT} from "@/lib/config";
import getCookieValue from "@/lib/functions";

interface FormValidity {
  name: boolean
  username: boolean
  password: boolean
}

const Page = (props: any) => {

  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [isSafari, setIsSafari] = React.useState(false);
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [textLeft, setTextLeft] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [formValidity, setFormValidity] = React.useState({
    name: true,
    username: true,
    password: true,
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const redirectToLogin = () => {
    router.push('login');
  }

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
    if (!name){
      setFormValidity(prevState =>({
        ...prevState,
        name: false
      }))
    }else{
      setFormValidity(prevState =>({
        ...prevState,
        name: true
      }))
    }

    if (!username){
      setFormValidity(prevState =>({
        ...prevState,
        username: false
      }))
    }else{
      setFormValidity(prevState =>({
        ...prevState,
        username: true
      }))
    }

    if (!password){
      setFormValidity(prevState =>({
        ...prevState,
        password: false
      }))
    }else{
      setFormValidity(prevState =>({
        ...prevState,
        password: true
      }))
    }

    return name && username && password;

  }

  const handleRegister = React.useCallback(async () =>{

    if (!checkFormValidity()){
      return;
    }

    setLoading(true);
    setError(null);
    try{
      const response = await axios.post(`${SERVER_HOST}:${SERVER_PORT}/auth/sign-up/`,{
        "Username": username,
        "Password": password,
        "Name": name
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

  return (
    <div className="content-page2">
      <div className="page-header">
        <div className="page-header-auth">
          <div className="page-header-auth-main">Create account</div>
          <div className="page-header-auth-subset">Create your account and feel the benefits</div>
        </div>
      </div>
      <div className="content-center-auth">
        <div className="content-center-auth">
          <FormControl sx={{m: 1, width: '90%'}} variant="outlined">
            <div className="input-label">Name</div>
            <OutlinedInput
              id="outlined-adornment-name"
              type="text"
              value={name}
              onInput={(val: any) => {
                setName(val.target.value)
              }
              }
              error={!formValidity.name}
            />
          </FormControl>
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
        <div style={{left: textLeft}} className="register-account">Already have an account? <span onClick={redirectToLogin}>Login</span></div>
        <div className="page-bottom-button" onClick={handleRegister}>
          Sign up
        </div>
      </div>
    </div>
  );
};

export default Page;