
class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        const color = this.getColor(number);

        this.shadowRoot.innerHTML = `
            <style>
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

const generateButton = document.getElementById('generate-button');
const lottoNumbersContainer = document.getElementById('lotto-numbers');

generateButton.addEventListener('click', () => {
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach(number => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoNumbersContainer.appendChild(lottoBall);
    });
});
