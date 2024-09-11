"use client"; // This is a client component 👈🏽


import React from 'react';
import '../styles/start/main.css'
import '../globals.css'
import '../../../public/images/start/task.svg'
import FirstPage from "@/app/start/components/firstPage";
import SecondPage from "@/app/start/components/secondPage";
import ThirdPage from "@/app/start/components/thirdPage";
import {useSwipeable} from 'react-swipeable';
import ForthPage from "@/app/start/components/forthPage";
import {useRouter} from "next/navigation";

const Page = (props: any) => {

  const [page, setPage] = React.useState(1);

  const router = useRouter();

  const changePage = (nextPage: number) => {
    setPage(nextPage);
  }


  React.useEffect(() =>{
    const userAgent = navigator.userAgent;
    const isSafari = userAgent.includes('Safari') && !userAgent.includes('Chrome') && !userAgent.includes('Chromium');
    console.log(page)
    if (page === 1){
      document.body.classList.add(`first-page`);
    }else{
      document.body.classList.remove(`first-page`);
    }

    if (isSafari){
      document.body.classList.remove('safari-browser-1');
      document.body.classList.remove('safari-browser-2');
      document.body.classList.remove('safari-browser-3');
      document.body.classList.remove('safari-browser-4');

      document.body.classList.add(`safari-browser-${page}`);
    }

  }, [page])


  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (page === 4){
        return;
      }
      setPage(page + 1)
    },
    onSwipedRight: () => {
      if (page === 1){
        return;
      }
      setPage(page - 1)
    },
    trackMouse: true
  });

  const redirectToLogin = () => {
    router.push('auth/login');
  }


  return (
    <div className={`main-container`} {...handlers}>
      <div className={`page first-page ${page === 1 ? 'active' : ''} ${page > 1 ? 'page-previous' : ''}`}><FirstPage
        changePage={changePage} page={page}/></div>
      <div className={`page second-page ${page === 2 ? 'active' : ''} ${page > 2 ? 'page-previous' : ''}`}><SecondPage
         changePage={changePage} page={page}/></div>
      <div className={`page third-page ${page === 3 ? 'active' : ''} ${page > 3 ? 'page-previous' : ''}`}><ThirdPage
         changePage={changePage} page={page}/></div>
      <div className={`page forth-page ${page === 4 ? 'active' : ''}`}><ForthPage
                                                                                  changePage={changePage}
                                                                                  redirectToLogin={redirectToLogin}
                                                                                  page={page}/></div>
    </div>
  );
};

export default Page;