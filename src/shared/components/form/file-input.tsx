import { atom, type PrimitiveAtom, useAtom } from "jotai";
import { Upload, X } from "lucide-react";
import type React from "react";
import type { InputHTMLAttributes } from "react";
import { v4 as uuidv4 } from "uuid";
import type { FileWithId } from "@/app/(pages)/inquiry/(atoms)/useInquiryFormStore";

interface FileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  atom: PrimitiveAtom<FileWithId[]>;
  accept?: string;
  multiple?: boolean;
}

const isDraggingAtom = atom(false);

export function FileInput({
  atom: filesAtom,
  accept,
  multiple = false,
  ...props
}: FileInputProps) {
  const [selectedFiles, setSelectedFiles] = useAtom(filesAtom);
  const [isDragging, setIsDragging] = useAtom(isDraggingAtom);

  const handleFiles = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        Object.assign(file, { id: uuidv4() }),
      );
      setSelectedFiles((prev) => [...prev, ...fileArray]);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const removeFile = (id: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-spacing-400">
      <label
        className={`flex w-full cursor-pointer flex-col items-center justify-center gap-spacing-200 rounded-radius-400 border-2 border-dashed px-spacing-400 py-spacing-700 text-content-standard-tertiary text-label duration-100 ${
          isDragging
            ? "border-core-accent bg-core-accent/10"
            : "border-line-outline bg-components-fill-standard-secondary hover:border-core-accent"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Upload size={24} />
        <span>클릭하여 파일을 선택하거나 드래그하여 업로드하세요.</span>
        <input
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          {...props}
        />
      </label>

      {selectedFiles.length > 0 && (
        <div className="flex w-full flex-col gap-spacing-200">
          {selectedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between rounded-radius-400 border border-line-outline bg-components-fill-standard-secondary px-spacing-400 py-spacing-300 text-body text-content-standard-primary"
            >
              <span className="text-label">
                {file.name} ({formatFileSize(file.size)})
              </span>
              <button
                type="button"
                onClick={() => removeFile(file.id)}
                className="flex-shrink-0 text-content-standard-tertiary duration-100 hover:opacity-75 active:scale-95 active:opacity-50"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
