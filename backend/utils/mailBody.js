const registerd_body = (name, companyName) => {
    return (`<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f6f9fc;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-bottom: 10px;
        }
        .content {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            color: #777;
            font-size: 14px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Account Created Successfully</div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>Welcome! Your account has been successfully created. We are excited to have you onboard. You can now log in and start booking venues for your events.</p>
            <p>Feel free to explore and let us know if you need any assistance.</p>
            <p>Happy planning!</p>
        </div>
        <div class="footer">
            <p>Thank you,</p>
            <p>Team Book-Your-Place</p>
        </div>
    </div>
</body>
</html>
`)
}

const client_booking_confirm = (client_name, venue_name, booking_id, dealer_name, date, contact, address) => {
    return (`<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            font-size: 26px;
            font-weight: bold;
            color: #333;
            margin-bottom: 15px;
        }
        .content {
            font-size: 16px;
            color: #555;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .booking-details {
            background-color: #f9fafb;
            padding: 15px;
            border-radius: 8px;
            font-size: 16px;
            color: #333;
            margin-bottom: 20px;
            border: 1px solid #e0e0e0;
        }
        .booking-details p {
            margin: 8px 0;
        }
        .footer {
            text-align: center;
            color: #888;
            font-size: 14px;
            margin-top: 20px;
        }
        .footer p {
            margin: 4px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Your Venue Booking Confirmation</div>
        <div class="content">
            <p>Dear ${client_name},</p>
            <p>We’re delighted to inform you that your booking has been successfully confirmed! Here are the complete details:</p>
            <div class="booking-details">
                <p><strong>Venue Name:</strong> ${venue_name}</p>
                <p><strong>Venue Address:</strong> ${address}</p>
                <p><strong>Booking ID:</strong> ${booking_id}</p>
                <p><strong>Booking Date:</strong> ${date}  </p>
                <p><strong>Dealer Name:</strong>  ${dealer_name}</p>
                <p><strong>Contact Details:</strong> ${contact} </p>
            </div>
            <p>We’re excited to host your event and ensure a memorable experience. If you have any questions, don’t hesitate to contact us.</p>
        </div>
        <div class="footer">
            <p>Best regards,</p>
            <p>Team :Book-Your-Place</p>
        </div>
    </div>
</body>
</html>
`)
}
const dealer_venue_confirm = (client_name, dealer_name, booking_id, date, contact) => {
    return (`<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f6f9fc;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-bottom: 10px;
        }
        .content {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
        }
        .client-details {
            background-color: #f0f8ff;
            padding: 10px;
            border-radius: 4px;
            font-size: 16px;
            color: #333;
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            color: #777;
            font-size: 14px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">New Venue Booking Alert</div>
        <div class="content">
            <p>Dear ${dealer_name},</p>
            <p>A client has booked your venue. Here are the details:</p>
            <div class="client-details">
                <p><strong>Client Name:</strong> ${client_name}</p>
                <p><strong>Booking ID:</strong> ${booking_id}</p>
                <p><strong>Booking Date:</strong> ${date}</p>
                <p><strong>Client Contact:</strong>  ${contact} </p>
            </div>
            <p>Please review the booking details and prepare for the event accordingly.</p>
        </div>
        <div class="footer">
            <p>Thank you,</p>
            <p>Team : Book-Your-Place</p>
        </div>
    </div>
</body>
</html>
`)
}
module.exports = {
    client_booking_confirm,
    registerd_body,
    dealer_venue_confirm
}