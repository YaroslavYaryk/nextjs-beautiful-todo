import React from 'react';
import ColorTheme from '../components/ColorTheme'


type Props = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  availableColors: string[];
  selectTaskColor: (color: string) => void;
}

const ChooseTaskColor = (props: Props) => {
  return (
    <div>
      <div className="choose-color-container">
        <div className="choose-color-header">
          <div className="choose-color-header-text">Create to do list</div>
          <div className="choose-color-header-subtext">Choose your to do list color theme:</div>
        </div>
        <div className="choose-color-body">
          {props.availableColors.map(color => (
            <div key={color}>
              <ColorTheme color={color} selectedColor={props.selectedColor} setSelectedColor={props.setSelectedColor} />
            </div>
          ))}
        </div>
        <div className="choose-color-footer">
          <div className="page-bottom-button" onClick={() => props.selectTaskColor(props.selectedColor)}>
            Open Todyapp
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseTaskColor;