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
    1: { name: 'Prompt_Engineering_Templates_&_Schemas.docx', type: 'word', size: 1450000 },
    2: { name: 'Vision_YOLOv11_Benchmark_Analysis.pdf', type: 'pdf', size: 3200000 },
    3: { name: 'LLM_Attention_Architecture_Deck.pptx', type: 'powerpoint', size: 8450000 },
    4: { name: 'Vector_RAG_Hybrid_Search_Report.docx', type: 'word', size: 980000 },
    5: { name: 'LoRA_FineTuning_Loss_Metrics.pdf', type: 'pdf', size: 2100000 },
    6: { name: 'ReAct_AI_Agent_Orchestration_Spec.docx', type: 'word', size: 1150000 },
    7: { name: 'Responsible_AI_Safety_RedTeam_Audit.pdf', type: 'pdf', size: 4500000 },
    8: { name: 'MLOps_vLLM_Deployment_Runbook.docx', type: 'word', size: 1320000 },
    9: { name: 'Multimodal_Vision_Language_Demo.pptx', type: 'powerpoint', size: 12400000 },
    10: { name: 'Capstone_AI_End_to_End_Dossier.docx', type: 'word', size: 2890000 },
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
