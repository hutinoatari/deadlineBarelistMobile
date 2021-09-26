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
            <View style={{
                backgroundColor: "#aaaaff",
                flex: 1,
            }}>
                <Text style={{fontWeight: "bold"}}>設定</Text>
                <Button title="キャッシュを含めて全削除" onPress={() => {
                    Alert.alert(
                        "注意！",
                        "本当に削除しますか？(1度削除したデータは戻せません)",
                        [
                            {text: "削除する", onPress: () => {dataClear()}},
                            {text: "やめる", style: "cancel"}
                        ]
                    );
                }} color="red" />
            </View>
            <Button title="閉じる" onPress={onRequestClose} />
        </Modal>
    );
}

export default SettingModal;
