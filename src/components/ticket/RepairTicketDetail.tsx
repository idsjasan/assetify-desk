"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";

import CopyLink from "@/components/ticket/CopyLink";
import { useRepairTicketDetail } from "@/hooks/useRepairTicketDetail";
import { cancelStatusAtom } from "@/store/repairTicketDetail";
import type { RepairTicketDetail } from "@/types/repairTicket";
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

type RepairTicketDetailProps = {
  ticketId: string;
  initialData: RepairTicketDetail;
};

export default function RepairTicketDetailView({
  ticketId,
  initialData,
}: RepairTicketDetailProps) {
  const detailQuery = useRepairTicketDetail(ticketId, initialData);
  const queryClient = useQueryClient();
  const detail = detailQuery.data ?? initialData;
  const submittedAt = new Date(detail.createdTime).toLocaleString("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const isArchived = Boolean(detail.archived);
  const hasAssignee =
    typeof detail.assignee === "string" && detail.assignee.trim().length > 0;
  const isCancelableStatus =
    (!detail.status || detail.status === "시작 전") &&
    (!detail.progressStatus || detail.progressStatus === "시작 전");
  const canCancel = !isArchived && !hasAssignee && isCancelableStatus;
  const scheduledAt = detail.schedule
    ? new Date(detail.schedule).toLocaleString("ko-KR", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : undefined;
  const priceValue = detail.price ? `${detail.price}원` : undefined;

  const [cancelStatus, setCancelStatus] = useAtom(cancelStatusAtom);

  const cancelMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/ticket/repair/${ticketId}/cancel`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error ?? "취소 요청에 실패했습니다.");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.setQueryData<RepairTicketDetail>(
        ["repair-ticket-detail", ticketId],
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
            : "수리 요청 취소에 실패했습니다. 다시 시도해주세요.",
      });
    },
    onMutate: () => {
      setCancelStatus({ state: "pending" });
    },
  });

  if (detailQuery.isError && !detailQuery.data) {
    return (
      <div className="text-body text-core-status-negative">
        수리 요청 정보를 불러오지 못했습니다. 다시 시도해주세요.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-spacing-600 px-spacing-700 py-spacing-900">
      <span className="font-semibold text-display">
        Repair Detail<span className="text-core-accent">.</span>
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
              진행 상황
            </span>
            <span className="font-semibold text-content-standard-primary text-heading">
              {formatValue(detail.progressStatus)}
            </span>
          </div>
        </div>

        <div className="flex w-full max-w-[768px] flex-wrap gap-spacing-500">
          <div className="flex min-w-[220px] flex-1 flex-col gap-spacing-100 rounded-radius-700 border border-line-outline bg-components-fill-standard-primary p-spacing-400">
            <span className="text-content-standard-tertiary text-label">
              과실여부
            </span>
            <span className="font-semibold text-content-standard-primary text-heading">
              {formatValue(detail.liability)}
            </span>
          </div>
          <div className="flex min-w-[220px] flex-1 flex-col gap-spacing-100 rounded-radius-700 border border-line-outline bg-components-fill-standard-primary p-spacing-400">
            <span className="text-content-standard-tertiary text-label">
              단가
            </span>
            <span className="font-semibold text-content-standard-primary text-heading">
              {formatValue(priceValue)}
            </span>
          </div>
        </div>

        <div className="flex w-full max-w-[768px] flex-wrap gap-spacing-500">
          <div className="flex min-w-[220px] flex-1 flex-col gap-spacing-100 rounded-radius-700 border border-line-outline bg-components-fill-standard-primary p-spacing-400">
            <span className="text-content-standard-tertiary text-label">
              담당자
            </span>
            <span className="font-semibold text-content-standard-primary text-heading">
              {formatValue(detail.assignee)}
            </span>
          </div>
          <div className="flex min-w-[220px] flex-1 flex-col gap-spacing-100 rounded-radius-700 border border-line-outline bg-components-fill-standard-primary p-spacing-400">
            <span className="text-content-standard-tertiary text-label">
              조치내용
            </span>
            <span className="font-semibold text-content-standard-primary text-heading">
              {formatValue(detail.actionNotes)}
            </span>
          </div>
        </div>
        <div className="flex w-full max-w-[768px] flex-wrap gap-spacing-500">
          <div className="flex min-w-[220px] flex-1 flex-col gap-spacing-100 rounded-radius-700 border border-line-outline bg-components-fill-standard-primary p-spacing-400">
            <span className="text-content-standard-tertiary text-label">
              수리 일정
            </span>
            <span className="font-semibold text-content-standard-primary text-heading">
              {formatValue(scheduledAt ?? detail.schedule)}
            </span>
          </div>
        </div>
        <div className="flex w-full max-w-[768px] flex-col gap-spacing-300 rounded-radius-700 border border-line-outline bg-components-fill-standard-primary p-spacing-500">
          <div className="flex flex-col divide-y divide-line-divider">
            <DetailRow label="법인" value={detail.corporation} />
            <DetailRow label="부서" value={detail.department} />
            <DetailRow label="문의자" value={detail.requester} />
            <DetailRow label="담당 팀" value={detail.team} />
            <DetailRow label="실제 근무 위치" value={detail.location} />
            <DetailRow label="자산번호" value={detail.assetNumber} />
            <DetailRow label="고장 내역" value={detail.issueTypes} />
            <DetailRow label="고장 증상" value={detail.detail} />
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
                  : "수리 요청 취소하기"}
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
