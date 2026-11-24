import { useNavigate, Link } from "react-router";

import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

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
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          AI Vlog Maker
        </Link>

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
            <li>
              <Link to="/" className="navbar__nav-link" onClick={closeMenu}>
                首頁
              </Link>
            </li>
            <li>
              <Link to="/download" className="navbar__nav-link" onClick={closeMenu}>
                下載
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="navbar__nav-link" onClick={closeMenu}>
                價格方案
              </Link>
            </li>
            <li>
              <Link to="/about" className="navbar__nav-link" onClick={closeMenu}>
                關於我們
              </Link>
            </li>
            <li>
              <Link to="/settings" className="navbar__nav-link" onClick={closeMenu}>
                設定
              </Link>
            </li>
          </ul>

          {/* 登入 / 註冊按鈕 */}
          <div className="navbar__actions">
            <button className="navbar__btn navbar__btn--ghost" onClick={() => navigate("/login")}>登入</button>
            <button className="navbar__btn navbar__btn--solid" onClick={() => navigate("/signup")}>註冊</button>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;