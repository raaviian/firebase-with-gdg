// firebaseAdminConfig.js
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Load service account JSON
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
const serviceAccount     = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://<YOUR_PROJECT_ID>.firebaseio.com'  // if using RTDB
});

export const db = admin.firestore();  // <-- this db has `.collection()`
