import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';

// Components
import Selections from './Selections';
import Picker from './Picker';
import PowerPicker from './PowerPicker';

// Colors
import colors from './colors';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selections: [],
            powerball: null,
            powerPicker: false
        };

        this.onSelect = this.onSelect.bind(this);
        this.onPowerSelect = this.onPowerSelect.bind(this);
        this.togglePowerPicker = this.togglePowerPicker.bind(this);
    }
    render() {
        let submitDisabled = (this.state.selections.length === 5 && this.state.powerball) ? false : true;
        let submitStyles = [buttonStyles.submit];

        if (!submitDisabled) {
            submitStyles.push(buttonStyles.submitEnabled);
        }

        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>POWERBALL</Text>
                <View style={styles.selections}>
                    <Selections selections={this.state.selections} powerball={this.state.powerball} show={this.togglePowerPicker} />
                </View>
                <View style={buttonStyles.container}>
                    <TouchableHighlight style={submitStyles} onPress={() => { this.submit(); }} disabled={submitDisabled}><Text style={[buttonStyles.text, { color: 'white' }]}>SUBMIT</Text></TouchableHighlight>
                    <TouchableHighlight style={buttonStyles.clear} onPress={() => { this.clear(); }} underlayColor={"rgba(255,255,255,0)"}><Text style={[buttonStyles.text, { color: colors.red }]}>CLEAR</Text></TouchableHighlight>
                </View>
                <ScrollView contentContainerStyle={styles.pickerContainer}>
                    <Picker type="normal" max={69} onSelect={this.onSelect} selections={this.state.selections} />
                    <PowerPicker visibility={this.state.powerPicker} onSelect={this.onPowerSelect} powerball={this.state.powerball} />
                </ScrollView>
            </SafeAreaView>
        );
    }
    onSelect(number, isSelected) {
        let selections = this.state.selections;

        // Prevent picking more than 5 numbers
        if (selections.length === 5 && isSelected) {
            return true;
        }

        if (isSelected) {
            selections.push(number);
        } else {
            selections.splice(selections.indexOf(number), 1);
        }

        this.setState({ selections: selections });
        
        return false;
    }
    onPowerSelect(number, isSelected) {
        this.setState({ powerball: (this.state.powerball === number) ? null : number });
        return false;
    }
    togglePowerPicker() {
        this.setState({ powerPicker: (this.state.powerPicker) ? false : true });
    }
    clear() {
        this.setState({
            selections: [],
            powerball: null,
        });
    }
    submit() {
        if (this.state.selections.length === 5 && this.state.powerball) {
            console.log('Submit!', this.state.selections, this.state.powerball);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#666',
        fontSize: 20,
        letterSpacing: 3,
        paddingTop: 15,
        paddingBottom: 15,
    },
    selections: {
        marginBottom: 0
    },
    pickerContainer: {
        paddingTop: 20,
        flexGrow: 1
    }
});

const buttonStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#f9f9f9',
        padding: 12
    },
    submit: {
        borderRadius: 5,
        backgroundColor: '#9999997f',
        padding: 6,
        paddingLeft: 18,
        paddingRight: 18,
        marginRight: 20
    },
    submitEnabled: {
        backgroundColor: colors.blue
    },
    text: {
        fontWeight: 'bold',
        color: '#666'
    }
});