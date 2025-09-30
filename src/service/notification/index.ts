import { NotificationDTO } from "@dtos/NotificationDTO";
import { api } from "@service/api";

export const newNotificationApi = async (notification: NotificationDTO) => {
    // não funciona... só consigo obter a notificação quando o app está em foreground. Para armazenar todas as notificações recebidas
    // preciso usar um webhook do onesignal para conectar diretamente com o backend.
    const response = await api.post('/new-notification', {
        title: notification.title,
        message: notification.message,
        date: notification.date,
        route: notification.route
    });

    if (response.data) {
        return response.data.notification;
    }
}

export const getNotificationsApi = async (cpf: string) => {
    const response = await api.get(`/notifications/${cpf}`);

    if (response.data) {
        return response.data.notifications;
    }

    return [];
}