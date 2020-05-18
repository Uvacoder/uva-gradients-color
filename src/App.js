import React from 'react';
import './App.css';
import Header from './Components/Header';
import HexPicker from './Components/HexPicker/HexPicker';
import Stack from './Components/Stack/Stack';
import Suggested from './Components/Suggested/Suggested';
import { KAREN, DORA, STEVEN } from './Utils/gradientConstants';

class App extends React.Component {
    state = {
        gradient: STEVEN,
        selected: '#000000', // color selected out of gradient
        dimensions: [], // dimensions of generated image
    };

    render() {
        console.log(this.state);
        const { gradient } = this.state;
        return (
            <div className='App'>
                <Header />
                <div className='left'>
                    <div className='color-picker'>
                        <HexPicker />
                        <div className='color-picker-right'>
                            <Stack gradient={gradient} />
                            <Suggested />
                        </div>
                    </div>
                </div>
                <div className='right'></div>
            </div>
        );
    }
}

export default App;
