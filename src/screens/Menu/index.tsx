import CPContainer from "@components/CPContainer";
import React from "react";
import userImage from "@assets/images/user.png";

import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const Menu: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigation = useNavigation();

  const DefaultAvatar = () => (
    <View style={styles.defaultAvatarContainer}>
      <Image style={styles.defaultAvatar} source={userImage} />
    </View>
  );

  const Header = () => (
    <View style={styles.headerRow}>
      {user.avatar && user.avatar !== "" ? (
        <Image style={styles.userImage} src={user.avatar} />
      ) : (
        DefaultAvatar()
      )}
      <View style={styles.headerInfo}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.infoText}>{user.email}</Text>
        <Text style={styles.infoText}>{user.phone}</Text>
      </View>
    </View>
  );

  const ItemButton = (title: string, onPress: () => void) => (
    <Pressable onPress={onPress}>
      <Text style={styles.itemText}>{title}</Text>
    </Pressable>
  );

  const SignOutButton = () => (
    <Pressable onPress={() => signOut()}>
      <Text style={styles.signOut}>sair</Text>
    </Pressable>
  );
  return (
    <CPContainer dark goBack title="Menu">
      {Header()}
      <View style={styles.itemsContainer}>
        {ItemButton("editar dados", () => navigation.navigate("EditUser"))}
        {ItemButton("alterar senha", () =>
          navigation.navigate("ChangePassword")
        )}
        {ItemButton("meus pets", () => navigation.navigate("Home"))}
        {ItemButton("adicionar pet", () =>
          navigation.navigate("NewPet", { edit: false })
        )}
        {ItemButton("notificações", () => navigation.navigate("Notifications"))}
        {ItemButton("próximas vacinas", () =>
          navigation.navigate("NextVaccines")
        )}

        {SignOutButton()}
      </View>
      <View></View>
    </CPContainer>
  );
};

export default Menu;
