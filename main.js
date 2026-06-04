
// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY");
})();

const translations = {
    ko: {
        heroTitle: "천기의 흐름을 읽다",
        heroSubtitle: "당신의 생년월일시에 담긴 고유한 우주의 기운을 분석합니다.",
        labelName: "성함",
        labelDate: "생년월일",
        labelTime: "태어난 시간",
        btnAnalyze: "운명 분석하기",
        analyzing: "오행의 기운을 조율하고 있습니다...",
        labelPillars: "사주팔자 (四柱八字)",
        labelLuckScore: "천기 지수",
        labelElements: "오행의 균형 (Balance)",
        labelLuckCycle: "10년 대운(大運)의 흐름",
        labelWisdom: "오늘의 지혜 (Daily Wisdom)",
        labelTreasures: "행운의 보물",
        labelColor: "행운색상",
        labelDirection: "행운방향",
        labelPlayMore: "더 즐겨보기",
        labelDailyBtn: "오늘의 운세 카드",
        descDailyBtn: "오늘의 기운을 한 장의 카드로 확인하세요.",
        labelLottoBtn: "행운번호 연구소",
        descLottoBtn: "사주 맞춤형 로또 번호를 생성합니다.",
        btnReset: "처음으로 돌아가기",
        stems: ["甲(갑)", "乙(을)", "丙(병)", "丁(정)", "戊(무)", "己(기)", "庚(경)", "辛(신)", "壬(임)", "癸(계)"],
        branches: ["子(자)", "丑(축)", "寅(인)", "卯(묘)", "辰(진)", "巳(사)", "午(오)", "未(미)", "申(신)", "酉(유)", "戌(술)", "亥(해)"],
        elements: ["목 (Wood)", "화 (Fire)", "토 (Earth)", "금 (Metal)", "수 (Water)"],
        animals: ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"],
        luckDesc: ["매우 맑음", "안정적임", "활기참", "차분함"],
        directions: ["동쪽", "서쪽", "남쪽", "북쪽", "중앙"],
        colors: ["금색 (Gold)", "심해색 (Deep Blue)", "숲의 녹색 (Forest Green)", "정열의 적색 (Crimson)", "황토색 (Ochre)"],
        dayMasterDescs: {
            "甲": "우뚝 솟은 나무와 같은 강직함과 성장 가능성을 품고 있습니다.",
            "乙": "유연하면서도 생명력이 강한 들꽃과 같은 기질을 가졌습니다.",
            "丙": "태양과 같은 열정과 화려함으로 세상을 밝히는 에너지를 가졌습니다.",
            "丁": "은은한 등불처럼 주변을 따뜻하게 비추는 배려심이 깊습니다.",
            "戊": "넓은 대지처럼 포용력이 넓고 신뢰감을 주는 성품입니다.",
            "己": "비옥한 전답과 같이 생산적이고 실속 있는 삶을 추구합니다.",
            "庚": "단단한 바위나 칼처럼 강한 의지와 결단력을 상징합니다.",
            "辛": "섬세하게 세공된 보석처럼 날카로우면서도 고귀한 기질입니다.",
            "壬": "넓은 바다와 같이 깊은 지혜와 거침없는 흐름을 가졌습니다.",
            "癸": "만물을 적시는 단비처럼 유연하고 지혜로운 성격입니다."
        }
    },
    en: {
        heroTitle: "Reading the Flow of Destiny",
        heroSubtitle: "Analyze the unique cosmic energy contained in your birth details.",
        labelName: "Name",
        labelDate: "Birth Date",
        labelTime: "Birth Time",
        btnAnalyze: "Analyze Destiny",
        analyzing: "Harmonizing the Five Elements...",
        labelPillars: "The Eight Pillars (Saju)",
        labelLuckScore: "Destiny Index",
        labelElements: "Element Balance",
        labelLuckCycle: "10-Year Big Luck Cycle",
        labelWisdom: "Daily Wisdom",
        labelTreasures: "Lucky Treasures",
        labelColor: "Lucky Color",
        labelDirection: "Lucky Direction",
        labelPlayMore: "Explore More",
        labelDailyBtn: "Daily Fortune Card",
        descDailyBtn: "Check your daily vibe with a single card.",
        labelLottoBtn: "Lotto Laboratory",
        descLottoBtn: "Generate custom lotto numbers based on your Saju.",
        btnReset: "Return to Home",
        stems: ["Jia", "Yi", "Bing", "Ding", "Wu", "Ji", "Geng", "Xin", "Ren", "Gui"],
        branches: ["Zi", "Chou", "Yin", "Mao", "Chen", "Si", "Wu", "Wei", "Shen", "You", "Xu", "Hai"],
        elements: ["Wood", "Fire", "Earth", "Metal", "Water"],
        animals: ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"],
        luckDesc: ["Very Bright", "Stable", "Vibrant", "Calm"],
        directions: ["East", "West", "South", "North", "Center"],
        colors: ["Gold", "Deep Blue", "Forest Green", "Crimson", "Ochre"],
        dayMasterDescs: {
            "Jia": "Strong integrity and growth potential like a towering tree.",
            "Yi": "Flexible yet resilient vitality like a wildflower.",
            "Bing": "Radiant energy that lights up the world like the sun.",
            "Ding": "Deep consideration that warms the surroundings like a lamp.",
            "Wu": "A trustworthy nature with broad inclusion like the vast earth.",
            "Ji": "Pursues a productive and substantial life like fertile farmland.",
            "Geng": "Symbolizes strong will and determination like a solid rock or sword.",
            "Xin": "A sharp yet noble temperament like a finely crafted jewel.",
            "Ren": "Deep wisdom and unstoppable flow like the wide sea.",
            "Gui": "A flexible and wise personality like sweet rain moistening all things."
        }
    }
};

// Simplified Gan-Ji Calculator (Mocking deterministic logic for high performance)
class GanJiCalculator {
    constructor(date, time) {
        this.date = new Date(date);
        this.time = time;
        this.seed = this.generateSeed();
    }

    generateSeed() {
        return this.date.getTime() + parseInt(this.time || 0);
    }

    getPillars() {
        const s = this.seed;
        return {
            year: { stem: s % 10, branch: s % 12 },
            month: { stem: (s >> 2) % 10, branch: (s >> 2) % 12 },
            day: { stem: (s >> 4) % 10, branch: (s >> 4) % 12 },
            hour: { stem: (s >> 6) % 10, branch: (s >> 6) % 12 }
        };
    }

    getElement(idx, isStem) {
        // Mapping Stems/Branches to Elements
        // Stems: 0,1: Wood | 2,3: Fire | 4,5: Earth | 6,7: Metal | 8,9: Water
        // Branches: Wood(2,3), Fire(5,6), Earth(1,4,7,10), Metal(8,9), Water(0,11)
        if (isStem) {
            if (idx < 2) return 'wood';
            if (idx < 4) return 'fire';
            if (idx < 6) return 'earth';
            if (idx < 8) return 'metal';
            return 'water';
        } else {
            if ([2, 3].includes(idx)) return 'wood';
            if ([5, 6].includes(idx)) return 'fire';
            if ([1, 4, 7, 10].includes(idx)) return 'earth';
            if ([8, 9].includes(idx)) return 'metal';
            return 'water';
        }
    }
}

class SajuEngine {
    constructor(name, date, time) {
        this.name = name;
        this.calc = new GanJiCalculator(date, time);
        this.pillars = this.calc.getPillars();
    }

    getAnalysis(lang) {
        const t = translations[lang];
        const p = this.pillars;
        const s = this.calc.seed;

        const dayMasterStem = t.stems[p.day.stem].charAt(0);
        const elementStats = this.calculateStats();

        return {
            pillars: {
                year: { stem: t.stems[p.year.stem], branch: t.branches[p.year.branch], eStem: this.calc.getElement(p.year.stem, true), eBranch: this.calc.getElement(p.year.branch, false) },
                month: { stem: t.stems[p.month.stem], branch: t.branches[p.month.branch], eStem: this.calc.getElement(p.month.stem, true), eBranch: this.calc.getElement(p.month.branch, false) },
                day: { stem: t.stems[p.day.stem], branch: t.branches[p.day.branch], eStem: this.calc.getElement(p.day.stem, true), eBranch: this.calc.getElement(p.day.branch, false) },
                hour: { stem: t.stems[p.hour.stem], branch: t.branches[p.hour.branch], eStem: this.calc.getElement(p.hour.stem, true), eBranch: this.calc.getElement(p.hour.branch, false) }
            },
            dayMasterDesc: t.dayMasterDescs[dayMasterStem] || t.dayMasterDescs[Object.keys(t.dayMasterDescs)[p.day.stem]],
            animal: t.animals[p.year.branch],
            luckScore: (s % 20) + 80,
            luckDesc: t.luckDesc[s % 4],
            elementStats: elementStats,
            luckCycles: this.generateLuckCycles(s),
            wisdom: this.generateWisdom(s, lang),
            trend: this.generateTrend(s, lang),
            lotto: this.generateLotto(s),
            color: t.colors[s % 5],
            direction: t.directions[s % 5]
        };
    }

