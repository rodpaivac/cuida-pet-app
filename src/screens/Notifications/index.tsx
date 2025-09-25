import CPContainer from "@components/CPContainer";
import { NotificationDTO } from "@dtos/NotificationDTO";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import { NOTIFICATIONS } from "src/mock";

const Notifications: React.FC = () => {
  const NotificationItem = (notification: NotificationDTO) => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message}>{notification.message}</Text>
      </View>
    );
  };

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Você ainda não possui notificações</Text>
    </View>
  );

  return (
    <CPContainer title="notificações" goBack noScroll>
      <FlatList
        data={NOTIFICATIONS}
        renderItem={({ item }) => NotificationItem(item)}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyComponent()}
      />
    </CPContainer>
  );
};

export default Notifications;
