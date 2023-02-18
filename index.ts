import { IQuizContent, IQuizContentAnswer } from './quiz-content.interface';

const resultEl: HTMLElement = document.getElementById('result');
const jsonEl: HTMLElement = document.getElementById('json');
const statsEl: HTMLElement = document.getElementById('stats');
const textarea: HTMLTextAreaElement = document.getElementById(
  'textarea'
) as HTMLTextAreaElement;

const fn = (event?) => {
  const valueTextarea: string = textarea.value;
  const contents: IQuizContent[] = quizConvertTextToContents(valueTextarea);
  if (jsonEl) {
    jsonEl.innerHTML = JSON.stringify(contents, null, ' ');
  }
  const text = quizConvertContentsToText(contents);
  resultEl.innerHTML = text;
  let stats: string = 'Всего вопросов: ' + contents.length + ' шт.';
  let countWithoutRightAnswers: number = 0;
  for (const content of contents) {
    if (!content.right_answer) {
      countWithoutRightAnswers++;
    }
  }
  if (countWithoutRightAnswers) {
    stats += '\nНЕ УКАЗАНЫХ ПРАВИЛЬНЫХ ОТВЕТОВ: ' + countWithoutRightAnswers;
  }
  stats += '\nКоличество ответов во всех вопросов:';
  const statsInfo: any = quizCalcCountAnswers(contents);
  Object.keys(statsInfo).forEach((key) => {
    stats += '\n' + statsInfo[key] + ' вопросов по ' + key + ' ответа';
  });
  statsEl.innerHTML = stats;
};
textarea.addEventListener('input', fn);

export const quizConvertTextToContents = (text: string): IQuizContent[] => {
  const msgError: string[] = [];
  const contents: IQuizContent[] = [];
  const textLn: string[] = text.split('\n');
  for (let ln of textLn) {
    const row: string[] = ln.split('\t');
    if (row.length > 4 && +row[3] > 0) {
      const answers: IQuizContentAnswer[] = [];
      for (let i = 4; i < row.length; i++) {
        if (row[i]) {
          answers.push({
            text: row[i],
          });
        }
      }
      let content: IQuizContent = {
        list_id: '',
        title: row[1].trim(),
        type: 'radio',
        answers,
        right_answer: +row[3],
      };
      contents.push(content);
    }
  }
  return contents;
};

export const quizConvertContentsToText = (contents: IQuizContent[]): string => {
  let text: string = '';
  contents.forEach((content: IQuizContent, indexContent: number) => {
    text += '\n' + (indexContent + 1) + '. ' + content.title;
    const rightAnswer = content.right_answer;
    content.answers.forEach(
      (answer: IQuizContentAnswer, indexAnswer: number) => {
        let isRight: boolean;
        if (typeof rightAnswer === 'number' && rightAnswer > 0) {
          isRight = indexAnswer + 1 === rightAnswer;
        } else if (typeof rightAnswer === 'object' && rightAnswer?.value) {
          isRight = rightAnswer?.value === '' + answer._id;
        }
        text +=
          '\n' +
          (isRight ? '*' : '') +
          String.fromCharCode(97 + indexAnswer) +
          ') ' +
          answer.text;
      }
    );
    text += '\n';
  });
  return text;
};

export const quizCalcCountAnswers = (contents: IQuizContent[]): any => {
  const stats: any = {};
  for (const content of contents) {
    stats[content.answers.length] = (stats[content.answers.length] || 0) + 1;
  }
  return stats;
};

fn();
