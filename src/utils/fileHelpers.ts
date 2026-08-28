import { DocType, UploadedDoc } from '../types';

export function detectDocType(fileName: string, mimeType?: string): DocType {
  const lowerName = fileName.toLowerCase();
  if (lowerName.endsWith('.pdf') || mimeType?.includes('pdf')) {
    return 'pdf';
  }
  if (
    lowerName.endsWith('.doc') ||
    lowerName.endsWith('.docx') ||
    mimeType?.includes('word') ||
    mimeType?.includes('officedocument.wordprocessingml')
  ) {
    return 'word';
  }
  if (
    lowerName.endsWith('.ppt') ||
    lowerName.endsWith('.pptx') ||
    mimeType?.includes('powerpoint') ||
    mimeType?.includes('officedocument.presentationml')
  ) {
    return 'powerpoint';
  }
  return 'other';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function generateDocId(): string {
  return 'DOC-' + Math.random().toString(36).substring(2, 9).toUpperCase();
}

export function createSampleFinalProjectFile(type: DocType = 'pdf'): UploadedDoc {
  const extension = type === 'pdf' ? 'pdf' : type === 'powerpoint' ? 'pptx' : 'docx';
  const mime = type === 'pdf' 
    ? 'application/pdf' 
    : type === 'powerpoint' 
    ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
    : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  
  return {
    id: generateDocId(),
    name: `Module_Submission_Document.${extension}`,
    size: 4750000,
    type: type,
    rawMimeType: mime,
    uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString(),
  };
}

export function createSampleFile(moduleId: number, preferredType: DocType): UploadedDoc {
  const sampleNames: Record<number, { name: string; type: DocType; size: number }> = {
    1: { name: 'Inspection_Report_Preparation_Dossier.docx', type: 'word', size: 1450000 },
    2: { name: 'Audit_Para_Reply_Compliance_Statement.docx', type: 'word', size: 1820000 },
    3: { name: 'GDP_Petition_C_Rated_Reply_Draft.docx', type: 'word', size: 1650000 },
    4: { name: 'Scheme_Guidelines_Executive_Summary.pdf', type: 'pdf', size: 2450000 },
    5: { name: 'Circular_Summary_&_Tamil_Translation.docx', type: 'word', size: 1980000 },
    6: { name: 'Bill_Preparation_Abstract_Estimate.docx', type: 'word', size: 2150000 },
    7: { name: 'Field_Inspection_Checklist_Matrix.docx', type: 'word', size: 1350000 },
    8: { name: 'Water_Supply_Data_Analysis_Report.pdf', type: 'pdf', size: 3120000 },
    9: { name: 'Departmental_Review_PPT_Template.pptx', type: 'powerpoint', size: 7850000 },
  };

  const item = sampleNames[moduleId] || {
    name: `AI_Module_${moduleId}_Submission.${preferredType === 'pdf' ? 'pdf' : preferredType === 'powerpoint' ? 'pptx' : 'docx'}`,
    type: preferredType,
    size: 1500000,
  };

  return {
    id: generateDocId(),
    name: item.name,
    size: item.size,
    type: item.type,
    rawMimeType: item.type === 'pdf' ? 'application/pdf' : item.type === 'word' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString(),
  };
}

export function generateCertificateNumber(): string {
  const year = new Date().getFullYear();
  const randomHex = Math.floor(100000 + Math.random() * 900000);
  return `CERT-${year}-${randomHex}`;
}

export function generateVerificationHash(name: string, dept: string): string {
  const str = `${name}-${dept}-${Date.now()}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
}
