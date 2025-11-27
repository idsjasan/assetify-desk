import { Upload, X } from "lucide-react";
import type { InputHTMLAttributes } from "react";

interface FileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  onChange?: (files: File[]) => void;
  value?: File[];
}

const fileKeys = new WeakMap<File, string>();

function getFileKey(file: File): string {
  const existing = fileKeys.get(file);
  if (existing) {
    return existing;
  }
  const newKey = `${Date.now()}-${Math.random()}`;
  fileKeys.set(file, newKey);
  return newKey;
}

export default function FileInput({
  onChange,
  value = [],
  ...props
}: FileInputProps) {
  const selectedFiles = value;

  const handleFiles = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      onChange?.([...selectedFiles, ...fileArray]);
    }
  };

  const removeFile = (index: number) => {
    onChange?.(selectedFiles.filter((_, i) => i !== index));
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
      <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-spacing-200 rounded-radius-400 border-2 border-line-outline border-dashed bg-components-fill-standard-secondary px-spacing-400 py-spacing-700 text-content-standard-tertiary text-label duration-100 hover:border-core-accent">
        <Upload size={24} />
        <span>클릭하여 파일을 선택하세요.</span>
        <input
          type="file"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          multiple
          {...props}
        />
      </label>

      {selectedFiles.length > 0 && (
        <div className="flex w-full flex-col gap-spacing-200">
          {selectedFiles.map((file, index) => (
            <div
              key={getFileKey(file)}
              className="flex items-center justify-between rounded-radius-400 border border-line-outline bg-components-fill-standard-secondary px-spacing-400 py-spacing-300 text-body text-content-standard-primary"
            >
              <span className="text-label">
                {file.name} ({formatFileSize(file.size)})
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
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
