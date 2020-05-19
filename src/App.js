import React from 'react';
import './App.css';
import Header from './Components/Header';
import HexPicker from './Components/HexPicker/HexPicker';
import Stack from './Components/Stack/Stack';
import Suggested from './Components/Suggested/Suggested';
import StopBar from './Components/StopBar/StopBar';
import CSS from './Components/CSS/CSS';
import ImagePreview from './Components/ImagePreview/ImagePreview';
import { SUGGESTIONS } from './Utils/gradientConstants';
import { Color } from './Utils/Color';
import { shuffle } from './Utils/generalUtils';
import { IPHONE_10 } from './Utils/screenDimensionConstants';

class App extends React.Component {
    state = {
        gradient: null,
        selected: 0, // color selected out of gradient
        width: 0,
        height: 0,
        suggestedSelected: '',
        suggested: [],
    };

    componentWillMount() {
        let shuffledSuggested = shuffle(SUGGESTIONS);
        let shownSuggested = shuffledSuggested.slice(0, 4);
        let first = shownSuggested[0];

        this.setState({
            gradient: first.clone(),
            suggestedSelected: first.name,
            suggested: shownSuggested,
            height: IPHONE_10.height,
            width: IPHONE_10.width,
        });
    }

    addColor = () => {
        const { gradient, selected } = this.state;
        const { stack } = gradient;

        if (stack.length < 5) {
            let stackCopy = [...stack];

            // set curr selected to false
            stackCopy[selected].selected = false;

            // scale other stops
            stack.forEach((c) => {
                c.stop = Math.round((c.index / stack.length) * 100);
            });

            // add color to stack and update selected
            const defaultColor = new Color('ffffff', 100, true, stack.length);
            stackCopy.push(defaultColor);

            gradient.stack = stackCopy;

            this.setState((prevState) => ({
                gradient: {
                    ...prevState.gradient,
                    stack: stackCopy,
                },
                selected: defaultColor.index,
            }));
        }
    };

    changeSelected = (index) => {
        const { gradient, selected } = this.state;
        const { stack } = gradient;
        let stackCopy = [...stack];

        // set curr selected to false
        stackCopy[selected].selected = false;

        // set arg to selected and change this.state.selected
        stackCopy[index].selected = true;

        this.setState((prevState) => ({
            gradient: {
                ...prevState.gradient,
                stack: stackCopy,
            },
            selected: index,
        }));
    };

    deleteColor = (e, deletedIndex) => {
        const { gradient, selected } = this.state;
        const { stack } = gradient;

        this.unsetSuggested();

        if (stack.length > 2) {
            e.stopPropagation();

            let stackCopy = [...stack];
            // set another as selected
            if (deletedIndex === selected) {
                let nextSelected;
                // deleting the last one
                if (deletedIndex === stack.length - 1) {
                    nextSelected = deletedIndex - 1;
                } else {
                    nextSelected = deletedIndex + 1;
                }
                stackCopy[nextSelected].selected = true;
            }

            // update selected
            if (deletedIndex <= selected) {
                if (deletedIndex !== 0) {
                    this.setState((prevState, props) => ({
                        selected: prevState.selected - 1,
                    }));
                }
            }

            // update indices if not the last one
            if (deletedIndex !== stack.length - 1) {
                for (let i = deletedIndex + 1; i < stack.length; i++) {
                    stackCopy[i].index--;
                }
            }

            // remove from stack
            stackCopy.splice(deletedIndex, 1);
            console.log(stackCopy);

            // scale other stops
            stackCopy.forEach((c) => {
                c.stop = Math.round((c.index / (stackCopy.length - 1)) * 100);
            });

            gradient.stack = stackCopy;
            console.log(gradient.stack);

            this.setState((prevState) => ({
                gradient: {
                    ...prevState.gradient,
                    stack: stackCopy,
                },
            }));
        }
    };

    setSuggested = (e, suggestedName) => {
        e.stopPropagation();

        const { suggested } = this.state;

        suggested.forEach((gradient) => {
            if (gradient.name === suggestedName) {
                this.setState({ gradient: gradient.clone() });
            }
        });

        this.setState({ suggestedSelected: suggestedName });
    };

    unsetSuggested = () => {
        this.setState({ suggestedSelected: '' });
    };

    render() {
        const {
            gradient,
            suggestedSelected,
            suggested,
            selected,
            height,
            width,
        } = this.state;
        const { stack } = gradient;
        const color = stack[selected];
        const colorwheelColor = color.getColorwheel();

        console.log(stack);

        return (
            <div className='App' onClick={this.unsetSuggested}>
                <Header gradient={gradient} />
                <div className='container'>
                    <div className='left'>
                        <StopBar gradient={gradient} />
                        <div className='color-picker'>
                            <HexPicker
                                colorwheelColor={colorwheelColor}
                                color={color}
                            />
                            <div className='color-picker-right'>
                                <Stack
                                    gradient={gradient}
                                    addColor={this.addColor}
                                    changeSelected={this.changeSelected}
                                    deleteColor={this.deleteColor}
                                />
                                <Suggested
                                    suggested={suggested}
                                    selected={suggestedSelected}
                                    selectedFunction={this.setSuggested}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='right'>
                        <ImagePreview
                            gradient={gradient}
                            height={height}
                            width={width}
                        />
                        <CSS gradient={gradient} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
