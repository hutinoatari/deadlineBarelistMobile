import React, { FC } from 'react';
import { Text, View } from 'react-native';

const Footer: FC<{}> = () => {
    return (
        <View style={{
            backgroundColor: "#ffaaff",
            alignItems: "center",
        }}>
            <Text>(C)2021 淵野アタリ</Text>
        </View>
    );
}

export default Footer;
