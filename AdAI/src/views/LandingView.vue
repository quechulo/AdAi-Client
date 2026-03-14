<script setup lang="ts">
import { ref } from 'vue';

const lang = ref<'pl' | 'en'>('pl');
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
        <p>Thank you for coming to AdAI!</p>
        <p>This website tries to explore posibilities of conversational AI that is able to provide ads from external sources.</p>
        <p>I encourage you to fill first form about your experience</p>
    </div>
    <div v-else class="scroll">
        <h3>Dzięki za odwiedzenie AdAI!</h3>
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
    <router-link to="/chat" class="start-chat-button">Start Chatting</router-link>
    </div>

  
</template>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 36px;
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
</style>