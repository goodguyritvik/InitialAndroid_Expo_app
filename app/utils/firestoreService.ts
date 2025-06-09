/**
 * Firestore service utilities.
 * This file should NOT be treated as a route.
 * Ensure it exports only functions or constants, no React components.
 */

import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

// Utility functions for Firestore CRUD operations

// Users collection
const usersCollection = collection(db, 'users');

export async function getUserById(userId: string) {
  const userDoc = doc(usersCollection, userId);
  const userSnap = await getDoc(userDoc);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    throw new Error('User not found');
  }
}

export async function addUser(userData: any) {
  const docRef = await addDoc(usersCollection, userData);
  return docRef.id;
}

export async function updateUser(userId: string, updateData: any) {
  const userDoc = doc(usersCollection, userId);
  await updateDoc(userDoc, updateData);
}

export async function deleteUser(userId: string) {
  const userDoc = doc(usersCollection, userId);
  await deleteDoc(userDoc);
}

// Generic function to get all documents from a collection
export async function getAllDocuments(collectionName: string) {
  const col = collection(db, collectionName);
  const snapshot = await getDocs(col);
  const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return docs;
}

// Add more functions for other collections as needed
