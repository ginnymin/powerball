import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Components
import Picker from './Picker';
import SlideInView from './SlideInView';

export default class PowerPicker extends React.Component {
    constructor(props) {
        super(props);
        this.visibility = props.visibility;
        this.fadeoutCompleted = this.fadeoutCompleted.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.visibility) {
            this.visibility = true;
            this.transition = false;
        } else {
            this.transition = true;
        }
        return true;
    }

    render() {
        if (!this.visibility) {
            return (<View></View>);
        }
        return (
            <View style={styles.container}>
                <SlideInView style={styles.picker} transition={this.transition} fadeoutCompleted={this.fadeoutCompleted}>
                    <Text style={styles.text}>POWERBALL NUMBER</Text>
                    <Picker type="powerball" max={26} onSelect={this.props.onSelect} selected={this.props.powerball} />
                </SlideInView>
            </View>
        );
    }

    fadeoutCompleted() {
        this.visibility = false;
        this.forceUpdate();
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, .9)',
        height: '100%',
        width: '100%'
    },
    picker: {
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: 'white',
        shadowColor: '#666',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 1 },
        paddingTop: 20,
        paddingBottom: 10,
        marginTop: 25,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 420,
        width: '80%'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        marginBottom: 12
    }
});
