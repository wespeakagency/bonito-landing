export type Chapter = {
  id: number;
  title: string;
  duration: string;
  audioSrc: string | null;
};

type ChaptersByLanguage = {
  [key in 'es' | 'en' | 'fr' | 'zh' | 'pt' | 'hi']: Chapter[];
};

export const chapters: ChaptersByLanguage = {
  es: [
    {
      id: 1,
      title: 'Prólogo',
      duration: '1:45',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/bb6467550019e13b9e379a43d2185f6bf5c0ce1f/Pro%CC%81logo.mp3',
    },
    {
      id: 2,
      title: 'C1 - Negociando con compasión',
      duration: '9:08',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C1%20-%20Negociando%20con%20compasio%CC%81n.mp3',
    },
    {
      id: 3,
      title: 'C2 - La compasión como ventaja competitiva',
      duration: '8:44',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C2%20-%20La%20compasio%CC%81n%20como%20ventaja%20competitiva.mp3',
    },
    {
      id: 4,
      title: 'C3 - Hagamos un intercambio ( el trueque )',
      duration: '8:02',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C3%20-%20Hagamos%20un%20intercambio%20(%20el%20trueque%20).mp3',
    },
    {
      id: 5,
      title: "C4 - Habla bonito ( lección del pueblo Q'ero )",
      duration: '9:49',
      audioSrc:
        "https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C4%20-%20Habla%20bonito%20(%20leccio%CC%81n%20del%20pueblo%20Q'ero%20).mp3",
    },
    {
      id: 6,
      title: 'C5 - Las seis paramitas ( negociar desde la virtud )',
      duration: '13:01',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C5%20-%20La%20seis%20paramitas%20(%20negociar%20desde%20la%20virtud%20).mp3',
    },
    {
      id: 7,
      title: 'C6 - Desaprender',
      duration: '7:55',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C6%20-%20Desaprender.mp3',
    },
    {
      id: 8,
      title: 'C7 - Perder para ganar',
      duration: '7:55',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C7%20-%20Perder%20para%20ganar.mp3',
    },
    {
      id: 9,
      title: 'C9 - Un secuestro',
      duration: '9:48',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C9%20-%20Un%20secuestro.mp3',
    },
    {
      id: 10,
      title: 'C10 - Negociando con el espejo',
      duration: '5:41',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C10%20-%20Negociando%20con%20el%20espejo.mp3',
    },
    {
      id: 11,
      title: 'C11 - Gracias por negociar bonito',
      duration: '4:23',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C11%20-%20Gracias%20por%20negociar%20bonito.mp3',
    },
  ],
  fr: [
    {
      id: 1,
      title: 'Chapitre 1 - Négocier avec compassion',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/Chapitre%201%20-%20Ne%CC%81gocier%20avec%20compassion%20-.mp3',
    },
    {
      id: 2,
      title: 'Chapitre 2 - La compassion crée un avantage concurrentiel',
      duration: '',
      audioSrc: "https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/Chapitre%202%20%20La%20compassion%20cre%CC%81e%20un%20avantage%20concurrentiel%20-.mp3",
    },
    {
      id: 3,
      title: 'Chapitre 3 - Faisons un échange',
      duration: '',
      audioSrc: "https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/Chapitre%203%20%20Faisons%20un%20e%CC%81change%20-.mp3",
    },
    {
      id: 4,
      title: "Chapitre 4 - Parlez avec beauté - une leçon du peuple Q'ero",
      duration: '',
      audioSrc: "https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/Chapitre%204%20%20Parlez%20avec%20beaute%CC%81%20-%20une%20lec%CC%A7on%20du%20peuple%20Q'ero%20-.mp3",
    },
    {
      id: 5,
      title: 'Chapitre 5 - Les Six Paramitas - Commercer avec la Vertu',
      duration: '',
      audioSrc: "https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/Chapitre%205%20%20Les%20Six%20Paramitas%20-%20Commercer%20avec%20la%20Vertu%20-.mp3",
    },
    {
      id: 6,
      title: 'Chapitre 6 - Désapprentissage',
      duration: '',
      audioSrc: "https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/Chapitre%206%20%20De%CC%81sapprentissage%20-.mp3",
    },
    {
      id: 7,
      title: 'Chapitre 7 - Perdre pour gagner',
      duration: '',
      audioSrc: "https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/Chapitre%207%20%20Perdre%20pour%20gagner%20-.mp3",
    },
    {
      id: 8,
      title: 'Chapitre 8 - Négocier pour aider',
      duration: '',
      audioSrc: "https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/Chapitre%208%20%20Ne%CC%81gocier%20pour%20aider%20-.mp3",
    },
    {
      id: 9,
      title: 'Chapitre 9 - Un enlèvement',
      duration: '',
      audioSrc: "https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/Chapitre%209%20%20Un%20enle%CC%80vement%20-.mp3",
    },
    {
      id: 10,
      title: 'Chapitre 10 - Négociez avec le miroir',
      duration: '',
      audioSrc: "https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/Chapitre%2010%20%20Ne%CC%81gociez%20avec%20le%20miroir%20-.mp3",
    },
    {
      id: 11,
      title: 'Chapitre 11 - Dernières notes',
      duration: '',
      audioSrc: "https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/Chapitre%2011%20Dernie%CC%80res%20notes%20-.mp3",
    },
  ],
  en: [],
  zh: [],
  pt: [],
  hi: [],
};
