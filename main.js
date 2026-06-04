
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
        labelPillars: "사주팔자 (四柱八字) 원국",
        labelPersonality: "성격 및 타고난 기질 (Personality)",
        labelWealthCareer: "재물운 및 직업적 성취 (Wealth & Career)",
        labelLuckScore: "천기 지수 (Destiny Index)",
        labelElements: "오행의 균형 분석",
        labelLuckCycle: "생애 주기별 대운(大運)의 흐름",
        labelWisdom: "인생의 지혜 및 종합 조언",
        labelTreasures: "당신을 돕는 귀한 보물",
        labelColor: "행운의 색상",
        labelDirection: "행운의 방향",
        labelLuckyItem: "행운의 아이템",
        labelPlayMore: "행운의 여정 더 즐기기",
        labelDailyBtn: "오늘의 비책 카드",
        descDailyBtn: "오늘 하루의 기운을 다스리는 비법.",
        labelLottoBtn: "천기누설 로또번호",
        descLottoBtn: "당신의 기운이 가장 강한 숫자의 조합.",
        btnReset: "처음 화면으로 돌아가기",
        stems: ["甲(갑)", "乙(을)", "丙(병)", "丁(정)", "戊(무)", "己(기)", "庚(경)", "辛(신)", "壬(임)", "癸(계)"],
        branches: ["子(자)", "丑(축)", "寅(인)", "卯(묘)", "辰(진)", "巳(사)", "午(오)", "未(미)", "申(신)", "酉(유)", "戌(술)", "亥(해)"],
        elements: ["목 (Wood)", "화 (Fire)", "토 (Earth)", "금 (Metal)", "수 (Water)"],
        animals: ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"],
        luckDesc: ["매우 맑음", "안정적임", "활기참", "차분함"],
        directions: ["동쪽", "서쪽", "남쪽", "북쪽", "중앙"],
        colors: ["금색 (Gold)", "심해색 (Deep Blue)", "숲의 녹색 (Forest Green)", "정열의 적색 (Crimson)", "황토색 (Ochre)"],
        items: ["청동 거울", "수정 원석", "나무 조각상", "붉은 실 팔찌", "황금 동전"]
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
        labelPersonality: "Core Nature & Personality",
        labelWealthCareer: "Wealth & Professional Success",
        labelLuckScore: "Destiny Index",
        labelElements: "Element Balance Analysis",
        labelLuckCycle: "10-Year Big Luck Cycle Flow",
        labelWisdom: "Life Wisdom & Comprehensive Advice",
        labelTreasures: "Precious Treasures Helping You",
        labelColor: "Lucky Color",
        labelDirection: "Lucky Direction",
        labelLuckyItem: "Lucky Item",
        labelPlayMore: "Explore More Journeys",
        labelDailyBtn: "Daily Secret Card",
        descDailyBtn: "The secret to governing your daily energy.",
        labelLottoBtn: "Heavenly Lotto Numbers",
        descLottoBtn: "Combination of numbers where your energy is strongest.",
        btnReset: "Return to Home Screen",
        stems: ["Jia", "Yi", "Bing", "Ding", "Wu", "Ji", "Geng", "Xin", "Ren", "Gui"],
        branches: ["Zi", "Chou", "Yin", "Mao", "Chen", "Si", "Wu", "Wei", "Shen", "You", "Xu", "Hai"],
        elements: ["Wood", "Fire", "Earth", "Metal", "Water"],
        animals: ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"],
        luckDesc: ["Very Bright", "Stable", "Vibrant", "Calm"],
        directions: ["East", "West", "South", "North", "Center"],
        colors: ["Gold", "Deep Blue", "Forest Green", "Crimson", "Ochre"],
        items: ["Bronze Mirror", "Crystal Stone", "Wood Carving", "Red Thread Bracelet", "Gold Coin"]
    }
};

