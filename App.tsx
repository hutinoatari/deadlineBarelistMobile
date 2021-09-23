import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { FC, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, ScrollView, Modal, Text, Button, TextInput } from 'react-native';
import { Table, Row, Cell } from "./components/Table";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskModal from "./components/TaskModal";
import { TaskData } from "./types/data";
import { UNIXTimeToYYYYMMDD } from "./utils/util";

const App: FC<{}> = () => {
    const [taskDatas, setTaskDatas] = useState<TaskData[]>([{name: "a",deadline: 0,isDone: false,}]);
    const addTask = (newTaskData: TaskData): void => {
        const tmpArray = [...taskDatas];
        tmpArray.push(newTaskData);
        setTaskDatas(tmpArray);
    }
    const [taskModalVisible, setTaskModalVisible] = useState<boolean>(false);

    return (
        <SafeAreaView style={{
            flex: 1,
            paddingTop: StatusBar.currentHeight,
        }}>
            <ExpoStatusBar />

            <Header />

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
                        {taskDatas.map((taskData: TaskData, i: number) => 
                            <Row key={i}>
                                <Cell><Text>{taskData.name}</Text></Cell>
                                <Cell><Text>{UNIXTimeToYYYYMMDD(taskData.deadline)}</Text></Cell>
                                <Cell><Text>{taskData.isDone ? "o" : "x"}</Text></Cell>
                                <Cell><Button title="完了" onPress={() => {}} /></Cell>
                                <Cell><Button title="削除" onPress={() => {}} /></Cell>
                            </Row>
                        )}
                    </Table>
                </ScrollView>
            </View>

            <Footer />

            <TaskModal
                visible={taskModalVisible}
                onRequestClose={() => {
                    setTaskModalVisible(false);
                }}
                addTask={addTask}
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
