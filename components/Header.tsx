import React, { FC } from 'react';
import { Text, View } from 'react-native';

const Header: FC<{}> = () => {
    return (
        <View style={{alignItems: "center"}}>
            <Text>期限ギリギリスト</Text>
        </View>
    );
}

export default Header;
