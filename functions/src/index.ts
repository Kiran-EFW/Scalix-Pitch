import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

admin.initializeApp();

export const saveFormData = onRequest(async (request, response) => {
  // Set CORS headers to allow requests from your website
  response.set('Access-Control-Allow-Origin', 'https://scalix-pitch-deck.web.app');
  response.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }

  logger.info("Form data received!", { structuredData: true });

  if (request.method !== "POST") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  const formData = request.body;
  const { name, email, phone } = formData;

  if (!name || !email) {
    response.status(400).send("Missing required form data");
    return;
  }

  try {
    await admin.firestore().collection('submissions').add({
      name: name,
      email: email,
      phone: phone || null,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    logger.info("Data saved to Firestore!", { structuredData: true });
    response.status(200).send("Data saved successfully!");
  } catch (error) {
    logger.error("Error saving to Firestore:", error);
    response.status(500).send("Server Error");
  }
});
