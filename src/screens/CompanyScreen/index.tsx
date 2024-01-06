import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RowJustifyBetween, RowJustifyCenter } from '../../global/styles_global';
import { View, Text, Alert, Modal, TouchableHighlight } from 'react-native';
import { Loading } from '../../components/Loading';
import { Header, HeaderText, ModalContainer } from '../UserScreen/styles';
import InputC from '../../components/InputC';
import MyButton from '../../components/MyButton';
import axios from 'axios';
import { iCompany } from '../../interfaces/iCompany';
import CompanyList from '../../components/CompanyList';
import Icon from 'react-native-vector-icons/Ionicons';

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

  const [loading, setLoading] = useState(false);
  const [att, setAtt] = useState(false);

  const [companies, setCompanies] = useState<iCompany[]>([]);
  const [company, setCompany] = useState<iCompany>();

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  async function handleCreateCompany() {

    if (!validationFields()) {
      return
    }

    const newCompany: iCompany = {
      _id: '',
      name: name,
      type: type,
      streetName: streetName,
      streetNumber: streetNumber,
      zipCode: streetNumber,
      state: state,
      poBox: poBox,
      city: city,
      telephone: telephone,
      country: country,
      email: email,
      fax: fax,
    };

    try {
      const response = await axios.post('http://192.168.1.5:3333/v1/companies', newCompany);

      if (response) {
        Alert.alert('Sucess!', 'Company created');

        clearFields();

      }

    } catch (error) {
      Alert.alert('Erro!', 'Company not created');
    }

  }

  async function handleModifyCompany() {

    if (!company) {
      Alert.alert('Attention!', 'Please select a company, by pressing the search icon.')
    }

    if (!validationFields()) {
      return
    }

    const companyEdit: iCompany = {
      _id: company?._id ? company._id : '',
      name: name,
      type: type,
      streetName: streetName,
      streetNumber: streetNumber,
      zipCode: streetNumber,
      state: state,
      poBox: poBox,
      city: city,
      telephone: telephone,
      country: country,
      email: email,
      fax: fax,
    };

    try {
      const response = await axios.put('http://192.168.1.5:3333/v1/companies/' + company?._id, companyEdit);

      if (response) {
        Alert.alert('Sucess!', 'Company modified');

        clearFields();

      }

    } catch (error) {
      Alert.alert('Erro!', 'Company not modified');
    }

  }

  function clearFields() {
    setName('');
    setStreetName('');
    setStreetNumber('');
    setPoBox('');
    setCity('');
    setState('');
    setZipCode('');
    setCountry('');
    setEmail('');
    setZipCode('');
    setType('');
    setTelephone('')
    setFax('');
    setAtt(!att);
  }

  function validationFields() {

    //Verification of fields
    if (
      !name ||
      !type ||
      !telephone ||
      !fax ||
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
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await axios.get<iCompany[]>('http://192.168.1.5:3333/v1/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error at get users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    setLoading(true);
  }, [att]);

  useEffect(() => {
    if (company) {
      // Se uma empresa foi selecionada, preencha os campos do formulário
      setName(company.name);
      setStreetName(company.streetName);
      setStreetNumber(company.streetNumber);
      setPoBox(company.poBox);
      setCity(company.city);
      setState(company.state);
      setZipCode(company.zipCode);
      setCountry(company.country);
      setEmail(company.email);
      setType(company.type);
      setTelephone(company.telephone);
      setFax(company.fax ? company.fax : '');

      setModalVisible(false);
      setAtt(!att);
    }

  }, [company]);

  return (
    <KeyboardAwareScrollView>
      {
        loading ?
          <Loading />
          :
          <View style={{ padding: 10, paddingTop: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Header>
              <HeaderText> Company Profile</HeaderText>
              <TouchableHighlight onPress={() => { setModalVisible(true) }} style={{ marginLeft: 50, justifyContent: 'center', alignItems: 'flex-end', width: 20, height: 20 }}>
                <Icon name='search' size={20} color='white' />
              </TouchableHighlight>
            </Header>
            <RowJustifyCenter>
              <Text style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}> Please, review and confirm</Text>
            </RowJustifyCenter>
            <RowJustifyCenter>
              <InputC label="Name" value={name} onChangeText={setName} />
            </RowJustifyCenter>
            <RowJustifyCenter>
              <InputC label="Street Name" value={streetName} onChangeText={setStreetName} />
            </RowJustifyCenter>
            <RowJustifyCenter>
              <InputC label="Street Number" value={streetNumber} onChangeText={setStreetNumber} />
            </RowJustifyCenter>
            <RowJustifyCenter>
              <InputC label="Po Box" value={poBox} onChangeText={setPoBox} />
            </RowJustifyCenter>
            <RowJustifyCenter>
              <InputC label="City" value={city} onChangeText={setCity} />
            </RowJustifyCenter>
            <RowJustifyCenter>
              <InputC label="State" value={state} onChangeText={setState} />
            </RowJustifyCenter>
            <RowJustifyBetween>
              <InputC label="Zip Code" value={zipCode} onChangeText={setZipCode} />
            </RowJustifyBetween>
            <RowJustifyCenter>
              <InputC label="Country" value={country} onChangeText={setCountry} />
            </RowJustifyCenter>
            <RowJustifyCenter>
              <InputC label="E-mail" value={email} onChangeText={setEmail} />
            </RowJustifyCenter>
            <RowJustifyCenter>
              <InputC label="Type" value={type} onChangeText={setType} />
            </RowJustifyCenter>
            <RowJustifyCenter>
              <InputC label="Telephone" value={telephone} onChangeText={setTelephone} />
            </RowJustifyCenter>
            <RowJustifyCenter>
              <InputC label="Fax" value={fax} onChangeText={setFax} />
            </RowJustifyCenter>

            <MyButton style={{ width: "100%", backgroundColor: "#383838" }} title="Modify" onPress={() => { handleModifyCompany() }} />

            <MyButton style={{ width: "100%" }} title="Confirm" onPress={() => { handleCreateCompany() }} />

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
            >
              <ModalContainer>
                <CompanyList onClose={closeModal} selectCompany={(setCompany)} companies={companies} />
              </ModalContainer>
            </Modal>

          </View>
      }

    </KeyboardAwareScrollView >
  );
};

export default CompanyScreenProps;
