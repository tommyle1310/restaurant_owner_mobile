import { usePushNotifications } from "@/src/hooks/usePushNotifications";
import { Type_PushNotification_Order } from "@/src/types/pushNotification";
import * as Notifications from "expo-notifications";

export const sendPushNotification = async (
  order: Type_PushNotification_Order
) => {
  const { expoPushToken } = usePushNotifications();

  if (expoPushToken) {
    const message = {
      to: expoPushToken.data,
      sound: "default",
      title: "New Incoming Order",
      body: `You have a new order with total: $${order.total_amount.toFixed(
        2
      )}`,
      data: { orderId: order._id },
    };

    try {
      const response = await Notifications.scheduleNotificationAsync({
        content: {
          title: message.title,
          body: message.body,
        },
        trigger: null, // Triggers immediately
      });
      console.log("Push notification sent successfully:", response);
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  }
};
