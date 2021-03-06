import React, { FC, useState } from 'react';
import { Modal, Text, TextInput, Button, View, Alert } from 'react-native';
import { TaskData } from "../types/data";
import { generateRandomString } from "../utils/util";
import { Picker } from "@react-native-picker/picker";
import { formStyle } from "../styles/formStyle";
import { modalStyle } from "../styles/modalStyle";
import { textStyle } from "../styles/textStyle";
import { viewStyle } from "../styles/viewStyle";

interface Props {
    visible: boolean;
    onRequestClose: () => void;
    nowUNIXDateTime: number;
    addTask: (newTaskData :TaskData) => void;
}

const TaskModal: FC<Props> = ({
    visible,
    onRequestClose,
    nowUNIXDateTime,
    addTask,
}) => {
    const nowDate = new Date(nowUNIXDateTime);
    const [taskName, setTaskName] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<number>(nowDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>(nowDate.getMonth());
    const [selectedDate, setSelectedDate] = useState<number>(nowDate.getDate());

    const formInit = () => {
        setTaskName("");
        setSelectedYear(nowDate.getFullYear());
        setSelectedMonth(nowDate.getMonth());
        setSelectedDate(nowDate.getDate());
    }

    return (
        <Modal
            visible={visible}
            onRequestClose={onRequestClose}
            animationType="slide"
        >
            <View style={modalStyle.background}>
                <View style={viewStyle.fat}>
                    <Text style={textStyle.heading2}>課題追加</Text>

                    <View style={viewStyle.row}>
                        <Text>名前: </Text>
                        <TextInput
                            value={taskName}
                            onChangeText={setTaskName}
                            style={formStyle.fillInput}
                        />
                    </View>
                    <View style={viewStyle.row}>
                        <Text>期限: </Text>
                        <View style={formStyle.fillInput}>
                            <Picker
                                selectedValue={selectedYear}
                                onValueChange={(value: number) => setSelectedYear(value)}
                            >
                                {[...Array(3)].map((_: undefined, i: number) => i+nowDate.getFullYear()-1).map((year: number, j:number) => <Picker.Item key={j} label={""+year} value={year} />)}
                            </Picker>
                        </View>
                        <Text>/</Text>
                        <View style={formStyle.fillInput}>
                            <Picker
                                selectedValue={selectedMonth}
                                onValueChange={(value: number) => setSelectedMonth(value)}
                            >
                                {[...Array(12)].map((_: undefined, i: number) => i).map((month: number, j: number) => <Picker.Item key={j} label={""+(month+1)} value={month} />)}
                            </Picker>
                        </View>
                        <Text>/</Text>
                        <View style={formStyle.fillInput}>
                            <Picker
                                selectedValue={selectedDate}
                                onValueChange={(value: number) => setSelectedDate(value)}
                            >
                                {[...Array(31)].map((_: undefined, i: number) => i+1).map((date: number, j: number) => <Picker.Item key={j} label={""+date} value={date} />)}
                            </Picker>
                        </View>
                    </View>
                    <Button title="追加する" onPress={() => {
                        if(taskName.trim() !== ""){
                            const UNIXTime = new Date(selectedYear, selectedMonth, selectedDate).getTime();
                            addTask({
                                id: generateRandomString(),
                                name: taskName,
                                deadline: UNIXTime,
                                isDone: false,
                            });
                            formInit();
                            onRequestClose();
                        }else{
                            Alert.alert("注意！", "入力に不備があります。");
                        }
                    }} />
                </View>

                <Button title="閉じる" onPress={() => {
                    formInit();
                    onRequestClose();
                }} />
            </View>
        </Modal>
    );
}

export default TaskModal;
