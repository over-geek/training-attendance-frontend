import React, { useState, useEffect, useRef } from 'react'

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const websocket = useRef(null);

  useEffect(() => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      console.log("Websocket already exists");
      return
    }
    connectWebSocket();
  }, []);

  const connectWebSocket = () => {
    if (websocket.current?.readyState === WebSocket.OPEN) {
      console.log("Websocket already connected");
      return;
    }

    let ws = null;

    try {
      console.log("Connecting to notification websocket");
      ws = new WebSocket('ws://localhost:8080/ws/notification');
    } catch (error) {
      console.error("Error connecting to notification websocket: ", error);
      return;
    }

    if (!ws) {
      console.error("Websocket connection failed");
      return;
    }

    ws.onopen = () => {
      console.log("Connected to notification webscoket");
    }

    ws.onmessage = (event) => {
      console.log("received notification: ", event.data);

      try {
        const notification = JSON.parse(event.data);
        setNotifications((prev) => [...prev, notification]);
      }
      catch (error) {
        console.error("Error parsing notification: ", error);
      }
    }

    ws.onclose = () => {
      console.log("Notifications websocket connection closed")
    }

    websocket.current = ws;
  }

  return (
    <div className='px-3 py-4'>
      {notifications.map((note, index) => (
        <div key={index}>
          <strong>{note.message}</strong> (Training ID: {note.trainingId}, 
          Evaluation Response ID: {note.evaluationResponseId})
        </div>
      ))}
    </div>
  )
}

export default Notification