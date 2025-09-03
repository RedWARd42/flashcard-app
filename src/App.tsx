import './App.css';
import { useState } from 'react';
import Card from './components/Card.tsx';
import { generateFlashcards } from './api/generateFlashcards';

const placeholderCards = [
    { title: "Capital of France", info: "Paris", difficulty: "easy", image: "https://tse1.mm.bing.net/th/id/OIP.EjrmUWRbGe5dBlE-vlyHkwHaE8?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2"},
    { title: "Color of the sky on a clear day", info: "Blue", difficulty: "easy", image: ""},
    { title: "How many legs does a spider have?", info: "8", difficulty: "easy", image: "https://th.bing.com/th/id/R.be320e432b179e8783c4d0477a2a45fe?rik=cfHPriHgd0GG0A&riu=http%3a%2f%2fi.stack.imgur.com%2fiJQl9.jpg&ehk=jwTyJqY6w8HCKdRKmpNQezjEoJ2Z85OGix1Fjh76h28%3d&risl=&pid=ImgRaw&r=0"},
    { title: "What is H2O more commonly known as?", info: "Water", difficulty: "easy", image: "" },
    { title: "Who painted the Mona Lisa?", info: "Leonardo da Vinci", difficulty: "medium", image: "https://tse1.mm.bing.net/th/id/OIP.sbUZaXBURW_JECS8dpwJ1wHaFm?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2" },
    { title: "Which planet is known for its rings?", info: "Saturn", difficulty: "medium", image: "" },
    { title: "What is the longest river in the world?", info: "Nile", difficulty: "medium", image: "" },
    { title: "What is the square root of 144?", info: "12", difficulty: "medium", image: "" },
    { title: "Who developed the general theory of relativity?", info: "Albert Einstein", difficulty: "difficult", image: "https://tse2.mm.bing.net/th/id/OIP.WyghmIeIaRr_jLSIAT8aBwHaF4?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2" },
    { title: "What year did the Berlin Wall fall?", info: "1989", difficulty: "difficult" },
    { title: "Which country has the most official languages?", info: "South Africa", difficulty: "difficult", image: "https://tse1.mm.bing.net/th/id/OIP.jRa3noTCC7AlX0Nxlxib8AHaGi?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2" },
    { title: "What is the rarest blood type?", info: "AB negative", difficulty: "difficult", image: "" }
];

function App() {

  const [flashcardInfo, setFlashcardInfo] = useState([...placeholderCards]);

  const [displayDeck, setDisplayDeck] = useState([...flashcardInfo]);

  const [index, setIndex] = useState(0);

  const [topic, setTopic] = useState("");

  const handlePrev = () => {
    if(index > 0) {
      setIndex(index - 1);
      setFeedback("");
      setGuess("");
    }
  };

  const handleNext = () => {
    if(index < displayDeck.length - 1) {
      setIndex(index + 1);
      setFeedback("");
      setGuess("");
    }
  };


  const randomIndex = () => {
    if (displayDeck.length <= 1) return;

    let randomPos = Math.floor(Math.random() * (displayDeck.length));
    do {
      randomPos = Math.floor(Math.random() * displayDeck.length);
    } while (randomPos === index);

    setIndex(randomPos);
    setFeedback("");
    setGuess("");
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;


    try {
      const newCards = await generateFlashcards(topic);


      setFlashcardInfo(newCards);
      setDisplayDeck([...newCards]);
      setIndex(0);
      setFeedback("");
      setGuess("");
    } catch (err) {
      console.error("Flashcard generation failed:", err);
      alert("Failed to generate flashcards. Please try again.");
    }
  };


  const shuffleDeck = () => {
    const shuffled = [...displayDeck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setDisplayDeck(shuffled);
    setIndex(0); // reset to first in new order
    setFeedback("");
    setGuess("");
  };

  const [guess, setGuess] = useState("");

  const [feedback, setFeedback] = useState("");


  const handleGuess = () => {
    const name = displayDeck[index].info.toLowerCase().trim();
    const reply = guess.toLowerCase().trim();

    const similarity = jaroWinkler(reply, name);

    if (similarity > 0.9) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
  };

  
  function jaroWinkler(s1: string, s2: string): number {
    if (s1 === s2) return 1.0;

    const len1 = s1.length;
    const len2 = s2.length;

    if (len1 === 0 || len2 === 0) return 0.0;

    const matchDistance = Math.floor(Math.max(len1, len2) / 2) - 1;

    const matchedS1 = new Array(len1).fill(false);
    const matchedS2 = new Array(len2).fill(false);

    let matches = 0;
    for (let i = 0; i < len1; i++) {
      const start = Math.max(0, i - matchDistance);
      const end = Math.min(i + matchDistance + 1, len2);

      for (let j = start; j < end; j++) {
        if (!matchedS2[j] && s1[i] === s2[j]) {
          matchedS1[i] = true;
          matchedS2[j] = true;
          matches++;
          break;
        }
      }
    }

    if (matches === 0) return 0.0;

    let transpositions = 0;
    let k = 0;
    for (let i = 0; i < len1; i++) {
      if (matchedS1[i]) {
        while (!matchedS2[k]) k++;
        if (s1[i] !== s2[k]) transpositions++;
        k++;
      }
    }

    const jaro =
      (matches / len1 +
      matches / len2 +
      (matches - transpositions / 2) / matches) / 3;

    let prefix = 0;
    for (let i = 0; i < Math.min(4, len1, len2); i++) {
      if (s1[i] === s2[i]) prefix++;
      else break;
    }

    return jaro + prefix * 0.1 * (1 - jaro);
  }

  return (
    <div>
      <h1 className='title'>AI Flashcards</h1>
      <p className='title'>Enter information about any topic and it will produce flashcards automatically for you. Please specify the amount of cards.</p>
      <div className="generate-section">
        <h2>Enter Flashcard Information</h2>
        <textarea placeholder="Enter a topic to generate flashcards..." value={topic} onChange={(e) => setTopic(e.target.value)}/>
        <button onClick={handleGenerate}>Generate Flashcards</button>
      </div>
      <div className='card-display'>
        <h2>Set Size: {flashcardInfo.length}</h2>
        <h3>Current Card: #{index + 1}</h3>
        <div className='card-interact'>
          <button className="position-btn" onClick={handlePrev} disabled={index == 0}>&lt;</button>
          <Card key={index} title={displayDeck[index].title} info={displayDeck[index].info} difficulty={displayDeck[index].difficulty} image={displayDeck[index].image}/>
          <button className="position-btn" onClick={handleNext} disabled={index == flashcardInfo.length - 1}>&gt;</button>
        </div>
        <div className='actions'>
          <div className='guess-answer'>
            <h3>Guess the answer: </h3>
            <input type="text" value={guess} onChange={(event) => setGuess(event.target.value)} className={feedback} placeholder='Enter your answer...'/>
            <button onClick={handleGuess}>Check</button>
          </div>
          <div className='change-buttons'>
            <button onClick={randomIndex}>Random</button>
            <button onClick={shuffleDeck}>Shuffle</button>
          </div>
        </div>
      </div>
      <div className='whole-set'>
        <h2>Entire Set</h2>
        <div className='card-container'>
          {flashcardInfo.map((card, i) => (
            <Card key={i} title={card.title} info={card.info} difficulty={card.difficulty} image={card.image}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
