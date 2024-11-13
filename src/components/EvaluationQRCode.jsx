import React, {useState} from 'react';
import { Button } from "./ui/button.tsx"

const TrainingQRCode = ({ trainingId }) => {
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQRCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/qr/generate?trainingId=${trainingId}`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to generate QR Code");
      }
      const data = await response.json();
      setQrData(data);
      console.log(data)
    } catch (error) {
      console.error("Error adding QR Code:", error);
      alert("Failed to generate QR Code");
    }finally {
      setLoading(false);
    }
  }

  return (
      <div>
        <div>
          <Button onClick={generateQRCode}>Generate QR</Button>
        </div>
        {qrData && (
            <div>
              <img
                  src={`data:image/png;base64,${qrData.qrImage}`}
                  alt="QR Code"
              />
              <p>
                or use this link: <a href={qrData.qrUrl}>{qrData.qrUrl}</a>
              </p>
            </div>
        )}
      </div>
  );
};

export default TrainingQRCode;
