import { useState } from 'react';
import './Navbar.css';

// 導覽列項目資料（假資料，之後可依需求接路由）
const NAV_ITEMS = [
  { label: '首頁', href: '#' },
  { label: '下載', href: '#download' },
  { label: '價格方案', href: '#pricing' },
];

function Navbar() {
  // 控制手機版選單開關
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 切換選單開關狀態
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  // 點擊導覽項目後關閉選單（手機版用）
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__inner">

        {/* 左側：品牌名稱 */}
        <a href="#" className="navbar__brand" onClick={closeMenu}>
          AI Vlog Maker
        </a>

        {/* 手機版漢堡選單按鈕 */}
        <button
          className={`navbar__hamburger ${isMenuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={toggleMenu}
          aria-label="開關選單"
          aria-expanded={isMenuOpen}
        >
          {/* 三條橫線 → 叉叉動畫由 CSS 控制 */}
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
        </button>

        {/* 右側：導覽項目 + 登入/註冊按鈕 */}
        <div className={`navbar__right ${isMenuOpen ? 'navbar__right--open' : ''}`}>

          {/* 導覽項目 */}
          <ul className="navbar__nav-list">
            {NAV_ITEMS.map(item => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="navbar__nav-link"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* 登入 / 註冊按鈕 */}
          <div className="navbar__actions">
            <button className="navbar__btn navbar__btn--ghost">登入</button>
            <button className="navbar__btn navbar__btn--solid">註冊</button>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
