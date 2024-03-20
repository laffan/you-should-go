import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [ipAddress, setIpAddress] = useState("https://2300-169-233-215-159.ngrok-free.app");
  const qrCodeRef = useRef();

  useEffect(() => {
    QRCode.toCanvas(
      qrCodeRef.current,
      ipAddress,
      (error) => error && console.error(error)
    );
  }, [ipAddress]);

  return (
    <div className="QR">
      <canvas ref={qrCodeRef} />
    </div>
  );
}
