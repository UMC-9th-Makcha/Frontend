import type { User } from "../../types/auth";

export interface IconProps {
  className?: string;
}

const KakaoIcon = ({ className }: IconProps) => (
  <div className={`flex items-center justify-center bg-[#FEE500] rounded-full p-[7px] ${className ?? ''}`}>
    <svg width="100%" height="100%" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C4.477 0 0 3.582 0 8C0 10.865 1.848 13.423 4.67 14.86L3.8 18.061C3.742 18.273 3.865 18.49 4.077 18.548C4.148 18.567 4.223 18.562 4.29 18.534L8.14 16.911C8.74 16.97 9.36 17 10 17C15.523 17 20 13.418 20 9C20 4.582 15.523 0 10 0Z" fill="#3C1E1E"/>
    </svg>
  </div>
);

const UserProfileIcon = ({ src, className }: IconProps & { src: string }) => (
  <div className={`shrink-0 overflow-hidden rounded-full border border-gray-100 dark:border-makcha-navy-800 ${className ?? ''}`}>
    <img src={src} alt="프로필" className="w-full h-full object-cover" />
  </div>
);

export const UserIcon = ({ user, className }: IconProps & { user: User | null }) => {
  if (user?.profileImage) {
    return <UserProfileIcon src={user.profileImage} className={className} />;
  }
  return <KakaoIcon className={className} />;
};