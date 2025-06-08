import { filter, get, mapValues } from 'lodash';
import { CHARACTER_COLORS_MAP } from './consts/CharacterColors';

export const useCorrectAnswers = ({ userAnswers }) => {
    const correctAnswersMap = mapValues(CHARACTER_COLORS_MAP, ({key, color}) => get(userAnswers, key) === color);
    const numCorrectAnswers = filter(correctAnswersMap, (value) => value).length;
    const totalQuestions = Object.keys(CHARACTER_COLORS_MAP).length;

    return {correctAnswersMap, numCorrectAnswers, totalQuestions};
}