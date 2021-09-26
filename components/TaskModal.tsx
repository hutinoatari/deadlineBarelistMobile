import React, { FC, useState } from 'react';
import { StyleSheet, Modal, Text, TextInput, Button, View, Alert } from 'react-native';
import { TaskData } from "../types/data";
import { generateRandomString } from "../utils/util";

interface Props {
    visible: boolean;
    onRequestClose: () => void;
    addTask: (newTaskData :TaskData) => void;
}

const TaskModal: FC<Props> = ({
    visible,
    onRequestClose,
    addTask,
}) => {
    const [taskName, setTaskName] = useState<string>("");
    const [year, setYear] = useState<string>("" + new Date().getFullYear());
    const [month, setMonth] = useState<string>("" + (new Date().getMonth() + 1));
    const [date, setDate] = useState<string>("" + new Date().getDate());

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
                <Text style={{fontWeight: "bold"}}>課題追加</Text>
                <View style={{
                    flexDirection: "row",
                }}>
                    <Text>名前: </Text>
                    <TextInput
                        value={taskName}
                        onChangeText={setTaskName}
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
                    <Text>期限: </Text>
                    <TextInput
                        value={year}
                        onChangeText={setYear}
                        keyboardType="numeric"
                        style={{
                            backgroundColor: "white",
                            borderWidth: 1,
                            padding: 0,
                            flex: 1,
                        }}
                    />
                    <Text>年</Text>
                    <TextInput
                        value={month}
                        onChangeText={setMonth}
                        keyboardType="numeric"
                        style={{
                            backgroundColor: "white",
                            borderWidth: 1,
                            padding: 0,
                            flex: 1,
                        }}
                    />
                    <Text>月</Text>
                    <TextInput
                        value={date}
                        onChangeText={setDate}
                        keyboardType="numeric"
                        style={{
                            backgroundColor: "white",
                            borderWidth: 1,
                            padding: 0,
                            flex: 1,
                        }}
                    />
                    <Text>日</Text>
                </View>
                <Button title="追加する" onPress={() => {
                    const taskNamestring = taskName;
                    const yearNumber = +year;
                    const monthNumber = +month - 1;
                    const dateNumber = +date;
                    if(taskNamestring.trim()!=="" && !isNaN(yearNumber) && !isNaN(monthNumber) && !isNaN(dateNumber)){
                        const UNIXTime = new Date(yearNumber, monthNumber, dateNumber).getTime();
                        addTask({
                            id: generateRandomString(),
                            name: taskNamestring,
                            deadline: UNIXTime,
                            isDone: false,
                        });
                        onRequestClose();
                    }
                }} />
            </View>
            <Button title="閉じる" onPress={onRequestClose} />
        </Modal>
    );
}

export default TaskModal;