// Comprehensive 60 Il-ju Library
const ILJU_DATA = {
    "甲子": { animal: "쥐", color: "푸른", icon: "🐭", tagline: "뿌리 깊은 나무가 지혜의 샘물을 만난 형상", personality: "갑자일주는 지혜롭고 학문적 소질이 뛰어납니다. 갑목(甲木)의 강직함과 자수(子水)의 유연한 지혜가 만나, 겉으로는 리더십이 있으면서도 내면은 매우 섬세하고 사려 깊은 성품을 가졌습니다. 이상이 높고 도덕성을 중시하여 주변의 존경을 받지만, 때로는 지나친 완벽주의로 인해 스스로를 힘들게 할 수 있습니다. <br><br> 당신은 타고난 선비 기질을 가지고 있어, 세속적인 이익보다는 명예와 가치를 추구할 때 더욱 빛이 납니다. 사람들을 포용하는 능력이 좋으며, 위기의 순간에도 당황하지 않고 지혜로운 해법을 제시하는 능력이 탁월합니다.", wealth: "재물운에 있어서는 갑자일주는 '서서히 차오르는 샘물'과 같습니다. 일확천금보다는 꾸준한 노력과 지식을 바탕으로 자산을 축적하는 능력이 좋습니다. 문서운(부동산, 자격증, 저작권)이 강하므로 현금보다는 가치가 변하지 않는 자산에 투자하는 것이 유리합니다. <br><br> 중년 이후에는 그동안 쌓아온 인덕과 지혜가 결실을 맺어 경제적으로 매우 안정된 삶을 누리게 됩니다. 다만, 남을 돕는 일에 돈을 아끼지 않는 성향이 있어 계획적인 관리가 필요합니다.", career: "전문직, 교육, 연구분야에서 큰 성공을 거둘 수 있습니다. 당신의 깊은 통찰력은 기획이나 컨설팅 분야에서도 빛을 발합니다. 조직 내에서는 핵심적인 전략가 역할을 수행하며, 독립적인 라이선스를 활용한 전문 비즈니스도 매우 적합합니다.", advice: "나무는 물이 너무 많으면 뿌리가 썩기 쉽습니다. 생각만 하기보다는 작은 일이라도 즉시 실천에 옮기는 습관을 기르세요. '비움'과 '채움'의 조화를 이루는 것이 인생의 큰 행운을 부르는 열쇠입니다." },
    "丙午": { animal: "말", color: "붉은", icon: "🐴", tagline: "한여름 대낮의 태양이 드넓은 초원을 달리는 형상", personality: "병오일주는 폭발적인 에너지와 열정의 상징입니다. 60갑자 중 가장 강렬한 기운을 가진 일주 중 하나로, 정직하고 화끈하며 뒤끝이 없는 대인배 스타일입니다. 자신의 감정을 숨기지 못하며, 불의를 보면 참지 못하는 정의로운 성품을 가졌습니다. <br><br> 당신은 어디에 있든 주인공이 되는 화려한 존재감을 가졌습니다. 리더십이 강력하여 사람들을 이끄는 능력이 탁월하지만, 가끔은 자신의 강한 기운 때문에 주변 사람들이 부담을 느낄 수 있습니다. 자신감을 낮추고 타인의 의견에 귀를 기울인다면 천하를 얻을 기질입니다.", wealth: "재물운은 '밀물과 썰물'처럼 역동적입니다. 큰돈을 버는 능력이 뛰어나며, 추진력이 좋아 사업적으로 성공할 확률이 매우 높습니다. 하지만 지출 또한 화끈하여 관리가 쉽지 않을 수 있습니다. <br><br> 재물을 지키기 위해서는 신뢰할 수 있는 파트너나 배우자에게 자산 관리를 맡기는 것도 좋은 방법입니다. 중년 이후에는 명예가 재물을 불러오는 형국이므로, 품위를 유지하고 신의를 지키는 것이 곧 부의 축적입니다.", career: "정치, 연예, 방송, 대규모 사업, 스포츠 분야에서 두각을 나타냅니다. 남 밑에서 일하기보다는 스스로를 증명할 수 있는 독립적인 분야나 권한이 큰 관리직이 적합합니다.", advice: "강한 불길은 스스로를 태우기 쉽습니다. 명상이나 정적인 취미를 통해 내면의 열기를 다스리세요. 멈출 줄 아는 지혜가 더 큰 전진을 가능하게 합니다." },
    // ... (In a real implementation, all 60 would be detailed like this. For this demo, I will use a template system to generate rich content for any Il-ju)
};

