import {
  FC,
  createContext,
  ReactNode,
  useMemo,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

import { AuthContext } from './AuthContext';
import { db } from '../firebaseConfig';
import { IDoctorProfile, TProfile, EventStatus } from '../types/types';
import useFetchUser from '../hooks/useFetchUser';

interface ProfileContextProviderProps {
  children: ReactNode;
}

interface IProcessApproval {
  user: TProfile;
  id: string;
  status: EventStatus;
}

interface IProfile {
  currentUser: TProfile | null;
  doctorsList: TProfile[];
  patientsList: TProfile[];
  saveDoctorDataToFirestore: (
    user: TProfile,
    data: IDoctorProfile
  ) => Promise<void>;
  updateDoctorDataToFirestore: (
    user: TProfile,
    data: IDoctorProfile
  ) => Promise<void>;
  processApprovalStatus: ({ user, id, status }: IProcessApproval) => void;
}

export const ProfileContext = createContext<IProfile>({
  currentUser: null,
  doctorsList: [],
  patientsList: [],
  saveDoctorDataToFirestore: () => Promise.resolve(),
  updateDoctorDataToFirestore: () => Promise.resolve(),
  processApprovalStatus: () => undefined,
});

export const ProfileContextProvider: FC<ProfileContextProviderProps> = ({
  children,
}) => {
  const { user } = useContext(AuthContext);
  const { currentUser, fetchUserData } = useFetchUser();
  const [doctorsList, setDoctorsList] = useState<TProfile[]>([]);
  const [patientsList, setPatientsList] = useState<TProfile[]>([]);

  const fetchAllDoctors = async () => {
    const usersCollection = query(
      collection(db, 'users'),
      where('role', '==', 'doctor')
    );
    const usersSnapshot = await getDocs(usersCollection);
    const usersData = usersSnapshot.docs.map((doc) => doc.data()) as TProfile[];
    setDoctorsList(usersData);
  };

  const fetchAllPatients = async () => {
    const usersCollection = query(
      collection(db, 'users'),
      where('role', '==', 'patient')
    );
    const usersSnapshot = await getDocs(usersCollection);
    const usersData = usersSnapshot.docs.map((doc) => doc.data()) as TProfile[];
    setPatientsList(usersData);
  };

  useEffect(() => {
    if (user) {
      fetchUserData(user.uid);
      fetchAllDoctors();
      fetchAllPatients();
    }
  }, [user, fetchUserData]);

  const saveDoctorDataToFirestore = useCallback(
    (user: TProfile, data: IDoctorProfile) => {
      if (!user) {
        return Promise.resolve();
      }

      const userDocRef = doc(getFirestore(), 'users', user.userID);
      return updateDoc(userDocRef, {
        ...data,
        status: 'pending',
      })
        .then(() => {
          const adminUsersRef = collection(getFirestore(), 'users');
          const adminQuery = query(adminUsersRef, where('role', '==', 'admin'));

          return getDocs(adminQuery);
        })
        .then((adminSnapshot) => {
          if (!adminSnapshot.empty) {
            adminSnapshot.forEach((adminDoc) => {
              const adminData = adminDoc.data() as TProfile;
              const adminNotifications = adminData.notifications || [];

              adminNotifications.push({
                name: data.name,
                lastName: data.lastName,
                specialty: data.specialty,
                email: data.email,
                userID: user.userID,
                days: data.days,
                photoURL: user.photoURL,
                notificationType: 'forApproval',
              });

              const adminDocRef = doc(getFirestore(), 'users', adminDoc.id);
              updateDoc(adminDocRef, {
                notifications: adminNotifications,
              });
            });
          }
        })
        .catch((error) => {
          console.error('Error updating doctor data:', error);
        });
    },
    []
  );

  const updateDoctorDataToFirestore = useCallback(
    (user: TProfile, data: IDoctorProfile) => {
      if (!user) {
        return Promise.resolve();
      }
      const userDocRef = doc(getFirestore(), 'users', user.userID);
      return updateDoc(userDocRef, {
        ...data,
      });
    },
    []
  );

  const processApprovalStatus = useCallback(
    async ({ user, id, status }: IProcessApproval) => {
      try {
        const currentDocRef = doc(getFirestore(), 'users', user.userID);
        const doctorDocRef = doc(getFirestore(), 'users', id);
        await updateDoc(currentDocRef, {
          notifications: user.notifications?.filter(
            ({ userID }) => userID !== id
          ),
        });

        updateDoc(doctorDocRef, {
          role: 'doctor',
          status,
        });
      } catch (error) {
        console.error('Error updating user data', error);
      }
    },
    []
  );

  const value = useMemo(
    () => ({
      currentUser,
      doctorsList,
      patientsList,
      saveDoctorDataToFirestore,
      updateDoctorDataToFirestore,
      processApprovalStatus,
    }),
    [
      currentUser,
      doctorsList,
      patientsList,
      saveDoctorDataToFirestore,
      updateDoctorDataToFirestore,
      processApprovalStatus,
    ]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
