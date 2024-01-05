import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '../../components/Input';
import MyButton from '../../components/MyButton';
import { RowJustifyBetween, RowJustifyCenter } from '../../global/styles_global';

type CompanyScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Company'>;
};

const CompanyScreenProps: React.FC<CompanyScreenProps> = ({ navigation }) => {

  const [name, setName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [poBox, setPoBox] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [telephone, setTelephone] = useState('');
  const [fax, setFax] = useState('');

  function handleCadastro() {
    throw new Error('Function not implemented.');
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ padding: 10, paddingTop: 40, justifyContent: 'center', alignItems: 'center' }}>

      <RowJustifyCenter>
        <Input placeholder="Name" value={name} onChangeText={setName} />
      </RowJustifyCenter>
      <RowJustifyBetween>
        <Input placeholder="Street Name" value={streetName} onChangeText={setStreetName} half={true} />
        <Input placeholder="Street Number" value={streetNumber} onChangeText={setStreetNumber} half={true} />
      </RowJustifyBetween>
      
    </KeyboardAwareScrollView >
  );
};

export default CompanyScreenProps;
