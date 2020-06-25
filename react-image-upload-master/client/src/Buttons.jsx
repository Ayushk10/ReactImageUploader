import React from 'react';
import addIcon from './assets/add.svg';
import './button.css';

export default props => 
  <div className='buttons fadein'>
    <div className='button'>
    <p>Hi! Please upload some pictures</p>
      <label htmlFor='multi'>
        <img className="uploadIcon" src={addIcon} alt="add_icon" title="Add/Upload images" />
      </label>
      <input type='file' id='multi' onChange={(e)=>props.onChange(e)} />
    </div>
  </div>