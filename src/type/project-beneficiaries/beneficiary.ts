export interface Beneficiary {
  id?: string;
  projectId: string;
  beneficiaryName: string;
  phone?: string;
  address?: string;
  districtId?: string;
  beneficiaryType?: string;
  assistanceType?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BeneficiaryResponse {
  success: boolean;
  message: string;
  data: Beneficiary | Beneficiary[];
}