import { CloudUpload, X } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { TypographyH2 } from "../Typography/Typography";
import { useFormContext } from "@/hooks/useFormContext";

const FileUploaderComp = ({ fileHeading = "Product Image" }) => {
  const [files, setFiles] = React.useState<File[]>([]);

  const { enableVariations, dispatch } = useFormContext();

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);

    const file = newFiles[0];
    if (!file) return;

    dispatch({
      type: "UPDATE_FIELD",
      field: "image",
      value: file, //
    });
  };

  return (
    <div className="mt-2">
      {fileHeading && (
        <TypographyH2 className={"mb-6"}>Product Image</TypographyH2>
      )}
      <FileUpload
        maxFiles={1}
        maxSize={5 * 1024 * 1024}
        className="w-full max-w-md"
        value={files}
        onValueChange={handleFileChange}
        disabled={enableVariations}
      >
        <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
          <CloudUpload className="size-4" />
          <span className="text-sm">Drag and drop or</span>
          <FileUploadTrigger asChild>
            <Button variant="link" size="sm" className="h-auto p-0">
              choose files
            </Button>
          </FileUploadTrigger>
          <span className="text-sm">to upload</span>
        </FileUploadDropzone>
        <FileUploadList>
          {files.map((file, index) => (
            <FileUploadItem key={index} value={file}>
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
              <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-7">
                  <X className="size-4" />
                </Button>
              </FileUploadItemDelete>
            </FileUploadItem>
          ))}
        </FileUploadList>
      </FileUpload>
    </div>
  );
};

export default FileUploaderComp;
