import { useState } from 'react';
import { omit, slice } from 'lodash';
import { useCorrectAnswers } from '../useCorrectAnswers';
import './CharacterChip.css';

const CheckSvg = () => <svg viewBox="0 0 24 24" title="Check"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>

const CrossSvg = () => <svg viewBox="0 0 24 24" title="Close"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>

export const CharacterChip = ({ character, activeColor, showResults, userAnswers, setUserAnswers, setActiveColorStack }) => {
    const { key, name, color: correctColor } = character;
    const [selectedColor, setSelectedColor] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const { correctAnswersMap } = useCorrectAnswers({userAnswers});
    const isCorrect = showResults && correctAnswersMap[key];

    
    const chipDivColorStyle = {
        backgroundColor: selectedColor,
        border: selectedColor ? `solid 5px ${selectedColor}` : isHovered ? `solid 5px ${activeColor}` : 'solid 5px lightgrey',
        color: (selectedColor) ? (parseInt(selectedColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff' : '#000'
    }

    const resultBadgeStyle = {
        backgroundColor: isCorrect ? 'white' : correctColor,
        border: isCorrect ? 'solid 3px green' : `solid 3px ${correctColor}`,
        fill: isCorrect ? 'green' : (parseInt(correctColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff'
    }

    const onClick = () => {
        if (showResults) return;

        if (!selectedColor) {
            setSelectedColor(activeColor);
            setUserAnswers(answers => ({...answers, [key]: activeColor}));
            setActiveColorStack(stack => slice(stack, 1, stack.length));
        } else {
            setUserAnswers(answers => omit(answers, [key]));
            setActiveColorStack(stack => [selectedColor, ...stack]);
            setSelectedColor(null);
        }
        
    };

    return (
        <div>
            <div
                onClick={onClick}
                style={chipDivColorStyle}
                className='chip-div'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {showResults && <div className='result-badge' style={resultBadgeStyle}>
                    {isCorrect ? <CheckSvg/> : <CrossSvg/>}
                </div>}
                <img alt={name} src={`/images/${key}.webp`} className='chara-img' />
                <div className='name'>{name}</div>
            </div>
        </div>
        
    )
}