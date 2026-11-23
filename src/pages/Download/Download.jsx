import { useState } from 'react';
import './Download.css';

/* ============================================================
   假資料區：之後有真正的安裝檔、版本號、檔案大小時，只要改這裡
   想新增 Linux 版？照格式多加一個物件，並在 DOWNLOADS 裡加一個 key 即可
   ============================================================ */
const DOWNLOADS = {
  windows: {
    label: 'Windows',
    icon: '🪟',
    version: '1.0.0',
    size: '約 180 MB',
    fileName: 'AI-Vlog-Maker-Setup.exe',
    requirements: [
      '作業系統：Windows 10（64 位元）或更新版本',
      '處理器：Intel Core i5 / AMD Ryzen 5 以上',
      '記憶體：8 GB RAM 以上（建議 16 GB）',
      '硬碟空間：至少 2 GB 可用空間',
    ],
    steps: [
      '下載安裝檔 AI-Vlog-Maker-Setup.exe',
      '雙擊安裝檔，依照畫面指示完成安裝',
      '從桌面或開始選單開啟 AI Vlog Maker',
    ],
  },
  mac: {
    label: 'macOS',
    icon: '🍎',
    version: '1.0.0',
    size: '約 200 MB',
    fileName: 'AI-Vlog-Maker.dmg',
    requirements: [
      '作業系統：macOS 12 Monterey 或更新版本',
      '處理器：Apple Silicon（M1 以上）或 Intel Core i5 以上',
      '記憶體：8 GB RAM 以上（建議 16 GB）',
      '硬碟空間：至少 2 GB 可用空間',
    ],
    steps: [
      '下載磁碟映像檔 AI-Vlog-Maker.dmg',
      '開啟檔案，把 AI Vlog Maker 拖曳到「應用程式」資料夾',
      '從應用程式資料夾開啟 AI Vlog Maker',
    ],
  },
};

// 產品賣點（文案請依你們組實際功能調整）
const HIGHLIGHTS = [
  {
    icon: '🔒',
    title: '檔案留在你的電腦',
    text: '素材與專案都存在本機，不需要先上傳雲端。',
  },
  {
    icon: '⚡',
    title: '開啟即剪',
    text: '免去等待上傳與下載，打開軟體就能開始剪輯。',
  },
  {
    icon: '🤖',
    title: 'AI 輔助剪輯',
    text: '自動字幕、贅詞偵測等功能，幫你省下重複的工作。',
  },
];

// 常見問題（答案是示範文字，請依實際情況修改）
const FAQS = [
  {
    question: '需要付費嗎？',
    answer: '這裡之後填入你們的價格方案說明，詳細內容可以查看「價格方案」。',
  },
  {
    question: '安裝後需要連網嗎？',
    answer: '這裡之後填入哪些功能需要網路、哪些可以離線使用。',
  },
  {
    question: '我的影片會被上傳嗎？',
    answer: '這裡之後填入你們的隱私與資料處理說明。',
  },
];

/* ============================================================
   工具函式：偵測使用者的作業系統，用來預設選哪個分頁
   ============================================================ */
function detectOS() {
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) return 'windows';
  if (/Macintosh|Mac OS X/i.test(ua)) return 'mac';
  return 'windows'; // 偵測不到就預設 Windows
}

/* ============================================================
   子元件 1：作業系統切換分頁
   props：
     options  → DOWNLOADS 物件，用來產生每個分頁
     selected → 目前選中的 key（'windows' / 'mac'）
     onSelect → 點擊分頁時呼叫，把 key 傳回父元件
   ============================================================ */
function OsTabs({ options, selected, onSelect }) {
  return (
    <div className="download__tabs" role="tablist">
      {Object.entries(options).map(([key, data]) => (
        <button
          key={key}
          role="tab"
          aria-selected={selected === key}
          className={`download__tab ${selected === key ? 'download__tab--active' : ''}`}
          onClick={() => onSelect(key)}
        >
          <span aria-hidden="true">{data.icon}</span> {data.label}
        </button>
      ))}
    </div>
  );
}

