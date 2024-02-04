import Link from "next/link";
import { RocketIcon } from "@radix-ui/react-icons";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";

const NotFound404Page = () => {
  return (
    <Empty>
      <RocketIcon className="h-[30px] w-[30px]" />
      <EmptyTitle>
        Раздел на который вы пытаетесь перейти еще существует
      </EmptyTitle>
      <EmptyDescription className="text-cyan-500">
        <Link href="/">Перейти на главный раздел</Link>
      </EmptyDescription>
    </Empty>
  );
};

export default NotFound404Page;
