import { Spinner } from "@nextui-org/react";

export default function Loadingpage() {
  return (
    <h2 className=" w-6/12 flex items-center justify-center h-100v mx-auto text-4xl max-w-7xl">
      <Spinner />
    </h2>
  );
}
