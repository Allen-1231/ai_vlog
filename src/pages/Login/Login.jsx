import { useState } from "react";
import "./Login.css";

// props：
//   onSwitchToSignup  → 點「註冊」時呼叫，由父元件(App)決定要切到哪一頁
//   onLoginSuccess    → 登入成功時呼叫，並把使用者資料傳回給父元件
function Login({ onSwitchToSignup, onLoginSuccess }) {

  // ---- state：表單欄位 ----
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // ---- state：介面狀態 ----
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({}); // 例如 { email: "...", password: "..." }
  const [submitError, setSubmitError] = useState(""); // 伺服器回傳的錯誤
  const [isLoading, setIsLoading] = useState(false);

  // 前端驗證：回傳錯誤物件，空物件代表通過
  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "請輸入電子郵件";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "電子郵件格式不正確";
    }

    if (!password) {
      newErrors.password = "請輸入密碼";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 避免表單送出後整頁重新整理
    setSubmitError("");

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);

    // TODO：之後把這段換成真正的登入 API (fetch / axios)
    // 目前先用 setTimeout 假裝在等待後端回應
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({ email, remember });
    }, 1000);
  };

  return (
    <div className="login-page">
      {/* 左側：品牌區 */}
      <aside className="login-brand">
        <div className="login-brand-logo">▶ ClipAI</div>
        <h1 className="login-brand-title">
          用 AI 剪出
          <br />
          更好的 Vlog
        </h1>
        <ul className="login-brand-list">
          <li>自動字幕，一鍵生成</li>
          <li>像編輯文件一樣剪影片</li>
          <li>智慧偵測贅詞與停頓</li>
        </ul>
      </aside>

      {/* 右側：登入表單 */}
      <main className="login-panel">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <h2 className="login-title">歡迎回來</h2>
          <p className="login-subtitle">登入以繼續你的剪輯專案</p>

          {submitError && (
            <div className="login-alert" role="alert">
              {submitError}
            </div>
          )}

          {/* Email */}
          <div className="login-field">
            <label htmlFor="login-email">電子郵件</label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "login-input is-error" : "login-input"}
            />
            {errors.email && (
              <span className="login-error-text">{errors.email}</span>
            )}
          </div>

          {/* 密碼 */}
          <div className="login-field">
            <label htmlFor="login-password">密碼</label>
            <div className="login-password-wrap">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="請輸入密碼"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={
                  errors.password ? "login-input is-error" : "login-input"
                }
              />
              <button
                type="button"
                className="login-toggle-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "隱藏" : "顯示"}
              </button>
            </div>
            {errors.password && (
              <span className="login-error-text">{errors.password}</span>
            )}
          </div>

          {/* 記住我 */}
          <div className="login-row">
            <label className="login-checkbox">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>記住我</span>
            </label>
            <button type="button" className="login-link-btn">
              忘記密碼？
            </button>
          </div>

          <button type="submit" className="login-submit" disabled={isLoading}>
            {isLoading ? "登入中..." : "登入"}
          </button>

          <p className="login-switch">
            還沒有帳號？
            <button
              type="button"
              className="login-link-btn"
              onClick={onSwitchToSignup}
            >
              立即註冊
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Login;