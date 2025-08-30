import React, { useState, useEffect } from "react";
import "./CyberSafetyGame.css"; // We'll create this CSS file

// Enhanced question pools with multiple questions for each category
const questionPools = {
  passwords: [
    { q: "Which password is stronger?", options: ["123456", "MyDog&Cat2024!", "password"], correct: 1, emoji: "🔐" },
    { q: "What makes a password super strong?", options: ["Only letters", "Mix of letters, numbers & symbols", "Your birthday"], correct: 1, emoji: "💪" },
    { q: "Should you share your password?", options: ["With best friends", "With family only", "Never with anyone"], correct: 2, emoji: "🤐" },
    { q: "How often should you change your passwords?", options: ["Every week", "Every few months", "Only when you suspect a problem"], correct: 1, emoji: "⏰" },
    { q: "What is a password manager?", options: ["A tool that remembers all your passwords", "A person who guards your passwords", "A type of encryption"], correct: 0, emoji: "📱" },
    { q: "Which is a safe way to remember passwords?", options: ["Write them on sticky notes", "Use a password manager", "Share with a friend"], correct: 1, emoji: "🔒" },
    { q: "What is two-factor authentication?", options: ["Using two passwords", "An extra layer of security", "A type of virus"], correct: 1, emoji: "🛡️" }
  ],
  strangers: [
    { q: "Someone online wants to meet you. What do you do?", options: ["Go meet them", "Tell a trusted adult first", "Give them your address"], correct: 1, emoji: "👨‍👩‍👧‍👦" },
    { q: "A stranger asks for your school name. You should:", options: ["Tell them", "Ask why they need it", "Never share personal info"], correct: 2, emoji: "🏫" },
    { q: "Someone online offers you gifts. You should:", options: ["Accept them", "Tell your parents", "Give them your address"], correct: 1, emoji: "🎁" },
    { q: "A person you don't know asks for your photo. You should:", options: ["Send a recent photo", "Ask why they want it", "Never send photos to strangers"], correct: 2, emoji: "📸" },
    { q: "Someone online says they're the same age as you but something feels wrong. You should:", options: ["Ignore your feelings", "Stop talking to them", "Ask for proof of age"], correct: 1, emoji: "🤔" },
    { q: "A stranger asks for your phone number. You should:", options: ["Give it to them", "Ask why they need it", "Never share it with strangers"], correct: 2, emoji: "📞" },
    { q: "Someone you met online wants to video chat. You should:", options: ["Do it immediately", "Ask a parent first", "Never video chat with online friends"], correct: 1, emoji: "📹" }
  ],
  clicking: [
    { q: "You see a popup saying 'You won $1000!'. What do you do?", options: ["Click it immediately", "Close it - it's probably fake", "Share it with friends"], correct: 1, emoji: "💰" },
    { q: "A link looks suspicious. You should:", options: ["Click to see what happens", "Ask an adult first", "Share it with everyone"], correct: 1, emoji: "🔗" },
    { q: "An email from unknown sender has attachments. You:", options: ["Open them", "Delete the email", "Download everything"], correct: 1, emoji: "📧" },
    { q: "A website asks for permission to send notifications. You should:", options: ["Always allow", "Never allow", "Only allow on trusted sites"], correct: 2, emoji: "🔔" },
    { q: "A game website asks you to install a plugin to play. You should:", options: ["Install it immediately", "Ask a parent first", "Find a different game"], correct: 1, emoji: "🎮" },
    { q: "You get a message saying your computer has a virus. You should:", options: ["Click the link to fix it", "Tell an adult", "Ignore it"], correct: 1, emoji: "🦠" },
    { q: "A website asks for your personal information to claim a prize. You should:", options: ["Provide the information", "Close the website", "Ask friends what to do"], correct: 1, emoji: "🎁" }
  ],
  privacy: [
    { q: "Should you share your home address online?", options: ["Yes, with anyone who asks", "Only with close friends", "Never share your address online"], correct: 2, emoji: "🏠" },
    { q: "Is it safe to share your phone number on social media?", options: ["Yes, if you have many followers", "Only in private messages", "Never share your phone number publicly"], correct: 2, emoji: "📞" },
    { q: "What should you do before posting photos online?", options: ["Post everything", "Ask permission from people in the photos", "Use filters to make them look better"], correct: 1, emoji: "🖼️" },
    { q: "Who should know your real full name online?", options: ["Everyone", "Only people you know in real life", "No one"], correct: 1, emoji: "📛" },
    { q: "Should you share your daily routine online?", options: ["Yes, it's interesting", "Only with close family", "No, it could be dangerous"], correct: 2, emoji: "📅" },
    { q: "Is it safe to share your birth date publicly?", options: ["Yes, everyone does it", "Only the month and day", "No, it's personal information"], correct: 2, emoji: "🎂" },
    { q: "Should you share your location in real-time on social media?", options: ["Yes, it's fun", "Only with close friends", "No, it's not safe"], correct: 2, emoji: "📍" }
  ],
  kindness: [
    { q: "Someone is being mean to your friend online. You should:", options: ["Join in", "Ignore it", "Stand up for your friend and tell an adult"], correct: 2, emoji: "👭" },
    { q: "You see a hurtful comment about someone. You should:", options: ["Like the comment", "Report the comment", "Share it with others"], correct: 1, emoji: "💬" },
    { q: "How can you be kind online?", options: ["By sharing embarrassing photos of others", "By complimenting others' achievements", "By creating fake accounts"], correct: 1, emoji: "❤️" },
    { q: "What should you do if you accidentally hurt someone's feelings online?", options: ["Ignore it", "Apologize sincerely", "Block them"], correct: 1, emoji: "😔" },
    { q: "What is cyberbullying?", options: ["A new video game", "Being mean to others online", "A type of computer virus"], correct: 1, emoji: "🚫" },
    { q: "If someone is cyberbullying you, you should:", options: ["Bully them back", "Ignore it and hope it stops", "Tell a trusted adult"], correct: 2, emoji: "🆘" },
    { q: "What should you do before posting a comment?", options: ["Post whatever you want", "Think about how it might make others feel", "Use fake names"], correct: 1, emoji: "💭" }
  ],
  help: [
    { q: "You see something online that makes you uncomfortable. You should:", options: ["Ignore it", "Tell a trusted adult immediately", "Share it with friends first"], correct: 1, emoji: "😟" },
    { q: "Someone is pressuring you to share personal information. You should:", options: ["Give them what they want", "Say no and tell an adult", "Ask them why they need it"], correct: 1, emoji: "🎭" },
    { q: "You accidentally shared something you shouldn't have. You should:", options: ["Hope no one notices", "Tell a trusted adult right away", "Delete it and forget about it"], correct: 1, emoji: "⚠️" },
    { q: "Who are trusted adults you can ask for help?", options: ["Strangers online", "Parents, teachers, or family members", "Only famous YouTubers"], correct: 1, emoji: "👨‍👩‍👧" },
    { q: "What information should you have ready when asking for help?", options: ["Your favorite game codes", "Details about what happened", "Your friends' secrets"], correct: 1, emoji: "📋" },
    { q: "If you see something inappropriate online, you should:", options: ["Share it with friends", "Report it to the website", "Ignore it"], correct: 1, emoji: "👀" },
    { q: "What should you do if someone is making you uncomfortable online?", options: ["Keep talking to them", "Block them and tell an adult", "Try to fix it yourself"], correct: 1, emoji: "🚷" }
  ]
};

