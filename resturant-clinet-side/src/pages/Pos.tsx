import PageContainer from "@/components/ui/PageContainer";
import PosHeader from "@/components/features/POS/PosHeader";
import PosOrderPanel from "@/components/features/POS/PosOrderPanel";
import PosMenuPanel from "@/components/features/POS/PosMenuPanel";

function Pos() {
  return (
    <PageContainer>
      <PosHeader />
      <div className="mt-1 grid h-screen grid-cols-[0.6fr_1.1fr] gap-1">
        <PosOrderPanel />
        <PosMenuPanel />
      </div>
    </PageContainer>
  );
}

export default Pos;
