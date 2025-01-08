import React, {useState} from 'react';
import { Button } from "./ui/button.tsx"
import {
  DialogActionTrigger,
  DialogContent,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogCloseTrigger,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

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
        <DialogRoot>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={generateQRCode}>
              Take Responses
            </Button>
          </DialogTrigger>
          <DialogContent className="px-5 py-5 flex flex-col gap-5 mt-10">
            <DialogHeader>
              <DialogTitle>Training Evaluation Form</DialogTitle>
            </DialogHeader>
            <DialogBody>
              {qrData && (
                <div>
                  <div className='flex justify-center'>
                    <img
                      src={`data:image/png;base64,${qrData.qrImage}`}
                      alt="QR Code"
                    />
                  </div>
                  
                  <p>
                    or use this link: <a href={qrData.qrUrl}>{qrData.qrUrl}</a>
                  </p>
                </div>
              )}
            </DialogBody>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>
      </div>
  );
};

export default TrainingQRCode;
