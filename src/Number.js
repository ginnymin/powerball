import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';

// Colors
import colors from './colors';

export default class Number extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: (this.props.selected) ? this.props.selected : false
        };
    }
    render() {
        let buttonStyles = [styles.button];
        let textStyles = [styles.text];

        if (this.state.selected) {
            buttonStyles.push(styles.buttonSelected);
            textStyles.push(styles.textSelected);
            if (this.props.type === 'powerball') {
                buttonStyles.push(styles.buttonSelectedPower);
                textStyles.push(styles.textSelectedPower);
            }
        }

        return (
            <TouchableHighlight style={buttonStyles} onPress={() => { this.onPress(parseInt(this.props.number)); }} underlayColor={"#fff"}>
                <Text style={textStyles}>{this.props.number}</Text>
            </TouchableHighlight>
        );
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            selected: (nextProps.selected) ? nextProps.selected : false
        };
    }
    onPress(number) {
        let isSelected = (this.state.selected) ? false : true;
        let isMaxed = this.props.onSelect(number, isSelected);
        if (!isMaxed) {
            this.setState({ selected: isSelected });
        }
    }
}

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        margin: 4
    },
    buttonSelected: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#333',
        marginTop: 2
    },
    buttonSelectedPower: {
        borderColor: colors.red,
        backgroundColor: colors.red
    },
    text: {
        color: '#aaa',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 36
    },
    textSelected: {
        color: '#333'
    },
    textSelectedPower: {
        color: '#fff'
    }
});
