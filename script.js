// Deze functie wordt aangeroepen als je op de knop klikt
async function checkBeroep() {
    const beroep = document.getElementById('beroep').value;
    
    if (!beroep) {
        alert('Vul eerst een beroep in!');
        return;
    }

    // Laat resultaat sectie zien
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('rapport').innerHTML = 'Even denken... 🤔';
    document.getElementById('meterVulling').style.width = '0%';

    try {
        // 👉 HIER KOMT STRAKS DE ECHTE GROQ API CALL
        // Voor nu gebruiken we een nep-antwoord om te testen
        
        // Simuleer denktijd (doet alsof we aan het laden zijn)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Nep-resultaat (later vervangen door echte Groq API)
        const result = generateFakeResult(beroep);
        
        // Toon het rapport
        document.getElementById('rapport').innerHTML = result.rapport;
        
        // Update de meter
        const score = result.score;
        document.getElementById('meterVulling').style.width = (score * 10) + '%';
        document.getElementById('scoreText').innerHTML = `Risicoscore: ${score}/10`;
        
        // Kleur aanpassen op basis van score
        const scoreElement = document.getElementById('scoreText');
        scoreElement.className = 'score';
        if (score <= 3) {
            scoreElement.classList.add('laag');
        } else if (score <= 6) {
            scoreElement.classList.add('midden');
        } else {
            scoreElement.classList.add('hoog');
        }
        
    } catch (error) {
        console.error('Fout:', error);
        document.getElementById('rapport').innerHTML = 'Er ging iets mis. Probeer het opnieuw.';
    }
}

// ⚠️ TIJDELIJKE FUNCTIE - Later vervangen door echte Groq API
function generateFakeResult(beroep) {
    const rapporten = {
        'programmeur': {
            rapport: 'Programmeurs lopen risico dat routinematige codeertaken worden overgenomen door AI-assistenten zoals GitHub Copilot. Complexe systeemarchitectuur, creatieve probleemoplossing en legacy-onderhoud blijven echter menselijke expertise vereisen. AI wordt een krachtige tool, geen vervanger.',
            score: 4
        },
        'leraar': {
            rapport: 'Onderwijs verandert door AI: gepersonaliseerde lesstof, automatische nakijktaken en virtuele assistenten worden gemeengoed. Maar de menselijke interactie, het inspireren van leerlingen en sociale-emotionele begeleiding blijven uniek menselijk. De leraar wordt coach en mentor.',
            score: 3
        },
        'bakker': {
            rapport: 'Automatisering in bakkerijen is al decennia gaande, maar ambachtelijk brood, receptontwikkeling en klantcontact blijven mensenwerk. Een bakkerij draait om passie en vakmanschap, iets wat robots niet kunnen nabootsen.',
            score: 2
        },
        'boekhouder': {
            rapport: 'Routinematige boekingen, belastingaangiftes en data-analyse worden grotendeels geautomatiseerd. De boekhouder verschuift naar adviseur: strategisch financieel advies, interpretatie van cijfers en complexe fiscale constructies.',
            score: 6
        }
    };
    
    // Check of we een bekend beroep hebben
    const lowerBeroep = beroep.toLowerCase();
    for (let key in rapporten) {
        if (lowerBeroep.includes(key)) {
            return rapporten[key];
        }
    }
    
    // Willekeurig antwoord voor onbekende beroepen
    const scores = [3, 4, 5, 6, 7];
    const randomScore = scores[Math.floor(Math.random() * scores.length)];
    
    return {
        rapport: `Het beroep "${beroep}" zal deels veranderen door AI. Routinetaken worden geautomatiseerd, maar menselijke vaardigheden zoals creativiteit, empathie en complexe besluitvorming blijven essentieel. De precieze impact hangt af van hoe snel AI zich ontwikkelt en hoe jouw sector innoveert.`,
        score: randomScore
    };
}
