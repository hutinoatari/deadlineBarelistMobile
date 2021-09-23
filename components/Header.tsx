import React, { FC } from 'react';
import { Text, View } from 'react-native';

const Header: FC<{}> = () => {
    return (
        <View style={{
            backgroundColor: "#ffaaaa",
            alignItems: "center",
        }}>
            <Text>期限ギリギリスト</Text>
        </View>
    );
}

export default Header;
