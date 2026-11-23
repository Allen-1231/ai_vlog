import { useState } from "react";
import "./Signup.css";

// props：
//   onSwitchToLogin   → 點「登入」時呼叫，由父元件(App)切換頁面
//   onSignupSuccess   → 註冊成功時呼叫，並把使用者資料傳回給父元件
function Signup({ onSwitchToLogin, onSignupSuccess }) {
  // ---- state：表單欄位 ----
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  // ---- state：介面狀態 ----
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // ---- 衍生資料：密碼強度 ----
  // 這不需要另外用 useState 存！
  // 因為它可以由 password 直接算出來，每次 render 重新算就好。
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "", level: "" };

    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score, label: "弱", level: "weak" };
    if (score <= 2) return { score, label: "普通", level: "medium" };
    return { score, label: "強", level: "strong" };
  };

  const strength = getPasswordStrength(password);

  // 前端驗證
  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "請輸入暱稱";
    } else if (name.trim().length < 2) {
      newErrors.name = "暱稱至少需要 2 個字";
    }

    if (!email.trim()) {
      newErrors.email = "請輸入電子郵件";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "電子郵件格式不正確";
    }

    if (!password) {
      newErrors.password = "請輸入密碼";
    } else if (password.length < 8) {
      newErrors.password = "密碼至少需要 8 個字元";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "請再次輸入密碼";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "兩次輸入的密碼不一致";
    }

    if (!agree) {
      newErrors.agree = "請先同意服務條款";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);

    // TODO：之後把這段換成真正的註冊 API
    setTimeout(() => {
      setIsLoading(false);
      onSignupSuccess({ name, email });
    }, 1000);
  };

  return (
    <div className="signup-page">
      {/* 左側：品牌區 */}
      <aside className="signup-brand">
        <div className="signup-brand-logo">▶ ClipAI</div>
        <h1 className="signup-brand-title">
          開始你的
          <br />
          第一支 AI 剪輯
        </h1>
        <ul className="signup-brand-list">
          <li>免費建立帳號</li>
          <li>專案自動儲存，隨時接續</li>
          <li>AI 建議，由你決定要不要採用</li>
        </ul>
      </aside>

      {/* 右側：註冊表單 */}
      <main className="signup-panel">
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <h2 className="signup-title">建立帳號</h2>
          <p className="signup-subtitle">只需要幾個步驟就能開始</p>

          {/* 暱稱 */}
          <div className="signup-field">
            <label htmlFor="signup-name">暱稱</label>
            <input
              id="signup-name"
              type="text"
              placeholder="你想怎麼被稱呼？"
              autoComplete="nickname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "signup-input is-error" : "signup-input"}
            />
            {errors.name && (
              <span className="signup-error-text">{errors.name}</span>
            )}
          </div>

          {/* Email */}
          <div className="signup-field">
            <label htmlFor="signup-email">電子郵件</label>
            <input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={
                errors.email ? "signup-input is-error" : "signup-input"
              }
            />
            {errors.email && (
              <span className="signup-error-text">{errors.email}</span>
            )}
          </div>

          {/* 密碼 + 強度條 */}
          <div className="signup-field">
            <label htmlFor="signup-password">密碼</label>
            <div className="signup-password-wrap">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="至少 8 個字元"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={
                  errors.password ? "signup-input is-error" : "signup-input"
                }
              />
              <button
                type="button"
                className="signup-toggle-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "隱藏" : "顯示"}
              </button>
            </div>

            {/* 密碼有輸入才顯示強度條 */}
            {password && (
              <div className="signup-strength">
                <div className="signup-strength-bars">
                  {[1, 2, 3, 4].map((n) => (
                    <span
                      key={n}
                      className={
                        n <= strength.score
                          ? `signup-strength-bar is-${strength.level}`
                          : "signup-strength-bar"
                      }
                    />
                  ))}
                </div>
                <span className={`signup-strength-label is-${strength.level}`}>
                  密碼強度：{strength.label}
                </span>
              </div>
            )}

            {errors.password && (
              <span className="signup-error-text">{errors.password}</span>
            )}
          </div>

          {/* 確認密碼 */}
          <div className="signup-field">
            <label htmlFor="signup-confirm">確認密碼</label>
            <input
              id="signup-confirm"
              type={showPassword ? "text" : "password"}
              placeholder="再輸入一次密碼"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={
                errors.confirmPassword
                  ? "signup-input is-error"
                  : "signup-input"
              }
            />
            {errors.confirmPassword && (
              <span className="signup-error-text">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* 服務條款 */}
          <div className="signup-field">
            <label className="signup-checkbox">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span>我已閱讀並同意服務條款與隱私權政策</span>
            </label>
            {errors.agree && (
              <span className="signup-error-text">{errors.agree}</span>
            )}
          </div>

          <button type="submit" className="signup-submit" disabled={isLoading}>
            {isLoading ? "建立中..." : "建立帳號"}
          </button>

          <p className="signup-switch">
            已經有帳號了？
            <button
              type="button"
              className="signup-link-btn"
              onClick={onSwitchToLogin}
            >
              前往登入
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Signup;