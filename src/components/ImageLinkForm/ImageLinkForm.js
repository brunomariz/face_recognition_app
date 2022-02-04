import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ on_input_change, on_button_submit }) => {
  return (
    <div>
      <p className='f3 tc'>{`This magic brain will detect faces in your pictures.`}</p>
      <div className='center'>
        <div className='form pa4 shadow-3'>
          <input
            onChange={on_input_change}
            className='f4 pa2 w-70 tc'
            type='text'
            name='imagelink'
            id='1'
            placeholder='https://picsum.photos/200'
          />
          <button
            onClick={on_button_submit}
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue'
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
