import {
  FC,
  createContext,
  ReactNode,
  useEffect,
  useState,
  SetStateAction,
  useMemo,
  useCallback,
} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  UserCredential,
  User,
  signOut,
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import { auth } from '../firebaseConfig';

interface AuthContextProviderProps {
  children: ReactNode;
}

type TUserType = 'patient' | 'doctor';

type TAuthUser = User | null;

interface IAuthUser {
  email: string;
  password: string;
}

interface IUser {
  userID: string;
  name: string;
  email: string;
  appointments: string[];
  onlineStatus: boolean;
  notifications: string[];
  role: TUserType;
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
  setUser: (value: SetStateAction<TAuthUser>) => void;
}

export const AuthContext = createContext<IAuth>({
  createUser: () => Promise.resolve({} as UserCredential),
  signIn: () => Promise.resolve({} as UserCredential),
  logout: () => Promise.resolve(),
  user: null,
  loading: true,
  setUser: () => undefined,
  saveUserDataToFirestore: () => undefined,
});

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<TAuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (createUser) => {
      setUser(createUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const createUser = useCallback(({ email, password }: IAuthUser) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }, []);

  const saveUserDataToFirestore = useCallback(
    () => (user: TAuthUser, name: string, email: string) => {
      if (user) {
        const userData: IUser = {
          userID: user.uid,
          name,
          email,
          appointments: [],
          onlineStatus: true,
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
      setUser,
      saveUserDataToFirestore,
    }),
    [
      createUser,
      signIn,
      user,
      logout,
      loading,
      setUser,
      saveUserDataToFirestore,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
