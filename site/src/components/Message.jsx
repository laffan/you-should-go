const Message = ({ msg }) => {
  return (
    <div className="Message">
      <div
        className="Message__Name"
        style={{
          fontFamily:
            msg.author === "AI"
              ? "Silkscreen, Courier, monospace"
              : "Arial, Helvetica, sans-serif",
        }}
      >
        {msg.name}{" "}
      </div>
      <div className="Message__Date">{msg.timestamp} </div>
      <div
        className="Message__Bubble"
        style={{
          backgroundColor: msg.name === "F.R.I.E.N.D." ? "#36D45E" : "#46b3fb",
        }}
      ><p style={{
          fontFamily:
            msg.author === "AI"
              ? "Silkscreen, Courier, monospace"
              : "Arial, Helvetica, sans-serif",
        }}>
        {msg.message}</p>
      </div>
    </div>
  );
};

export default Message;
