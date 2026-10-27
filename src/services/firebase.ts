import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  getDocs, 
  query, 
  where,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserSubscription, Order } from '../types';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Initial connection test
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('client is offline')) {
      console.warn("Firestore offline mode active.");
    }
  }
}

// User registration & profile helpers
export async function registerUserProfile(uid: string, name: string, email: string, whatsapp: string): Promise<UserSubscription> {
  const path = `users/${uid}`;
  const userProfile: UserSubscription = {
    uid,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    whatsapp: whatsapp.trim(),
    registeredAt: new Date().toISOString(),
    subscribed: true,
    role: email.trim().toLowerCase() === 'eliel.estudioem@gmail.com' ? 'admin' : 'user'
  };

  try {
    await setDoc(doc(db, 'users', uid), userProfile);
    return userProfile;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
    return userProfile;
  }
}

export async function getUserProfile(uid: string): Promise<UserSubscription | null> {
  const path = `users/${uid}`;
  try {
    const docSnap = await getDoc(doc(db, 'users', uid));
    if (docSnap.exists()) {
      return docSnap.data() as UserSubscription;
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
    return null;
  }
}

export async function getAllSubscribedUsers(): Promise<UserSubscription[]> {
  const path = 'users';
  try {
    const snap = await getDocs(collection(db, 'users'));
    const list: UserSubscription[] = [];
    snap.forEach((doc) => {
      list.push(doc.data() as UserSubscription);
    });
    return list;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
    return [];
  }
}

// Order helpers
export async function createOrder(order: Order): Promise<string> {
  const orderId = order.orderCode || `ARP-${Math.floor(10000 + Math.random() * 90000)}`;
  const fullOrder = { ...order, orderCode: orderId, createdAt: new Date().toISOString() };
  const path = `orders/${orderId}`;
  
  try {
    await setDoc(doc(db, 'orders', orderId), fullOrder);
    return orderId;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
    return orderId;
  }
}

export async function getOrderByCode(code: string): Promise<Order | null> {
  const cleanCode = code.trim().toUpperCase();
  const path = `orders/${cleanCode}`;
  try {
    const docSnap = await getDoc(doc(db, 'orders', cleanCode));
    if (docSnap.exists()) {
      return docSnap.data() as Order;
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
    return null;
  }
}

export async function getAllOrders(): Promise<Order[]> {
  const path = 'orders';
  try {
    const snap = await getDocs(collection(db, 'orders'));
    const list: Order[] = [];
    snap.forEach((doc) => {
      list.push(doc.data() as Order);
    });
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
    return [];
  }
}

export async function updateOrderStatus(orderCode: string, newStatus: Order['status']): Promise<void> {
  const path = `orders/${orderCode}`;
  try {
    await updateDoc(doc(db, 'orders', orderCode), { status: newStatus });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, type FirebaseUser };