/* ============================================================
   子元件 2：清單區塊（系統需求、安裝步驟都共用它）
   props：
     title   → 區塊標題
     items   → 字串陣列
     ordered → true 時用數字編號清單 <ol>，否則用 <ul>
   ============================================================ */
function InfoList({ title, items, ordered = false }) {
  const ListTag = ordered ? 'ol' : 'ul';

  return (
    <div className="download__info">
      <h3 className="download__info-title">{title}</h3>
      <ListTag className="download__info-list">
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    </div>
  );
}

/* ============================================================
   子元件 3：常見問題的單一項目（展開 / 收合）
   props：
     question / answer → 問題與答案文字
     isOpen            → 這一題目前是不是展開的
     onToggle          → 點擊標題時呼叫
   開關狀態放在父元件，才能做到「一次只展開一題」
   ============================================================ */
function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="download__faq-item">
      <button
        className="download__faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span
          className={`download__faq-arrow ${isOpen ? 'download__faq-arrow--open' : ''}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      {isOpen && <p className="download__faq-answer">{answer}</p>}
    </div>
  );
}

/* ============================================================
   主元件：下載頁面
   ============================================================ */
function Download() {
  // 目前選的作業系統。傳「函式」給 useState，只會在第一次 render 執行一次偵測
  const [selectedOS, setSelectedOS] = useState(detectOS);

  // 目前展開的 FAQ 編號，null 代表全部收合
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // 按下下載後的短暫回饋狀態
  const [isDownloading, setIsDownloading] = useState(false);

  // 衍生資料：由 selectedOS 直接算出來，不需要另外用 state 存
  const current = DOWNLOADS[selectedOS];

  const handleDownload = () => {
    setIsDownloading(true);

    // TODO：有真正的安裝檔後，在這裡觸發下載，例如：
    //   window.location.href = current.url;
    // 或把按鈕改成 <a href={current.url} download>
    setTimeout(() => setIsDownloading(false), 2500);
  };

  const handleToggleFaq = index => {
    // 點已展開的那題 → 收合；點別題 → 展開那題
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  return (
    // id="download" 讓 Navbar 的 href="#download" 可以捲動到這裡
    <section className="download" id="download">
      <div className="download__inner">

        {/* 標題區 */}
        <header className="download__header">
          <h2 className="download__title">下載 AI Vlog Maker</h2>
          <p className="download__subtitle">
            安裝到你的電腦，隨時開始剪輯你的 Vlog
          </p>
        </header>

        {/* 下載卡片 */}
        <div className="download__card">
          <OsTabs
            options={DOWNLOADS}
            selected={selectedOS}
            onSelect={setSelectedOS}
          />

          <div className="download__main">
            <div className="download__os-icon" aria-hidden="true">
              {current.icon}
            </div>
            <p className="download__file-name">{current.fileName}</p>
            <p className="download__meta">
              版本 {current.version} · {current.size}
            </p>

            <button
              className="download__btn"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? '已開始下載…' : `下載 ${current.label} 版`}
            </button>
          </div>

          <div className="download__details">
            <InfoList title="系統需求" items={current.requirements} />
            <InfoList title="安裝步驟" items={current.steps} ordered />
          </div>
        </div>

        {/* 產品賣點 */}
        <ul className="download__highlights">
          {HIGHLIGHTS.map(item => (
            <li key={item.title} className="download__highlight">
              <span className="download__highlight-icon" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="download__highlight-title">{item.title}</h3>
              <p className="download__highlight-text">{item.text}</p>
            </li>
          ))}
        </ul>

        {/* 常見問題 */}
        <div className="download__faq">
          <h3 className="download__faq-title">常見問題</h3>
          {FAQS.map((faq, index) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFaqIndex === index}
              onToggle={() => handleToggleFaq(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Download;