'use strict';

const LANGUAGE_KEY = 'delfA2Language';
const GAME_ID = 'delf_a2_game_01';
const { episodes, review } = window.DELF_A2_CONTENT;
const EPISODE_QUESTION_COUNT = episodes.reduce((sum, episode) => sum + episode.questions.length, 0);
const REVIEW_QUESTION_COUNT = review.exercises.reduce((sum, exercise) => sum + exercise.questions.length, 0);
const TOTAL_QUESTIONS = EPISODE_QUESTION_COUNT + REVIEW_QUESTION_COUNT;
const MAX_SCORE = TOTAL_QUESTIONS * 10;

const ui = {
  vi: {
    gameTitle: '🏮 Lễ hội ở Belle-Rive',
    subtitle: 'Chiến dịch 6 nhiệm vụ · Luyện đọc hiểu và viết tiếng Pháp A2',
    eyebrow: 'DELF A2 · CHIẾN DỊCH ĐỌC VÀ VIẾT',
    back: '← DELF A2',
    languageButton: 'English',
    languageLabel: 'Chuyển ngôn ngữ sang tiếng Anh',
    analytics: 'Tùy chọn phân tích',
    statusLabel: 'Tiến độ trò chơi',
    score: '⭐ Điểm đọc: ',
    stage: {
      intro: 'Mở đầu',
      reading: 'Đọc hiểu',
      writing: 'Viết',
      episodeEnd: 'Hoàn thành nhiệm vụ',
      reviewReading: 'Bài tổng ôn · Đọc',
      reviewWriting: 'Bài tổng ôn · Viết',
      final: 'Hoàn thành chiến dịch'
    },
    episode: 'Nhiệm vụ',
    of: '/',
    start: 'Bắt đầu nhiệm vụ →',
    readingStart: 'Trả lời câu hỏi →',
    readingQuestions: 'Câu',
    tryAgain: 'Chưa đúng. Hãy tìm chi tiết trong văn bản rồi thử lại nhé.',
    hintPrefix: 'Gợi ý: ',
    correct: 'Chính xác!',
    evidence: 'Chi tiết trong bài: ',
    reveal: 'Xem đáp án và tiếp tục',
    nextQuestion: 'Câu tiếp theo →',
    completeTitle: 'Bạn đã tìm được các manh mối!',
    completeRead: 'Bây giờ hãy dùng thông tin vừa đọc để hoàn thành nhiệm vụ viết.',
    startWriting: 'Bắt đầu viết →',
    vocabularyShow: '💡 Gợi ý từ vựng',
    vocabularyHide: 'Ẩn gợi ý từ vựng',
    vocabularyTitle: 'Một vài từ hữu ích',
    writingIntro: 'Viết bằng tiếng Pháp. Trò chơi không tự chấm chất lượng ngôn ngữ; hãy tự xem lại rồi tham khảo bài mẫu.',
    writeLabel: 'Bài viết của bạn bằng tiếng Pháp',
    wordCount: 'Số từ',
    shortText: 'A2 · đoạn văn ngắn',
    reviewTitle: 'Trước khi gửi, hãy tự kiểm tra',
    phraseBank: 'Xem một số cụm từ gợi ý',
    showSample: 'Xem bài mẫu sau khi viết',
    sampleTitle: 'Một cách trả lời',
    sampleNote: 'Đây chỉ là một bài mẫu; bạn có thể viết cách khác.',
    finishWriting: 'Hoàn thành nhiệm vụ viết →',
    emptyWriting: 'Hãy viết ít nhất một câu tiếng Pháp trước khi hoàn thành nhé.',
    requiredFields: 'Hãy điền tất cả các mục của phiếu trước khi tiếp tục.',
    continue: 'Tiếp tục câu chuyện →',
    nextEpisode: 'Nhiệm vụ tiếp theo →',
    reviewStart: 'Bắt đầu bài tổng ôn DELF A2 →',
    reviewReadingIntro: 'Bốn bài đọc ngắn nguyên bản. Xác định loại văn bản, người viết, mục đích và các chi tiết quan trọng. Khi được hỏi, hãy chọn câu trong bài làm bằng chứng.',
    reviewWritingIntro: 'Hai bài viết độc lập. Mỗi bài cần ít nhất 60 từ theo hướng dẫn DELF A2 hiện hành. Bạn tự xem lại theo bảng tiêu chí; trò chơi không tự chấm chất lượng ngôn ngữ.',
    reviewQuestion: 'Câu',
    readingExamTime: 'Gợi ý luyện tập: dành khoảng 30 phút cho phần đọc.',
    writingExamTime: 'Gợi ý luyện tập: dành khoảng 45 phút cho hai bài viết.',
    minimum: 'Tối thiểu 60 từ',
    minimumHint: 'Hãy viết đủ ít nhất 60 từ để hoàn thành bài luyện tập này.',
    wordCountInfo: 'Một từ được tính theo khoảng trắng; dạng có dấu gạch nối hoặc dấu nháy tính là một từ.',
    nextWritingTask: 'Sang bài viết thứ hai →',
    finishReview: 'Hoàn thành bài tổng ôn →',
    episodeEnd: 'Bạn đã hoàn thành nhiệm vụ này!',
    campaignComplete: 'Bạn đã hoàn thành cả sáu nhiệm vụ và bài tổng ôn đọc–viết.',
    finalSub: 'Điểm chỉ phản ánh câu hỏi đọc hiểu có đáp án khách quan; bài viết được tự xem lại, không được AI tự chấm.',
    finalHeading: 'Chúc mừng, bạn đã giúp Belle-Rive!',
    replay: '🔄 Chơi lại chiến dịch',
    return: 'Về trang DELF A2',
    languageChanged: 'Đã chuyển ngôn ngữ sang tiếng Việt.',
    gameStarted: 'Bạn đã sẵn sàng cho chuyến phiêu lưu!',
    reviewTask: 'Bài viết',
    writeQuestion: 'Hãy hoàn thành phần viết rồi tự đánh giá bằng danh sách kiểm tra.'
  },
  en: {
    gameTitle: '🏮 The Belle-Rive Festival',
    subtitle: 'Six-mission campaign · A2 French reading and writing practice',
    eyebrow: 'DELF A2 · READING AND WRITING CAMPAIGN',
    back: '← DELF A2',
    languageButton: 'Tiếng Việt',
    languageLabel: 'Switch language to Vietnamese',
    analytics: 'Analytics preferences',
    statusLabel: 'Game progress',
    score: '⭐ Reading score: ',
    stage: {
      intro: 'Welcome',
      reading: 'Reading',
      writing: 'Writing',
      episodeEnd: 'Mission complete',
      reviewReading: 'Final review · Reading',
      reviewWriting: 'Final review · Writing',
      final: 'Campaign complete'
    },
    episode: 'Mission',
    of: '/',
    start: 'Start the mission →',
    readingStart: 'Answer the questions →',
    readingQuestions: 'Question',
    tryAgain: 'Not quite. Look for this detail in the text, then try again.',
    hintPrefix: 'Hint: ',
    correct: 'That’s right!',
    evidence: 'Text clue: ',
    reveal: 'Show the answer and continue',
    nextQuestion: 'Next question →',
    completeTitle: 'You found the clues!',
    completeRead: 'Now use what you read to complete the writing task.',
    startWriting: 'Start writing →',
    vocabularyShow: '💡 Vocabulary hints',
    vocabularyHide: 'Hide vocabulary hints',
    vocabularyTitle: 'A few useful words',
    writingIntro: 'Write in French. The game does not automatically grade language quality; review your work, then compare it with the sample.',
    writeLabel: 'Your writing in French',
    wordCount: 'Words',
    shortText: 'A2 · short text',
    reviewTitle: 'Review your writing before you send it',
    phraseBank: 'Open some useful phrases',
    showSample: 'Show a sample after writing',
    sampleTitle: 'One possible reply',
    sampleNote: 'This is one example; other answers are possible.',
    finishWriting: 'Finish the writing task →',
    emptyWriting: 'Write at least one sentence in French before you finish.',
    requiredFields: 'Complete every form field before continuing.',
    continue: 'Continue the story →',
    nextEpisode: 'Next mission →',
    reviewStart: 'Start the DELF A2 review →',
    reviewReadingIntro: 'Four original reading exercises. Identify the text type, writer, purpose, and key details. When asked, choose a sentence from the text as evidence.',
    reviewWritingIntro: 'Two independent writing tasks. Each should have at least 60 words, following current DELF A2 guidance. Use the checklist to review your work; the game does not automatically grade language quality.',
    reviewQuestion: 'Question',
    readingExamTime: 'Suggested practice: allow about 30 minutes for reading.',
    writingExamTime: 'Suggested practice: allow about 45 minutes for both writing tasks.',
    minimum: 'At least 60 words',
    minimumHint: 'Write at least 60 words to complete this practice task.',
    wordCountInfo: 'A word is counted as a group separated by spaces; hyphenated or apostrophe forms count as one word.',
    nextWritingTask: 'Continue to writing task 2 →',
    finishReview: 'Finish the final review →',
    episodeEnd: 'You completed this mission!',
    campaignComplete: 'You completed all six missions and the reading-and-writing review.',
    finalSub: 'The score reflects only objective reading questions; writing is self-reviewed and is not automatically graded by AI.',
    finalHeading: 'Congratulations—you helped Belle-Rive!',
    replay: '🔄 Replay the campaign',
    return: 'Back to DELF A2',
    languageChanged: 'Language changed to English.',
    gameStarted: 'Your adventure is ready!',
    reviewTask: 'Writing task',
    writeQuestion: 'Complete the response, then use the checklist to review it.'
  }
};

function getSavedLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'vi';
  } catch (error) {
    console.warn('Unable to read the saved DELF A2 language preference.', error);
    return 'vi';
  }
}

function makeReadingState(questionCount) {
  return {
    started: false,
    index: 0,
    attempts: Array(questionCount).fill(0),
    solved: Array(questionCount).fill(false),
    feedback: null,
    matches: Array(questionCount).fill(null)
  };
}

function makeWritingState(reviewItems, formFields = 0) {
  return {
    draft: '',
    shownSample: false,
    checked: Array(reviewItems).fill(false),
    formValues: Array(formFields).fill(''),
    error: ''
  };
}

function makeState() {
  return {
    episodeIndex: 0,
    phase: 'intro',
    reading: makeReadingState(episodes[0].questions.length),
    writing: makeWritingState(episodes[0].writing.review.length, episodes[0].writing.form?.fields.length || 0),
    vocabularyOpen: false,
    reviewIndex: 0,
    reviewReading: makeReadingState(review.exercises[0].questions.length),
    reviewTaskIndex: 0,
    reviewDrafts: review.writingTasks.map(() => makeWritingState(4)),
    score: 0,
    firstCorrect: 0,
    finished: false
  };
}

let language = getSavedLanguage();
let state = makeState();

function trackGame(eventName, extra = {}) {
  window.llgTrack?.(eventName, {
    game_id: GAME_ID,
    game_name: GAME_ID,
    language,
    ...extra
  });
}

function el(tag, className, value, parent) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined && value !== null) node.textContent = value;
  if (parent) parent.append(node);
  return node;
}

function button(label, action, className = 'primary-button') {
  const node = document.createElement('button');
  node.type = 'button';
  node.className = className;
  node.textContent = label;
  node.addEventListener('click', action);
  return node;
}

function tr(value) {
  return typeof value === 'string' ? value : value[language];
}

function updateLanguage() {
  const c = ui[language];
  document.documentElement.lang = language;
  document.title = `${c.gameTitle.replace(/^🏮 /u, '')} · DELF A2`;
  document.querySelector('meta[name="description"]').content = c.subtitle;
  window.llgUpdateAnalyticsLanguage?.();
  document.getElementById('pageTitle').textContent = c.gameTitle;
  document.getElementById('pageSubtitle').textContent = c.subtitle;
  document.getElementById('eyebrow').textContent = c.eyebrow;
  document.getElementById('backLink').textContent = c.back;
  const languageButton = document.getElementById('languageToggle');
  languageButton.textContent = c.languageButton;
  languageButton.setAttribute('aria-label', c.languageLabel);
  document.getElementById('analyticsSettings').textContent = c.analytics;
  document.getElementById('gameStatus').setAttribute('aria-label', c.statusLabel);
}

function saveLanguage(nextLanguage) {
  const currentDraft = document.getElementById('writingDraft');
  if (currentDraft && state.phase === 'writing') state.writing.draft = currentDraft.value;
  const reviewDraft = document.getElementById('reviewDraft');
  if (reviewDraft && state.phase === 'reviewWriting') {
    state.reviewDrafts[state.reviewTaskIndex].draft = reviewDraft.value;
  }
  language = nextLanguage;
  try {
    localStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    console.warn('Unable to save the DELF A2 language preference.', error);
  }
  updateLanguage();
  render();
  document.getElementById('languageAnnouncement').textContent = ui[language].languageChanged;
}

