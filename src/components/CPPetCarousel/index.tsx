import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import paw from "@assets/icons/paw.png";
import petImage from "@assets/images/default_pet.png";
import loading_dark from "@assets/icons/loading_dark.png";
import { ageCalc } from "@utils/age";
import { COLOR } from "@theme/colors";
import { PetDTO } from "@dtos/PetDTO";
import { ScrollView } from "react-native-gesture-handler";

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
  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Você ainda não possui nenhum pet</Text>
    </View>
  );

  const renderItem = (item: PetDTO, index: number) => (
    <CPPetCarouselCard
      key={item.id}
      pet={item}
      index={index}
      selectPet={selectPet}
    />
  );
  return (
    // <FlatList
    //   data={pets}
    //   renderItem={({ item, index }) => renderItem(item, index)}
    //   keyExtractor={(item) => item.id!}
    //   horizontal
    //   showsHorizontalScrollIndicator={false}
    //   style={styles.carousel}
    //   contentContainerStyle={{ paddingHorizontal: 15 }}
    //   ListEmptyComponent={EmptyComponent}
    // />

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.carousel}
    >
      {pets.length === 0
        ? EmptyComponent()
        : pets.map((element, index) => renderItem(element, index))}
    </ScrollView>
  );
};

const CPPetCarouselCard: React.FC<CardProps> = ({ pet, index, selectPet }) => {
  const color = colors[index % colors.length];
  const age = ageCalc(pet.birthdate);

  const DefaultImage = () => (
    <View style={styles.defaultImageContainer}>
      <Image style={styles.defaultImage} source={petImage} />
    </View>
  );
  return (
    <Pressable
      style={[styles.card, { backgroundColor: color }]}
      onPress={() => selectPet(pet, color)}
    >
      <View style={styles.cardHeader}>
        <Image style={styles.pawIcon} source={paw} />
      </View>
      <View style={styles.petInfo}>
        {pet.image ? (
          <Image
            loadingIndicatorSource={loading_dark}
            style={styles.petImage}
            source={{ uri: pet.image }}
          />
        ) : (
          DefaultImage()
        )}
        <Text style={styles.petName} numberOfLines={2}>
          {pet.name}
        </Text>
        <Text style={styles.petAge}>
          {age} {age === 1 ? "ano" : "anos"}
        </Text>
      </View>
    </Pressable>
  );
};

export default CPPetCarousel;
