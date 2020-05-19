import React from 'react';
import '../../Styles/Stack/AddColorButton.css';
import { IoIosAdd } from 'react-icons/io';
import { INPUT_TEXT_GRAY } from '../../Utils/hexConstants';
import { ButtonBase } from '@material-ui/core';

function AddColorButton(props) {
    const { clickFunction, disabled } = props;

    return (
        <div className='add-color-container'>
            <ButtonBase centerRipple disableRipple={disabled}>
                <div className='add-color-button' onClick={clickFunction}>
                    <IoIosAdd size='35px' color={INPUT_TEXT_GRAY} />
                    <p>Add Color</p>
                </div>
            </ButtonBase>
        </div>
    );
}

export default AddColorButton;
