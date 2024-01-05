import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types';
import { RowJustifyBetween, RowJustifyCenter } from '../../global/styles_global';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../../components/Input';
import { Select } from '../../components/Select';
import { iOption } from '../../interfaces/iOption';
import MyButton from '../../components/MyButton';
import { Header, HeaderText } from './styles';

type UserScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'User'>;
};

const UserScreen: React.FC<UserScreenProps> = ({ navigation }) => {

  //States form
  const [name, setName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [poBox, setPoBox] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<iOption | null>();

  function handleCadastro() {
    throw new Error('Function not implemented.');
  }

  function handleSelectedOption(op: iOption) {
    if (op) {
      setSelectedOption(op);
      setOpenOptions(false);
    }
  }

  const countries = [
    { 'id': '1', 'descricao': 'United States' },
    { 'id': '2', 'descricao': 'Canada' },
    { 'id': '3', 'descricao': 'United Kingdom' },
    { 'id': '4', 'descricao': 'Germany' },
    { 'id': '5', 'descricao': 'France' },
    { 'id': '6', 'descricao': 'Japan' },
    { 'id': '7', 'descricao': 'Australia' },
    { 'id': '8', 'descricao': 'Brazil' },
    { 'id': '9', 'descricao': 'China' },
    { 'id': '10', 'descricao': 'India' },
    { 'id': '11', 'descricao': 'South Africa' },
    { 'id': '12', 'descricao': 'Mexico' }
  ];

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ padding: 10, paddingTop: 40, justifyContent: 'center', alignItems: 'center' }}>

      <Header>
        <HeaderText> User Profile</HeaderText>
      </Header>

      <RowJustifyCenter>
        <Input placeholder="Name" value={name} onChangeText={setName} />
      </RowJustifyCenter>
      <RowJustifyBetween>
        <Input placeholder="Street Name" value={streetName} onChangeText={setStreetName} half={true} />
        <Input placeholder="Street Number" value={streetNumber} onChangeText={setStreetNumber} half={true} />
      </RowJustifyBetween>
      <RowJustifyBetween>
        <Input placeholder="Po Box" value={poBox} onChangeText={setPoBox} half={true} />
        <Input placeholder="City" value={city} onChangeText={setCity} half={true} />
      </RowJustifyBetween>
      <RowJustifyBetween>
        <Input placeholder="State" value={state} onChangeText={setState} half={true} />
        <Input placeholder="Zip Code" value={zipCode} onChangeText={setZipCode} half={true} />
      </RowJustifyBetween>

      <Select
        icon="chevron-down"
        onSelect={(item: iOption) => { handleSelectedOption(item) }}
        options={countries}
        setOpenOptions={setOpenOptions}
        openOptions={openOptions}
        value={selectedOption || null}
      />

      <RowJustifyBetween>
        <Input placeholder="E-mail" value={email} onChangeText={setEmail} half={true} />
        <Input placeholder="E-mail" value={email} onChangeText={setEmail} half={true} />
      </RowJustifyBetween>
      <RowJustifyBetween>
        <Input placeholder="Password" value={password} onChangeText={setPassword} half={true} />
        <Input placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} half={true} />
      </RowJustifyBetween>

      <RowJustifyBetween>
        <MyButton style={{ flex: 1 }} title="Add" onPress={() => { console.log("Pressed Add") }} />
        <MyButton style={{ flex: 1 }} title="Modify" onPress={() => { console.log("Pressed Modify") }} />
        <MyButton style={{ flex: 1 }} title="Delete" onPress={() => { console.log("Pressed Delete") }} />
      </RowJustifyBetween>

      <MyButton style={{ width: "100%", backgroundColor: "#383838" }} title="Query" onPress={() => { console.log("Pressed Query") }} />

      <MyButton style={{ width: "100%" }} icon="arrow-forward-sharp" title="Next" onPress={() => { console.log("Pressed Query") }} />

    </KeyboardAwareScrollView >
  );
};

export default UserScreen;
