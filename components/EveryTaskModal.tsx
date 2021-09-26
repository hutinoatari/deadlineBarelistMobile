import React, { FC } from 'react';
import { StyleSheet, Modal,ScrollView, Text, Button, View, TextInput, Alert } from 'react-native';
import { Table, Row, Cell } from "./Table";

interface Props {
    visible: boolean;
    onRequestClose: () => void;
}

const EveryTaskModal: FC<Props> = ({
    visible,
    onRequestClose,
}) => {
    return (
        <Modal
            visible={visible}
            onRequestClose={onRequestClose}
            animationType="slide"
        >
            <View style={{
                backgroundColor: "#aaaaff",
            }}>
                <Text style={{fontWeight: "bold"}}>定期課題リスト</Text>
            </View>

            <View style={{
                backgroundColor: "#aaaaff",
            }}>
                <View style={{
                    flexDirection: "row",
                }}>
                    <Text>名前　　: </Text>
                    <TextInput
                        style={{
                            backgroundColor: "white",
                            borderWidth: 1,
                            padding: 0,
                            flex: 1,
                        }}
                    />
                </View>
                <View style={{
                    flexDirection: "row",
                }}>
                    <Text>追加曜日: </Text>
                    <TextInput
                        style={{
                            backgroundColor: "white",
                            borderWidth: 1,
                            padding: 0,
                            flex: 1,
                        }}
                    />
                </View>
                <View style={{
                    flexDirection: "row",
                }}>
                    <Text>期限日数: </Text>
                    <TextInput
                        keyboardType="numeric"
                        style={{
                            backgroundColor: "white",
                            borderWidth: 1,
                            padding: 0,
                            flex: 1,
                        }}
                    />
                </View>
                <Button title="追加する" onPress={() => {}} />
            </View>

            <View style={{
                flex: 1,
                backgroundColor: "#ffffaa",
            }}>
                <ScrollView>
                    <Table>
                        <Row>
                            <Cell><Text>名前</Text></Cell>
                            <Cell><Text>追加曜日</Text></Cell>
                            <Cell><Text>期限日数</Text></Cell>
                            <Cell><Text>削除</Text></Cell>
                        </Row>
                    </Table>
                    <Table>
                        <Row>
                            <Cell><Text>課題A</Text></Cell>
                            <Cell><Text>月曜日</Text></Cell>
                            <Cell><Text>7日</Text></Cell>
                            <Cell><Button title="削除" onPress={() => {}} color="red" /></Cell>
                        </Row>
                    </Table>
                </ScrollView>
            </View>
            <Button title="閉じる" onPress={onRequestClose} />
        </Modal>
    );
}

export default EveryTaskModal;
