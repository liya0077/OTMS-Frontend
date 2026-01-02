import React from 'react';

function SendNotificationButton() {
  const sendNotification = async () => {
    try {
      const response = await fetch('http://54.209.107.3:5050/send-mails', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer mysecrettoken',  // same token as Flask server
        },
      });

      const result = await response.json();
      if (response.ok) {
        alert('✅ ' + result.status);
      } else {
        alert('❌ ' + result.error);
      }
    } catch (error) {
      console.error("Notification error:", error);
      alert(' Failed to send notification');
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <button onClick={sendNotification} style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none' }}>
        Send Salary Slip Emails
      </button>
    </div>
  );
}

export default SendNotificationButton;
