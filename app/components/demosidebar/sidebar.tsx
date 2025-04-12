import React from "react";
import { AccountToggleDemo } from "./AccountToggleDemo";

export const Sidebar = () => {
    return (
        <div>
            <div className="overflow-y-scroll sticky top-4 min-h-screen">
                <AccountToggleDemo />
            </div>
        </div>
    )
}