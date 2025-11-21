import { atom } from "jotai";

export type RepairFormOptions = {
  corporations: string[];
  urgencies: string[];
  issueTypes: string[];
};

export type RepairFormState = {
  corporation: string;
  department: string;
  assetNumber: string;
  urgency: string;
  issueType: string;
  detail: string;
  location: string;
  requester: string;
  attachments: string[];
  consent: boolean;
};

export type RepairFormResult = {
  id?: string;
  error?: string;
} | null;

export const initialRepairFormOptions: RepairFormOptions = {
  corporations: [],
  urgencies: [],
  issueTypes: [],
};

export const initialRepairFormState: RepairFormState = {
  corporation: "",
  department: "",
  assetNumber: "",
  urgency: "",
  issueType: "",
  detail: "",
  location: "",
  requester: "",
  attachments: [],
  consent: false,
};

export const repairFormStateAtom = atom<RepairFormState>(
  initialRepairFormState,
);
export const repairFormResultAtom = atom<RepairFormResult>(null);
