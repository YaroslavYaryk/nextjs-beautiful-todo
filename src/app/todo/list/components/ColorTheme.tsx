import React from 'react';
import {FaCheck} from "react-icons/fa";

type Props = {
  color: string;
  selectedColor: string | null;
  setSelectedColor: (color: string) => void;
}

const ColorTheme = (props: Props) => {
  return (
    <div>
      <div className="color-theme-container" onClick={() =>{props.setSelectedColor(props.color)}}>
        {props.selectedColor === props.color ? (<div style={{background: props.color}} className="theme-selected">
          <FaCheck color={'#fff'} size="14px" />
        </div>) : ''}
        <div className="color-theme-header" style={{background: props.color}}></div>
        <div className="color-theme-body">
          <div className="color-theme-body-left">
            <div className="color-theme-body-left-inner"></div>
          </div>
          <div className="color-theme-body-right">
            <div className="color-theme-body-right-row"></div>
            <div className="color-theme-body-right-row"></div>
            <div className="color-theme-body-right-row"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorTheme;