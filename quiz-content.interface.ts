export interface IQuizContent {
  /**
   * ID
   */
  _id?: string;

  /**
   * ID курса
   */
  list_id: string;

  /**
   * Номер для сортировки
   */
  order?: number;

  /**
   * Заголовок вопроса
   */
  title: string;

  /**
   * Короткий текст для вопроса
   */
  title_short?: string;

  /**
   * Контент если не все описан в заголовке
   */
  content?: string;

  /**
   * Тип текста/вопроса/курса/...
   */
  type: 'radio' | 'checkbox' | 'scale' | 'start' | 'finish';

  /**
   * Вес вопроса
   */
  weight?: number;

  /**
   * Продолжительность в минутах за данный вопрос
   */
  duration?: number;

  /**
   * Варианты ответов
   */
  answers?: IQuizContentAnswer[];

  /**
   * Перемещать ответы?
   */
  is_shuffle?: boolean;

  /**
   * ID правильных ответов
   */
  right_answer?: any;

  /**
   * Варианты правильно ответа для input
   */
  right_input?: any;

  /**
   * Дополнительные настройки
   */
  settings?: any;

  /**
   * Время создания
   */
  created?: Date;

  /**
   * Время последнего изменения
   */
  modified?: Date;

  /**
   * Отключен?
   */
  is_disabled?: boolean;

  /**
   * Удален?
   */
  is_deleted?: boolean;
}

export interface IQuizContentAnswer {
  /**
   * ID
   */
  _id?: string;

  /**
   * Текст ответа
   */
  text: string;

  /**
   * Ссылка
   */
  link?: string;

  /**
   * Вес варианта ответа
   */
  weight?: number;
}
