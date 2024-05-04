import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCUMkDLKCgWcRN9A-gtszhU6UTW9t5xzDw',
  authDomain: 'libookrary-322c8.firebaseapp.com',
  projectId: 'libookrary-322c8',
  storageBucket: 'libookrary-322c8.appspot.com',
  messagingSenderId: '577056789204',
  appId: '1:577056789204:web:bf7305ea677497c182e141',
  measurementId: 'G-CWCS2R4357',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export { app, auth }
