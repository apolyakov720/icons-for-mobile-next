import { SectionIcons } from "./components/section-icons-2";
import { SectionConfigs } from "./components/section-configs";

const RootPage = async () => {
  return (
    <div className="space-y-4">
      <SectionIcons />
      <SectionConfigs />
    </div>
  );
};

export default RootPage;
