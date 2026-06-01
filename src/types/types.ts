import { User } from 'firebase/auth';

export type TUserType = 'admin' | 'patient' | 'doctor';

export type EventStatus = 'pending' | 'approved' | 'rejected' | 'notSubmitted';

type NotificationType = 'forApproval';

export type TAuthUser = User | null;

export type TProfile = IDoctorProfile & IUserProfile;

export interface INotifications {
  name: string;
  lastName: string;
  specialty: string;
  email: string;
  userID: string;
  days: string[];
  photoURL?: string | null;
  notificationType: NotificationType;
}

export interface IUserProfile {
  userID: string;
  name: string;
  email: string;
  photoURL?: string | null;
  appointments?: string[];
  onlineStatus?: boolean;
  status?: EventStatus;
  notifications?: INotifications[];
  role?: TUserType;
  notificationType?: NotificationType;
}

export interface IDoctorProfile extends IUserProfile {
  lastName: string;
  phone: number | null;
  address: string;
  specialty: string;
  experience: number | null;
  qualification: string;
  startTime: string;
  endTime: string;
  fee: number | null;
  days: string[];
}
