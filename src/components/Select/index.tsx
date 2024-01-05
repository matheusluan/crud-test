
import { View, Text, Modal, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "./styles";
import { iOption } from '../../interfaces/iOption';

type SelectProps = {
  onSelect: (op: iOption) => void;
  options: iOption[];
  setOpenOptions: (boolean: boolean) => void;
  openOptions: boolean;
  value: iOption | null;
  icon: string;
};

export function Select({ value, onSelect, icon, options, openOptions, setOpenOptions }: SelectProps) {

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => setOpenOptions(true)}
          style={styles.optionButton}
        >
          {value != undefined && value != null &&
            < Text style={styles.optionText}>{value?.descricao}</Text>
          }
          {(value == undefined || value == null) &&
            < Text style={styles.optionText}>Country</Text>
          }

          {icon && (
            <Icon
              name={icon}
              size={20}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={openOptions}
          style={styles.modalContainer}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setOpenOptions(false)}
              >
                <Icon
                  name='chevron-back-outline'
                  size={20}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text style={styles.modalHeaderText}>Select a contry!</Text>
            </View>
            <View style={styles.optionItem}>
              <FlatList
                data={options}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => onSelect(item)}
                    style={[
                      styles.optionItem,
                      { backgroundColor: index % 2 === 0 ? '#DEE7F0' : '#E7E7E7' },
                    ]}
                  >
                    <Text style={styles.optionItemText}>{item.descricao}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View >
    </>
  );
}