import React from 'react';
import { Dimensions, Animated, Easing } from 'react-native';

export default class SlideInView extends React.Component {
    start = Dimensions.get('window').height;
    end = 0;
    position =  new Animated.Value(Dimensions.get('window').height);
    visible = false;

    componentDidMount() {
        Animated.spring(this.position, {
            toValue: this.end,
            speed: 16,
            bounciness: 4
        }).start(() => {
            this.visible = true;
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.transition) {
            Animated.timing(this.position, {
                toValue: this.start,
                easing: Easing.back(),
                duration: 500
            }).start(() => {
                this.visible = false;
                this.props.fadeoutCompleted();
            });
        }
    }

    render() {
        return (
            <Animated.View style={[this.props.style, { top: this.position }]}>
                {this.props.children}
            </Animated.View>
        );
    }
}