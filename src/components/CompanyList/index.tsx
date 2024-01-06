import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { iCompany } from '../../interfaces/iCompany';
import Icon from 'react-native-vector-icons/Ionicons';

interface CompanyListProps {
    onClose: () => void;
    selectCompany: (selectedCompany: iCompany) => void;
    companies: iCompany[];
}

const CompanyList: React.FC<CompanyListProps> = ({ onClose, selectCompany, companies }) => {

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <TouchableOpacity onPress={onClose} style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: 20, height: 20, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}>
                    <Icon name='close' size={15} color='black' />
                </TouchableOpacity>
                <Text style={{ fontWeight: '700', flex: 2, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>Companies List</Text>
            </View>

            <FlatList
                data={companies}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => selectCompany(item)} style={{ marginBottom: 10, backgroundColor: '#fff', padding: 10, marginVertical: 10, borderRadius: 5 }}>
                        <Text>{`ID: ${item._id}`}</Text>
                        <Text>{`Name: ${item.name}`}</Text>
                        <Text>{`Email: ${item.email}`}</Text>
                        <Text>{`Address: ${item.streetName} ${item.streetNumber}`}</Text>
                        <Text>{`Pobox: ${item.poBox}`}</Text>
                        <Text>{`ZipCode: ${item.zipCode}`}</Text>
                        <Text>{`State: ${item.state}`}</Text>
                        <Text>{`City: ${item.city}`}</Text>
                        <Text>{`Country: ${item.country}`}</Text>
                        <Text>{`Telephone: ${item.telephone}`}</Text>
                        <Text>{`Fax: ${item.fax}`}</Text>
                        <Text>{`Type: ${item.type}`}</Text>
                    </TouchableOpacity>
                )}
            />
        </View >
    );
};

export default CompanyList;
