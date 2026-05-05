import type React from "react";

function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-360">{children}</div>;
}

export default PageContainer;
