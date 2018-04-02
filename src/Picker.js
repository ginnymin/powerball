import React from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import Number from './Number';

export default class Picker extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let i = 1;
        let numbers = [];

        while (i <= this.props.max) {
            let selected = (this.props.selected === i) ? true : false;
            numbers.push(<Number number={`${i}`} key={i} onSelect={this.props.onSelect} type={this.props.type} selected={selected} />);
            i++;
        }

        return (
            <View style={[styles.container, this.props.style]}>{numbers}</View>
        );
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.max === this.props.max && this.props.type === 'normal' && nextProps.selections.length > 0) ? false : true;
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
});
