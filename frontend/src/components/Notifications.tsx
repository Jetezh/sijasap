import cn from "../lib/utils";
import { NotificationProps } from "../types";

const Notifications = (props: NotificationProps) => {
  const { id, room, status, time, date, location, message } = props;

  return (
    <div className={cn("notification", status)}>
      <div className="notification-header">
        <h3>{room}</h3>
        <p>{status}</p>
      </div>
      <div className="notification-body">
        <p>{message}</p>
        <p>{time}</p>
        <p>{date}</p>
        <p>{location}</p>
      </div>
    </div>
  );
};
