import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { textStyle } from "../styles/textStyle";

const Header: FC<{}> = () => {
    return (
        <View style={{alignItems: "center"}}>
            <Text style={textStyle.heading1}>期限ギリギリスト</Text>
        </View>
    );
}

export default Header;
