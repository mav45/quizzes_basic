let score = 0;
let streak = 0;
let currentCorrect = null;

// Helper to pick a random element
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Start the quiz
function startQuiz() {
  score = 0;
  streak = 0;
  document.getElementById("score").textContent = score;
  document.getElementById("streak").textContent = streak;
  nextQuestion();
}

// Show next question
function nextQuestion() {
  const tense = document.getElementById("tense").value;
  const pool = verbs.filter(v => v.tense === tense);

  if (pool.length === 0) {
    alert("No verbs for this tense!");
    return;
  }

  const verb = getRandom(pool);
  const pronoun = getRandom(Object.keys(verb.conjugations));
  currentCorrect = verb.conjugations[pronoun];

  document.getElementById("question").textContent =
    `Conjugate "${verb.infinitive}" (${verb.translation}) for "${pronoun}"`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  const uniqueConjugations = [...new Set(Object.values(verb.conjugations))].filter(a => a !== currentCorrect);

  const distractors = [];
  while (distractors.length < 3 && uniqueConjugations.length > 0) {
    const idx = Math.floor(Math.random() * uniqueConjugations.length);
    distractors.push(uniqueConjugations.splice(idx, 1)[0]);
  }

  const choices = [currentCorrect, ...distractors].sort(() => Math.random() - 0.5);

  choices.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "btn";
    btn.onclick = () => checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("feedback").textContent = "";
}

// Check answer and update score/streak
function checkAnswer(selected) {
  const fb = document.getElementById("feedback");
  if (selected === currentCorrect) {
    fb.textContent = "✅ Correct!";
    score++;
    streak++;
  } else {
    fb.textContent = `❌ Wrong! Correct: ${currentCorrect}`;
    streak = 0;
  }
  document.getElementById("score").textContent = score;
  document.getElementById("streak").textContent = streak;
  setTimeout(nextQuestion, 1000);
}

document.getElementById("startBtn").addEventListener("click", startQuiz);


