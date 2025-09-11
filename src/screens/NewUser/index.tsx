import CPButton from "@components/CPButton";
import CPContainer from "@components/CPContainer";
import CPImagePicker from "@components/CPImagePicker";
import CPRadioButton from "@components/CPRadioButton";
import CPTextInput from "@components/CPTextInput";
import { SpaceV } from "@components/Space";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { useAuth } from "@hooks/useAuth";
import { GenderDTO } from "@dtos/UserDTO";
import { dateToString, stringToDate } from "@utils/date";

const NewUser: React.FC = () => {
  const [gender, setGender] = useState<GenderDTO | null>(null);
  const [image, setImage] = useState<FormData | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [cpf, setCpf] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState<
    string | null
  >(null);

  const [birthdate, setBirthdate] = useState<string | null>(null);

  const Header = () => (
    <View style={styles.headerContainer}>
      <CPImagePicker
        onSelect={(selectedImage) => setImage(selectedImage)}
        imageUri={null}
        type="user"
      />
    </View>
  );

  const GenderSelection = () => (
    <View>
      <Text style={styles.label}>Gênero</Text>
      <CPRadioButton
        text="masculino"
        selected={gender === "man"}
        onChange={(selected) => setGender("man")}
      />
      <SpaceV amount={10} />
      <CPRadioButton
        text="feminino"
        selected={gender === "woman"}
        onChange={(selected) => setGender("woman")}
      />
      <SpaceV amount={10} />
      <CPRadioButton
        text="não-binário"
        selected={gender === "non-binary"}
        onChange={(selected) => setGender("non-binary")}
      />
      <SpaceV amount={10} />
      <CPRadioButton
        text="outro"
        selected={gender === "other"}
        onChange={(selected) => setGender("other")}
      />
    </View>
  );

  const Footer = () => (
    <View style={styles.footer}>
      <CPButton title="salvar" onPress={() => {}} />
    </View>
  );

  const Body = () => (
    <View>
      <CPTextInput
        label="nome"
        placeholder="nome completo do usuário"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <SpaceV amount={15} />
      <SpaceV amount={15} />
      <CPTextInput
        label="cpf"
        placeholder="cpf do usuário"
        value={cpf}
        onChangeText={(text) => setCpf(text)}
        mask="cpf"
        keyboardType="numeric"
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="telefone"
        placeholder="telefone do usuário"
        keyboardType="numeric"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        mask="phone"
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="email"
        placeholder="email do usuário"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="data de nascimento"
        placeholder="data de nascimento do usuário"
        value={birthdate}
        onChangeText={(text) => setBirthdate(text)}
        mask="date"
        keyboardType="numeric"
      />
      <SpaceV amount={15} />
      {GenderSelection()}
      <SpaceV amount={15} />
      <CPTextInput
        label="senha"
        placeholder="digite uma senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="confirmar senha"
        placeholder="confirme sua senha"
        value={passwordConfirmation}
        onChangeText={(text) => setPasswordConfirmation(text)}
      />
    </View>
  );

  return (
    <CPContainer dark goBack title={"criar conta"}>
      {Header()}
      {Body()}
      {Footer()}
    </CPContainer>
  );
};

export default NewUser;
