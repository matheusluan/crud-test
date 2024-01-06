import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types';
import { RowJustifyBetween, RowJustifyCenter, styles } from '../../global/styles_global';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../../components/Input';
import { Select } from '../../components/Select';
import { iOption } from '../../interfaces/iOption';
import MyButton from '../../components/MyButton';
import { Header, HeaderText, ModalContainer, ModalContent } from './styles';
import { Modal, TouchableOpacity, View, Text, Alert } from 'react-native';
import UserList from '../../components/UserList';
import { iUser } from '../../interfaces/iUser';
import axios from 'axios';

type UserScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'User'>;
};

const UserScreen: React.FC<UserScreenProps> = ({ navigation }) => {

  //States form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  async function handleCadastro() {

    //Verification of fields
    if (
      !firstName ||
      !lastName ||
      !streetName ||
      !streetNumber ||
      !poBox ||
      !city ||
      !state ||
      !zipCode ||
      !country ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Atention!', 'Missing fields. Please, review!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Atention!', 'Passwords are different. Please, review!');
      return;
    }

    const newUser: iUser = {
      _id: '',
      firstName: firstName,
      lastName: lastName,
      streetName: streetName,
      streetNumber: streetNumber,
      poBox: poBox,
      city: city,
      country: country,
      email: email,
      password: password,
    };


    try {
      const response = await axios.post('http://192.168.1.5:3333/v1/user', newUser);

      if (response) {
        Alert.alert('Sucess!', 'User created');

        setFirstName('');
        setLastName('');
        setStreetName('');
        setStreetNumber('');
        setPoBox('');
        setCity('');
        setState('');
        setZipCode('');
        setCountry('');
        setEmail('');
        setPassword('');
        setConfirmPassword('')
        setSelectedOption(undefined);
      }

    } catch (error) {
      Alert.alert('Erro!', 'User not created');
    }

  }

  function handleSelectedOption(op: iOption) {
    if (op) {
      setSelectedOption(op);
      setCountry(op.descricao);
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
        <Input placeholder="First Name" value={firstName} onChangeText={setFirstName} />
      </RowJustifyCenter>
      <RowJustifyCenter>
        <Input placeholder="Last Name" value={lastName} onChangeText={setLastName} />
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
        <MyButton style={{ flex: 1 }} title="Add" onPress={() => { handleCadastro() }} />
        <MyButton style={{ flex: 1 }} title="Modify" onPress={() => { console.log("Pressed Modify") }} />
        <MyButton style={{ flex: 1 }} title="Delete" onPress={() => { console.log("Pressed Delete") }} />
      </RowJustifyBetween>

      <MyButton style={{ width: "100%", backgroundColor: "#383838" }} title="Query" onPress={() => { setModalVisible(true) }} />

      <MyButton style={{ width: "100%" }} icon="arrow-forward-sharp" title="Next" onPress={() => { console.log("Pressed Query") }} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <ModalContainer>
          <UserList onClose={closeModal} />
        </ModalContainer>
      </Modal>

    </KeyboardAwareScrollView >
  );
};

export default UserScreen;
