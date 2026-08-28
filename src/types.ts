export type DocType = 'word' | 'pdf' | 'powerpoint' | 'other';

export interface UploadedDoc {
  id: string;
  name: string;
  size: number;
  type: DocType;
  rawMimeType: string;
  uploadedAt: string;
  dataUrl?: string;
  pageCount?: number;
}

export interface ModuleResourceDoc {
  id: string;
  title: string;
  filename: string;
  type: 'pdf';
  viewUrl: string;
  downloadUrl: string;
  sizeDescription?: string;
}

export interface ModuleData {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  acceptedTypes: DocType[];
  recommendedType: DocType;
  uploadedFile?: UploadedDoc;
  isVerified?: boolean;
  resourceDocs?: ModuleResourceDoc[];
}

export interface UserAuth {
  name: string;
  email: string;
}

export interface UserDetails {
  name: string;
  email: string;
  designation: string;
  department: string;
}

export interface CertificateRecord {
  id: string;
  certificateNumber: string;
  recipientName: string;
  email: string;
  designation: string;
  department: string;
  issuedDate: string;
  totalModules: number;
  completedModules: number;
  verificationHash: string;
  signatureAuthority: string;
  authorityTitle: string;
}

export type StepKey = 'login' | 'modules_submission' | 'final_module' | 'user_details' | 'certificate';