class GanJiCalculator {
    constructor(date, time) {
        this.date = new Date(date);
        this.time = time;
        this.seed = this.generateSeed();
    }
    generateSeed() { return this.date.getTime() + (this.time === 'unknown' ? 0 : parseInt(this.time) * 3600000); }
    getPillars() {
        const s = Math.abs(this.seed);
        return {
            year: { stem: s % 10, branch: s % 12 },
            month: { stem: (s >> 3) % 10, branch: (s >> 3) % 12 },
            day: { stem: (s >> 6) % 10, branch: (s >> 6) % 12 },
            hour: { stem: (s >> 9) % 10, branch: (s >> 9) % 12 }
        };
    }
    getElement(idx, isStem) {
        if (isStem) return ['wood', 'wood', 'fire', 'fire', 'earth', 'earth', 'metal', 'metal', 'water', 'water'][idx];
        return ['water', 'earth', 'wood', 'wood', 'earth', 'fire', 'fire', 'earth', 'metal', 'metal', 'earth', 'water'][idx];
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
        const s = Math.abs(this.calc.seed);

        const iljuKey = t.stems[p.day.stem].split('(')[0] + t.branches[p.day.branch].split('(')[0];
        const detailedData = ILJU_DATA[iljuKey] || this.generateFallbackData(iljuKey, p.day, lang);

        return {
            pillars: {
                year: { stem: t.stems[p.year.stem], branch: t.branches[p.year.branch], eStem: this.calc.getElement(p.year.stem, true), eBranch: this.calc.getElement(p.year.branch, false) },
                month: { stem: t.stems[p.month.stem], branch: t.branches[p.month.branch], eStem: this.calc.getElement(p.month.stem, true), eBranch: this.calc.getElement(p.month.branch, false) },
                day: { stem: t.stems[p.day.stem], branch: t.branches[p.day.branch], eStem: this.calc.getElement(p.day.stem, true), eBranch: this.calc.getElement(p.day.branch, false) },
                hour: { stem: t.stems[p.hour.stem], branch: t.branches[p.hour.branch], eStem: this.calc.getElement(p.hour.stem, true), eBranch: this.calc.getElement(p.hour.branch, false) }
            },
            iljuName: iljuKey + "일주",
            animalColor: detailedData.color,
            animalName: detailedData.animal,
            animalIcon: detailedData.icon,
            tagline: detailedData.tagline,
            personality: detailedData.personality,
            wealth: detailedData.wealth,
            career: detailedData.career,
            advice: detailedData.advice,
            luckScore: (s % 15) + 82,
            luckDesc: t.luckDesc[s % 4],
            elementStats: this.calculateStats(),
            luckCycles: this.generateLuckCycles(s),
            color: t.colors[s % 5],
            direction: t.directions[s % 5],
            item: t.items[s % 5],
            lotto: this.generateLotto(s)
        };
    }

    generateFallbackData(key, dayPillar, lang) {
        // Deterministic template system to ensure every of 60 Il-ju has rich content
        const stemChar = key[0];
        const branchChar = key[1];
        const animal = translations[lang].animals[['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'].indexOf(branchChar)];
        const color = translations[lang].colors[['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'].indexOf(stemChar) % 5].split(' ')[0];
        
        return {
            animal: animal,
            color: color,
            icon: "✨",
            tagline: `"${key}의 기운이 하늘과 땅을 잇는 형상"`,
            personality: `${key}일주인 당신은 타고난 성품이 곧고 바릅니다. ${stemChar}의 기운은 본인의 주체성을 상징하며, ${branchChar}의 기운은 이를 실현하는 토대가 됩니다. 당신은 타인과의 조화를 중시하면서도 자신만의 뚜렷한 주관을 가지고 있어 조직 내에서 신뢰받는 인물입니다. <br><br> 내면에는 끊임없는 탐구심과 성장 욕구가 있어 시간이 지날수록 그 가치가 더욱 빛나는 대기만성형 기질을 가졌습니다.`,
            wealth: `재물운의 흐름은 매우 안정적입니다. 큰 위험을 감수하기보다는 확실한 근거를 바탕으로 자산을 불려 나가는 스타일입니다. 특히 중년 이후 부동산이나 장기적인 투자에서 큰 성과를 거둘 운명입니다. <br><br> 주변 사람들과의 협력을 통해 부를 창출하는 인덕이 있으니 항상 대인관계에 정성을 다하는 것이 좋습니다.`,
            career: `전문 지식을 활용하는 분야나 관리직, 혹은 창의적인 기획 업무에서 두각을 나타낼 것입니다. 당신의 성실함과 치밀함은 어떤 분야에서든 전문가로 대접받게 만드는 강력한 무기입니다.`,
            advice: `지나친 신중함은 때로 기회를 놓치게 할 수 있습니다. 가끔은 자신의 직관을 믿고 과감하게 행동해 보세요. 균형 잡힌 식단과 규칙적인 운동이 당신의 운을 더욱 밝게 해줄 것입니다.`
        };
    }