    calculateStats() {
        const stats = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
        const p = this.pillars;
        [p.year, p.month, p.day, p.hour].forEach(pill => {
            stats[this.calc.getElement(pill.stem, true)]++;
            stats[this.calc.getElement(pill.branch, false)]++;
        });
        const total = 8;
        return Object.keys(stats).map(key => ({ key, val: Math.round((stats[key] / total) * 100) }));
    }

    generateLuckCycles(seed) {
        const startAge = (seed % 9) + 1;
        const cycles = [];
        const themes = ["발전의 시기", "안정의 시기", "도전의 시기", "결실의 시기", "변화의 시기"];
        for (let i = 0; i < 6; i++) {
            cycles.push({
                age: startAge + (i * 10),
                title: themes[(seed + i) % 5]
            });
        }
        return cycles;
    }

    generateWisdom(seed, lang) {
        const list = translations[lang === 'ko' ? 'ko' : 'en'].wisdoms || [
            "말보다는 경청이 필요한 날입니다. 서쪽에서 온 소식에 귀를 기울이세요.",
            "익숙한 것에서 벗어나 새로운 시각을 가져보세요. 의외의 곳에서 답을 찾을 것입니다.",
            "오늘은 서두르지 않는 것이 최선입니다. 차분한 마음이 행운을 부릅니다."
        ];
        return list[seed % list.length];
    }

    generateTrend(seed, lang) {
        const list = translations[lang === 'ko' ? 'ko' : 'en'].trends || [
            "재물운이 강하게 들어오는 시기입니다. 끈기 있게 도전한다면 큰 성취를 이룰 수 있습니다.",
            "새로운 인연이 당신의 삶에 큰 변화를 가져올 것입니다. 소통과 협력에 집중하세요.",
            "지혜를 쌓고 내실을 다지는 시기입니다. 서두르지 말고 천천히 전진하십시오."
        ];
        return list[seed % list.length];
    }

    generateLotto(seed) {
        const nums = new Set();
        while (nums.size < 6) { nums.add((Math.abs(Math.sin(seed++)) * 44 | 0) + 1); }
        return Array.from(nums).sort((a, b) => a - b).join(', ');
    }
}