function updateStatus() {
  const c = ui[language];
  const episodeNo = state.episodeIndex + 1;
  let stage = c.stage[state.phase];
  if (state.phase === 'reading' || state.phase === 'writing' || state.phase === 'episodeEnd') {
    stage = `${c.episode} ${episodeNo} / ${episodes.length} · ${c.stage[state.phase]}`;
  } else if (state.phase === 'reviewReading') {
    stage = `${c.reviewQuestion} ${state.reviewIndex + 1} / ${review.exercises.length} · ${c.stage.reviewReading}`;
  } else if (state.phase === 'reviewWriting') {
    stage = `${c.reviewTask} ${state.reviewTaskIndex + 1} / ${review.writingTasks.length} · ${c.stage.reviewWriting}`;
  }
  document.getElementById('stage').textContent = stage;
  document.getElementById('score').textContent = `${c.score}${state.score} / ${MAX_SCORE}`;
  let progress = 0;
  if (state.phase === 'intro') progress = state.episodeIndex / episodes.length * 82;
  if (state.phase === 'reading') {
    const count = episodes[state.episodeIndex].questions.length;
    progress = (state.episodeIndex + 0.12 + 0.48 * (state.reading.index / count)) / episodes.length * 82;
  }
  if (state.phase === 'writing') progress = (state.episodeIndex + 0.78) / episodes.length * 82;
  if (state.phase === 'episodeEnd') progress = (state.episodeIndex + 1) / episodes.length * 82;
  if (state.phase === 'reviewReading') progress = 82 + (state.reviewIndex / review.exercises.length) * 9;
  if (state.phase === 'reviewWriting') progress = 91 + (state.reviewTaskIndex / review.writingTasks.length) * 8;
  if (state.phase === 'final') progress = 100;
  document.getElementById('progressBar').style.width = `${progress}%`;
  const track = document.getElementById('progressTrack');
  track.setAttribute('aria-valuenow', String(Math.round(progress)));
  track.setAttribute('aria-label', c.statusLabel);
}

function render() {
  updateStatus();
  const panel = document.getElementById('game');
  panel.replaceChildren();
  if (state.phase === 'intro') renderIntro(panel);
  else if (state.phase === 'reading') renderEpisodeReading(panel);
  else if (state.phase === 'writing') renderEpisodeWriting(panel);
  else if (state.phase === 'episodeEnd') renderEpisodeEnd(panel);
  else if (state.phase === 'reviewReading') renderReviewReading(panel);
  else if (state.phase === 'reviewWriting') renderReviewWriting(panel);
  else renderFinal(panel);
  if (state.phase === 'final' && state.finished) showRewards(false);
}

function showRewards(trackCompletion) {
  window.LLG?.finish({
    game: GAME_ID,
    score: state.score,
    max: MAX_SCORE,
    firstCorrect: state.firstCorrect,
    total: TOTAL_QUESTIONS,
    missions: episodes.length * 2 + 2,
    trackCompletion
  });
}

function renderIntro(panel) {
  const episode = episodes[state.episodeIndex];
  const c = ui[language];
  el('p', 'episode-marker', `${c.episode} ${state.episodeIndex + 1} / ${episodes.length}`, panel);
  el('h2', '', tr(episode.title), panel);
  const story = el('div', 'story-card', tr(episode.story), panel);
  story.lang = language;
  const actions = el('div', 'actions', null, panel);
  actions.append(button(c.start, () => {
    trackGame('game_start', { replay: false, episode_number: state.episodeIndex + 1 });
    state.phase = 'reading';
    render();
  }));
}

function renderSources(parent, sources) {
  sources.forEach((source) => {
    const card = el('article', 'source-card', null, parent);
    el('p', 'source-label', tr(source.label), card);
    source.paragraphs.forEach((line) => {
      const paragraph = el('p', 'french-text', line, card);
      paragraph.lang = 'fr';
    });
  });
}

function renderVocabulary(parent, vocabulary) {
  if (!vocabulary.length) return;
  const c = ui[language];
  const toggle = button(state.vocabularyOpen ? c.vocabularyHide : c.vocabularyShow, () => {
    state.vocabularyOpen = !state.vocabularyOpen;
    render();
  }, 'hint-toggle');
  toggle.setAttribute('aria-expanded', String(state.vocabularyOpen));
  toggle.setAttribute('aria-controls', 'vocabularyHints');
  parent.append(toggle);
  if (!state.vocabularyOpen || !vocabulary.length) return;
  const hints = el('section', 'hint-card', null, parent);
  hints.id = 'vocabularyHints';
  el('h3', '', c.vocabularyTitle, hints);
  const list = el('ul', '', null, hints);
  vocabulary.forEach(([french, vi, en]) => {
    const item = el('li', '', null, list);
    const word = el('span', '', french, item);
    word.lang = 'fr';
    item.append(document.createTextNode(` — ${language === 'vi' ? vi : en}`));
  });
}

