import { SectionConfigs } from "./components/section-configs";
import { SectionImages } from "./components/section-images";

const RootPage = async () => {
  return (
    <div className="space-y-4">
      <SectionImages />
      <SectionConfigs />
    </div>
  );
};

export default RootPage;
