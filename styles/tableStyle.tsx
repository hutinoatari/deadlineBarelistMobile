import { StyleSheet } from "react-native";

const tableStyle = StyleSheet.create({
    table: {
        borderWidth: 1,
    },
    row: {
        flexDirection: "row",
    },
    cell: {
        flex: 1,
        borderWidth: 1,
    },
    cellHead: {
        flex: 1,
        borderWidth: 1,
        alignItems: "center",
    },
});

export { tableStyle };
