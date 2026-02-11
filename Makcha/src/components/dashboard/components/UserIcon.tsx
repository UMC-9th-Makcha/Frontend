import { useState, memo } from 'react';
import type { User } from "../../../types/auth";
import type { IconProps } from '../types/dashboard';

const KakaoIcon = memo(({ className = '' }: IconProps) => (
  <div className={`flex items-center justify-center bg-[#FEE500] rounded-full p-[6px] shrink-0 ${className}`}>
    <svg width="100%" height="100%" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 0C4.477 0 0 3.582 0 8C0 10.865 1.848 13.423 4.67 14.86L3.8 18.061C3.742 18.273 3.865 18.49 4.077 18.548C4.148 18.567 4.223 18.562 4.29 18.534L8.14 16.911C8.74 16.97 9.36 17 10 17C15.523 17 20 13.418 20 9C20 4.582 15.523 0 10 0Z" fill="#3C1E1E"/>
    </svg>
  </div>
));

const UserProfileIcon = memo(({ src, className = '' }: IconProps & { src: string }) => {
  const [isError, setIsError] = useState(false);

  if (isError) return <KakaoIcon className={className} />;

  return (
    <div className={`shrink-0 overflow-hidden rounded-full border border-gray-100 dark:border-makcha-navy-800 bg-gray-50 dark:bg-makcha-navy-900 ${className}`}>
      <img 
        src={src} 
        alt="프로필" 
        className="w-full h-full object-cover"
        onError={() => setIsError(true)} 
      />
    </div>
  );
});

export const UserIcon = memo(({ user, className }: IconProps & { user: User | null }) => {
  if (!user?.profileImage) {
    return <KakaoIcon className={className} />;
  }

  return (
    <UserProfileIcon 
      key={user.profileImage} 
      src={user.profileImage} 
      className={className} 
    />
  );
});

KakaoIcon.displayName = 'KakaoIcon';
UserProfileIcon.displayName = 'UserProfileIcon';
UserIcon.displayName = 'UserIcon';