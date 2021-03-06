import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { FC, useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, ScrollView, Text, Button, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Table, Row, Cell, CellHead } from "./components/Table";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskModal from "./components/TaskModal";
import EveryTaskModal from "./components/EveryTaskModal";
import SettingModal from "./components/SettingModal";
import { TaskData, EveryTaskData } from "./types/data";
import { UNIXTimeToYYYYMMDD, UNIXTimeToUNIXDateTime, generateRandomString } from "./utils/util";
import { textStyle } from "./styles/textStyle";
import { viewStyle } from "./styles/viewStyle";

const App: FC<{}> = () => {
    const [taskDatas, setTaskDatas] = useState<TaskData[]>([]);
    const [isTaskDatasLoaded, setIsTaskDatasLoaded] = useState<boolean>(false);
    const [everyTaskDatas, setEveryTaskDatas] = useState<EveryTaskData[]>([]);
    const [isEveryTaskDatasLoaded, setIsEveryTaskDatasLoaded] = useState<boolean>(false);
    const addTask = (newTaskData: TaskData): void => {
        const newTaskDatas = [...taskDatas, newTaskData];
        const sortedNewTaskDatas = newTaskDatas.sort((a: TaskData, b: TaskData) => a.deadline - b.deadline);
        setTaskDatas(sortedNewTaskDatas);
    }
    const addTasks = (newTaskDataArray: TaskData[]): void => {
        const newTaskDatas = [...taskDatas, ...newTaskDataArray];
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
        AsyncStorage.clear();
    };

    const [nowUNIXDateTime, setNowUNIXDateTime] = useState<number>(UNIXTimeToUNIXDateTime(new Date().getTime()));
    const [lastUpdateUNIXTime, setLastUpdateUNIXTime] = useState<number>(nowUNIXDateTime);
    const [isLastUpdateUNIXTimeLoaded, setIsLastUpdateUNIXTimeLoaded] = useState<boolean>(false);
    const [taskModalVisible, setTaskModalVisible] = useState<boolean>(false);
    const [everyTaskModalVisible, setEveryTaskModalVisible] = useState<boolean>(false);
    const [settingModalVisible, setSettingModalVisible] = useState<boolean>(false);

    const taskDataUpdate = () => {
        if(lastUpdateUNIXTime === nowUNIXDateTime) return;

        const dateSecond = 86400000;
        const newTasks = [];
        for(let n=lastUpdateUNIXTime+dateSecond; n<=nowUNIXDateTime; n+=dateSecond){
            const date = new Date(n);
            const y = date.getFullYear();
            const m = date.getMonth();
            const d = date.getDate();
            const day = date.getDay();
            for(const everyTaskData of everyTaskDatas){
                if(everyTaskData.addDay !== day) continue;
                const deadline = new Date(y, m, d+everyTaskData.grace).getTime();
                newTasks.push({
                    id: generateRandomString(),
                    name: everyTaskData.name,
                    deadline: deadline,
                    isDone: false,
                });
            }
        }
        addTasks(newTasks);
        setLastUpdateUNIXTime(nowUNIXDateTime);
    }

    useEffect(() => {
        AsyncStorage.getItem("task").then((json) => setTaskDatas(json ? JSON.parse(json) : [])).finally(() => setIsTaskDatasLoaded(true));
        AsyncStorage.getItem("everyTask").then((json) => setEveryTaskDatas(json ? JSON.parse(json) : [])).finally(() => setIsEveryTaskDatasLoaded(true));
        AsyncStorage.getItem("lastUpdate").then((json) => setLastUpdateUNIXTime(json ? JSON.parse(json) : nowUNIXDateTime)).finally(() => setIsLastUpdateUNIXTimeLoaded(true));
    }, []);
    useEffect(() => {
        if(isTaskDatasLoaded && isEveryTaskDatasLoaded && isLastUpdateUNIXTimeLoaded) taskDataUpdate();
    },[isTaskDatasLoaded, isEveryTaskDatasLoaded, isLastUpdateUNIXTimeLoaded]);
    useEffect(() => {
        AsyncStorage.setItem("task", JSON.stringify(taskDatas));
    }, [taskDatas]);
    useEffect(() => {
        AsyncStorage.setItem("everyTask", JSON.stringify(everyTaskDatas));
    }, [everyTaskDatas]);
    useEffect(() => {
        AsyncStorage.setItem("lastUpdate", JSON.stringify(lastUpdateUNIXTime));
    }, [lastUpdateUNIXTime]);
    useEffect(() => {
        taskDataUpdate();
    }, [nowUNIXDateTime]);

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
                <Button title="????????????" onPress={() => setTaskModalVisible(true)} />
                <Text>???</Text>
                <Button title="?????????????????????" onPress={() => setEveryTaskModalVisible(true)} />
                <Text>???</Text>
                <Button title="??????" onPress={() => setSettingModalVisible(true)} />
            </View>

            <View style={viewStyle.fat}>
                <Text style={textStyle.heading2}>???????????????</Text>
                <View style={viewStyle.row}>
                    <View style={viewStyle.fat}>
                        <Button title="????????????" onPress={() => setNowUNIXDateTime(UNIXTimeToUNIXDateTime(new Date().getTime()))} />
                    </View>
                    <View style={viewStyle.fat}>
                        <Button title="?????????????????????" onPress={() => {
                            Alert.alert(
                                "?????????",
                                "??????????????????????????????\n(1??????????????????????????????????????????)",
                                [
                                    {text: "????????????", onPress: () => {
                                        const newData = taskDatas.filter((taskData: TaskData) => !((taskData.deadline < nowUNIXDateTime) && taskData.isDone));
                                        setTaskDatas(newData);
                                    }},
                                    {text: "?????????", style: "cancel"}
                                ]
                            );
                        }} color="red" />
                    </View>
                </View>
                
                <Table>
                    <Row>
                        <CellHead><Text>??????</Text></CellHead>
                        <CellHead><Text>??????</Text></CellHead>
                        <CellHead><Text>??????</Text></CellHead>
                        <CellHead><Text>??????</Text></CellHead>
                    </Row>
                </Table>
                <ScrollView>
                    <Table>
                        {taskDatas.map((taskData: TaskData) =>
                            <Row key={taskData.id}>
                                <Cell><Text>{taskData.name}</Text></Cell>
                                <Cell>
                                    <Text style={{color: ((taskData.deadline < nowUNIXDateTime) && !taskData.isDone) ? "red" : "black"}}>
                                        {UNIXTimeToYYYYMMDD(taskData.deadline)}
                                    </Text>
                                </Cell>
                                <Cell>
                                    <View style={viewStyle.row}>
                                        <Text style={{color: taskData.isDone ? "green" : "black"}}>{taskData.isDone ? "???" : "???"}</Text>
                                        <View style={viewStyle.fat}>
                                            <Button title="??????" onPress={() => changeDone(taskData.id)} />
                                        </View>
                                    </View>
                                </Cell>
                                <Cell><Button title="??????" onPress={() => {
                                    Alert.alert(
                                        "?????????",
                                        `???${taskData.name}????????????????????????????????????\n(1??????????????????????????????????????????)`,
                                        [
                                            {text: "????????????", onPress: () => deleteTask(taskData.id)},
                                            {text: "?????????", style: "cancel"}
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
                nowUNIXDateTime={nowUNIXDateTime}
                addTask={addTask}
            />

            <EveryTaskModal
                visible={everyTaskModalVisible}
                onRequestClose={() => setEveryTaskModalVisible(false)}
                nowUNIXDateTime={nowUNIXDateTime}
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
