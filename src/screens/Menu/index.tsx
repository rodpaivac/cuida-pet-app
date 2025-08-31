import CPContainer from "@components/CPContainer";
import React from "react";
import userImage from "@assets/images/user.jpg";

import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

const Menu: React.FC = () => {
  const Header = () => (
    <View style={styles.headerRow}>
      <Image style={styles.userImage} source={userImage} />
      <View style={styles.headerInfo}>
        <Text style={styles.name}>Rodrigo Paiva Corrêa</Text>
        <Text style={styles.infoText}>rodpaivac@gmail.com</Text>
        <Text style={styles.infoText}>(31)989120414</Text>
      </View>
    </View>
  );

  const ItemButton = (title: string, onPress: () => void) => (
    <Pressable>
      <Text style={styles.itemText}>{title}</Text>
    </Pressable>
  );

  const SignOutButton = () => (
    <Pressable>
      <Text style={styles.signOut}>sair</Text>
    </Pressable>
  );
  return (
    <CPContainer dark goBack title="Menu">
      {Header()}
      <View style={styles.itemsContainer}>
        {ItemButton("minha conta", () => {})}
        {ItemButton("meus pets", () => {})}
        {ItemButton("adicionar pet", () => {})}
        {ItemButton("notificações", () => {})}
        {ItemButton("próximas vacinas", () => {})}
        {SignOutButton()}
      </View>
      <View></View>
    </CPContainer>
  );
};

export default Menu;
