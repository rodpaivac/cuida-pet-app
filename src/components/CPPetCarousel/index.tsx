import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import paw from "@assets/icons/paw.png";
import pet_mock from "@assets/images/pet.jpg";
import { ageCalc } from "@utils/age";
import { COLOR } from "@theme/colors";

type Pet = {
  id: number;
  name: string;
  breed: string;
  user_email: string;
  weight: number;
  species: string;
  image: string;
  birthdate: Date;
  color: string;
  sex: string;
  castraded: boolean;
  microchipped: boolean;
};

type Props = {
  pets: Pet[];
};

type CardProps = {
  pet: Pet;
  index: number;
};

const colors = [COLOR.brown, COLOR.purple, COLOR.green1];

const CPPetCarousel: React.FC<Props> = ({ pets }) => {
  const renderItem = (item: Pet, index: number) => (
    <CPPetCarouselCard pet={item} index={index} />
  );
  return (
    <FlatList
      data={pets}
      renderItem={({ item, index }) => renderItem(item, index)}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.carousel}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    />
  );
};

const CPPetCarouselCard: React.FC<CardProps> = ({ pet, index }) => {
  const color = colors[index % colors.length];
  return (
    <Pressable style={[styles.card, { backgroundColor: color }]}>
      <View style={styles.cardHeader}>
        <Image style={styles.pawIcon} source={paw} />
      </View>
      <View style={styles.petInfo}>
        <Image style={styles.petImage} source={pet_mock} />
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petAge}>{ageCalc(pet.birthdate)} anos</Text>
      </View>
    </Pressable>
  );
};

export default CPPetCarousel;
