import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { iUser } from '../../interfaces/iUser';
import Icon from 'react-native-vector-icons/Ionicons';

interface UserListProps {
    onClose: () => void;
    users: iUser[];
}

const UserList: React.FC<UserListProps> = ({ onClose, users }) => {

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <TouchableOpacity onPress={onClose} style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: 20, height: 20, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}>
                    <Icon name='close' size={15} color='black' />
                </TouchableOpacity>
                <Text style={{ fontWeight: '700', flex: 2, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>User List</Text>
            </View>

            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 10, backgroundColor: '#fff', padding: 10, marginVertical: 10, borderRadius: 5 }}>
                        <Text>{`ID: ${item._id}`}</Text>
                        <Text>{`Full Name: ${item.firstName} ${item.lastName}`}</Text>
                        <Text>{`Email: ${item.email}`}</Text>
                        <Text>{`Address: ${item.streetName} ${item.streetNumber}`}</Text>
                        <Text>{`Pobox: ${item.poBox}`}</Text>
                        <Text>{`ZipCode: ${item.zipCode}`}</Text>
                        <Text>{`State: ${item.state}`}</Text>
                        <Text>{`City: ${item.city}`}</Text>
                        <Text>{`Country: ${item.country}`}</Text>
                    </View>
                )}
            />
        </View >
    );
};

export default UserList;
