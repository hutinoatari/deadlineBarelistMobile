import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { FC, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, ScrollView, Modal, Text, Button, TextInput } from 'react-native';
import { Table, Row, Cell } from "./components/Table";
import TaskModal from "./components/TaskModal";

const App: FC<{}> = () => {
    const [taskModalVisible, setTaskModalVisible] = useState<boolean>(false);

    return (
        <SafeAreaView style={{
            flex: 1,
            paddingTop: StatusBar.currentHeight,
        }}>
            <ExpoStatusBar />

            <View style={{
                backgroundColor: "#ffaaaa",
                alignItems: "center",
            }}>
                <Text>期限ギリギリスト</Text>
            </View>

            <View style={{
                flexDirection: "row",
                backgroundColor: "#aaffaa",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Button title="リスト" onPress={() => {
                    setTaskModalVisible(true);
                }} />
                <Text>・</Text>
                <Button title="定期リスト" onPress={() => {}} disabled />
            </View>

            <View style={{
                flex: 1,
                backgroundColor: "#ffffaa",
            }}>
                <Text>課題リスト</Text>
                <Button title="更新する" onPress={() => {}} />
                <ScrollView>
                    <Table>
                        <Row>
                            <Cell><Text>名前</Text></Cell>
                            <Cell><Text>期限</Text></Cell>
                            <Cell><Text>状態</Text></Cell>
                            <Cell><Text>完了</Text></Cell>
                            <Cell><Text>削除</Text></Cell>
                        </Row>
                    </Table>
                    <Table>
                        <Row>
                            <Cell><Text>課題A</Text></Cell>
                            <Cell><Text>2021/9/18</Text></Cell>
                            <Cell><Text>x</Text></Cell>
                            <Cell><Button title="完了" onPress={() => {}} /></Cell>
                            <Cell><Button title="削除" onPress={() => {}} /></Cell>
                        </Row>
                        <Row>
                            <Cell><Text>課題B</Text></Cell>
                            <Cell><Text>2021/10/12</Text></Cell>
                            <Cell><Text>o</Text></Cell>
                            <Cell><Button title="完了" onPress={() => {}} /></Cell>
                            <Cell><Button title="削除" onPress={() => {}} /></Cell>
                        </Row>
                    </Table>
                </ScrollView>
            </View>

            <View style={{
                backgroundColor: "#ffaaff",
                alignItems: "center",
            }}>
                <Text>(C)2021 淵野アタリ</Text>
            </View>

            <TaskModal
                visible={taskModalVisible}
                onRequestClose={() => {
                    setTaskModalVisible(false);
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
