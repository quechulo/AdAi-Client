<script setup lang="ts">
import { ref, computed } from 'vue';

const lang = ref<'pl' | 'en'>('pl');
const startChattingButtonText = computed(() => lang.value === 'en' ? 'Start Chatting!' : 'Zacznij rozmowę!');
</script>

<template>
    <div class="page">
    <header class="header">
        <h1 v-if="lang==='en'">Welcome to AdAI</h1>
        <h1 v-else>Witaj w AdAI</h1>
        <div class="lang-toggle">
            <button :class="['lang-btn', { active: lang === 'pl' }]" @click="lang = 'pl'">🇵🇱 PL</button>
            <button :class="['lang-btn', { active: lang === 'en' }]" @click="lang = 'en'">🇬🇧 EN</button>
        </div>
    </header>

    <div v-if="lang==='en'" class="scroll">
        <h2>Thanks for checking out AdAI!</h2>
        <p>This website showcases what conversational AI can do when it can deliver ads from external sources.</p>
        <p>To begin, please fill out the first short form about your current experience with similar services that offer conversational AI.<br><br>Po przetestowaniu strony będzie super jak podzielisz się swoimi doświadczeniami i wypełnisz drugi formularz.</p>

        <div class="buttons-wrapper">
            <a class="quick-start-button" href="https://forms.gle/dhrScPAAx4LxvuyX7" target="_blank" rel="noopener noreferrer">
                Go to first form
            </a>
            <a class="quick-start-button" href="https://forms.gle/JC9EvY8za2kqveGc7" target="_blank" rel="noopener noreferrer">
                Go to second form (after testing the site)
            </a>
        </div>

        <h2>What does this website offer?</h2>
        <p>On the left, you will find six tabs that present:</p>
        <ul>
            <li><strong>Quick Start</strong> - this is where you are now.</li>
            <li><strong>Chat</strong> - here you can talk to the chatbot.<br>
                Ask a question, and it will try to answer. The model available in this tab has no awareness of any ads. It can still provide information about products and services, but the mechanism behind its responses is not focused on presenting them.</li>
            <li><strong>View Ad (demo)</strong> - here you can browse sample ads.<br>Navigate with the left/right arrows, or by entering any number from 1 to 1200 in the field at the top.</li>
            <li><strong>The next three tabs (Chat with RAG / Chat with MCP / Chat with AGENT)</strong><br>
                This is where you can test and compare three mechanisms that integrate conversational AI with ads.</li>
        </ul>

        <h2>You are probably wondering what you could actually ask about</h2>
        <p>Below are a few example topics for which ads have been prepared - of course, you do not need to limit yourself only to them.</p>

        <ul>
            <li><strong>Outdoor, camping, and overlanding gear</strong><br>
                You can ask about tents, trail water filtration equipment, or accessories for sleeping on a car roof.</li>
            <li><strong>Water and winter sports</strong><br>
                Ask about winter surfing wetsuit thickness, scuba diving gear, or skis that can handle all conditions.</li>
            <li><strong>Electronics, laptops, and gaming</strong><br>
                Looking for a lightweight laptop with a long-lasting battery for travel?<br>Or maybe you are interested in a powerful 4K gaming computer or a smartwatch with advanced health features, such as sleep apnea detection?<br>The system can guide you in each of these cases.</li>
            <li><strong>Footwear (sneakers and athletic shoes)</strong><br>
                Ask about classic basketball shoes from the 1980s, eco-friendly sneakers made from vegan leather, or running shoes.</li>
            <li><strong>Home equipment (smart home, TV/audio, and appliances)</strong><br>
                The chatbot can suggest smart refrigerators, robot vacuums, or TVs perfect for evening movie sessions.</li>
            <li><strong>Real estate and investment</strong><br>
                Test questions about luxury apartments in Warsaw (e.g., in Mokotów or Śródmieście) or rental apartments in the Tri-City area.</li>
            <li><strong>Travel and hotels</strong><br>
                Ask about luxury honeymoon hotels in Europe, historic properties in the US, or essential accessories that make long international flights more comfortable.</li>
            <li><strong>Lifestyle, work, and entertainment</strong><br>
                The system can help you choose equipment that makes organizing a small apartment easier, accessories for remote work while traveling, or key gadgets for a music festival.</li>
        </ul>
    </div>
    <div v-else class="scroll">
        <h2>Dzięki za odwiedzenie AdAI!</h2>
        <p>Ta strona przedstawia możliwości konwersacyjnego AI, które potrafi dostarczać reklamy z zewnętrznych źródeł.</p>
        <p>Na początku zachęcam Cię do wypełnienia pierwszego formularza o Twoim bieżącym doświadczeniu z podobnymi serwisami oferującymi konwersacyjne AI.<br><br>Po przetestowaniu strony będzie super jak podzielisz się swoimi doświadczeniami i wypełnisz drugi formularz.</p>
        <div class="buttons-wrapper">
            <a class="quick-start-button" href="https://forms.gle/dhrScPAAx4LxvuyX7" target="_blank" rel="noopener noreferrer">
                Pierwsza ankieta
            </a>
            <a class="quick-start-button" href="https://forms.gle/JC9EvY8za2kqveGc7" target="_blank" rel="noopener noreferrer">
                Druga ankieta (po testowaniu strony)
            </a>
        </div>


        <h2>Co oferuje strona?</h2>
        <p>Po lewej stronie znajdziesz sześć zakładek, które przedstawiają odpowiednio:</p>
        <ul>
            <li><strong>Quick Start</strong> - tutaj właśnie jesteś!</li>
            <li><strong>Chat</strong> - tutaj możesz porozmawiać z chatbotem.<br>
                Zadaj mu pytanie, a on postara się odpowiedzieć. Model dostępny na tej zakładce nie ma świadomości o żadnych reklamach. Nadal może dostarczać informacje o produktach i usługach, ale mechanizm jego odpowiedzi nie jest nastawiony na ich przedstawianie.</li>
            <li><strong>View Ad (demo)</strong> - tutaj możesz zobaczyć przykładowe reklamy.<br>Nawiguj strzałkami prawo/lewo, albo wpisując dowolny numer od 1 do 1200 w polu na górze.</li>
            <li><strong>Następne trzy zakładki (Chat with RAG/Chat with MCP/Chat with AGENT)</strong><br>
                To tutaj mozesz testować i porównać trzy mechanizmy, które integrują konwersacyjne AI z reklamami.</li>
        </ul>

        <h2>Pewnie zastanawiasz się, o co właściwie mógłbyś zapytać</h2>
        <p>Poniżej znajdziesz kilka przykładów tematów, na które zostały przygotowane reklamy - oczywiście nie musisz ograniczać się jedynie do nich.</p>

        <ul>
            <li><strong>Sprzęt outdoorowy, kempingowy i overlanding</strong><br>
                Możesz zapytać o namioty, sprzęt do filtrowania wody na szlaku, czy akcesoria do spania na dachu samochodu.</li>
            <li><strong>Sporty wodne i zimowe</strong><br>
                Pytaj o grubość pianki do surfingu zimą , sprzęt do nurkowania  lub narty radzące sobie w każdych warunkach.</li>
            <li><strong>Elektronika, Laptopy i Gaming</strong><br>
                Szukasz lekkiego laptopa z pojemną baterią do podróży?<br>A może interesuje Cię potężny komputer do gier w rozdzielczości 4K lub smartwatch z zaawansowanymi funkcjami zdrowotnymi, takimi jak wykrywanie bezdechu sennego?<br>System doradzi w każdej z tych kwestii.</li>
            <li><strong>Obuwie (Sneakersy i buty sportowe)</strong><br>
                Zapytaj o klasyczne buty koszykarskie z lat 80., ekologiczne sneakersy wykonane z wegańskiej skóry lub buty do biegania.</li>
            <li><strong>Wyposażenie domu (Smart Home, RTV i AGD)</strong><br>
                Chatbot może zaproponować inteligentne lodówki, roboty sprzątające czy telewizory idealne do wieczornych seansów filmowych.</li>
            <li><strong>Nieruchomości i inwestycje</strong><br>
                Przetestuj pytania o luksusowe apartamenty w Warszawie (np. na Mokotowie czy w Śródmieściu) lub mieszkania na wynajem w Trójmieście.</li>
            <li><strong>Podróże i hotele</strong><br>
                Zapytaj o luksusowe hotele na podróż poślubną w Europie, historyczne obiekty w USA lub niezbędne akcesoria, które umilą długi lot międzynarodowy.</li>
            <li><strong>Styl życia, praca i rozrywka</strong><br>
                System pomoże Ci dobrać sprzęt ułatwiający organizację małego mieszkania, akcesoria do pracy zdalnej w podróży czy najważniejsze gadżety na festiwal muzyczny.</li>
        </ul>
    </div>
    <div class="glossy">
        <router-link to="/chat" class="quick-start-button quick-start-button--animated">{{ startChattingButtonText }}</router-link>
    </div>
    </div>

