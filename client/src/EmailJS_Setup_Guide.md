# EmailJS Setup Guide for WebVitels Contact Form

This guide will help you set up EmailJS to receive contact form submissions directly to your email address (webvitels@gmail.com).

## Step 1: Create an EmailJS Account

1. Go to [EmailJS website](https://www.emailjs.com/) and sign up for a free account
2. The free tier allows 200 emails per month, which should be sufficient for most small websites

## Step 2: Add an Email Service

1. After signing in, go to the "Email Services" tab
2. Click "Add New Service"
3. Choose an email service provider (Gmail is recommended for simplicity)
4. Connect your webvitels@gmail.com account
5. Name your service (e.g., "webvitels_gmail")
6. Note down the **Service ID** for later use

## Step 3: Create an Email Template

1. Go to the "Email Templates" tab
2. Click "Create New Template"
3. Design your email template with the following variables:
   - `{{from_name}}` - The name of the person submitting the form
   - `{{reply_to}}` - The email address of the person submitting the form
   - `{{message}}` - The message content
4. Example template:
   ```
   Subject: New Contact Form Submission from {{from_name}}

   Name: {{from_name}}
   Email: {{reply_to}}

   Message:
   {{message}}
   ```
5. Save the template and note down the **Template ID**

## Step 4: Get Your User ID

1. Go to "Account" > "API Keys"
2. Copy your **Public Key** (this is your User ID)

## Step 5: Update Your Code

1. Open `/home/satya/Documents/Red/Document4/WebVitels/client/src/Components/Contact.jsx`
2. Replace the placeholders with your actual IDs:
   - Replace `YOUR_USER_ID` with your Public Key
   - Replace `YOUR_SERVICE_ID` with the Service ID from Step 2
   - Replace `YOUR_TEMPLATE_ID` with the Template ID from Step 3

```javascript
// Initialize EmailJS
useEffect(() => {
  // Replace with your actual EmailJS User ID (Public Key)
  emailjs.init("YOUR_USER_ID");
}, []);

// In the handleSubmit function:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

## Step 6: Test Your Form

1. Start your development server
2. Go to the contact page
3. Fill out the form and submit
4. Check your webvitels@gmail.com inbox for the submission

## Troubleshooting

- If emails aren't being received, check your spam folder
- Verify that all IDs are correctly entered in the code
- Check the browser console for any error messages
- Make sure your email service (Gmail) doesn't have restrictions on third-party apps

For more information, visit the [EmailJS documentation](https://www.emailjs.com/docs/).
