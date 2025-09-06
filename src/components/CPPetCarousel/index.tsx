import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import paw from "@assets/icons/paw.png";
import petImage from "@assets/images/pet.jpg";
import { ageCalc } from "@utils/age";
import { COLOR } from "@theme/colors";
import { PetDTO } from "@dtos/PetDTO";

type Props = {
  pets: PetDTO[];
  selectPet: (pet: PetDTO, color: string) => void;
};

type CardProps = {
  pet: PetDTO;
  index: number;
  selectPet: (pet: PetDTO, color: string) => void;
};

const colors = [COLOR.brown, COLOR.purple, COLOR.green1];

const CPPetCarousel: React.FC<Props> = ({ pets, selectPet }) => {
  const renderItem = (item: PetDTO, index: number) => (
    <CPPetCarouselCard pet={item} index={index} selectPet={selectPet} />
  );
  return (
    <FlatList
      data={pets}
      renderItem={({ item, index }) => renderItem(item, index)}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.carousel}
      contentContainerStyle={{ paddingHorizontal: 15 }}
    />
  );
};

const CPPetCarouselCard: React.FC<CardProps> = ({ pet, index, selectPet }) => {
  const color = colors[index % colors.length];
  const age = ageCalc(pet.birthdate);
  return (
    <Pressable
      style={[styles.card, { backgroundColor: color }]}
      onPress={() => selectPet(pet, color)}
    >
      <View style={styles.cardHeader}>
        <Image style={styles.pawIcon} source={paw} />
      </View>
      <View style={styles.petInfo}>
        <Image style={styles.petImage} source={petImage} />
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petAge}>
          {age} {age === 1 ? "ano" : "anos"}
        </Text>
      </View>
    </Pressable>
  );
};

export default CPPetCarousel;
