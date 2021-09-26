import React, { FC } from 'react';
import { Modal, Text, Button, View, Alert } from 'react-native';
import { modalStyle } from "../styles/modalStyle";
import { textStyle } from "../styles/textStyle";
import { viewStyle } from "../styles/viewStyle";

interface Props {
    visible: boolean;
    onRequestClose: () => void;
    dataAllClear: () => void;
}

const SettingModal: FC<Props> = ({
    visible,
    onRequestClose,
    dataAllClear,
}) => {
    return (
        <Modal
            visible={visible}
            onRequestClose={onRequestClose}
            animationType="slide"
        >
            <View style={modalStyle.background}>
                <View style={viewStyle.fat}>
                    <Text style={textStyle.heading2}>設定</Text>

                    <Button title="キャッシュを含めて全削除" onPress={() => {
                        Alert.alert(
                            "注意！",
                            "本当に削除しますか？(1度削除したデータは戻せません)",
                            [
                                {text: "削除する", onPress: dataAllClear},
                                {text: "やめる", style: "cancel"}
                            ]
                        );
                    }} color="red" />
                </View>

                <Button title="閉じる" onPress={onRequestClose} />
            </View>
        </Modal>
    );
}

export default SettingModal;
