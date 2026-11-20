import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero">
      {/* 背景裝飾光暈 */}
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__content">
        {/* 主標題 */}
        <h1 className="hero__title">讓 AI 幫你剪輯影片</h1>

        {/* 副標題（以兩行呈現） */}
        <p className="hero__subtitle">
          智慧剪輯每個瞬間，<br />
          精彩呈現每個畫面。
        </p>

        {/* 立即開始按鈕 */}
        <button className="hero__cta-btn">
          立即開始 →
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
