import React, { Component} from 'react';
import { Animated,View,Image,Dimensions} from 'react-native';


export default class progressiveImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0)
        }
    }
    onLoad() {
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 50
        }).start()
    }
    onThumbnailLoad() {
        Animated.timing(this.state.thumbnailOpacity, {
            toValue: 1,
            duration: 50
        }).start();
    }
    render() {
        const { width } = Dimensions.get('window');
        return (
            <View
                height={200}
                width={width/3.2}
                style={{marginLeft:2,borderRadius:10,justifyContent: 'center',}}
            >
                <Image
                    resizeMode={'cover'}
                    key={this.props.key}
                    style={{position: 'absolute',width:'95%',height:'100%',justifyContent: 'center',borderRadius:5}}
                    source={this.props.source}
                />
            </View>
        )
    }
}