const playCards = [
  { 
    id: "passwords",
    title: "Password Wizard", 
    desc: "Create magical passwords that keep bad guys away!", 
    icon: "🧙‍♂️", 
    color: "#9C27B0",
    game: "Mix letters, numbers, and symbols like a magic spell!"
  },
  { 
    id: "strangers",
    title: "Stranger Shield", 
    desc: "Protect yourself from unknown people online!", 
    icon: "🛡️", 
    color: "#F44336",
    game: "Never share personal info with strangers - you're the guardian!"
  },
  { 
    id: "clicking",
    title: "Click Detective", 
    desc: "Solve the mystery of safe vs dangerous clicks!", 
    icon: "🕵️", 
    color: "#2196F3",
    game: "Investigate before you click - be a cyber detective!"
  },
  { 
    id: "privacy",
    title: "Privacy Hero", 
    desc: "Keep your personal information super secret!", 
    icon: "🦸‍♀️", 
    color: "#4CAF50",
    game: "Your personal info is your superpower - guard it!"
  },
  { 
    id: "kindness",
    title: "Kindness Knight", 
    desc: "Spread kindness and stop cyber bullies!", 
    icon: "⚔️", 
    color: "#FF9800",
    game: "Use kind words as your weapon against meanness!"
  },
  { 
    id: "help",
    title: "Help Signal", 
    desc: "Know when and how to ask for help!", 
    icon: "🚨", 
    color: "#E91E63",
    game: "When in doubt, call for backup from trusted adults!"
  }
];