</template>

<style scoped>
.page {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    min-height: 0;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 36px;
}

.scroll {
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: 0 36px 120px;
}

.scroll ul {
    margin: 12px 0 24px;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 10px;
}

.scroll li {
    position: relative;
    padding: 10px 24px;
    border-left: 3px solid;
    border-left-color: var(--color-accent);
    background: rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    line-height: 1.5;
}

.scroll li::before,
.scroll li::after {
    position: absolute;
    top: 8px;
    font-weight: 700;
    line-height: 1;
}


.scroll li strong {
    font-weight: 700;
}

.lang-toggle {
    display: flex;
    gap: 4px;
}

.lang-btn {
    padding: 4px 12px;
    border: 1px solid currentColor;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    opacity: 0.5;
    transition: opacity 0.2s;
}

.lang-btn.active {
    opacity: 1;
}

.lang-btn:hover {
    opacity: 0.8;
}

.glossy {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    display: flex;
    justify-content: flex-end;
    padding: 12px 36px;
    border-radius: 0;
    background: linear-gradient(140deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.08));
    border: 1px solid rgba(255, 255, 255, 0.68);
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    overflow: hidden;
}

.glossy::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 0;
    right: 0;
    height: 48%;
    border-radius: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0));
    pointer-events: none;
}

.quick-start-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    padding: 10px 22px;
    margin: 0;
    color: var(--color-accent);
    border: 1px solid currentColor;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.12);
    text-decoration: none;
    font-weight: 700;
    overflow: hidden;
    transition: transform 0.2s ease, opacity 0.2s ease;
}

.glossy .quick-start-button {
    background: rgba(255, 255, 255, 1);
}

.quick-start-button:active {
    color: inherit;
}

.quick-start-button::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent 25%, rgba(255, 255, 255, 0.45) 50%, transparent 75%);
    transform: translateX(-140%);
    display: none;
    pointer-events: none;
}

.quick-start-button--animated {
    animation: buttonPulse 1.8s ease-in-out infinite;
}

.quick-start-button--animated::after {
    display: block;
    animation: buttonShine 2.4s ease-in-out infinite;
}

.quick-start-button:hover {
    transform: translateY(-1px) scale(1.02);
    opacity: 0.95;
}

.quick-start-button:active {
    transform: translateY(0) scale(0.99);
}

.buttons-wrapper {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
}

@keyframes buttonShine {
    0%,
    20% {
        transform: translateX(-140%);
    }
    60%,
    100% {
        transform: translateX(140%);
    }
}

@keyframes buttonPulse {
    0%,
    100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.015);
    }
}

@media (prefers-reduced-motion: reduce) {
    .quick-start-button,
    .quick-start-button::after {
        animation: none;
    }
}
</style>