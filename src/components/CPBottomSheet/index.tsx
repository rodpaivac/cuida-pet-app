import React, { useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Button, Text, View } from "react-native";
import { styles } from "./styles";

const CPBottomSheet: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exemplo com @gorhom/bottom-sheet</Text>

      <Button
        title="Abrir Bottom Sheet"
        onPress={() => bottomSheetRef.current?.expand()}
      />
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={-1}>
        <View style={{ backgroundColor: "#000", flex: 1 }}>
          <Text>Teste</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default CPBottomSheet;
