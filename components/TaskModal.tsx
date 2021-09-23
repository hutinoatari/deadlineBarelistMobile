import React, { FC } from 'react';
import { StyleSheet, Modal, Text, TextInput, Button, View } from 'react-native';

interface Props {
    visible: boolean;
    onRequestClose: () => void;
}

const TaskModal: FC<Props> = ({
    visible,
    onRequestClose,
}) => {
    return (
        <Modal
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <Button title="閉じる" onPress={onRequestClose} />
            <View style={{
                backgroundColor: "#aaaaff",
            }}>
                <Text>タスク追加</Text>
                <View style={{
                    flexDirection: "row",
                }}>
                    <Text>名前: </Text>
                    <TextInput style={{
                        backgroundColor: "white",
                        borderWidth: 1,
                        padding: 0,
                        flex: 1,
                    }} />
                </View>
                <View style={{
                    flexDirection: "row",
                }}>
                    <Text>期限: </Text>
                    <Text>2021/9/18</Text>
                    <Button title="日付選択" onPress={() => {}} />
                </View>
                <Button title="追加する" onPress={() => {}} />
            </View>
        </Modal>
    );
}

export default TaskModal;
