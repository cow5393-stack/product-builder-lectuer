
const translations = {
    ko: {
        heroTitle: "천기의 흐름을 읽다",
        heroSubtitle: "당신의 생년월일시에 담긴 고유한 우주의 기운을 분석합니다.",
        labelName: "성함",
        labelDate: "생년월일",
        labelTime: "태어난 시간",
        btnAnalyze: "운명 분석하기",
        analyzing: "오행의 기운을 조율하고 있습니다...",
        labelLuckScore: "천기 지수",
        labelElements: "오행의 균형",
        labelTrend: "향후 10년 대운의 흐름",
        labelWisdom: "오늘의 지혜",
        labelTreasures: "행운의 보물",
        labelLotto: "행운번호",
        labelColor: "행운색상",
        btnReset: "다시 분석하기",
        elements: ["목 (Wood)", "화 (Fire)", "토 (Earth)", "금 (Metal)", "수 (Water)"],
        animals: ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"],
        luckDesc: ["매우 맑음", "안정적임", "활기참", "차분함"],
        trends: [
            "재물운이 강하게 들어오는 시기입니다. 끈기 있게 도전한다면 큰 성취를 이룰 수 있습니다.",
            "새로운 인연이 당신의 삶에 큰 변화를 가져올 것입니다. 소통과 협력에 집중하세요.",
            "지혜를 쌓고 내실을 다지는 시기입니다. 서두르지 말고 천천히 전진하십시오.",
            "명예와 지위가 상승하는 기운이 있습니다. 당신의 능력을 세상에 펼칠 기회가 올 것입니다."
        ],
        wisdoms: [
            "말보다는 경청이 필요한 날입니다. 서쪽에서 온 소식에 귀를 기울이세요.",
            "익숙한 것에서 벗어나 새로운 시각을 가져보세요. 의외의 곳에서 답을 찾을 것입니다.",
            "오늘은 서두르지 않는 것이 최선입니다. 차분한 마음이 행운을 부릅니다.",
            "주변 사람들에게 따뜻한 말 한마디를 건네보세요. 그 선행이 복이 되어 돌아옵니다."
        ],
        colors: ["금색 (Gold)", "심해색 (Deep Blue)", "숲의 녹색 (Forest Green)", "정열의 적색 (Crimson)"]
    },
    en: {
        heroTitle: "Reading the Flow of Destiny",
        heroSubtitle: "Analyze the unique cosmic energy contained in your birth details.",
        labelName: "Name",
        labelDate: "Birth Date",
        labelTime: "Birth Time",
        btnAnalyze: "Analyze Destiny",
        analyzing: "Harmonizing the Five Elements...",
        labelLuckScore: "Destiny Index",
        labelElements: "Element Balance",
        labelTrend: "10-Year Big Luck Trend",
        labelWisdom: "Daily Wisdom",
        labelTreasures: "Lucky Treasures",
        labelLotto: "Lucky Numbers",
        labelColor: "Lucky Color",
        btnReset: "Analyze Again",
        elements: ["Wood", "Fire", "Earth", "Metal", "Water"],
        animals: ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"],
        luckDesc: ["Very Bright", "Stable", "Vibrant", "Calm"],
        trends: [
            "A period of strong wealth luck. Persistence will lead to significant achievements.",
            "New connections will bring major changes. Focus on communication and collaboration.",
            "A time for gaining wisdom and strengthening your inner self. Proceed slowly.",
            "Your honor and status are on the rise. An opportunity to show your talents will arrive."
        ],
        wisdoms: [
            "A day for listening rather than speaking. Pay attention to news from the West.",
            "Break away from the familiar. You will find answers in unexpected places.",
            "Patience is your best strategy today. A calm mind attracts good luck.",
            "Offer a warm word to those around you. Kindness will return as a blessing."
        ],
        colors: ["Gold", "Deep Blue", "Forest Green", "Crimson"]
    }
};

class SajuEngine {
    constructor(seed) {
        this.seed = this.hashString(seed);
    }

    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return Math.abs(hash);
    }

    getAnalysis(lang) {
        const t = translations[lang];
        const elementIdx = this.seed % 5;
        const animalIdx = this.seed % 12;
        const luckIdx = this.seed % 4;
        const trendIdx = (this.seed >> 2) % 4;
        const wisdomIdx = (this.seed >> 4) % 4;
        const colorIdx = (this.seed >> 6) % 4;

        return {
            element: t.elements[elementIdx],
            elementKey: ['wood', 'fire', 'earth', 'metal', 'water'][elementIdx],
            animal: t.animals[animalIdx],
            luckScore: (this.seed % 25) + 75,
            luckDesc: t.luckDesc[luckIdx],
            trend: t.trends[trendIdx],
            wisdom: t.wisdoms[wisdomIdx],
            color: t.colors[colorIdx],
            lotto: this.generateLotto(this.seed),
            elementStats: this.generateElementStats(this.seed)
        };
    }

    generateLotto(seed) {
        const numbers = new Set();
        let i = 0;
        while (numbers.size < 6) {
            const n = ((seed >> i) % 45) + 1;
            numbers.add(n);
            i++;
        }
        return Array.from(numbers).sort((a, b) => a - b).join(', ');
    }

    generateElementStats(seed) {
        const stats = [];
        const keys = ['wood', 'fire', 'earth', 'metal', 'water'];
        let total = 0;
        for (let i = 0; i < 5; i++) {
            const val = ((seed >> (i * 2)) % 50) + 10;
            stats.push(val);
            total += val;
        }
        return stats.map((v, i) => ({ key: keys[i], val: Math.round((v / total) * 100) }));
    }
}