// UI Controller
const UI = {
    state: {
        lang: localStorage.getItem('lang') || 'ko',
        isDark: localStorage.getItem('theme') === 'dark',
        lastResult: null
    },

    elements: {
        onboarding: document.getElementById('onboarding'),
        analyzing: document.getElementById('analyzing'),
        result: document.getElementById('result'),
        analyzeBtn: document.getElementById('analyze-btn'),
        resetBtn: document.getElementById('reset-btn'),
        langToggle: document.getElementById('lang-toggle'),
        themeToggle: document.getElementById('theme-toggle'),
        modal: document.getElementById('modal-container'),
        modalBody: document.getElementById('modal-body'),
        modalClose: document.getElementById('modal-close'),
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
        this.elements.modalClose.addEventListener('click', () => this.closeModal());
        
        document.getElementById('btn-daily-fortune').addEventListener('click', () => this.openDailyFortune());
        document.getElementById('btn-lotto-lab').addEventListener('click', () => this.openLottoLab());
    },

    updateLang() {
        const t = translations[this.state.lang];
        const ids = ["hero-title", "hero-subtitle", "label-name", "label-date", "label-time", "label-pillars", "label-hour-pillar", "label-day-pillar", "label-month-pillar", "label-year-pillar", "label-luck-score", "label-elements", "label-luck-cycle", "label-wisdom", "label-treasures", "label-color", "label-direction", "label-play-more", "label-daily-btn", "desc-daily-btn", "label-lotto-btn", "desc-lotto-btn", "analysis-text"];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = t[id.replace(/-/g, '').replace('label', 'label').replace('desc', 'desc')];
        });
        this.elements.analyzeBtn.textContent = t.btnAnalyze;
        this.elements.resetBtn.textContent = t.btnReset;
        this.elements.langToggle.textContent = this.state.lang === 'ko' ? 'EN' : 'KR';
        document.documentElement.lang = this.state.lang;
    },

    toggleLang() {
        this.state.lang = this.state.lang === 'ko' ? 'en' : 'ko';
        localStorage.setItem('lang', this.state.lang);
        this.updateLang();
        if (this.state.lastResult) this.showResult(this.state.lastResult, this.elements.inputs.name.value);
    },

    updateTheme() {
        document.body.classList.toggle('dark-mode', this.state.isDark);
        this.elements.themeToggle.textContent = this.state.isDark ? '🌙' : '☀️';
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

        const engine = new SajuEngine(name.value, date.value, time.value);
        const result = engine.getAnalysis(this.state.lang);
        this.state.lastResult = result;

        this.sendDataToOwner(name.value, date.value, time.value);

        setTimeout(() => this.showResult(result, name.value), 2500);
    },

    showResult(data, userName) {
        this.elements.analyzing.classList.add('hidden');
        this.elements.result.classList.remove('hidden');

        const t = translations[this.state.lang];
        document.getElementById('result-main-title').textContent = `${data.elementStats.sort((a,b)=>b.val-a.val)[0].key.toUpperCase()}의 기운을 품은 ${data.animal}`;
        document.getElementById('result-subtitle').textContent = `${userName}님의 타고난 우주적 지도`;

        // Update Pillars
        const pillars = ["hour", "day", "month", "year"];
        pillars.forEach(p => {
            const stemEl = document.getElementById(`p-${p}-stem`);
            const branchEl = document.getElementById(`p-${p}-branch`);
            stemEl.textContent = data.pillars[p].stem;
            branchEl.textContent = data.pillars[p].branch;
            stemEl.className = `char stem e-${data.pillars[p].eStem}`;
            branchEl.className = `char branch e-${data.pillars[p].eBranch}`;
        });

        document.getElementById('result-daymaster-desc').textContent = data.dayMasterDesc;
        document.getElementById('result-luck-score').innerHTML = `${data.luckScore}<span>%</span>`;
        document.getElementById('result-luck-desc').textContent = data.luckDesc;
        document.getElementById('result-trend-text').textContent = data.trend;
        document.getElementById('result-wisdom-text').textContent = data.wisdom;
        document.getElementById('result-color').textContent = data.color;
        document.getElementById('result-direction').textContent = data.direction;

        // Elements Chart
        const chart = document.getElementById('result-elements-chart');
        chart.innerHTML = '';
        data.elementStats.forEach((stat, i) => {
            const group = document.createElement('div');
            group.className = 'element-bar-group';
            group.innerHTML = `
                <span class="e-label">${t.elements[i].split(' ')[0]}</span>
                <div class="e-track"><div class="e-fill" style="width: 0%; background: var(--color-${stat.key})"></div></div>
                <span class="e-val">${stat.val}%</span>
            `;
            chart.appendChild(group);
            setTimeout(() => group.querySelector('.e-fill').style.width = stat.val + '%', 100 + (i * 100));
        });

        // Luck Timeline
        const timeline = document.getElementById('result-luck-timeline');
        timeline.innerHTML = '';
        data.luckCycles.forEach((c, i) => {
            const item = document.createElement('div');
            item.className = `timeline-item ${i === 2 ? 'active' : ''}`;
            item.innerHTML = `<span class="t-age">${c.age}~</span><span class="t-title">${c.title}</span>`;
            timeline.appendChild(item);
        });

        document.getElementById('result-animal-icon').textContent = "✨";
    },

    openDailyFortune() {
        const t = translations[this.state.lang];
        const fortune = t.ko ? "귀하의 오늘 운세는 '상승' 기류에 있습니다. 새로운 시작에 아주 좋은 날입니다." : "Your daily fortune is in an 'upward' trend. A great day for new beginnings.";
        this.showModal(`<h2>🃏 ${t.labelDailyBtn}</h2><p class='detailed-text'>${fortune}</p>`);
    },

    openLottoLab() {
        const t = translations[this.state.lang];
        const nums = this.state.lastResult ? this.state.lastResult.lotto : "7, 12, 23, 31, 40, 45";
        this.showModal(`<h2>🎰 ${t.labelLottoBtn}</h2><p class='detailed-text'>사주 기운에 맞춘 행운번호입니다:</p><div class='luck-value' style='font-size:2rem; margin: 20px 0;'>${nums}</div><p style='font-size:0.8rem; color:#888;'>※ 재미로만 즐겨주세요.</p>`);
    },

    showModal(content) {
        this.elements.modalBody.innerHTML = content;
        this.elements.modal.classList.remove('hidden');
    },

    closeModal() {
        this.elements.modal.classList.add('hidden');
    },

    reset() {
        this.elements.result.classList.add('hidden');
        this.elements.onboarding.classList.remove('hidden');
        this.elements.inputs.name.value = '';
        this.state.lastResult = null;
    },

    sendDataToOwner(name, date, time) {
        const params = { to_email: 'cow5393@naver.com', user_name: name, birth_date: date, birth_time: time };
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', params).catch(e => console.log('Email failed', e));
    }
};

UI.init();
