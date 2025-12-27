export default function Setting() {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6">환경 설정</h1>
        <ul className="space-y-1">
          {['프로필 수정', '알림 소리 설정', '테마 변경', '로그아웃'].map((menu) => (
            <li key={menu} className="py-4 border-b border-makcha-navy-800 flex justify-between items-center">
              <span className={menu === '로그아웃' ? 'text-red-400' : ''}>{menu}</span>
              <span className="text-makcha-navy-600">›</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }