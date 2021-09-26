import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, ScrollView, Text, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Table, Row, Cell } from "./components/Table";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskModal from "./components/TaskModal";
import EveryTaskModal from "./components/EveryTaskModal";
import SettingModal from "./components/SettingModal";
import { TaskData } from "./types/data";
import { UNIXTimeToYYYYMMDD } from "./utils/util";

const App: FC<{}> = () => {
    const [taskDatas, setTaskDatas] = useState<TaskData[]>([]);
    const [everyTaskDatas, setEveryTaskDatas] = useState<TaskData[]>([]);
    const addTask = (newTaskData: TaskData): void => {
        setTaskDatas([...taskDatas, newTaskData]);
    }
    const changeDone = (id: string) => {
        const newData = taskDatas.map((taskData: TaskData) => taskData.id === id ? {...taskData, isDone: !taskData.isDone} : taskData);
        setTaskDatas(newData);
    }
    const deleteTask = (id: string) => {
        const newData = taskDatas.filter((e) => e.id !== id);
        setTaskDatas(newData);
    }
    const dataClear = () => {
        setTaskDatas([]);
        AsyncStorage.clear();
    };

    const [todayUNIXTime, setTodayUNIXTime] = useState<number>(new Date().getTime());
    const [taskModalVisible, setTaskModalVisible] = useState<boolean>(false);
    const [everyTaskModalVisible, setEveryTaskModalVisible] = useState<boolean>(false);
    const [settingModalVisible, setSettingModalVisible] = useState<boolean>(false);

    useEffect(() => {
        AsyncStorage.getItem("task").then((json) => {
            if(json) setTaskDatas(JSON.parse(json));
        })
    },[])
    useEffect(() => {
        AsyncStorage.setItem("task", JSON.stringify(taskDatas));
    }, [taskDatas])

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
                <Button title="課題追加" onPress={() => {
                    setTaskModalVisible(true);
                }} />
                <Text>・</Text>
                <Button title="定期課題リスト" onPress={() => {
                    setEveryTaskModalVisible(true);
                }} />
                <Text>・</Text>
                <Button title="設定" onPress={() => {
                    setSettingModalVisible(true);
                }} />
            </View>

            <View style={{
                flex: 1,
                backgroundColor: "#ffffaa",
            }}>
                <Text style={{fontWeight: "bold"}}>課題リスト</Text>
                <Button title="更新する" onPress={() => setTodayUNIXTime(new Date().getTime())} />
                <Button title="終了済の課題を全削除" onPress={() => {
                    const newData = taskDatas.filter((taskData: TaskData) => !((taskData.deadline < todayUNIXTime) && taskData.isDone));
                    setTaskDatas(newData);
                }} color="red" />
                <ScrollView>
                    <Table>
                        <Row>
                            <Cell><Text>名前</Text></Cell>
                            <Cell><Text>期限</Text></Cell>
                            <Cell><Text>状態</Text></Cell>
                            <Cell><Text>削除</Text></Cell>
                        </Row>
                    </Table>
                    <Table>
                        {taskDatas.sort((a: TaskData, b: TaskData) => a.deadline - b.deadline).map((taskData: TaskData) => 
                            <Row key={taskData.id}>
                                <Cell><Text>{taskData.name}</Text></Cell>
                                <Cell>
                                    <Text style={{color: ((taskData.deadline < todayUNIXTime) && !taskData.isDone) ? "red" : "black"}}>
                                        {UNIXTimeToYYYYMMDD(taskData.deadline)}
                                    </Text>
                                </Cell>
                                <Cell>
                                    <View style={{flexDirection: "row"}}>
                                        <Text>{taskData.isDone ? "完" : "未"}</Text>
                                        <View style={{flex: 1}}>
                                            <Button title="変更" onPress={() => changeDone(taskData.id)} />
                                        </View>
                                    </View>
                                </Cell>
                                <Cell><Button title="削除" onPress={() => deleteTask(taskData.id)} color="red" /></Cell>
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

            <EveryTaskModal
                visible={everyTaskModalVisible}
                onRequestClose={() => {
                    setEveryTaskModalVisible(false);
                }}
            />

            <SettingModal
                visible={settingModalVisible}
                onRequestClose={() => {
                    setSettingModalVisible(false);
                }}
                dataClear={dataClear}
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
