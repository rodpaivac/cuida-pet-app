import CPContainer from "@components/CPContainer";
import { NotificationDTO } from "@dtos/NotificationDTO";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import { NOTIFICATIONS } from "src/mock";
import { getNotificationsApi } from "@service/notification";
import { useAuth } from "@hooks/useAuth";

const Notifications: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await getNotificationsApi(user.cpf);
      setNotifications(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

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
    <CPContainer title="notificações" goBack noScroll isLoading={loading}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => NotificationItem(item)}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyComponent()}
      />
    </CPContainer>
  );
};

export default Notifications;