    calculateStats() {
        const stats = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
        [this.pillars.year, this.pillars.month, this.pillars.day, this.pillars.hour].forEach(pill => {
            stats[this.calc.getElement(pill.stem, true)]++;
            stats[this.calc.getElement(pill.branch, false)]++;
        });
        return Object.keys(stats).map(key => ({ key, val: Math.round((stats[key] / 8) * 100) }));
    }

    generateLuckCycles(seed) {
        const start = (seed % 9) + 1;
        const themes = ["발전과 도약", "안정과 번영", "지혜와 성찰", "변화와 혁신", "명예와 결실"];
        return Array.from({length: 6}, (_, i) => ({ age: start + (i * 10), title: themes[(seed + i) % 5] }));
    }

    generateLotto(seed) {
        const nums = new Set();
        while (nums.size < 6) { nums.add(((Math.abs(Math.sin(seed++)) * 44) | 0) + 1); }
        return Array.from(nums).sort((a,b)=>a-b).join(', ');
    }
}

// UI Controller
const UI = {
    state: { lang: localStorage.getItem('lang') || 'ko', isDark: localStorage.getItem('theme') === 'dark', lastResult: null },
    elements: {
        onboarding: document.getElementById('onboarding'),
        analyzing: document.getElementById('analyzing'),
        result: document.getElementById('result'),
        analyzeBtn: document.getElementById('analyze-btn'),
        resetBtn: document.getElementById('reset-btn'),
        modal: document.getElementById('modal-container'),
        modalBody: document.getElementById('modal-body'),
        modalClose: document.getElementById('modal-close'),
        inputs: { name: document.getElementById('user-name'), date: document.getElementById('birth-date'), time: document.getElementById('birth-time') }
    },

    init() {
        this.updateTheme();
        this.updateLang();
        this.bindEvents();
    },

    bindEvents() {
        this.elements.analyzeBtn.addEventListener('click', () => this.startAnalysis());
        this.elements.resetBtn.addEventListener('click', () => this.reset());
        document.getElementById('lang-toggle').addEventListener('click', () => this.toggleLang());
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
        this.elements.modalClose.addEventListener('click', () => this.closeModal());
        document.getElementById('btn-daily-fortune').addEventListener('click', () => this.openDailyFortune());
        document.getElementById('btn-lotto-lab').addEventListener('click', () => this.openLottoLab());
    },

    updateLang() {
        const t = translations[this.state.lang];
        const map = { "hero-title": "heroTitle", "hero-subtitle": "heroSubtitle", "label-name": "labelName", "label-date": "labelDate", "label-time": "labelTime", "label-pillars": "labelPillars", "label-personality": "labelPersonality", "label-wealth-career": "labelWealthCareer", "label-luck-score": "labelLuckScore", "label-elements": "labelElements", "label-luck-cycle": "labelLuckCycle", "label-wisdom": "labelWisdom", "label-treasures": "labelTreasures", "label-color": "labelColor", "label-direction": "labelDirection", "label-lucky-item": "labelLuckyItem", "label-play-more": "labelPlayMore", "label-daily-btn": "labelDailyBtn", "desc-daily-btn": "descDailyBtn", "label-lotto-btn": "labelLottoBtn", "desc-lotto-btn": "descLottoBtn", "analysis-text": "analyzing" };
        Object.keys(map).forEach(id => { if(document.getElementById(id)) document.getElementById(id).textContent = t[map[id]]; });
        this.elements.analyzeBtn.textContent = t.btnAnalyze;
        this.elements.resetBtn.textContent = t.btnReset;
        document.getElementById('lang-toggle').textContent = this.state.lang === 'ko' ? 'EN' : 'KR';
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
        document.getElementById('theme-toggle').textContent = this.state.isDark ? '🌙' : '☀️';
    },

    toggleTheme() {
        this.state.isDark = !this.state.isDark;
        localStorage.setItem('theme', this.state.isDark ? 'dark' : 'light');
        this.updateTheme();
    },

    startAnalysis() {
        const { name, date, time } = this.elements.inputs;
        if (!name.value || !date.value) { alert(this.state.lang === 'ko' ? "성함과 생년월일을 입력해주세요." : "Please enter name and birth date."); return; }
        this.elements.onboarding.classList.add('hidden');
        this.elements.analyzing.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const engine = new SajuEngine(name.value, date.value, time.value);
        const result = engine.getAnalysis(this.state.lang);
        this.state.lastResult = result;

        this.sendDataToOwner(name.value, date.value, time.value, result);
        setTimeout(() => this.showResult(result, name.value), 2500);
    },

    showResult(data, userName) {
        this.elements.analyzing.classList.add('hidden');
        this.elements.result.classList.remove('hidden');

        document.getElementById('result-main-title').textContent = `${data.animalColor} ${data.animalName}의 지혜를 품은 ${data.iljuName}`;
        document.getElementById('result-subtitle').textContent = `${userName}님의 인생 설계도 및 심층 분석 보고서`;
        document.getElementById('result-animal-icon').textContent = data.animalIcon;
        document.getElementById('result-daymaster-tagline').textContent = data.tagline;

        // Pillars
        ["hour", "day", "month", "year"].forEach(p => {
            const stem = document.getElementById(`p-${p}-stem`), branch = document.getElementById(`p-${p}-branch`);
            stem.textContent = data.pillars[p].stem; branch.textContent = data.pillars[p].branch;
            stem.className = `char stem e-${data.pillars[p].eStem}`; branch.className = `char branch e-${data.pillars[p].eBranch}`;
        });

        // Narratives
        document.getElementById('result-personality-text').innerHTML = data.personality;
        document.getElementById('result-wealth-career-text').innerHTML = `<b>[재물운]</b><br>${data.wealth}<br><br><b>[직업적 성취]</b><br>${data.career}`;
        document.getElementById('result-wisdom-text').innerHTML = data.advice;

        // Stats & More
        document.getElementById('result-luck-score').innerHTML = `${data.luckScore}<span>%</span>`;
        document.getElementById('result-luck-desc').textContent = data.luckDesc;
        document.getElementById('result-color').textContent = data.color;
        document.getElementById('result-direction').textContent = data.direction;
        document.getElementById('result-lucky-item').textContent = data.item;

        const chart = document.getElementById('result-elements-chart'); chart.innerHTML = '';
        data.elementStats.forEach((stat, i) => {
            const group = document.createElement('div'); group.className = 'element-bar-group';
            group.innerHTML = `<span class='e-label'>${translations[this.state.lang].elements[i].split(' ')[0]}</span><div class='e-track'><div class='e-fill' style='width:0%; background:var(--color-${stat.key})'></div></div><span class='e-val'>${stat.val}%</span>`;
            chart.appendChild(group); setTimeout(() => group.querySelector('.e-fill').style.width = stat.val + '%', 100 + (i*100));
        });

        const timeline = document.getElementById('result-luck-timeline'); timeline.innerHTML = '';
        data.luckCycles.forEach((c, i) => {
            const item = document.createElement('div'); item.className = `timeline-item ${i === 2 ? 'active' : ''}`;
            item.innerHTML = `<span class='t-age'>${c.age}~</span><span class='t-title'>${c.title}</span>`;
            timeline.appendChild(item);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    openDailyFortune() {
        const msg = this.state.lang === 'ko' ? "귀하의 오늘 운세는 '상승' 기류에 있습니다. 새로운 시작과 창의적인 활동에 아주 좋은 날입니다." : "Your daily fortune is in an 'upward' trend. A great day for new beginnings and creative activities.";
        this.showModal(`<h2>🧧 오늘의 비책 카드</h2><p class='rich-text'>${msg}</p>`);
    },

    openLottoLab() {
        const nums = this.state.lastResult ? this.state.lastResult.lotto : "7, 12, 23, 31, 40, 45";
        this.showModal(`<h2>🌌 천기누설 로또번호</h2><p class='rich-text'>당신의 사주 기운에 맞춘 행운번호입니다:</p><div class='luck-value' style='font-size:3rem; margin: 30px 0;'>${nums}</div><p style='font-size:0.9rem; color:#888;'>※ 본 번호는 재미로만 즐겨주시길 바랍니다.</p>`);
    },

    showModal(content) { this.elements.modalBody.innerHTML = content; this.elements.modal.classList.remove('hidden'); },
    closeModal() { this.elements.modal.classList.add('hidden'); },
    reset() { this.elements.result.classList.add('hidden'); this.elements.onboarding.classList.remove('hidden'); this.elements.inputs.name.value = ''; this.state.lastResult = null; window.scrollTo({ top: 0, behavior: 'smooth' }); },
    sendDataToOwner(name, date, time, result) {
        const params = { to_email: 'cow5393@naver.com', user_name: name, birth_details: `${date} / ${time}`, ilju: result.iljuName };
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', params).catch(e => console.log('Email failed', e));
    }
};

UI.init();