function CyberSafetyGame() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState({});
  const [currentCategory, setCurrentCategory] = useState(null);
  const [questionsCompleted, setQuestionsCompleted] = useState(0);

  // Initialize usedQuestions for each category
  useEffect(() => {
    const initialUsedQuestions = {};
    Object.keys(questionPools).forEach(category => {
      initialUsedQuestions[category] = [];
    });
    setUsedQuestions(initialUsedQuestions);
  }, []);

  const getRandomQuestion = (category) => {
    const questions = questionPools[category];
    const availableQuestions = questions.filter((_, index) => !usedQuestions[category].includes(index));
    
    // If all questions have been used, reset for this category
    if (availableQuestions.length === 0) {
      setUsedQuestions(prev => ({...prev, [category]: []}));
      const randomIndex = Math.floor(Math.random() * questions.length);
      return questions[randomIndex];
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    const originalIndex = questions.findIndex(q => q.q === selectedQuestion.q);
    
    // Mark this question as used
    setUsedQuestions(prev => ({
      ...prev,
      [category]: [...prev[category], originalIndex]
    }));
    
    return selectedQuestion;
  };

  const startGame = () => {
  if (selectedCard === null) {
    alert("Please select a game card first!");
    return;
  }

  setGameActive(true);
  setScore(0);
  setStreak(0);
  setLevel(1);
  setQuestionsCompleted(0);
  setCurrentCategory(playCards[selectedCard].id);
  setCurrentQuestion(getRandomQuestion(playCards[selectedCard].id));
  setSelectedAnswer(null);
  setShowResult(false);

  // 👇 Force scroll to top of the game container
  setTimeout(() => {
    const container = document.querySelector(".cyber-safety-game");
    if (container) {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 100); 
};


  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    setTimeout(() => {
      const wasCorrect = answerIndex === currentQuestion.correct;
      
      if (wasCorrect) {
        setScore(score + 10);
        setStreak(streak + 1);
      } else {
        setStreak(0);
      }
      
      setQuestionsCompleted(questionsCompleted + 1);
      
      // Check if we've completed all questions in this category
      if (questionsCompleted + 1 >= questionPools[currentCategory].length) {
        // Category completed - show completion message
        setShowResult(false);
        setCurrentQuestion(null);
      } else {
        // Get next question
        setCurrentQuestion(getRandomQuestion(currentCategory));
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2000);
  };

  const PlayCard = ({ card, index }) => {
    const cardStyle = {
      borderColor: selectedCard === index ? '#FBBF24' : `${card.color}40`,
    };
    
    return (
      <div 
        className={`play-card ${selectedCard === index ? 'selected' : ''}`}
        style={cardStyle}
        onClick={() => setSelectedCard(index)}
      >
        <div className="text-center">
          <div className="card-icon">{card.icon}</div>
          <h3 className="card-title" style={{ color: card.color }}>{card.title}</h3>
          <p className="card-desc">{card.desc}</p>
          {selectedCard === index && (
            <div className="game-tip">
              <p className="tip-title">🎮 Game Tip:</p>
              <p className="tip-text">{card.game}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const resetGame = () => {
    setGameActive(false);
    setSelectedCard(null);
    setCurrentQuestion(null);
    
    // Reset used questions
    const initialUsedQuestions = {};
    Object.keys(questionPools).forEach(category => {
      initialUsedQuestions[category] = [];
    });
    setUsedQuestions(initialUsedQuestions);
  };

  return (
    <div className="cyber-safety-game">
      <div className="game-container">
        {/* Hero Character */}
        <div className="hero-section">
          <div className="hero-character">
            <div className="character-avatar">🦸‍♂️</div>
            <div className="level-badge">{level}</div>
          </div>
          <h1 className="game-title">Captain Cyber's Safety Arena!</h1>
          <p className="game-subtitle">Choose your adventure and become a cyber hero! 🌟</p>
        </div>

        {!gameActive ? (
          <>
            {/* Play Cards */}
            <div className="cards-grid">
              {playCards.map((card, index) => (
                <PlayCard key={card.id} card={card} index={index} />
              ))}
            </div>

            {/* Start Button */}
            <div className="start-button-container">
              <button
                onClick={startGame}
                className="start-button"
              >
                <span className="icon">🏆</span>
                Start Cyber Adventure! 🚀
              </button>
              {selectedCard !== null && (
                <p className="selected-card-hint">
                  Playing: <strong>{playCards[selectedCard].title}</strong>
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="game-screen">
            {/* Game Stats with Category Indicator */}
            <div className="game-stats">
              <div className="stat">
                <div className="stat-value">{score}</div>
                <div className="stat-label">Score</div>
              </div>
              <div className="stat">
                <div className="stat-value">{streak}</div>
                <div className="stat-label">Streak 🔥</div>
              </div>
              <div className="stat">
                <div className="stat-value">{questionsCompleted}/{questionPools[currentCategory].length}</div>
                <div className="stat-label">Progress</div>
              </div>
              <div className="stat">
                <div className="stat-category">
                  {playCards.find(card => card.id === currentCategory)?.icon}
                </div>
                <div className="stat-label">
                  {playCards.find(card => card.id === currentCategory)?.title}
                </div>
              </div>
            </div>

            {/* Completion Message */}
            {questionsCompleted >= questionPools[currentCategory].length ? (
              <div className="completion-message">
                <div className="completion-emoji">🎉</div>
                <h2 className="completion-title">Category Complete!</h2>
                <p className="completion-text">
                  Amazing job! You've completed all {questionPools[currentCategory].length} questions in {playCards.find(card => card.id === currentCategory)?.title}!
                </p>
                <p className="completion-score">Your score: {score} points</p>
                <button className="completion-button" onClick={resetGame}>
                  🏠 Return to Main Menu
                </button>
              </div>
            ) : currentQuestion ? (
              /* Question Card */
              <div className="question-card">
                <div className="question-header">
                  <div className="question-emoji">{currentQuestion.emoji}</div>
                  <h2 className="question-text">
                    {currentQuestion.q}
                  </h2>
                </div>

                <div className="options-container">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      className={`option-button ${
                        showResult
                          ? index === currentQuestion.correct
                            ? 'correct'
                            : index === selectedAnswer
                            ? 'incorrect'
                            : ''
                          : ''
                      }`}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                      {showResult && index === currentQuestion.correct && (
                        <span className="option-result">✅</span>
                      )}
                      {showResult && index === selectedAnswer && index !== currentQuestion.correct && (
                        <span className="option-result">❌</span>
                      )}
                    </button>
                  ))}
                </div>

                {showResult && (
                  <div className="result-feedback">
                    <div className="result-emoji">
                      {selectedAnswer === currentQuestion.correct ? '🎉' : '💪'}
                    </div>
                    <p className="result-text">
                      {selectedAnswer === currentQuestion.correct 
                        ? "Awesome! You're a cyber hero!" 
                        : "Keep learning! Every hero makes mistakes!"}
                    </p>
                  </div>
                )}
              </div>
            ) : null}

            {questionsCompleted < questionPools[currentCategory].length && (
              <div className="back-button-container">
                <button
                  onClick={resetGame}
                  className="back-button"
                >
                  🏠 Back to Adventure Map
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CyberSafetyGame;