import { useParams } from "react-router-dom";
import { DealWorkspace } from "@/components/deals/DealWorkspace";

const DealWorkspacePage = () => {
  const { dealId } = useParams<{ dealId: string }>();
  
  if (!dealId) {
    return <div>Deal not found</div>;
  }

  return <DealWorkspace dealId={dealId} />;
};

export default DealWorkspacePage;