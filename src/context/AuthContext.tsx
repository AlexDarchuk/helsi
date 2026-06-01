import {
  FC,
  createContext,
  ReactNode,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  UserCredential,
  signOut,
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import { auth } from '../firebaseConfig';
import { IUserProfile, TAuthUser } from '../types/types';

interface AuthContextProviderProps {
  children: ReactNode;
}

interface IAuthUser {
  email: string;
  password: string;
}

interface IAuth {
  createUser: ({ email, password }: IAuthUser) => Promise<UserCredential>;
  signIn: ({ email, password }: IAuthUser) => Promise<UserCredential>;
  saveUserDataToFirestore: (
    user: TAuthUser,
    name: string,
    email: string
  ) => void;
  user: TAuthUser;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<IAuth>({
  createUser: () => Promise.resolve({} as UserCredential),
  signIn: () => Promise.resolve({} as UserCredential),
  logout: () => Promise.resolve(),
  user: null,
  loading: true,
  saveUserDataToFirestore: () => undefined,
});

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<TAuthUser>(null);
  const [loading, setLoading] = useState(true);

  const createUser = useCallback(({ email, password }: IAuthUser) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const saveUserDataToFirestore = useCallback(
    (user: TAuthUser, name: string, email: string) => {
      if (user) {
        const userData: IUserProfile = {
          userID: user.uid,
          name,
          email,
          photoURL: null,
          appointments: [],
          onlineStatus: true,
          status: 'notSubmitted',
          notifications: [],
          role: 'patient',
        };

        const userDocRef = doc(getFirestore(), 'users', user.uid);

        setDoc(userDocRef, userData);
      }
    },
    []
  );

  const signIn = useCallback(({ email, password }: IAuthUser) => {
    return signInWithEmailAndPassword(auth, email, password);
  }, []);

  const logout = useCallback(() => {
    return signOut(auth);
  }, []);

  const value = useMemo(
    () => ({
      createUser,
      signIn,
      user,
      logout,
      loading,
      saveUserDataToFirestore,
    }),
    [createUser, signIn, user, logout, loading, saveUserDataToFirestore]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
