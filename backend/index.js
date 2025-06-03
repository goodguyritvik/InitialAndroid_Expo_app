const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');
const serviceAccount = require('./serviceAccountKey.json.json');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Firebase Admin SDK with service account
try {
  console.log('Initializing Firebase Admin SDK...');
  console.log('Service account project_id:', serviceAccount.project_id);
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bes-dsp-app.firebaseapp.com" // Updated to match Firebase config
  });
  
  console.log('Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
}

const db = admin.firestore();

app.use(cors());
app.use(bodyParser.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
