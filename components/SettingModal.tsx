import React, { FC } from 'react';
import { StyleSheet, Modal, Text, Button, View, Alert } from 'react-native';

interface Props {
    visible: boolean;
    onRequestClose: () => void;
    dataClear: () => void;
}

const SettingModal: FC<Props> = ({
    visible,
    onRequestClose,
    dataClear,
}) => {
    return (
        <Modal
            visible={visible}
            onRequestClose={onRequestClose}
            animationType="slide"
        >
            <Button title="閉じる" onPress={onRequestClose} />
            <View style={{
                backgroundColor: "#aaaaff",
            }}>
                <Text style={{fontWeight: "bold"}}>設定</Text>
                <Button title="キャッシュを含めて全削除" onPress={dataClear} color="red" />
            </View>
        </Modal>
    );
}

export default SettingModal;