'use client';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 md:px-8 w-full bg-surface dark:bg-background border-b border-outline-variant dark:border-outline fixed top-0 right-0 left-0 md:left-[240px] h-16 z-10">
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        {/* Hamburger Menu Button for Mobile */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant cursor-pointer mr-1"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        )}
        <div className="relative w-48 sm:w-64 focus-within:ring-2 focus-within:ring-primary rounded">
          <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            className="w-full bg-surface-container-lowest border border-outline-variant rounded pl-9 pr-3 py-1.5 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none"
            placeholder="Search..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        <button className="text-on-surface-variant hover:text-primary transition-all font-semibold text-[12px] cursor-pointer">
          Filter
        </button>
        <button className="text-primary hover:text-primary-fixed transition-all font-bold text-[12px] cursor-pointer">
          Export
        </button>
        <button className="p-2 text-on-surface-variant hover:text-primary transition-all rounded-full hover:bg-surface-container-low cursor-pointer hidden sm:block">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant">
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPkP3vIRacT051DWqiIhtmoUajkrmCzMvSfxnNXw9-I-0bGEy1L6E8-mbJq6Mo9qjshKeugaosnh-zIuZ1-MWK3D1MfYlxnmqDEqzUzZ6-L8ACs3A9B0be5ef7uss4DtD4XRR21kWFA3k1k8Pz-hApapEU5OQQp5o9Z2N_pKC8IxTyMaffgsVHG9gFFdYGibHILIiCq1hII6mdhSQ4jVvYN90zSFlyEVYXs2-SXwWlOxPbg1Tmx_PM"
          />
        </div>
      </div>
    </header>
  );
}
