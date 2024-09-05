import React from 'react';
import Image from "next/image";

type Props = {
    page: number;
    changePage: (page: number) => void;
}

const FirstPage = (props:Props) => {

    return (
        <div className="content">
            <div className="content-center-outer">
                <div className="content-center">
                    <div className="content-center-image">
                        <Image
                            src="/images/start/task.svg" // Assumes your image is in the public/images folder
                            alt="Logo"
                            width={80}
                            height={80} // Desired height
                        />
                    </div>
                    <div className="content-center-text">
                        Todyapp
                    </div>
                    <div className="content-center-subtext">
                        The best to do application for you
                    </div>
                    <div className="content-center-bottom-buttons">
                        <div className="content-center-bottom-button-large"></div>
                        <div className="content-center-bottom-button"></div>
                        <div className="content-center-bottom-button"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstPage;