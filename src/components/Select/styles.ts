import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  halfContainer: {
    flex: 1,
  },
  label: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    fontSize: 16,
    color: '#777',
    fontWeight: 'bold',
  },
  optionButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  optionText: {
    color: '#000',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
    color: '#777',
  },
  modalContainer: {
    flex: 1,
    padding: 2,
  },
  modalHeader: {
    flex: 1,
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    borderRadius: 15,
    width: 30,
    height: 30,
    margin: 5
  },
  modalHeaderText: {
    flex: 6,
    alignContent: 'flex-start',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 50,
  },
  optionItem: {
    flex: 9,
    width: '100%',
    padding: 8,
    marginBottom: 2,
    borderRadius: 8,
  },
  optionItemText: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
});