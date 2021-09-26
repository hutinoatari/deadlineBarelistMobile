import React, { FC, useState } from 'react';
import { Modal,ScrollView, Text, Button, View, TextInput, Alert } from 'react-native';
import { Table, Row, Cell } from "./Table";
import { EveryTaskData } from "../types/data";
import { generateRandomString, dayString } from "../utils/util";
import { Picker } from "@react-native-picker/picker";
import { formStyle } from "../styles/formStyle";
import { modalStyle } from "../styles/modalStyle";

interface Props {
    visible: boolean;
    onRequestClose: () => void;
    nowUNIXTime: number;
    everyTaskDatas: EveryTaskData[];
    addEveryTask: (newEveryTaskData: EveryTaskData) => void;
    deleteEveryTask: (id: string) => void;
}

const EveryTaskModal: FC<Props> = ({
    visible,
    onRequestClose,
    nowUNIXTime,
    everyTaskDatas,
    addEveryTask,
    deleteEveryTask,
}) => {
    const nowDate = new Date(nowUNIXTime);
    const [everyTaskName, setEveryTaskName] = useState<string>("");
    const [selectedAddDay, setSelectedAddDay] = useState<number>(nowDate.getDay());
    const [grace, setGrace] = useState<string>(""+7);

    return (
        <Modal
            visible={visible}
            onRequestClose={onRequestClose}
            animationType="slide"
        >
            <View style={modalStyle.background}>
                <Text style={{fontWeight: "bold"}}>定期課題リスト</Text>

                <View style={{
                    flexDirection: "row",
                }}>
                    <Text>名前　　: </Text>
                    <TextInput
                        value={everyTaskName}
                        onChangeText={setEveryTaskName}
                        style={formStyle.fillInput}
                    />
                </View>
                <View style={{
                    flexDirection: "row",
                }}>
                    <Text>追加曜日: </Text>
                    <Picker
                        selectedValue={selectedAddDay}
                        onValueChange={(value) => setSelectedAddDay(value)}
                        style={formStyle.fillInput}
                    >
                        {dayString.map((day: string, i: number) => <Picker.Item key={i} label={day} value={i} />)}
                    </Picker>
                </View>
                <View style={{
                    flexDirection: "row",
                }}>
                    <Text>期限日数: </Text>
                    <TextInput
                        value={grace}
                        onChangeText={setGrace}
                        keyboardType="numeric"
                        style={formStyle.fillInput}
                    />
                    <Text>日</Text>
                </View>
                <Button title="追加する" onPress={() => {
                    const graceNumber = +grace;
                    if(everyTaskName.trim()!=="" && !isNaN(graceNumber)){
                        addEveryTask({
                            id: generateRandomString(),
                            name: everyTaskName,
                            addDay: selectedAddDay,
                            grace: graceNumber,
                        });
                    }
                }} />

                <View style={{flex: 1}}>
                    <Table>
                        <Row>
                            <Cell><Text>名前</Text></Cell>
                            <Cell><Text>追加曜日</Text></Cell>
                            <Cell><Text>期限日数</Text></Cell>
                            <Cell><Text>削除</Text></Cell>
                        </Row>
                    </Table>
                    <ScrollView>
                        <Table>
                            {everyTaskDatas.map((everyTaskData: EveryTaskData) =>
                                <Row key={everyTaskData.id}>
                                    <Cell><Text>{everyTaskData.name}</Text></Cell>
                                    <Cell><Text>{dayString[everyTaskData.addDay]}</Text></Cell>
                                    <Cell><Text>{`${everyTaskData.grace}日`}</Text></Cell>
                                    <Cell><Button title="削除" onPress={() => {
                                        Alert.alert(
                                            "注意！",
                                            `${everyTaskData.name}を本当に削除しますか？(1度削除したデータは戻せません)`,
                                            [
                                                {text: "削除する", onPress: () => deleteEveryTask(everyTaskData.id)},
                                                {text: "やめる", style: "cancel"}
                                            ]
                                        );
                                    }} color="red" /></Cell>
                                </Row>
                            )}
                        </Table>
                    </ScrollView>
                </View>

                <Button title="閉じる" onPress={onRequestClose} />
            </View>
        </Modal>
    );
}

export default EveryTaskModal;