function renderReadingBlock(panel, task, reading, context) {
  const c = ui[language];
  el('h2', '', tr(task.title), panel);
  el('p', 'muted', tr(task.intro), panel);
  if (context.showExamTime) el('p', 'exam-time', c.readingExamTime, panel);
  renderSources(panel, task.sources);
  renderVocabulary(panel, task.vocabulary || []);

  if (!reading.started) {
    const actions = el('div', 'actions', null, panel);
    actions.append(button(c.readingStart, () => {
      reading.started = true;
      render();
    }));
    return;
  }

  if (reading.index >= task.questions.length) {
    el('h3', '', c.completeTitle, panel);
    el('p', 'muted', c.completeRead, panel);
    const actions = el('div', 'actions', null, panel);
    actions.append(button(context.completeLabel, context.onComplete));
    return;
  }

  const question = task.questions[reading.index];
  const questionLabel = context.isReview ? c.reviewQuestion : c.readingQuestions;
  el('p', 'question-count', `${questionLabel} ${reading.index + 1} ${c.of} ${task.questions.length}`, panel);
  el('p', 'question-text', tr(question.prompt), panel);
  if (question.type === 'matching') renderMatchingQuestion(panel, question, reading, context);
  else renderChoiceQuestion(panel, question, reading, context);
}

function renderEpisodeReading(panel) {
  const episode = episodes[state.episodeIndex];
  renderReadingBlock(panel, {
    title: episode.readingTitle,
    intro: episode.readingIntro,
    sources: episode.sources,
    vocabulary: episode.vocabulary,
    questions: episode.questions
  }, state.reading, {
    isReview: false,
    missionNumber: state.episodeIndex * 2 + 1,
    episodeNumber: state.episodeIndex + 1,
    completeLabel: ui[language].startWriting,
    onComplete: () => {
      trackGame('mission_complete', {
        mission_number: state.episodeIndex * 2 + 1,
        episode_number: state.episodeIndex + 1,
        score: state.score
      });
      state.phase = 'writing';
      render();
    }
  });
}

function renderReviewReading(panel) {
  const exercise = review.exercises[state.reviewIndex];
  const task = {
    title: exercise.title,
    intro: review.readingIntro,
    sources: exercise.sources,
    vocabulary: [],
    questions: exercise.questions
  };
  renderReadingBlock(panel, task, state.reviewReading, {
    isReview: true,
    missionNumber: episodes.length * 2 + 1,
    completeLabel: state.reviewIndex + 1 < review.exercises.length ? ui[language].continue : ui[language].startWriting,
    onComplete: () => {
      if (state.reviewIndex + 1 < review.exercises.length) {
        state.reviewIndex += 1;
        state.reviewReading = makeReadingState(review.exercises[state.reviewIndex].questions.length);
        state.vocabularyOpen = false;
        render();
        return;
      }
      trackGame('mission_complete', {
        mission_number: episodes.length * 2 + 1,
        score: state.score
      });
      state.phase = 'reviewWriting';
      render();
    }
  });
}

function renderFeedback(panel, question, reading) {
  const c = ui[language];
  const feedback = reading.feedback;
  if (!feedback) return;
  const good = feedback.correct;
  const box = el('div', `feedback ${good ? 'good' : 'try'}`, null, panel);
  el('p', '', good ? c.correct : c.tryAgain, box);
  if (good || feedback.revealed) {
    const detail = el('p', '', null, box);
    detail.append(document.createTextNode(c.evidence));
    el('span', '', tr(question.explanation), detail);
  } else {
    const detail = el('p', '', null, box);
    detail.append(document.createTextNode(c.hintPrefix));
    el('span', '', tr(question.hint), detail);
  }
  const actions = el('div', 'actions', null, panel);
  if (good || feedback.revealed) {
    actions.append(button(c.nextQuestion, () => {
      reading.index += 1;
      reading.feedback = null;
      render();
    }));
  } else if (reading.attempts[reading.index] >= 2) {
    actions.append(button(c.reveal, () => {
      reading.feedback = { correct: false, revealed: true };
      render();
    }, 'secondary-button'));
  }
}

