import React from "react";
// import { FiGrid } from "react-icons/fi"; ---- Install react icons

export const AccountToggleDemo = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className=" flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <img
          src="https://api.dicebear.com/9.x/glass/svg?seed=Jameson"
          alt="avatar"
          className="size-8 rounded shrink-0 bg-sky-400 shadow"
        />
        <div className="text-start">
            <span className="text-sm font-bold block">Name of User</span>
            <span className="text-xs block text-stone-500">Name of User Work Email/Email</span>
        </div>

            {/* <FiGrid classname="absolute right-2 top-1 translate-y-[2px] text-md" */}

      </button>
    </div>
  );
};
