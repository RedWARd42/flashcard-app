import './App.css';
import { useState } from 'react';
import Card from './components/Card.tsx';

function App() {
  const flashcardInfo = [
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

    const [index, setIndex] = useState(0);

    const handlePrev = () => {
      if(index > 0) {
        setIndex(index - 1);
      }
    };

    const handleNext = () => {
      if(index < flashcardInfo.length - 1) {
        setIndex(index + 1);
      }
    };


    const randomIndex = () => {
      if (flashcardInfo.length <= 1) return;

      let randomPos = Math.floor(Math.random() * (flashcardInfo.length - 1));
      do {
        randomPos = Math.floor(Math.random() * flashcardInfo.length);
      } while (randomPos === index);

      setIndex(randomPos);
    };

  return (
    <div>
      <h1 className='title'>Trivia Flashcards</h1>
      <p className='title'>These are common trivia questions ranging in difficulty from easy to hard. Goodluck studying!</p>
      <div className='card-display'>
        <h2>Set Size: {flashcardInfo.length}</h2>
        <h3>Current Card: #{index + 1}</h3>
        <div className='card-interact'>
          <button className="position-btn" onClick={handlePrev} disabled={index == 0}>&lt;</button>
          <Card key={index} title={flashcardInfo[index].title} info={flashcardInfo[index].info} difficulty={flashcardInfo[index].difficulty} image={flashcardInfo[index].image}/>
          <button className="position-btn" onClick={handleNext} disabled={index == flashcardInfo.length - 1}>&gt;</button>
        </div>
        <button onClick={randomIndex}>Random</button>
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
