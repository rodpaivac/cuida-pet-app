import { scale, verticalScale } from "@utils/dimensions";
import React from "react";
import { View } from "react-native";

type Props = {
  amount?: number;
};

export const SpaceH: React.FC<Props> = ({ amount }) => {
  return <View style={{ width: scale(amount!) ?? scale(1) }} />;
};

export const SpaceV: React.FC<Props> = ({ amount }) => {
  return (
    <View style={{ height: verticalScale(amount!) ?? verticalScale(1) }} />
  );
};