function renderChoiceQuestion(panel, question, reading, context) {
  const options = question.options[language];
  const choices = el('div', 'choices', null, panel);
  options.forEach((option, index) => {
    const choice = button(option, () => answerQuestion(question, reading, context, index === question.answer), 'choice');
    if (reading.feedback && (reading.feedback.correct || reading.feedback.revealed)) {
      choice.disabled = true;
      if (index === question.answer) choice.classList.add('correct');
    }
    choices.append(choice);
  });
  renderFeedback(panel, question, reading);
}

function renderMatchingQuestion(panel, question, reading, context) {
  const questionIndex = reading.index;
  if (!reading.matches[questionIndex]) {
    reading.matches[questionIndex] = Array(question.rows.length).fill('');
  }
  const selections = reading.matches[questionIndex];
  const options = question.options[language];
  const rows = el('div', 'matching-rows', null, panel);
  let checkButton;
  question.rows.forEach((row, rowIndex) => {
    const label = el('label', 'matching-row', null, rows);
    el('span', '', tr(row.label), label);
    const select = document.createElement('select');
    select.setAttribute('aria-label', tr(row.label));
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = language === 'vi' ? 'Chọn công việc…' : 'Choose a task…';
    select.append(placeholder);
    options.forEach((option, optionIndex) => {
      const item = document.createElement('option');
      item.value = String(optionIndex);
      item.textContent = option;
      select.append(item);
    });
    select.value = selections[rowIndex];
    select.disabled = Boolean(reading.feedback && (reading.feedback.correct || reading.feedback.revealed));
    select.addEventListener('change', () => {
      selections[rowIndex] = select.value;
      if (checkButton) checkButton.disabled = selections.some((selection) => selection === '');
    });
    label.append(select);
  });
  checkButton = button(language === 'vi' ? 'Kiểm tra câu trả lời' : 'Check matches', () => {
    const correct = question.rows.every((row, index) => Number(selections[index]) === row.answer);
    answerQuestion(question, reading, context, correct);
  });
  checkButton.disabled = selections.some((selection) => selection === '');
  if (reading.feedback && (reading.feedback.correct || reading.feedback.revealed)) checkButton.disabled = true;
  panel.append(checkButton);
  renderFeedback(panel, question, reading);
}

function answerQuestion(question, reading, context, correct) {
  const index = reading.index;
  const attempt = reading.attempts[index] + 1;
  reading.attempts[index] = attempt;
  trackGame('answer', {
    mission_number: context.missionNumber,
    question_number: index + 1,
    correct: correct ? 1 : 0,
    attempt,
    question_type: question.type || 'choice',
    ...(context.episodeNumber ? { episode_number: context.episodeNumber } : {})
  });
  if (correct) {
    if (!reading.solved[index]) state.score += 10;
    if (attempt === 1) state.firstCorrect += 1;
    reading.solved[index] = true;
  }
  reading.feedback = { correct };
  render();
}

function renderForm(parent, form, writingState) {
  const c = ui[language];
  const section = el('section', 'task-card', null, parent);
  el('h3', '', tr(form.title), section);
  el('p', 'muted', tr(form.prompt), section);
  const fields = el('div', 'form-fields', null, section);
  form.fields.forEach((field, index) => {
    const label = el('label', 'writing-field', tr(field.label), fields);
    const input = document.createElement('input');
    input.type = 'text';
    input.value = writingState.formValues[index] || '';
    input.placeholder = tr(field.placeholder);
    input.addEventListener('input', () => {
      writingState.formValues[index] = input.value;
    });
    label.append(input);
  });
}

