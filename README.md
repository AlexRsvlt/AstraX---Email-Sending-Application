# README: Email Sending Application

Welcome to the Email Sending Application! This project allows users to create and send emails efficiently, featuring scheduling and file upload functionalities. The application includes a multi-step user interface to streamline the process.

---

## Table of Contents
1. [Features](#features)  
2. [Setup and Configuration](#setup-and-configuration)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [API Key Configuration](#api-key-configuration)  
3. [Email Scheduling and Throttling](#email-scheduling-and-throttling)  
4. [Usage Instructions](#usage-instructions)  
5. [Contributing](#contributing)  
6. [License](#license)  

---

## Features
- User-friendly login and signup pages.
- Dashboard with email prompt input and file upload sections.
- Email scheduling with throttling capabilities.
- Modern and cohesive design for a seamless experience.

---

## Setup and Configuration

### Prerequisites
- **Node.js** (v14 or higher)  
- **Python** (v3.8 or higher)  
- A compatible **SMTP service** (e.g., Gmail, SendGrid)  
- A **modern browser** for the front-end interface.

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/email-sending-app.git
   cd email-sending-app
   ```

2. **Install Dependencies**:
   - For the front-end:
     ```bash
     cd frontend
     npm install
     ```
   - For the back-end:
     ```bash
     cd backend
     pip install -r requirements.txt
     ```

3. **Set up Environment Variables**:
   Create a `.env` file in the `backend` directory:
   ```plaintext
   API_KEY=your_api_key
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   EMAIL_USERNAME=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   ```

### API Key Configuration
1. **Obtain API Keys**:  
   Sign up for an email service provider (e.g., [SendGrid](https://sendgrid.com/), [Mailgun](https://www.mailgun.com/), or [Postmark](https://postmarkapp.com/)) and generate an API key.

2. **Configure the API Key**:  
   - Add the API key to the `.env` file under the `API_KEY` variable.  
   - Verify that the SMTP settings in the `.env` file match your email provider's requirements.  

---

## Email Scheduling and Throttling

1. **Configure Email Scheduling**:
   - Go to the dashboard and navigate to the "Email Scheduling" section.
   - Select the desired date and time for sending the email.
   - Save the schedule to queue the email for sending.

2. **Set Throttling Parameters**:
   - Open the `settings.py` or equivalent file in the back-end directory.
   - Adjust throttling settings:
     ```python
     MAX_EMAILS_PER_MINUTE = 10
     RETRY_DELAY_SECONDS = 30
     ```
   - Restart the back-end server for changes to take effect.

---

## Usage Instructions
1. **Launch the Application**:
   - Start the back-end server:
     ```bash
     cd backend
     python app.py
     ```
   - Start the front-end development server:
     ```bash
     cd frontend
     npm start
     ```
   Access the application at `http://localhost:3000`.

2. **Login or Sign Up**:
   - Create an account or log in with your credentials.

3. **Send an Email**:
   - Enter the recipient's email, subject, and message in the respective fields.
   - Upload any necessary attachments.
   - Choose to send immediately or schedule the email for later.

4. **Monitor Email Status**:
   - View the email queue and status updates in the dashboard.

---

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request. Follow the guidelines in `CONTRIBUTING.md` for detailed instructions.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

--- 

Feel free to reach out if you have any questions or issues!