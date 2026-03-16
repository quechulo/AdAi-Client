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
        <p>This website showcases what conversational AI can do when it is connected to ads from external sources.</p>
        <p>To begin, please fill out the first short form about your current experience with similar conversational AI services.</p>

        <h2>What does this website offer?</h2>
        <p>On the left, you will find six tabs:</p>
        <ul>
            <li>Quick Start - this is where you are now.</li>
            <li>Chat - chat with the chatbot, ask questions, and get answers. The model in this tab has no awareness of ads. It can still provide information about products and services, but its responses are not designed to promote them.</li>
            <li>View Ad (demo) - browse sample ads either with the left/right arrows or by entering any number from 1 to 1200 in the field at the top.</li>
            <li>The next three tabs (Chat with RAG / Chat with MCP / Chat with AGENT) present different ways of integrating conversational AI with advertising.</li>
        </ul>

        <h2>Not sure what to ask?</h2>
        <p>Below are example categories for which ads are prepared, but feel free to ask about anything beyond this list.</p>

        <ul>
            <li><strong>Outdoor, camping, and overlanding gear:</strong> Ask about 4-season tents that can handle strong winds, trail water filtration equipment, or rooftop sleeping accessories (rooftop tents).</li>
            <li><strong>Water and winter sports:</strong> You can ask about winter surfing wetsuit thickness, scuba diving gear, or skis that perform well in all conditions.</li>
            <li><strong>Electronics, laptops, and gaming:</strong> Looking for a lightweight travel laptop with long battery life? Or maybe a powerful 4K gaming machine, or a smartwatch with advanced health features such as sleep apnea detection? The system can guide you in all of these areas.</li>
            <li><strong>Footwear (sneakers and athletic shoes):</strong> Ask about classic 1980s basketball shoes, eco-friendly vegan leather sneakers, or running shoes.</li>
            <li><strong>Home equipment (smart home, TV/audio, and appliances):</strong> The chatbot can suggest smart refrigerators, robot vacuums, or TVs that are perfect for movie nights.</li>
            <li><strong>Real estate and investment:</strong> Try asking about luxury apartments in Warsaw (for example in Mokotów or Śródmieście), or rental apartments in the Tri-City area.</li>
            <li><strong>Travel and hotels:</strong> Ask about luxury honeymoon hotels in Europe, historic stays in the US, or useful accessories that make long international flights more comfortable.</li>
            <li><strong>Lifestyle, work, and entertainment:</strong> The system can help you choose gear for organizing a small apartment, accessories for remote work while traveling, or must-have gadgets for a music festival.</li>
        </ul>
    </div>
    <div v-else class="scroll">
        <h2>Dzięki za odwiedzenie AdAI!</h2>
        <p>Ta strona przedstawia możliwości konwersacyjnego AI, które potrafi dostarczać reklamy z zewnętrznych źródeł.</p>
        <p>Na początku zachęcam Cię do wypełnienia pierwszego formularza o Twoim bieżącym doświadczeniu z podobnymi serwisami oferującymi konwersacyjne AI.</p>

        <h2>Co oferuje strona?</h2>
        <p>Po lewej stronie znajdziesz sześć zakładek, które przedstawiają odpowiednio:</p>
        <ul>
            <li>Quick Start - tutaj właśnie jesteś!</li>
            <li>Chat - tutaj możesz porozmawiać z chatbotem. Zadaj mu pytanie, a on postara się odpowiedzieć. Model dostępny na tej zakładce nie ma świadomości o żadnych reklamach. Nadal może dostarczać informacje o produktach i usługach, ale mechanizm jego odpowiedzi nie jest nastawiony na ich przedstawianie.</li>
            <li>View Ad (demo) - tutaj możesz zobaczyć przykładowe reklamy. Albo nawigując strzałkami prawo/lewo, albo wpisując dowolny numer od 1 do 1200 w polu na górze.</li>
            <li>Następne trzy zakładki (Chat with RAG/Chat with MCP/Chat with AGENT) przedstawiają różne podejścia do integracji konwersacyjnego AI z reklamami.</li>
        </ul>

        <h2>Pewnie zastanawiasz się, o co właściwie mógłbyś zapytać</h2>
        <p>Poniżej znajdziesz kilka przykładów tematów, na które zostały przygotowane reklamy - oczywiście nie musisz ograniczać się jedynie do nich.</p>

        <ul>
            <li><strong>Sprzęt outdoorowy, kempingowy i overlanding:</strong> Możesz zapytać o namioty 4-sezonowe, które wytrzymają silne wiatry , sprzęt do filtrowania wody na szlaku , czy akcesoria do spania na dachu samochodu (namioty dachowe).</li>
            <li><strong>Sporty wodne i zimowe:</strong> Pytaj o grubość pianki do surfingu zimą , sprzęt do nurkowania  lub narty radzące sobie w każdych warunkach.</li>
            <li><strong>Elektronika, Laptopy i Gaming:</strong> Szukasz lekkiego laptopa z pojemną baterią do podróży? A może interesuje Cię potężny komputer do gier w rozdzielczości 4K  lub smartwatch z zaawansowanymi funkcjami zdrowotnymi, takimi jak wykrywanie bezdechu sennego? System potrafi doradzić w każdej z tych kwestii.</li>
            <li><strong>Obuwie (Sneakersy i buty sportowe):</strong> Zapytaj o klasyczne buty koszykarskie z lat 80. , ekologiczne sneakersy wykonane z wegańskiej skóry  lub buty do biegania.</li>
            <li><strong>Wyposażenie domu (Smart Home, RTV i AGD):</strong> Chatbot może zaproponować inteligentne lodówki , roboty sprzątające  czy telewizory idealne do wieczornych seansów filmowych.</li>
            <li><strong>Nieruchomości i inwestycje:</strong> Przetestuj pytania o luksusowe apartamenty w Warszawie (np. na Mokotowie czy w Śródmieściu) lub mieszkania na wynajem w Trójmieście.</li>
            <li><strong>Podróże i hotele:</strong> Zapytaj o luksusowe hotele na podróż poślubną w Europie, historyczne obiekty w USA lub niezbędne akcesoria, które umilą długi lot międzynarodowy.</li>
            <li><strong>Styl życia, praca i rozrywka:</strong> System pomoże Ci dobrać sprzęt ułatwiający organizację małego mieszkania, akcesoria do pracy zdalnej w podróży czy najważniejsze gadżety na festiwal muzyczny.</li>
        </ul>
    </div>
    <div class="glossy">
        <router-link to="/chat" class="start-chat-button">{{ startChattingButtonText }}</router-link>
    </div>
    </div>

  
</template>

<style scoped>
.page {
    position: relative;
    display: flex;
    flex-direction: column;
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

.start-chat-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    padding: 10px 22px;
    margin: 0;
    border: 1px solid currentColor;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.12);
    text-decoration: none;
    font-weight: 700;
    overflow: hidden;
    transition: transform 0.2s ease, opacity 0.2s ease;
    animation: buttonPulse 1.8s ease-in-out infinite;
}

.start-chat-button::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent 25%, rgba(255, 255, 255, 0.45) 50%, transparent 75%);
    transform: translateX(-140%);
    animation: buttonShine 2.4s ease-in-out infinite;
    pointer-events: none;
}

.start-chat-button:hover {
    transform: translateY(-1px) scale(1.02);
    opacity: 0.95;
}

.start-chat-button:active {
    transform: translateY(0) scale(0.99);
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
    .start-chat-button,
    .start-chat-button::after {
        animation: none;
    }
}
</style>