import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { FC } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Text, Button, View } from 'react-native';

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
