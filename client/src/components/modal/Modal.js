import React  from "react";
import Modal from 'react-modal';

const AboutMe = props=>{
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    return(
        <Modal
        isOpen={true}
        style={customStyles}
        contentLabel="Example Modal">
                test
        </Modal>
    )
}

export default AboutMe;