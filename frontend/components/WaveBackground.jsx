import React from 'react';
import { View, Dimensions } from 'react-native';
import { Svg, Path } from 'react-native-svg';
const { width } = Dimensions.get('window');

const WaveBackground = () => {

    return (
        <View style={{ width: '100%', overflow: 'hidden' }}>
            <Svg height="140" width={width} viewBox="0 0 1440 320" preserveAspectRatio="none">
                <Path
                    fill="#4CAF50"
                    d="M0,160 C120,140 240,80 360,96 C480,112 600,192 720,213.3 C840,235 960,203 1080,170 C1200,137 1320,115 1440,128 L1440,0 L0,0 Z"
                />
            </Svg>
        </View>
    );
};

export default WaveBackground;
