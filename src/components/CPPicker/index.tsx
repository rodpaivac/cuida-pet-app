import React, { useState } from "react";
import { Platform, Pressable, Text, View, ViewStyle } from "react-native";
import { styles } from "./styles";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";
import { COLOR } from "@theme/colors";
import { scale, verticalScale } from "@utils/dimensions";

type Props = {
  label?: string;
  customStyle?: ViewStyle;
  placeholder?: string;
  items: CPPickerItemType[];
  onSelect: (itemValue: string, itemIndex: number) => void;
  selectedItemValue?: string | null;
};

export type CPPickerItemType = { label: string; value: string | null };

const CPPicker: React.FC<Props> = ({
  label,
  customStyle,
  placeholder = "",
  onSelect,
  selectedItemValue,
  items,
}) => {
  const index = selectedItemValue
    ? items.findIndex((item) => item.value === selectedItemValue)
    : null;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selectedItemValue);
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
          style={{
            color: COLOR.sand,
            padding: Platform.OS === "android" ? verticalScale(25) : undefined,
            width: Platform.OS === "android" ? scale(200) : undefined,
            alignSelf: Platform.OS === "android" ? "center" : undefined,
          }}
          dropdownIconColor={COLOR.sand}
          dropdownIconRippleColor={COLOR.green1}
          selectedValue={selectedValue ?? items[0].value}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            setSelectedIndex(itemIndex);
          }}
        >
          {items.map((item) => (
            <Picker.Item
              label={item.label}
              value={item.value}
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
          {selectedIndex && selectedItemValue ? (
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
