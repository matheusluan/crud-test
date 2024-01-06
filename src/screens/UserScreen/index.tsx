import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types';
import { RowJustifyBetween, RowJustifyCenter, styles } from '../../global/styles_global';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../../components/Input';
import { Select } from '../../components/Select';
import { iOption } from '../../interfaces/iOption';
import MyButton from '../../components/MyButton';
import { Header, HeaderText, ModalContainer, ModalContent } from './styles';
import { Modal, View, Alert } from 'react-native';
import UserList from '../../components/UserList';
import { iUser } from '../../interfaces/iUser';
import axios from 'axios';
import { Loading } from '../../components/Loading';

type UserScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'User'>;
};

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

  const [openOptionsUser, setOpenOptionsUser] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<iOption | null>();
  const [users, setUsers] = useState<iUser[]>([]);
  const [user, setUser] = useState<iUser>();
  const [usersOpt, setUsersOpt] = useState<iOption[]>([]);

  const [loading, setLoading] = useState(true);
  const [att, setAtt] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  async function handleCreateUser() {

    if (!validationFields()) {
      return
    }

    const newUser: iUser = {
      _id: '',
      firstName: firstName,
      lastName: lastName,
      streetName: streetName,
      streetNumber: streetNumber,
      zipCode: streetNumber,
      state: state,
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

        clearFields();

      }

    } catch (error) {
      Alert.alert('Erro!', 'User not created');
    }

  }

  async function handleDeleteUser() {
    if (user) {
      Alert.alert(
        'Attention',
        'Are you shure about that?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              try {
                setLoading(true);
                const response = await axios.delete('http://192.168.1.5:3333/v1/user/' + user._id);

                if (response) {
                  Alert.alert('Sucess!', 'User deleted');
                  clearFields();
                }
              } catch (error) {
                Alert.alert('Error!', 'User not deleted');
              } finally {
                setLoading(false);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert('Attention', 'Please, select a profile!')
    }
  }

  async function handleModifyUser() {

    if (user) {
      Alert.alert(
        'Attention',
        'Are you shure about that?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Modify',
            onPress: async () => {
              try {

                if (!validationFieldsEdit()) {
                  return
                }

                setLoading(true);

                const userModified: iUser = {
                  _id: user._id,
                  firstName: firstName,
                  lastName: lastName,
                  streetName: streetName,
                  streetNumber: streetNumber,
                  state: state,
                  zipCode: zipCode,
                  poBox: poBox,
                  city: city,
                  country: country,
                  email: email,
                  password: password,
                };

                const response = await axios.put('http://192.168.1.5:3333/v1/user/' + user._id, userModified);

                if (response) {
                  Alert.alert('Sucess!', 'User Modified');
                  clearFields();
                }
              } catch (error) {
                Alert.alert('Error!', 'User not modified');
              } finally {
                setLoading(false);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert('Attention', 'Please, select a profile!')
    }
  }

  function handleSelectedOption(op: iOption) {
    if (op) {
      setSelectedOption(op);
      setCountry(op.descricao);
      setOpenOptions(false);
    }
  }

  async function handleSelectedOptionUser(op: iOption) {
    if (op) {

      const selectedUser = await users.find((user) => user._id === op.id);

      setSelectedUser(op);
      setUser(selectedUser);

      if (selectedUser) {

        setFirstName(selectedUser.firstName);
        setLastName(selectedUser.lastName);
        setStreetName(selectedUser.streetName);
        setStreetNumber(selectedUser.streetNumber);
        setPoBox(selectedUser.poBox);
        setZipCode(selectedUser.zipCode);
        setState(selectedUser.state);
        setState(selectedUser.state);
        setPoBox(selectedUser.poBox);
        setCity(selectedUser.city);
        setEmail(selectedUser.email);

        const selectedCountry = await countries.find((country) => country.descricao === selectedUser.country);

        if (selectedCountry) {
          setSelectedOption(selectedCountry);
          setCountry(selectedCountry.descricao);
        }

        setOpenOptionsUser(false);
      }
    }
  }

  function clearFields() {
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
    setSelectedUser(undefined);
    setUser(undefined);
    setAtt(!att);
  }

  function validationFields() {

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
      !password || !confirmPassword
    ) {
      Alert.alert('Atention!', 'Missing fields. Please, review!');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Atention!', 'Passwords are different. Please, review!');
      return false;
    }

    return true;
  }

  function validationFieldsEdit() {

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
      !email
    ) {
      Alert.alert('Atention!', 'Missing fields. Please, review!');
      return false;
    }

    return true;
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<iUser[]>('http://192.168.1.5:3333/v1/user');
        setUsers(response.data);

        // Mapear iUser para iOption
        const mappedOptions: iOption[] = response.data.map((user) => ({
          id: user._id,
          descricao: `${user.firstName} ${user.lastName}`,
        }));

        setUsersOpt(mappedOptions);

      } catch (error) {
        console.error('Error at get users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [att]);

  return (
    <KeyboardAwareScrollView>

      {
        loading ?
          <Loading />
          :
          <View style={{ padding: 10, paddingTop: 40, justifyContent: 'center', alignItems: 'center' }}>
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
              text='Country'
              icon="chevron-down"
              onSelect={(item: iOption) => { handleSelectedOption(item) }}
              options={countries}
              setOpenOptions={setOpenOptions}
              openOptions={openOptions}
              value={selectedOption || null}
            />

            <RowJustifyBetween>
              <Input placeholder="E-mail" value={email} onChangeText={setEmail} half={true} />
              <Select
                text='Profile'
                icon="chevron-down"
                half={true}
                onSelect={(item: iOption) => { handleSelectedOptionUser(item) }}
                options={usersOpt}
                setOpenOptions={setOpenOptionsUser}
                openOptions={openOptionsUser}
                value={selectedUser || null}
              />
            </RowJustifyBetween>
            <RowJustifyBetween>
              <Input placeholder="Password" value={password} onChangeText={setPassword} half={true} password={true} />
              <Input placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} half={true} password={true} />
            </RowJustifyBetween>

            <RowJustifyBetween>
              <MyButton style={{ flex: 1 }} title="Add" onPress={() => { handleCreateUser() }} />
              <MyButton style={{ flex: 1 }} title="Modify" onPress={() => { handleModifyUser() }} />
              <MyButton style={{ flex: 1 }} title="Delete" onPress={() => { handleDeleteUser() }} />
            </RowJustifyBetween>

            <MyButton style={{ width: "100%", backgroundColor: "#383838" }} title="Query" onPress={() => { setModalVisible(true) }} />

            <MyButton style={{ width: "100%" }} icon="arrow-forward-sharp" title="Next" onPress={() => { navigation.navigate('Company') }} />

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
            >
              <ModalContainer>
                <UserList onClose={closeModal} users={users} />
              </ModalContainer>
            </Modal>

          </View>
      }
    </KeyboardAwareScrollView >
  );
};

export default UserScreen;
