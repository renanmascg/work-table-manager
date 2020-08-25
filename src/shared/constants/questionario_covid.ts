const SYMPTOMS_STATUS_NO_SYMPTOM = 'SEM_SINTOMAS';
const SYMPTOMS_STATUS_LIGHT = 'LEVE';
const SYMPTOMS_STATUS_HARD = 'GRAVE';

const COLAB_STATUS_NO_ACOMPANHAMENTO = 'Sem acompanhamento';
const COLAB_STATUS_AGUARDANDO_ACOMPANHAMENTO = 'Aguardando contato';
const COLAB_STATUS_EM_ACOMPANHAMENTO = 'Em acompanhamento';
const COLAB_STATUS_ORIENTADO_LIBERADO = 'Orientado e liberado';
const COLAB_STATUS_ORIENTADO_FICAR_CASA = 'Orientado a ficar em casa';
const COLAB_STATUS_ENCAMINHADO_UNIDADE_SAUDE = 'Encaminhado à unidade de saúde';
const COLAB_STATUS_ENCAMINHADO_FAZER_EXAMES = 'Encaminhado a fazer exames';

const COLABORADOR_STATUS = [
  COLAB_STATUS_NO_ACOMPANHAMENTO,
  COLAB_STATUS_AGUARDANDO_ACOMPANHAMENTO,
  COLAB_STATUS_EM_ACOMPANHAMENTO,
  COLAB_STATUS_ORIENTADO_LIBERADO,
  COLAB_STATUS_ORIENTADO_FICAR_CASA,
  COLAB_STATUS_ENCAMINHADO_UNIDADE_SAUDE,
  COLAB_STATUS_ENCAMINHADO_FAZER_EXAMES,
];

const SYMPTOMS_STATUS = [
  SYMPTOMS_STATUS_NO_SYMPTOM,
  SYMPTOMS_STATUS_LIGHT,
  SYMPTOMS_STATUS_HARD,
];

const QUIZ_FULL_QUESTIONS = [
  'Febre\nMaior ou igual a 37,8°C',
  'Tosse',
  'Falta de ar\nRespiração ofegante',
  // 'Contato com caso\nconfirmado',
  'Perda súbita de\nOlfato ou paladar',
  'Dor de Garganta',
  'Nariz entupido',
  'Coriza',
  'Dor de Cabeça',
  'Diarreia',
  'Náuseas ou vômitos',
  // 'Vômitos',
  'Familiar apresentou sintomas',
];

const QUIZ_QUESTIONS = [
  'Febre\nMaior ou igual a 37,8°C',
  'Tosse',
  'Falta de ar\nRespiração ofegante',
  // 'Contato com caso\nconfirmado',
  'Perda súbita de\nOlfato ou paladar',
  'Dor de Garganta',
  'Nariz entupido',
  'Coriza',
  'Dor de Cabeça',
  'Diarreia',
  'Náuseas ou vômitos',
  // 'Vômitos'
];

const COVID_HARD_SYMPTOMS = [
  'Febre\nMaior ou igual a 37,8°C',
  'Tosse',
  'Falta de ar\nRespiração ofegante',
  // 'Contato com caso\nconfirmado',
  'Perda súbita de\nOlfato ou paladar',
  'Dor de Garganta',
  'Familiar apresentou sintomas',
];

const COVID_SYMPTOMS = [
  'Nariz entupido',
  'Coriza',
  'Dor de Cabeça',
  'Diarreia',
  'Náuseas ou vômitos',
  // 'Vômitos'
];

export default {
  QUIZ_QUESTIONS,
  COVID_SYMPTOMS,
  COVID_HARD_SYMPTOMS,
  COLABORADOR_STATUS,
  SYMPTOMS_STATUS,

  SYMPTOMS_STATUS_NO_SYMPTOM,
  SYMPTOMS_STATUS_LIGHT,
  SYMPTOMS_STATUS_HARD,

  COLAB_STATUS_NO_ACOMPANHAMENTO,
  COLAB_STATUS_AGUARDANDO_ACOMPANHAMENTO,
  COLAB_STATUS_EM_ACOMPANHAMENTO,
  COLAB_STATUS_ORIENTADO_LIBERADO,
  COLAB_STATUS_ORIENTADO_FICAR_CASA,
  COLAB_STATUS_ENCAMINHADO_UNIDADE_SAUDE,
  COLAB_STATUS_ENCAMINHADO_FAZER_EXAMES,
  QUIZ_FULL_QUESTIONS,
};
