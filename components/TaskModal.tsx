import React, { FC, useState } from 'react';
import { StyleSheet, Modal, Text, TextInput, Button, View, Alert } from 'react-native';
import { TaskData } from "../types/data";
import { generateRandomString } from "../utils/util";
import { Picker } from "@react-native-picker/picker";

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
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());

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
                    <Picker
                        selectedValue={selectedYear}
                        onValueChange={(value) => {
                            setSelectedYear(value);
                        }}
                        style={{
                            backgroundColor: "white",
                            borderWidth: 1,
                            padding: 0,
                            flex: 1,
                        }}
                    >
                        {[...Array(2)].map((_, i) => i + new Date().getFullYear()).map((year, j) => <Picker.Item key={j} label={""+year} value={year} />)}
                    </Picker>
                    <Text>/</Text>
                    <Picker
                        selectedValue={selectedMonth}
                        onValueChange={(value) => {
                            setSelectedMonth(value);
                        }}
                        style={{
                            backgroundColor: "white",
                            borderWidth: 1,
                            padding: 0,
                            flex: 1,
                        }}
                    >
                        {[...Array(12)].map((_, i) => i).map((month, j) => <Picker.Item key={j} label={""+(month+1)} value={month} />)}
                    </Picker>
                    <Text>/</Text>
                    <Picker
                        selectedValue={selectedDate}
                        onValueChange={(value) => {
                            setSelectedDate(value);
                        }}
                        style={{
                            backgroundColor: "white",
                            borderWidth: 1,
                            padding: 0,
                            flex: 1,
                        }}
                    >
                        {[...Array(31)].map((_, i) => i + 1).map((date, j) => <Picker.Item key={j} label={""+date} value={date} />)}
                    </Picker>
                </View>
                <Button title="追加する" onPress={() => {
                    const taskNamestring = taskName;
                    if(taskNamestring.trim()!==""){
                        const UNIXTime = new Date(selectedYear, selectedMonth, selectedDate).getTime();
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
