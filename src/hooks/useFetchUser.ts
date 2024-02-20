import { useState, useCallback } from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore';

import { TProfile } from '../types/types';
import { db } from '../firebaseConfig';

const useFetchUser = () => {
  const [currentUser, setCurrentUser] = useState<TProfile | null>(null);

  const fetchUserData = useCallback(async (uid: string) => {
    const q = query(collection(db, 'users'), where('userID', '==', uid));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const userData = doc.data() as TProfile;

        setCurrentUser(userData);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error(error);
      setCurrentUser(null);
    }
  }, []);

  return { currentUser, fetchUserData };
};

export default useFetchUser;