function renderWritingEditor(parent, writing, writingState, options = {}) {
  const c = ui[language];
  const label = el('label', '', c.writeLabel, parent);
  label.htmlFor = options.id;
  const textarea = el('textarea', 'writing-area', null, parent);
  textarea.id = options.id;
  textarea.lang = 'fr';
  textarea.maxLength = 4000;
  textarea.placeholder = 'Salut…';
  textarea.value = writingState.draft;
  textarea.setAttribute('aria-describedby', `${options.countId} ${options.messageId}`);
  const meta = el('div', 'writing-meta', null, parent);
  const counter = el('span', '', null, meta);
  counter.id = options.countId;
  el('span', '', options.minimum ? c.minimum : c.shortText, meta);

  let sampleButton;
  let submitButton;
  const countWords = () => {
    const count = textarea.value.trim() ? textarea.value.trim().split(/\s+/u).length : 0;
    writingState.draft = textarea.value;
    counter.textContent = `${c.wordCount}: ${count}${options.minimum ? ' / 60' : ''}`;
    if (sampleButton) sampleButton.disabled = count === 0;
    if (submitButton) submitButton.disabled = options.minimum ? count < 60 : count === 0;
  };
  textarea.addEventListener('input', countWords);
  countWords();

  if (writing.phrases?.length) {
    const details = el('details', '', null, parent);
    el('summary', '', c.phraseBank, details);
    const list = el('div', 'phrase-list', null, details);
    writing.phrases.forEach(([french, vi, en]) => {
      const phrase = el('span', 'phrase', null, list);
      const word = el('strong', '', french, phrase);
      word.lang = 'fr';
      phrase.append(document.createTextNode(` — ${language === 'vi' ? vi : en}`));
    });
  }

  const message = el('p', 'feedback try', writingState.error, parent);
  message.id = options.messageId;
  message.hidden = !writingState.error;
  const actions = el('div', 'actions', null, parent);
  sampleButton = button(c.showSample, () => {
    writingState.draft = textarea.value;
    writingState.shownSample = true;
    render();
    document.getElementById(options.sampleId)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, 'secondary-button');
  sampleButton.disabled = !textarea.value.trim();
  actions.append(sampleButton);
  submitButton = button(options.submitLabel, () => options.onSubmit(textarea.value), 'primary-button');
  submitButton.disabled = options.minimum
    ? textarea.value.trim().split(/\s+/u).filter(Boolean).length < 60
    : !textarea.value.trim();
  actions.append(submitButton);

  if (writingState.shownSample) {
    const sample = el('section', 'sample-card', null, parent);
    sample.id = options.sampleId;
    sample.tabIndex = -1;
    el('h3', '', c.sampleTitle, sample);
    const example = el('p', '', writing.sample, sample);
    example.lang = 'fr';
    el('p', 'muted', c.sampleNote, sample);
  }
  return textarea;
}

function renderSelfReview(parent, labels, writingState) {
  const checklist = el('div', 'checklist', null, parent);
  labels.forEach((labelText, index) => {
    const label = el('label', '', null, checklist);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = writingState.checked[index] || false;
    checkbox.addEventListener('change', () => { writingState.checked[index] = checkbox.checked; });
    label.append(checkbox, document.createTextNode(tr(labelText)));
  });
}

function renderEpisodeWriting(panel) {
  const episode = episodes[state.episodeIndex];
  const writing = episode.writing;
  const writingState = state.writing;
  const c = ui[language];
  el('h2', '', tr(writing.title), panel);
  el('p', 'muted', c.writingIntro, panel);
  const task = el('section', 'task-card', null, panel);
  el('h3', '', language === 'vi' ? 'Nhiệm vụ viết' : 'Your writing task', task);
  el('p', '', tr(writing.prompt), task);
  const requirements = el('ul', 'prompt-list', null, task);
  writing.requirements.forEach((requirement) => el('li', '', tr(requirement), requirements));
  if (writing.form) renderForm(panel, writing.form, writingState);
  renderWritingEditor(panel, writing, writingState, {
    id: 'writingDraft',
    countId: 'wordCount',
    messageId: 'writingMessage',
    sampleId: 'sampleCard',
    submitLabel: c.finishWriting,
    onSubmit: (draft) => finishEpisodeWriting(draft, writing),
    minimum: false
  });
  el('h3', '', c.reviewTitle, panel);
  renderSelfReview(panel, writing.review, writingState);
}

function finishEpisodeWriting(draft, writing) {
  state.writing.draft = draft.trim();
  const requiredFormFields = episodes[state.episodeIndex].writing.form?.fields.length || 0;
  if (!state.writing.draft) {
    state.writing.error = ui[language].emptyWriting;
    render();
    return;
  }
  if (state.writing.formValues.slice(0, requiredFormFields).some((value) => !value.trim())) {
    state.writing.error = ui[language].requiredFields;
    render();
    return;
  }
  state.writing.error = '';
  trackGame('mission_complete', {
    mission_number: state.episodeIndex * 2 + 2,
    episode_number: state.episodeIndex + 1,
    score: state.score
  });
  state.phase = 'episodeEnd';
  render();
}

function renderEpisodeEnd(panel) {
  const c = ui[language];
  const episode = episodes[state.episodeIndex];
  el('div', 'result-badge', '⭐', panel);
  el('h2', 'center', c.episodeEnd, panel);
  el('p', 'center muted', tr(episode.writing.end), panel);
  el('p', 'center', `${c.score}${state.score} / ${MAX_SCORE}`, panel);
  const actions = el('div', 'actions', null, panel);
  if (state.episodeIndex + 1 < episodes.length) {
    actions.append(button(c.nextEpisode, () => {
      state.episodeIndex += 1;
      state.phase = 'intro';
      state.reading = makeReadingState(episodes[state.episodeIndex].questions.length);
      state.writing = makeWritingState(
        episodes[state.episodeIndex].writing.review.length,
        episodes[state.episodeIndex].writing.form?.fields.length || 0
      );
      state.vocabularyOpen = false;
      render();
    }));
  } else {
    actions.append(button(c.reviewStart, () => {
      state.phase = 'reviewReading';
      state.reviewIndex = 0;
      state.reviewReading = makeReadingState(review.exercises[0].questions.length);
      render();
    }));
  }
}

function renderReviewReading(panel) {
  const exercise = review.exercises[state.reviewIndex];
  renderReadingBlock(panel, {
    title: exercise.title,
    intro: review.readingIntro,
    sources: exercise.sources,
    vocabulary: [],
    questions: exercise.questions
  }, state.reviewReading, {
    isReview: true,
    showExamTime: state.reviewIndex === 0,
    missionNumber: episodes.length * 2 + 1,
    completeLabel: state.reviewIndex + 1 < review.exercises.length ? ui[language].continue : ui[language].startWriting,
    onComplete: () => {
      if (state.reviewIndex + 1 < review.exercises.length) {
        state.reviewIndex += 1;
        state.reviewReading = makeReadingState(review.exercises[state.reviewIndex].questions.length);
        render();
        return;
      }
      trackGame('mission_complete', {
        mission_number: episodes.length * 2 + 1,
        score: state.score
      });
      state.phase = 'reviewWriting';
      state.reviewTaskIndex = 0;
      render();
    }
  });
}

function renderReviewWriting(panel) {
  const taskIndex = state.reviewTaskIndex;
  const writing = review.writingTasks[taskIndex];
  const writingState = state.reviewDrafts[taskIndex];
  const c = ui[language];
  el('h2', '', `${c.reviewTask} ${taskIndex + 1} / ${review.writingTasks.length} · ${tr(writing.title)}`, panel);
  el('p', 'muted', review.writingIntro[language], panel);
  if (taskIndex === 0) el('p', 'exam-time', c.writingExamTime, panel);
  const task = el('section', 'task-card', null, panel);
  el('p', '', tr(writing.prompt), task);
  el('p', 'word-count-note', c.wordCountInfo, task);
  renderWritingEditor(panel, writing, writingState, {
    id: 'reviewDraft',
    countId: 'reviewWordCount',
    messageId: 'reviewWritingMessage',
    sampleId: 'reviewSample',
    submitLabel: taskIndex + 1 < review.writingTasks.length ? c.nextWritingTask : c.finishReview,
    onSubmit: (draft) => finishReviewWritingTask(draft),
    minimum: true
  });
  el('h3', '', c.reviewTitle, panel);
  renderSelfReview(panel, writing.review, writingState);
}

function finishReviewWritingTask(draft) {
  const taskIndex = state.reviewTaskIndex;
  const writingState = state.reviewDrafts[taskIndex];
  writingState.draft = draft.trim();
  const words = writingState.draft ? writingState.draft.split(/\s+/u).length : 0;
  if (words < 60) {
    writingState.error = ui[language].minimumHint;
    render();
    return;
  }
  writingState.error = '';
  if (taskIndex + 1 < review.writingTasks.length) {
    state.reviewTaskIndex += 1;
    render();
    return;
  }
  trackGame('mission_complete', {
    mission_number: episodes.length * 2 + 2,
    score: state.score
  });
  state.phase = 'final';
  state.finished = true;
  render();
  showRewards(true);
}

function renderFinal(panel) {
  const c = ui[language];
  el('div', 'result-badge', '🎉', panel);
  el('h2', 'center', c.finalHeading, panel);
  el('p', 'center muted', c.campaignComplete, panel);
  el('p', 'center', `${c.score}${state.score} / ${MAX_SCORE}`, panel);
  el('p', 'center muted', c.finalSub, panel);
  const actions = el('div', 'actions', null, panel);
  actions.append(button(c.replay, replayCampaign));
  actions.append(button(c.return, () => { window.location.href = '../index.html'; }, 'secondary-button'));
}

function replayCampaign() {
  trackGame('game_replay', { previous_score: state.score });
  trackGame('game_start', { replay: true });
  state = makeState();
  render();
}

document.getElementById('languageToggle').addEventListener('click', () => {
  saveLanguage(language === 'vi' ? 'en' : 'vi');
});

updateLanguage();
render();
