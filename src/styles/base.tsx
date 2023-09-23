import { StyleSheet } from "react-native";

export const base = StyleSheet.create({
    container: {
        flex: 1
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    clear: {
        backgroundColor: 'transparent'
    },
    fullWidth: {
        width: '100%'
    },
    fullHeight: {
        height: '100%'
    },
    innerContainer: {
        flex: 1,
        paddingTop: "5%",
        paddingHorizontal: "5%"
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold"
    },
    sectionDescription: {
        fontSize: 18
    },
    section: {
        marginVertical: "5%"
    },
    listItem: {
        borderRadius: 10,
        backgroundColor: "rgb(219, 234, 254)",
        marginBottom: '5%',
    },
    input: {
        marginBottom: "5%"
    }
});