// UI Controller
const UI = {
    state: {
        lang: localStorage.getItem('lang') || 'ko',
        isDark: localStorage.getItem('theme') === 'dark'
    },

    elements: {
        onboarding: document.getElementById('onboarding'),
        analyzing: document.getElementById('analyzing'),
        result: document.getElementById('result'),
        analyzeBtn: document.getElementById('analyze-btn'),
        resetBtn: document.getElementById('reset-btn'),
        langToggle: document.getElementById('lang-toggle'),
        themeToggle: document.getElementById('theme-toggle'),
        inputs: {
            name: document.getElementById('user-name'),
            date: document.getElementById('birth-date'),
            time: document.getElementById('birth-time')
        }
    },

    init() {
        this.updateTheme();
        this.updateLang();
        this.bindEvents();
    },

    bindEvents() {
        this.elements.analyzeBtn.addEventListener('click', () => this.startAnalysis());
        this.elements.resetBtn.addEventListener('click', () => this.reset());
        this.elements.langToggle.addEventListener('click', () => this.toggleLang());
        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
    },

    updateLang() {
        const t = translations[this.state.lang];
        document.getElementById('hero-title').textContent = t.heroTitle;
        document.getElementById('hero-subtitle').textContent = t.heroSubtitle;
        document.getElementById('label-name').textContent = t.labelName;
        document.getElementById('label-date').textContent = t.labelDate;
        document.getElementById('label-time').textContent = t.labelTime;
        this.elements.analyzeBtn.textContent = t.btnAnalyze;
        document.getElementById('analysis-text').textContent = t.analyzing;
        document.getElementById('label-luck-score').textContent = t.labelLuckScore;
        document.getElementById('label-elements').textContent = t.labelElements;
        document.getElementById('label-trend').textContent = t.labelTrend;
        document.getElementById('label-wisdom').textContent = t.labelWisdom;
        document.getElementById('label-treasures').textContent = t.labelTreasures;
        document.getElementById('label-lotto').textContent = t.labelLotto;
        document.getElementById('label-color').textContent = t.labelColor;
        this.elements.resetBtn.textContent = t.btnReset;
        this.elements.langToggle.textContent = this.state.lang === 'ko' ? 'EN' : 'KR';
        document.documentElement.lang = this.state.lang;
    },

    toggleLang() {
        this.state.lang = this.state.lang === 'ko' ? 'en' : 'ko';
        localStorage.setItem('lang', this.state.lang);
        this.updateLang();
    },

    updateTheme() {
        if (this.state.isDark) {
            document.body.classList.add('dark-mode');
            this.elements.themeToggle.textContent = '🌙';
        } else {
            document.body.classList.remove('dark-mode');
            this.elements.themeToggle.textContent = '☀️';
        }
    },

    toggleTheme() {
        this.state.isDark = !this.state.isDark;
        localStorage.setItem('theme', this.state.isDark ? 'dark' : 'light');
        this.updateTheme();
    },

    startAnalysis() {
        const { name, date, time } = this.elements.inputs;
        if (!name.value || !date.value) {
            alert(this.state.lang === 'ko' ? "이름과 생년월일을 입력해주세요." : "Please enter your name and birth date.");
            return;
        }

        this.elements.onboarding.classList.add('hidden');
        this.elements.analyzing.classList.remove('hidden');

        const engine = new SajuEngine(name.value + date.value + time.value);
        const result = engine.getAnalysis(this.state.lang);

        setTimeout(() => {
            this.showResult(result, name.value);
        }, 2500);
    },

    showResult(data, userName) {
        this.elements.analyzing.classList.add('hidden');
        this.elements.result.classList.remove('hidden');

        // Update DOM
        const titleSuffix = this.state.lang === 'ko' ? "의 기운을 품은 " : " energy-imbued ";
        document.getElementById('result-title').textContent = `${data.element}${titleSuffix}${data.animal}`;
        
        const nameSuffix = this.state.lang === 'ko' ? "님의 타고난 기질" : "'s innate nature";
        document.getElementById('result-name-tag').textContent = `${userName}${nameSuffix}`;
        
        document.getElementById('result-luck-score').innerHTML = `${data.luckScore}<span>%</span>`;
        document.getElementById('result-luck-desc').textContent = data.luckDesc;
        document.getElementById('result-trend-text').textContent = data.trend;
        document.getElementById('result-wisdom-text').textContent = data.wisdom;
        document.getElementById('result-lotto').textContent = data.lotto;
        document.getElementById('result-color').textContent = data.color;

        // Elements Chart
        const chart = document.getElementById('result-elements-chart');
        chart.innerHTML = '';
        const t = translations[this.state.lang];
        data.elementStats.forEach((stat, i) => {
            const group = document.createElement('div');
            group.className = 'element-bar-group';
            group.innerHTML = `
                <span class="e-label">${t.elements[i].split(' ')[0]}</span>
                <div class="e-track"><div class="e-fill" style="width: 0%; background: var(--color-${stat.key})"></div></div>
                <span class="e-val">${stat.val}%</span>
            `;
            chart.appendChild(group);
            setTimeout(() => {
                group.querySelector('.e-fill').style.width = stat.val + '%';
            }, 100 + (i * 100));
        });

        // Animal Avatar SVG
        document.getElementById('result-animal-icon').innerHTML = this.getAnimalSVG(data.animal);
    },

    reset() {
        this.elements.result.classList.add('hidden');
        this.elements.onboarding.classList.remove('hidden');
        this.elements.inputs.name.value = '';
    },

    getAnimalSVG(animal) {
        // Simplified abstract animal icon representation using CSS shapes/Simple SVG
        return `
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v4l3 3"></path>
                <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="8" fill="currentColor" stroke="none" style="font-family:serif">★</text>
            </svg>
        `;
    }
};

UI.init();
