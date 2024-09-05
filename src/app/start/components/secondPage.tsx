import React from 'react';
import Image from "next/image";


type Props = {
  page: number;
  changePage: (page: number) => void;
}

const SecondPage = (props: Props) => {
  return (
    <div className="content-page2">
      <div className="page-header"></div>
      <div className="content-center-outer2">
        <div className="content-center">
          <div className="page2-content-center-image">
            <Image
              src="/images/start/page2.svg" // Assumes your image is in the public/images folder
              alt="Logo"
              width={500}
              height={500} // Desired height
            />
          </div>
          <div className="page2-content-center-text">
            Your convenience in <br/>
            making a todo list
          </div>
          <div className="page2-content-center-subtext">
            Here's a mobile platform that helps you create task <br/>
            or to list so that it can help you in every job <br/>
            easier and faster.
          </div>
          <div className="content-center-bottom-buttons content-center-bottom-buttons-second">
            <div className="content-center-bottom-button"></div>
            <div className="content-center-bottom-button-large"></div>
            <div className="content-center-bottom-button"></div>
          </div>
        </div>
      </div>
      <div className="page-bottom-footer">
        <div className="page-bottom-button" onClick={() => (props.changePage(props.page + 1))}>
          Continue
        </div>
      </div>
    </div>
  )
    ;
};

export default SecondPage;