import React, { useState } from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";
import { styles } from "./styles";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";

type Props = {
  label?: string;
  customStyle?: ViewStyle;
  placeholder?: string;
  items: CPPickerItemType[];
  onSelect: (itemValue: string, itemIndex: number) => void;
  selectedItem?: string | null;
};

export type CPPickerItemType = { label: string; value: string };

const CPPicker: React.FC<Props> = ({
  label,
  customStyle,
  placeholder = "",
  onSelect,
  selectedItem,
  items,
}) => {
  const index = selectedItem
    ? items.findIndex((item) => item.value === selectedItem)
    : null;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selectedItem);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(index);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    onSelect(selectedValue!, selectedIndex!);
    setIsModalVisible(false);
  };

  const ModalButton = () => (
    <Pressable style={styles.modalButton} onPress={() => handleConfirm()}>
      <Text style={styles.modalButtonText}>confirmar</Text>
    </Pressable>
  );

  const PickerModal = () => (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            setSelectedIndex(itemIndex);
          }}
        >
          {items.map((item) => (
            <Picker.Item
              label={item.label}
              value={item.label}
              key={item.value}
            />
          ))}
        </Picker>
        {ModalButton()}
      </View>
    </Modal>
  );

  return (
    <>
      <Pressable onPress={() => openModal()}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <View style={[styles.container, customStyle]}>
          {selectedIndex != null ? (
            <Text style={styles.value}>{items[selectedIndex].label}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
        </View>
      </Pressable>
      {PickerModal()}
    </>
  );
};

export default CPPicker;
