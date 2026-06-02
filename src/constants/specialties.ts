import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import FaceRetouchingNaturalOutlinedIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined';
import PregnantWomanOutlinedIcon from '@mui/icons-material/PregnantWomanOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import { SvgIconComponent } from '@mui/icons-material';

export interface SpecialtyConfig {
  key: string;
  icon: SvgIconComponent;
  color: string;
  bgColor: string;
}

export const SPECIALTIES: SpecialtyConfig[] = [
  { key: 'dermatologist', icon: FaceRetouchingNaturalOutlinedIcon, color: '#e67e22', bgColor: '#fef3e2' },
  { key: 'gynecologist', icon: PregnantWomanOutlinedIcon, color: '#e91e8c', bgColor: '#fde8f5' },
  { key: 'neurologist', icon: PsychologyOutlinedIcon, color: '#7b1fa2', bgColor: '#f3e5f5' },
  { key: 'orthopaedist', icon: AccessibilityNewOutlinedIcon, color: '#1976d2', bgColor: '#e3f2fd' },
  { key: 'pediatrician', icon: ChildCareOutlinedIcon, color: '#388e3c', bgColor: '#e8f5e9' },
  { key: 'surgeon', icon: MedicalServicesOutlinedIcon, color: '#d32f2f', bgColor: '#ffebee' },
];
