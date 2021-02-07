import {
  NotificationManager,
} from "react-notifications";

export const createNotification = (info) => {
  return () => {
    NotificationManager.error(info, "Click me!", 5000, () => {
      alert("callback");
    });
  };
};
