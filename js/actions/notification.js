import { NUMBER_MESSAGE_UPDATE,  NUMBER_NOTIFICATION_UPDATE } from './constants';
export function updateNotificationNumber(notification) {
  return {
    type: NUMBER_NOTIFICATION_UPDATE,
    notification
  };
}
export function updateMessageNumber(message) {
  return {
    type: NUMBER_MESSAGE_UPDATE,
    message
  };
}
