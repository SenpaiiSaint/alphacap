import { Command } from "cmdk";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
// import { FiPlusSquare, FiEye, FiPhone, FiLogOut } from "react-icons/fi";

export const CommandMenuDemo = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState("");
  // Toggle the menu when CommandK is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);
  
  return (
    <Command.Dialog
    open={open}
    onOpenChange={setOpen}
    label="Global Command Menu"
    className="fixed inset-0 bg-stone-950/50"
    onClick={() => setOpen(false)}
    >
      <div 
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-lg shadow-xl border-stone-300 border overflow-hidden w-full max-w-lg mx-auto mt-12"
      >
        <Command.Input
          value={value}
          onValueChange={setValue}
          placeholder="What do you need"
          aria-label="Search Command Menu"
          className="relative border-b border-stone-300 p-3 text-lg w-full placeholder:text-stone-400 focus:outline-none"
          />
        <Command.List className="p-3">
          <Command.Empty>
            No Results found for <span className="text-red-500">&quot;{value}</span>
          </Command.Empty>
          <Command.Group heading="Team" className="text-sm mb-3 text-stone-400">
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPlusSquare />
              Invite Member
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPlusSquare />
              See Org Chart
            </Command.Item>
          </Command.Group>
          <Command.Group
          heading="integrations"
          className="text-sm text-stone-400 mb-3">
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPlusSquare />
              Link Services
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPlusSquare />
              Contact Support
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPlusSquare />
              Sign Out
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};