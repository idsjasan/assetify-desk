"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";

import CopyLink from "@/components/ticket/CopyLink";
import { useAskTicketDetail } from "@/hooks/useAskTicketDetail";
import { cancelStatusAtom } from "@/store/askTicketDetail";
import type { AskTicketDetail } from "@/types/askTicket";
import { formatValue } from "@/utils/formatValue";

type DetailRowProps = {
  label: string;
  value?: string | string[] | null;
};

const DetailRow = ({ label, value }: DetailRowProps) => (
  <div className="flex flex-col gap-spacing-50 py-spacing-300">
    <span className="text-content-standard-tertiary text-label">{label}</span>
    <span className="text-body text-content-standard-primary">
      {formatValue(value)}
    </span>
  </div>
);

type AskTicketDetailProps = {
  ticketId: string;
  initialData: AskTicketDetail;
};

export default function AskTicketDetailView({
  ticketId,
  initialData,
}: AskTicketDetailProps) {
  const detailQuery = useAskTicketDetail(ticketId, initialData);
  const queryClient = useQueryClient();
  const detail = detailQuery.data ?? initialData;
  const submittedAt = new Date(detail.createdTime).toLocaleString("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const isArchived = Boolean(detail.archived);
  const hasAssignee =
    typeof detail.assignee === "string" && detail.assignee.trim().length > 0;
  const isCancelableStatus = !detail.status || detail.status === "시작 전";
  const canCancel = !isArchived && !hasAssignee && isCancelableStatus;

  const [cancelStatus, setCancelStatus] = useAtom(cancelStatusAtom);

  const cancelMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/ticket/ask/${ticketId}/cancel`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error ?? "취소 요청에 실패했습니다.");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.setQueryData<AskTicketDetail>(
        ["ask-ticket-detail", ticketId],
        (prev) =>
          prev
            ? {
                ...prev,
                archived: true,
              }
            : prev,
      );
      setCancelStatus({ state: "idle" });
    },
    onError: (error: unknown) => {
      setCancelStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "문의 취소에 실패했습니다. 다시 시도해주세요.",
      });
    },
    onMutate: () => {
      setCancelStatus({ state: "pending" });
    },
  });

  if (detailQuery.isError && !detailQuery.data) {
    return (
      <div className="text-body text-core-status-negative">
        문의 정보를 불러오지 못했습니다. 다시 시도해주세요.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-spacing-600 px-spacing-700 py-spacing-900">
      <span className="font-semibold text-display">
        Ask Detail<span className="text-core-accent">.</span>
      </span>

      <CopyLink />

      <div className="flex w-full flex-col items-center gap-spacing-500">
        <div className="flex w-full max-w-[768px] flex-wrap gap-spacing-500">
          <div className="flex min-w-[220px] flex-1 flex-col gap-spacing-100 rounded-radius-700 border border-line-outline bg-components-fill-standard-primary p-spacing-400">
            <span className="text-content-standard-tertiary text-label">
              상태
            </span>
            <span className="font-semibold text-content-standard-primary text-heading">
              {formatValue(detail.status)}
            </span>
          </div>
          <div className="flex min-w-[220px] flex-1 flex-col gap-spacing-100 rounded-radius-700 border border-line-outline bg-components-fill-standard-primary p-spacing-400">
            <span className="text-content-standard-tertiary text-label">
              담당자
            </span>
            <span className="font-semibold text-content-standard-primary text-heading">
              {formatValue(detail.assignee)}
            </span>
          </div>
        </div>

        <div className="flex w-full max-w-[768px] flex-col gap-spacing-300 rounded-radius-700 border border-line-outline bg-components-fill-standard-primary p-spacing-500">
          <div className="flex flex-col divide-y divide-line-divider">
            <DetailRow label="법인" value={detail.corporation} />
            <DetailRow label="부서" value={detail.department} />
            <DetailRow label="문의자" value={detail.requester} />
            <DetailRow label="자산번호" value={detail.assetNumber} />
            <DetailRow label="문의 유형" value={detail.inquiryType} />
            <DetailRow label="문의 내용" value={detail.detail} />
            <DetailRow label="첨부파일" value={detail.attachments} />
            <DetailRow label="긴급도" value={detail.urgency} />
            <DetailRow label="제출 날짜" value={submittedAt} />
          </div>
        </div>

        {(canCancel || isArchived) && (
          <>
            <button
              type="button"
              onClick={() => canCancel && cancelMutation.mutate()}
              disabled={!canCancel || cancelMutation.isPending}
              className="w-full max-w-[768px] cursor-pointer rounded-radius-700 bg-core-status-negative/10 px-spacing-400 py-spacing-300 font-semibold text-body text-core-status-negative transition hover:opacity-75 active:scale-95 active:opacity-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isArchived
                ? "취소됨"
                : cancelMutation.isPending
                  ? "취소 진행 중..."
                  : "문의 취소하기"}
            </button>

            {cancelStatus.state === "error" && cancelStatus.message ? (
              <span className="text-core-status-negative text-label">
                {cancelStatus.message}
              </span>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
