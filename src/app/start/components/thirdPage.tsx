import React from 'react';
import Image from "next/image";

type Props = {
  page: number;
  changePage: (page: number) => void;
}

const ThirdPage = (props: Props) => {

  return (
    <div className="content-page2">
      <div className="page-header"></div>
      <div className="content-center-outer3">
        <div className="content-center">
          <div className="page2-content-center-image">
            <Image
              src="/images/start/page3.svg" // Assumes your image is in the public/images folder
              alt="Logo"
              width={500}
              height={500} // Desired height
            />
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

export default ThirdPage;