# EmailJS Setup Guide

This guide will help you set up EmailJS to receive contact form submissions via email.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email account
5. **Copy the Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use the following template structure:

**Template Name:** Contact Form Submission

**Subject:** New Contact Form Submission from {{from_name}}

**Content:**
```
Hello,

You have received a new contact form submission from your website.

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from the Navedhana contact form.
```

4. **Copy the Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in your EmailJS dashboard
2. Find your **Public Key** (also called API Key)
3. **Copy the Public Key**

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual IDs and keys from EmailJS

## Step 6: Test the Contact Form

1. Start your development server: `npm run dev`
2. Navigate to the contact page
3. Fill out and submit the form
4. Check your email inbox for the submission

## Troubleshooting

- **Emails not received?**
  - Check your spam folder
  - Verify all environment variables are set correctly
  - Check the browser console for any error messages
  - Ensure your EmailJS service is properly connected

- **Environment variables not working?**
  - Make sure the `.env` file is in the root directory
  - Restart your development server after adding/changing `.env` variables
  - Variables must start with `VITE_` to be accessible in Vite

- **Rate limiting?**
  - Free EmailJS accounts have a limit of 200 emails/month
  - Consider upgrading if you need more capacity

## Alternative: Direct Email Fallback

If you prefer not to use EmailJS, you can modify the contact form to use a backend API endpoint instead. The form is already set up to handle API responses.

