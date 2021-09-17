import React, { FC } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

const Table: FC<{}> = ({children}) => {
    return (
        <View style={{
            borderWidth: 1,
        }}>
            {children}
        </View>
    );
}

const Row: FC<{}> = ({children}) => {
    return (
        <View style={{
            flexDirection: "row",
        }}>
            {children}
        </View>
    );
}

const Cell: FC<{}> = ({children}) => {
    return (
        <View style={{
            flex: 1,
            borderWidth: 1,
        }}>
            {children}
        </View>
    );
}

export { Table, Row, Cell };