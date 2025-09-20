import { useState } from 'react';

interface CardProps {
    title: string;
    info: string;
    difficulty: string;
    image: string | undefined;
}

function Card({ title, info, difficulty, image }: CardProps){

    const [flip, setFlip] = useState(false);

    const handleClick = () => {
        setFlip(!flip? true : false);
    }

    return (
        <div className='flashcard' onClick={handleClick}>
            <div className={`flashcard-content ${flip? "flipped" : ""}`}>
                <div className={`back ${difficulty}`}>
                    <h3>{title}</h3>
                </div>
                <div className='front'>
                    <h4>{info}</h4>
                    <img src={image}/>
                </div>
            </div>
        </div>
    )
}

export default Card;