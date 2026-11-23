import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate, useLocation } from "react-router";

import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';
import Download from './pages/Download/Download.jsx';

// 換頁時自動捲到最上面（不加的話，會停在上一頁捲動的位置）
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 登入、註冊頁有自己的全螢幕版面，不顯示導覽列
  const hideNavbar = pathname === "/login" || pathname === "/signup";

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    navigate("/editor");
  };

  return (
    <>
      <ScrollToTop />

      {/* 固定導覽列：放在 Routes 外面，除了登入/註冊頁以外每一頁都會顯示 */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* 首頁：中央主視覺區塊 */}
        <Route path="/" element={<HeroSection />} />

        <Route
          path="/login"
          element={
            <Login
              onSwitchToSignup={() => navigate("/signup")}
              onLoginSuccess={handleAuthSuccess}
            />
          }
        />

        <Route
          path="/signup"
          element={
            <Signup
              onSwitchToLogin={() => navigate("/login")}
              onSignupSuccess={handleAuthSuccess}
            />
          }
        />

        <Route path="/download" element={<Download />} />

        <Route
          path="/editor"
          element={
            user ? (
              <h1>歡迎，{user.name || user.email}！剪輯器即將登場</h1>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<h1>找不到這個頁面</h1>} />
      </Routes>
    </>
  );
}

export default App;

