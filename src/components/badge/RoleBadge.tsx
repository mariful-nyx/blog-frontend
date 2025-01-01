import React from "react";

interface RoleBadgeProps {
    name: string;
}

function RoleBadge({name}: RoleBadgeProps) {
  return (
    <div 
        className={`${name === "ADMIN" && 'bg-green-700'} 
                    ${name === "MODERATOR" && 'bg-yellow-700'} 
                    ${name === "GENERAL" && 'bg-blue-700'} 
            text-white text-[10px] font-semibold px-4 py-1 rounded-l-3xl `}
    >
      {name}
    </div>
  );
}

export default RoleBadge;
