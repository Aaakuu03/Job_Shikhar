import { useEffect, useState } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      // Make the API call to mark all notifications as read
      await axios.put(
        "http://localhost:3000/api/jobseeker/notifications/mark-all-read",
        null,
        {
          withCredentials: true,
        }
      );
      // Update the notifications state to reflect the read status
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true }))
      );
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  // Mark a single notification as read
  const markAsRead = async (id) => {
    try {
      // API call to mark the specific notification as read
      await axios.put(
        `http://localhost:3000/api/jobseeker/notifications/${id}/read`,
        null,
        {
          withCredentials: true,
        }
      );
      // Update the notifications state
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/jobseeker/notifications",
          {
            withCredentials: true,
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
    <div className="relative">
      {/* Bell Icon */}
      <button onClick={() => setOpen(!open)} className="relative">
        <FaBell size={24} />
        {notifications.some((notification) => !notification.read) && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {notifications.filter((notification) => !notification.read).length}
          </span>
        )}
      </button>

      {/* Dropdown Box */}
      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-500 hover:underline"
            >
              Mark all as read
            </button>
          </div>

          <div className="p-4">
            {loading && <p>Loading notifications...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {notifications.length > 0 ? (
              <ul className="space-y-3">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-3 border rounded-lg shadow-sm ${
                      notification.read ? "bg-gray-100" : "bg-white"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <p>{notification.message}</p>
                    <span className="text-sm text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              !loading && (
                <p className="text-gray-500">No notifications available.</p>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
