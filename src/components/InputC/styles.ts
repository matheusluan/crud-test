import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 10,
        flex: 1,
        height: 25,
        margin: 5,
        marginBottom: 5,
        fontWeight: 'bold',
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    input: {
        flex: 1.5,
        textAlign: 'right'
    },
    label: {
        flex: .7
    },

});