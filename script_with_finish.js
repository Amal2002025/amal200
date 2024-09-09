// דף כניסה
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const department = document.getElementById('department').value;

        // בדיקה שהשדות אינם ריקים
        if (name.trim() && department.trim()) {
            // שמירת השם והמחלקה בזיכרון המקומי של הדפדפן
            localStorage.setItem('playerName', name);
            localStorage.setItem('playerDepartment', department);
            // מעבר לדף המשחק
            window.location.href = 'game.html';
        } else {
            alert('יש למלא את כל השדות');
        }
    });
}

// דף המשחק
const gameForm = document.getElementById('gameForm');
if (gameForm) {
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');
    const backBtn = document.getElementById('backBtn');

    let startTime = Date.now(); // שמירת הזמן בתחילת המשחק
    
    // נתוני השאלות
    let questions = [
        {
            question: 'מה נעשה בעבר הרחוק על מנת לשפר את התוצאות הכלכליות של בית החולים הגריאטרי במעלה אדומים?',
            answers: [
                '1.לינה של ליאור מנהל המחלקה הכלכלית במשך 4 חודשים פעם בשבוע במחלקה.',
                '2.שיפוץ גדול.',
                '3.הוספת יועצים חיצוניים רבים מתחומי פעילות שונים.',
                '4. הגדלת מספר ישיבות הצוות.'
            ],
            correct: '1.לינה של ליאור מנהל המחלקה הכלכלית במשך 4 חודשים פעם בשבוע במחלקה.'
        },
        {
            question: 'מה המחלקה שהתחילה את דרכה במחלקה הכלכלית והיום כבר לא בתוך המחלקה?',
            answers: ['1.מחלקת רכב.', '2.מחלקת תפעול.', '3.מחלקת BI.', '4.רכש.'],
            correct: '3.מחלקת BI.'
        },
        {
            question: 'מה הכי מורכב בחשיבה של המחלקה הכלכלית כאשר שכר המינימום עולה?',
            answers: [
                '1.איך לעדכן את התקציב עד סוף השנה? האם תואם להערכה בתחילת שנה?',
                '2.מה התעריף שהוחלט עליו לעובד זר ומה התעריף ללקוח פרטי?',
                '3.מתי משרד הבריאות יעדכן את התעריף ובכמה?',
                '4.האם יש תוצאות של מו"מ עם גורמים מממנים ולקוחות שאינם מצמידים את התעריף לפי הסכם?'
            ],
            correct: '4.האם יש תוצאות של מו"מ עם גורמים מממנים ולקוחות שאינם מצמידים את התעריף לפי הסכם?'
        }
    ];
    
    let currentQuestion = 0;
    let correctAnswers = 0; // משתנה למעקב אחר התשובות הנכונות
    
    function loadQuestion() {
        const q = questions[currentQuestion];
        questionEl.textContent = q.question;
        optionsEl.innerHTML = '';
        q.answers.forEach(answer => {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'answer';
            radio.value = answer;
            optionsEl.appendChild(radio);
            optionsEl.appendChild(document.createTextNode(answer));
            optionsEl.appendChild(document.createElement('br'));
        });
    }
    
    loadQuestion();
    
    nextBtn.addEventListener('click', () => {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            // בדיקה האם התשובה נכונה
            if (selectedAnswer.value === questions[currentQuestion].correct) {
                correctAnswers++; // העלאה של התשובות הנכונות
            }
            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                // אם סיימנו לעבור על כל השאלות, הסתר את הכפתור "המשך" והצג את כפתור "סיום"
                nextBtn.style.display = 'none';
                finishBtn.style.display = 'block';
            }
        } else {
            alert('בחר תשובה לפני המעבר לשאלה הבאה!');
        }
    });

    finishBtn.addEventListener('click', () => {
        const totalTime = (Date.now() - startTime) / 1000; // חישוב הזמן שחלף בשניות
        alert(`סיימת את המשחק! ענית נכון על ${correctAnswers} מתוך ${questions.length} שאלות. הזמן הכולל: ${totalTime} שניות.`);
    });

    backBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion();
        }
    });
}
