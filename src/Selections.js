import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

// Colors
import colors from './colors';

export default class Selections extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let i = 0;
        let numbers = [];
        let sorted = this.props.selections.sort((a,b) => a > b);
        let powerball = (this.props.powerball) ? this.props.powerball : '';

        while (i < 5) {
            numbers.push(<View style={styles.number} key={i}><Text style={styles.text}>{sorted[i]}</Text></View>);
            i++;
        }

        return (
            <View style={styles.container}>
                {numbers}
                <TouchableHighlight style={styles.powerball} onPress={this.props.show}>
                    <Text style={[styles.text, styles.powerText]}>{powerball}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#eee',
        padding: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderTopColor: '#ccc',
    },
    number: {
        width: 40,
        height: 40,
        margin: 4,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ddd',
        backgroundColor: '#fff'
    },
    powerball: {
        width: 40,
        height: 40,
        margin: 4,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.red,
        backgroundColor: colors.red
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 36,
        color: '#333'
    },
    powerText: {
        color: '#fff'
    }
});
