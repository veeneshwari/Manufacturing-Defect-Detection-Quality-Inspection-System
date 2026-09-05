import os
import smtplib
from email.mime.text import MIMEText

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_APP_PASSWORD = os.getenv("EMAIL_APP_PASSWORD")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

def send_reset_email(to_email: str, token: str):
    reset_link = f"{FRONTEND_URL}/reset-password?token={token}"
    body = f"""Hello,

We received a request to reset your VisionInspect AI password.

Click the link below to set a new password (valid for 30 minutes):
{reset_link}

If you didn't request this, you can safely ignore this email.
"""
    msg = MIMEText(body)
    msg["Subject"] = "Reset your VisionInspect AI password"
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to_email

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_APP_PASSWORD)
        server.send_message(msg)
