"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";

import {
  initialRepairFormState,
  type RepairFormOptions,
  type RepairFormState,
  repairFormResultAtom,
  repairFormStateAtom,
} from "@/store/repairForm";

const OPTIONS_QUERY_KEY = ["repair-form-options"];

const fetchRepairFormOptions = async (): Promise<RepairFormOptions> => {
  const response = await fetch("/api/ticket/repair/options", {
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error ?? "선택지를 불러오지 못했습니다.");
  }
  return {
    corporations: data.corporations ?? [],
    urgencies: data.urgencies ?? [],
    issueTypes: data.issueTypes ?? [],
  };
};

const submitRepairTicket = async (payload: RepairFormState) => {
  const response = await fetch("/api/ticket/repair", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error ?? "수리 요청 등록에 실패했습니다.");
  }

  return data as { id: string };
};

export function useRepairFormOptions(initialData?: RepairFormOptions) {
  return useQuery<RepairFormOptions, Error>({
    queryKey: OPTIONS_QUERY_KEY,
    queryFn: fetchRepairFormOptions,
    initialData,
  });
}

export function useRepairFormState() {
  const [formState, setFormState] = useAtom(repairFormStateAtom);

  const updateField = <K extends keyof RepairFormState>(
    field: K,
    value: RepairFormState[K],
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const reset = () => setFormState(initialRepairFormState);

  return { formState, updateField, reset };
}

export function useRepairFormResult() {
  const [result, setResult] = useAtom(repairFormResultAtom);
  const clearResult = () => setResult(null);

  return { result, clearResult };
}

type SubmitHookParams = {
  onSuccess?: (data: { id: string }) => void;
};

export function useSubmitRepairForm(params?: SubmitHookParams) {
  const { onSuccess } = params ?? {};
  const setFormState = useSetAtom(repairFormStateAtom);
  const setResult = useSetAtom(repairFormResultAtom);

  return useMutation({
    mutationFn: submitRepairTicket,
    onMutate: () => {
      setResult(null);
    },
    onSuccess: (data) => {
      setResult({ id: data.id });
      setFormState(initialRepairFormState);
      onSuccess?.(data);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "수리 요청 등록에 실패했습니다.";
      setResult({ error: message });
    },
  });
}
