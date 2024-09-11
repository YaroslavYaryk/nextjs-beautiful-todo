import React from 'react';
import Image from "next/image";
import {IoMail} from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {redirect} from "next/navigation";

type Props = {
  page: number;
  changePage: (page: number) => void;
  redirectToLogin: () => void;
}

const ForthPage = (props: Props) => {

  const moveOnNextPage = () => {

  }

  return (
    <div className="content-page2">
      <div className="page4-header">
        Welcome to <span>Todyapp</span>
      </div>
      <div className="content-center-outer3">
        <div className="content-center">
          <div className="page2-content-center-image page4-content-center-image">
            <Image
              src="/images/start/page4.svg" // Assumes your image is in the public/images folder
              alt="Logo"
              width={500}
              height={500} // Desired height
              priority={true}
            />
          </div>
          <div className="page-bottom-button block-buttons-page4" onClick={() =>{props.redirectToLogin()}}>
            <span className='button-icon'><IoMail size={20} color='#fff'/></span>
            Continue with username
          </div>
          <div className="page-bottom-subtext">
            or continue with
          </div>
          <div className="page-bottom-buttons">
            <div className="page-bottom-button page4-bottom-button" onClick={() => (moveOnNextPage())}>
              <span className='button-icon'><FaFacebook size={24} color='#1877F2'/></span>
              Facebook
            </div>
            <div className="page-bottom-button page4-bottom-button" onClick={() => (moveOnNextPage())}>
              <span className='button-icon'><FcGoogle size={24} /></span>
              Google
            </div>
          </div>
        </div>
      </div>

      <div className="page-bottom-footer">
      </div>
    </div>
  );
};

export default ForthPage;