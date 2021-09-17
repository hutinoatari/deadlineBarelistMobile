import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { FC } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, Text, Button, TextInput } from 'react-native';
import { Table, Row, Cell } from "./components/Table";

const App: FC<{}> = () => {
  return (
    <SafeAreaView style={{
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      width: "100%",
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
        <Button title="リスト" onPress={() => {}} />
        <Text>・</Text>
        <Button title="定期リスト" onPress={() => {}} />
      </View>

      <View style={{
        backgroundColor: "#aaaaff",
      }}>
        <Text>タスク追加</Text>
        <View style={{
          flexDirection: "row",
        }}>
          <Text>名前: </Text>
          <TextInput style={{
            backgroundColor: "white",
            borderWidth: 1,
            padding: 0,
            flex: 1,
          }} />
        </View>
        <View style={{
          flexDirection: "row",
        }}>
          <Text>期限: </Text>
          <TextInput style={{
            backgroundColor: "white",
            borderWidth: 1,
            padding: 0,
            flex: 1,
          }} />
        </View>
        <Button title="追加する" onPress={() => {}} />
      </View>

      <View style={{
        backgroundColor: "#ffffaa",
      }}>
        <Text>課題リスト</Text>
        <Table>
          <Row>
            <Cell><Text>名前</Text></Cell>
            <Cell><Text>期限</Text></Cell>
            <Cell><Text>状態</Text></Cell>
            <Cell><Text>完了</Text></Cell>
            <Cell><Text>削除</Text></Cell>
          </Row>
          <Row>
            <Cell><Text>課題A</Text></Cell>
            <Cell><Text>2021/10/12</Text></Cell>
            <Cell><Text>x</Text></Cell>
            <Cell><Button title="完了" onPress={() => {}} /></Cell>
            <Cell><Button title="削除" onPress={() => {}} /></Cell>
          </Row>
        </Table>
      </View>

      <View style={{
        backgroundColor: "#ffaaff",
        alignItems: "center",
      }}>
        <Text>(C)2021 淵野アタリ</Text>
      </View>
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
