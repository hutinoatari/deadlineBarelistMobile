import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { FC, useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, ScrollView, Text, Button, Alert } from 'react-native';
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Table, Row, Cell, CellHead } from "./components/Table";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskModal from "./components/TaskModal";
import EveryTaskModal from "./components/EveryTaskModal";
import SettingModal from "./components/SettingModal";
import { TaskData, EveryTaskData } from "./types/data";
import { UNIXTimeToYYYYMMDD } from "./utils/util";
import { textStyle } from "./styles/textStyle";
import { viewStyle } from "./styles/viewStyle";

const storage: Storage = new Storage({
    size: 1024,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
});

const App: FC<{}> = () => {
    const [taskDatas, setTaskDatas] = useState<TaskData[]>([]);
    const [everyTaskDatas, setEveryTaskDatas] = useState<EveryTaskData[]>([]);
    const addTask = (newTaskData: TaskData): void => {
        const newTaskDatas = [...taskDatas, newTaskData];
        const sortedNewTaskDatas = newTaskDatas.sort((a: TaskData, b: TaskData) => a.deadline - b.deadline);
        setTaskDatas(sortedNewTaskDatas);
    }
    const changeDone = (id: string) => {
        const newData = taskDatas.map((taskData: TaskData) => taskData.id === id ? {...taskData, isDone: !taskData.isDone} : taskData);
        setTaskDatas(newData);
    }
    const deleteTask = (id: string) => {
        const newData = taskDatas.filter((taskData: TaskData) => taskData.id !== id);
        setTaskDatas(newData);
    }
    const addEveryTask = (newEveryTaskData: EveryTaskData): void => {
        const newEveryDataTasks = [...everyTaskDatas, newEveryTaskData];
        const sortedNewEveryDataTasks = newEveryDataTasks.sort((a: EveryTaskData, b: EveryTaskData) => a.addDay - b.addDay);
        setEveryTaskDatas(sortedNewEveryDataTasks);
    }
    const deleteEveryTask = (id: string) => {
        const newData = everyTaskDatas.filter((everyTaskData: EveryTaskData) => everyTaskData.id !== id);
        setEveryTaskDatas(newData);
    }
    const dataAllClear = () => {
        setTaskDatas([]);
        setEveryTaskDatas([]);
        storage.remove({key: "task"});
        storage.remove({key: "everyTask"});
    };

    const [nowUNIXTime, setNowUNIXTime] = useState<number>(new Date().getTime());
    const [taskModalVisible, setTaskModalVisible] = useState<boolean>(false);
    const [everyTaskModalVisible, setEveryTaskModalVisible] = useState<boolean>(false);
    const [settingModalVisible, setSettingModalVisible] = useState<boolean>(false);

    useEffect(() => {
        storage.load({key: "task"}).then((data: TaskData[]) => setTaskDatas(data));
        storage.load({key: "everyTask"}).then((data: EveryTaskData[]) => setEveryTaskDatas(data));
    },[]);
    useEffect(() => {
        storage.save({
            key: "task",
            data: taskDatas
        });
    }, [taskDatas]);
    useEffect(() => {
        storage.save({
            key: "everyTask",
            data: everyTaskDatas
        });
    }, [everyTaskDatas]);

    return (
        <SafeAreaView style={[{
            paddingTop: StatusBar.currentHeight,
            backgroundColor: "oldlace",
        }, viewStyle.fat]}>
            <ExpoStatusBar />

            <Header />

            <View style={[{
                alignItems: "center",
                justifyContent: "center",
            }, viewStyle.row]}>
                <Button title="課題追加" onPress={() => setTaskModalVisible(true)} />
                <Text>・</Text>
                <Button title="定期課題リスト" onPress={() => setEveryTaskModalVisible(true)} />
                <Text>・</Text>
                <Button title="設定" onPress={() => setSettingModalVisible(true)} />
            </View>

            <View style={viewStyle.fat}>
                <Text style={textStyle.heading2}>課題リスト</Text>
                <View style={viewStyle.row}>
                    <View style={viewStyle.fat}>
                        <Button title="更新する" onPress={() => setNowUNIXTime(new Date().getTime())} />
                    </View>
                    <View style={viewStyle.fat}>
                        <Button title="完了課題を削除" onPress={() => {
                            Alert.alert(
                                "注意！",
                                "本当に削除しますか？\n(1度削除したデータは戻せません)",
                                [
                                    {text: "削除する", onPress: () => {
                                        const newData = taskDatas.filter((taskData: TaskData) => !((taskData.deadline < nowUNIXTime) && taskData.isDone));
                                        setTaskDatas(newData);
                                    }},
                                    {text: "やめる", style: "cancel"}
                                ]
                            );
                        }} color="red" />
                    </View>
                </View>
                
                <Table>
                    <Row>
                        <CellHead><Text>名前</Text></CellHead>
                        <CellHead><Text>期限</Text></CellHead>
                        <CellHead><Text>状態</Text></CellHead>
                        <CellHead><Text>削除</Text></CellHead>
                    </Row>
                </Table>
                <ScrollView>
                    <Table>
                        {taskDatas.map((taskData: TaskData) =>
                            <Row key={taskData.id}>
                                <Cell><Text>{taskData.name}</Text></Cell>
                                <Cell>
                                    <Text style={{color: ((taskData.deadline < nowUNIXTime) && !taskData.isDone) ? "red" : "black"}}>
                                        {UNIXTimeToYYYYMMDD(taskData.deadline)}
                                    </Text>
                                </Cell>
                                <Cell>
                                    <View style={viewStyle.row}>
                                        <Text style={{color: taskData.isDone ? "green" : "black"}}>{taskData.isDone ? "完" : "未"}</Text>
                                        <View style={viewStyle.fat}>
                                            <Button title="変更" onPress={() => changeDone(taskData.id)} />
                                        </View>
                                    </View>
                                </Cell>
                                <Cell><Button title="削除" onPress={() => {
                                    Alert.alert(
                                        "注意！",
                                        `「${taskData.name}」を本当に削除しますか？\n(1度削除したデータは戻せません)`,
                                        [
                                            {text: "削除する", onPress: () => deleteTask(taskData.id)},
                                            {text: "やめる", style: "cancel"}
                                        ]
                                    );
                                }} color="red" /></Cell>
                            </Row>
                        )}
                    </Table>
                </ScrollView>
            </View>

            <Footer />

            <TaskModal
                visible={taskModalVisible}
                onRequestClose={() => setTaskModalVisible(false)}
                nowUNIXTime={nowUNIXTime}
                addTask={addTask}
            />

            <EveryTaskModal
                visible={everyTaskModalVisible}
                onRequestClose={() => setEveryTaskModalVisible(false)}
                nowUNIXTime={nowUNIXTime}
                everyTaskDatas={everyTaskDatas}
                addEveryTask={addEveryTask}
                deleteEveryTask={deleteEveryTask}
            />

            <SettingModal
                visible={settingModalVisible}
                onRequestClose={() => setSettingModalVisible(false)}
                dataAllClear={dataAllClear}
            />
        </SafeAreaView>
    );
}

export default App;
