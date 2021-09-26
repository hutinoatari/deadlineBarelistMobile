import React, { FC } from 'react';
import { View } from 'react-native';
import { tableStyle } from "../styles/tableStyle";

const Table: FC<{}> = ({children}) => {
    return (
        <View style={tableStyle.table}>
            {children}
        </View>
    );
}

const Row: FC<{}> = ({children}) => {
    return (
        <View style={tableStyle.row}>
            {children}
        </View>
    );
}

const Cell: FC<{}> = ({children}) => {
    return (
        <View style={tableStyle.cell}>
            {children}
        </View>
    );
}

const CellHead: FC<{}> = ({children}) => {
    return (
        <View style={tableStyle.cellHead}>
            {children}
        </View>
    );
}

export { Table, Row, Cell, CellHead };
