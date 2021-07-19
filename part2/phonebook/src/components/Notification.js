const Notification = ({ detail }) => {
  if (detail === null) {
    return null;
  }
  return detail.type === "success" ? (
    <div className="success">{detail.text}</div>
  ) : detail.type === "error" ? (
    <div className="error">{detail.text}</div>
  ) : null;
};

export default Notification;