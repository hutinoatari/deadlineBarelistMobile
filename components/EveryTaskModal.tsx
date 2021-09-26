import React, { FC, useState } from 'react';
import { StyleSheet, Modal,ScrollView, Text, Button, View, TextInput, Alert } from 'react-native';
import { Table, Row, Cell } from "./Table";
import { EveryTaskData } from "../types/data";
import { generateRandomString, dayString } from "../utils/util";
import { Picker } from "@react-native-picker/picker";

interface Props {
    visible: boolean;
    onRequestClose: () => void;
    everyTaskDatas: EveryTaskData[];
    addEveryTask: (newEveryTaskData: EveryTaskData) => void;
    deleteEveryTask: (id: string) => void;
}

const EveryTaskModal: FC<Props> = ({
    visible,
    onRequestClose,
    everyTaskDatas,
    addEveryTask,
    deleteEveryTask,
}) => {
    const [everyTaskName, setEveryTaskName] = useState<string>("");
    const [selectedAddDay, setSelectedAddDay] = useState<number>(0);
    const [grace, setGrace] = useState<string>("7");

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
                        value={everyTaskName}
                        onChangeText={setEveryTaskName}
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
                    <Picker
                        selectedValue={selectedAddDay}
                        onValueChange={(value) => {
                            setSelectedAddDay(value);
                        }}
                        style={{
                            backgroundColor: "white",
                            borderWidth: 1,
                            padding: 0,
                            flex: 1,
                        }}
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
            </View>

            <View style={{
                flex: 1,
                backgroundColor: "#ffffaa",
            }}>
                
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
                                            {text: "削除する", onPress: () => {deleteEveryTask(everyTaskData.id)}},
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
        </Modal>
    );
}

export default EveryTaskModal;
