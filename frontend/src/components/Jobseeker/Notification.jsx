import { useEffect, useState } from "react";
import axios from "axios";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/jobseeker/notifications",
          {
            withCredentials: true, // Ensure auth credentials are sent if using cookies
          }
        );
        setNotifications(response.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to fetch notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>

      {loading && <p>Loading notifications...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {notifications.length > 0 ? (
        <ul className="space-y-3">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="p-3 border rounded-lg shadow-sm bg-white"
            >
              <p>{notification.message}</p>
              <span className="text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No notifications available.</p>
      )}
    </div>
  );
};

export default Notification;
