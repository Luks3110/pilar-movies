import React from "react";
import { Button } from "./button";
import { House } from "lucide-react";

const HomeButton = () => {
  return (
    <Button
      variant={"link"}
      className="flex gap-2 text-white px-2 h-fit no-underline text-lg"
    >
      <House size={28} />
    </Button>
  );
};

export default HomeButton;
