
const translations = {
    ko: {
        title: "스마트 로또 번호 생성기",
        subtitle: "당신의 행운이 클릭 한 번으로 시작됩니다.",
        generate: "번호 생성하기",
        gauge: "오늘의 행운 지수:",
        tipsTitle: "로또 당첨 팁",
        tips: [
            "과거 당첨 번호의 빈도를 분석해 보세요.",
            "연속된 번호 선택은 가급적 피하는 것이 좋습니다.",
            "홀수와 짝수의 균형을 맞춰보세요.",
            "나만의 특별한 숫자를 포함시켜 보세요."
        ],
        aboutTitle: "왜 Lotto Pro인가요?",
        aboutText: "우리는 진정한 무작위성을 보장하는 고품질 알고리즘을 통해 당신의 당첨 확률을 높이는 데 도움을 줍니다.",
        quotes: [
            "오늘 당신의 운세가 매우 밝습니다!",
            "작은 시도가 큰 행운으로 돌아옵니다.",
            "이 번호들이 당신을 경제적 자유로 인도할 것입니다.",
            "긍정적인 생각이 행운을 부릅니다.",
            "당신은 오늘 충분히 당첨될 자격이 있습니다."
        ],
        fortuneLabels: {
            overall: "전체 행운",
            wealth: "재물 기운",
            direction: "행운의 방향",
            color: "행운의 색상"
        },
        directions: ["동쪽", "서쪽", "남쪽", "북쪽", "북동쪽", "남서쪽"],
        colors: ["금색", "은색", "빨간색", "파란색", "초록색", "보라색"],
        analyzing: "당신의 행운을 분석하는 중...",
        privacy: "개인정보처리방침",
        terms: "이용약관"
    },
    en: {
        title: "Lotto Number Generator Pro",
        subtitle: "Your lucky numbers are just a click away.",
        generate: "Generate Numbers",
        gauge: "Luck Potential:",
        tipsTitle: "Lotto Winning Tips",
        tips: [
            "Analyze frequency of past winning numbers.",
            "Avoid choosing only consecutive numbers.",
            "Balance even and odd numbers for better odds.",
            "Include your own special numbers."
        ],
        aboutTitle: "Why Lotto Pro?",
        aboutText: "We provide a high-quality random number generation algorithm that ensures fair and truly random results.",
        quotes: [
            "Your fortune looks very bright today!",
            "Small attempts lead to big luck.",
            "May these numbers lead you to freedom.",
            "Positive thoughts attract good luck.",
            "You deserve a big win today."
        ],
        fortuneLabels: {
            overall: "Overall Luck",
            wealth: "Wealth Energy",
            direction: "Lucky Direction",
            color: "Lucky Color"
        },
        directions: ["East", "West", "South", "North", "Northeast", "Southwest"],
        colors: ["Gold", "Silver", "Red", "Blue", "Green", "Purple"],
        analyzing: "Analyzing your luck...",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
    }
};

class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        const delay = this.getAttribute('delay') || '0s';
        const color = this.getColor(number);

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 60px;
                    height: 60px;
                    opacity: 0;
                    animation: dropIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                    animation-delay: ${delay};
                }
                .ball {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    color: white;
                    font-weight: bold;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    background-color: ${color};
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
                }
                @keyframes dropIn {
                    0% { transform: translateY(-50px) scale(0); opacity: 0; }
                    60% { transform: translateY(10px) scale(1.1); }
                    100% { transform: translateY(0) scale(1); opacity: 1; }
                }
            </style>
            <div class="ball">${number}</div>
        `;
    }

    getColor(number) {
        const value = parseInt(number);
        if (value <= 10) return '#fbc400'; // Yellow
        if (value <= 20) return '#69c8f2'; // Blue
        if (value <= 30) return '#ff7272'; // Red
        if (value <= 40) return '#aaa'; // Gray
        return '#b0d840'; // Green
    }
}

customElements.define('lotto-ball', LottoBall);

// DOM Elements
const generateButton = document.getElementById('generate-button');
const lottoNumbersContainer = document.getElementById('lotto-numbers');
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');
const luckyQuote = document.getElementById('lucky-quote');
const luckGaugeContainer = document.getElementById('luck-gauge-container');
const gaugeFill = document.getElementById('gauge-fill');
const body = document.body;

// State
let currentLang = localStorage.getItem('lang') || 'ko';

// Update UI Text
function updateLanguage() {
    const t = translations[currentLang];
    document.getElementById('main-title').textContent = t.title;
    document.getElementById('sub-title').textContent = t.subtitle;
    generateButton.textContent = t.generate;
    document.getElementById('gauge-label').textContent = t.gauge;
    document.getElementById('tips-title').textContent = t.tipsTitle;
    document.getElementById('about-title').textContent = t.aboutTitle;
    document.getElementById('about-text').textContent = t.aboutText;
    document.getElementById('privacy-link').textContent = t.privacy;
    document.getElementById('terms-link').textContent = t.terms;
    
    const tipsList = document.getElementById('tips-list');
    tipsList.innerHTML = '';
    t.tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });

    langToggle.textContent = currentLang === 'ko' ? 'EN' : 'KR';
    document.documentElement.lang = currentLang;
}

// Initial Setup
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '🌙';
}
updateLanguage();

// Events
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    localStorage.setItem('lang', currentLang);
    updateLanguage();
});

function generateDetailedFortune() {
    const t = translations[currentLang];
    const detailsContainer = document.getElementById('fortune-details');
    detailsContainer.innerHTML = '';

    const categories = [
        { label: t.fortuneLabels.overall, value: Math.floor(Math.random() * 20) + 80 + '%' },
        { label: t.fortuneLabels.wealth, value: ['★ ★ ★ ★ ★', '★ ★ ★ ★', '★ ★ ★'][Math.floor(Math.random() * 3)] },
        { label: t.fortuneLabels.direction, value: t.directions[Math.floor(Math.random() * t.directions.length)] },
        { label: t.fortuneLabels.color, value: t.colors[Math.floor(Math.random() * t.colors.length)] }
    ];

    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'fortune-item';
        item.innerHTML = `
            <span class="label">${cat.label}</span>
            <span class="value">${cat.value}</span>
        `;
        detailsContainer.appendChild(item);
    });
}

generateButton.addEventListener('click', () => {
    const t = translations[currentLang];
    
    // UI Reset & Analysis State
    lottoNumbersContainer.innerHTML = '';
    luckGaugeContainer.classList.add('hidden');
    luckyQuote.innerHTML = `<span class="analyzing-text">${t.analyzing}</span>`;
    luckyQuote.style.opacity = 1;
    generateButton.disabled = true;

    // Simulate analysis delay
    setTimeout(() => {
        generateButton.disabled = false;
        luckGaugeContainer.classList.remove('hidden');
        
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        // Staggered display
        sortedNumbers.forEach((number, index) => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            lottoBall.setAttribute('delay', `${index * 0.15}s`);
            lottoNumbersContainer.appendChild(lottoBall);
        });

        // Lucky Quote
        const quotes = t.quotes;
        luckyQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
        
        // Detailed Fortune
        generateDetailedFortune();

        // Luck Gauge
        const luckValue = Math.floor(Math.random() * 30) + 70; // 70-100%
        gaugeFill.style.width = '0%';
        setTimeout(() => {
            gaugeFill.style.width = `${luckValue}%`;
        }, 100);
    }, 1500);
});
