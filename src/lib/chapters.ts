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
  zh: [
    {
      id: 1,
      title: 'C1 - 以同情心协商',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C1%20%E4%BB%A5%E5%90%8C%E6%83%85%E5%BF%83%E5%8D%94%E5%95%86_2.mp3',
    },
    {
      id: 2,
      title: 'C2 - 同理心创造竞争优势',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C2%20%20%E5%90%8C%E7%90%86%E5%BF%83%E5%89%B5%E9%80%A0%E7%AB%B6%E7%88%AD%E5%84%AA%E5%8B%A2_2.mp3',
    },
    {
      id: 3,
      title: 'C3 - 我们来交换一下',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C3%20%20%E6%88%91%E5%80%91%E4%BE%86%E4%BA%A4%E6%8F%9B%E4%B8%80%E4%B8%8B_2.mp3',
    },
    {
      id: 4,
      title: "C4 - 说话美听：Q'ero族人的一课",
      duration: '',
      audioSrc: "https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C4%20%E8%AA%AA%E8%A9%B1%E7%BE%8E%E8%81%BD%EF%BC%9AQ'ero%E6%97%8F%E4%BA%BA%E7%9A%84%E4%B8%80%E8%AA%B2_2.mp3",
    },
    {
      id: 5,
      title: 'C5 - 第五章',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C5%20%E7%AC%AC%E4%BA%94%E7%AB%A0_2.mp3',
    },
    {
      id: 6,
      title: 'C6 - 第六章',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C6%20%20%E7%AC%AC%E5%85%AD%E7%AB%A0_2.mp3',
    },
    {
      id: 7,
      title: 'C7 - 第七章',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C7%20%E7%AC%AC%E4%B8%83%E7%AB%A0_2.mp3',
    },
    {
      id: 8,
      title: 'C8 - 第八章',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C8%20%E7%AC%AC%E5%85%AB%E7%AB%A0_2.mp3',
    },
    {
      id: 9,
      title: 'C9 - 第九章',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C9%20%E7%AC%AC%E4%B9%9D%E7%AB%A0_2.mp3',
    },
    {
      id: 10,
      title: 'C10 - 第十章',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C10%20%E7%AC%AC%E5%8D%81%E7%AB%A0_2.mp3',
    },
    {
      id: 11,
      title: 'C11 - 第十一章',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C11%20%E7%AC%AC%E5%8D%81%E4%B8%80%E7%AB%A0_2.mp3',
    },
  ],
  en: [
    {
      id: 1,
      title: 'Chapter 1 - Negotiating beautifully',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C1%20-%20Negotiating%20beautifully_1.mp3',
    },
    {
      id: 2,
      title: 'Chapter 2 - Compassion creates a competitive advantage',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C2%20-%20Compassion%20creates%20a%20competitive%20advantaje_1.mp3',
    },
    {
      id: 3,
      title: "Chapter 3 - Let's make a trade",
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C3%20-%20%20Lets%20make%20a%20trade_1.mp3',
    },
    {
      id: 4,
      title: "Chapter 4 - Speak beautifully (a lesson from the Q'ero people)",
      duration: '',
      audioSrc:
        "https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C4%20Speak%20beautifully%20(a%20lesson%20from%20the%20Q'ero%20people)-.mp3",
    },
    {
      id: 5,
      title: 'Chapter 5 - The Six Paramitas (Negotiating from Virtue)',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C5%20The%20Six%20Paramitas%20(%20Negotiating%20from%20Virtue%20)_1.mp3',
    },
    {
      id: 6,
      title: 'Chapter 6 - Unlearn',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C6%20Unlearn-.mp3',
    },
    {
      id: 7,
      title: 'Chapter 7 - Losing to win',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C7%20Losing%20to%20win-.mp3',
    },
    {
      id: 8,
      title: 'Chapter 8 - Negotiate to help',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C8%20-%20Negotiate%20to%20help_1.mp3',
    },
    {
      id: 9,
      title: 'Chapter 9 - A kidnapping',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C9%20A%20kidnapping-.mp3',
    },
    {
      id: 10,
      title: 'Chapter 10 - Negotiating with the mirror',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C10%20Negotiating%20with%20the%20mirror-.mp3',
    },
    {
      id: 11,
      title: 'Chapter 11 - Endnotes',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C11%20Endnotes_1.mp3',
    },
  ],
  pt: [
    {
      id: 1,
      title: 'Capítulo 1 - Negociar lindamente',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C1P%20-%20Negociar%20lindamente_1.mp3',
    },
    {
      id: 2,
      title: 'Capítulo 2 - Compaixão cria uma vantagem competitiva',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C2P%20-%20Compassion%20creates%20a%20competitive%20advantaje_1.mp3',
    },
    {
      id: 3,
      title: 'Capítulo 3 - Vamos fazer uma troca',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C3P%20-%20Vamos%20fazer%20uma%20troca-.mp3',
    },
    {
      id: 4,
      title: "Capítulo 4 - Fala lindamente (uma lição do povo Q'ero)",
      duration: '',
      audioSrc:
        "https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C4P%20-Fala%20lindamente%20(uma%20lic%CC%A7a%CC%83o%20do%20povo%20Q'ero)_1.mp3",
    },
    {
      id: 5,
      title: 'Capítulo 5 - As Seis Paramitas (Negociando a partir da Virtude)',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C5P%20As%20Seis%20Paramitas%20(%20Negociando%20a%20partir%20da%20Virtude)-.mp3',
    },
    {
      id: 6,
      title: 'Capítulo 6 - Desaprender',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C6P%20Desaprender_1.mp3',
    },
    {
      id: 7,
      title: 'Capítulo 7 - Perder para ganhar',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C7P%20Perder%20para%20ganhar-.mp3',
    },
    {
      id: 8,
      title: 'Capítulo 8 - Negociar para ajudar',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C8P%20-%20Negociar%20para%20ajudar_1.mp3',
    },
    {
      id: 9,
      title: 'Capítulo 9 - Um rapto',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C9P%20Um%20rapto_1.mp3',
    },
    {
      id: 10,
      title: 'Capítulo 10 - Negociando com o espelho',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C10P%20Negotiating%20with%20the%20mirror-.mp3',
    },
    {
      id: 11,
      title: 'Capítulo 11 - Obrigado',
      duration: '',
      audioSrc:
        'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C11P%20-%20Obrigado_1.mp3',
    },
  ],
  hi: [
    {
      id: 1,
      title: 'अध्याय 1 - खूबसूरती से संवाद करें',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/%E0%A4%85%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AF%201%20-%20%E0%A4%96%E0%A5%82%E0%A4%AC%E0%A4%B8%E0%A5%82%E0%A4%B0%E0%A4%A4%E0%A5%80%20%E0%A4%B8%E0%A5%87%20%E0%A4%B8%E0%A4%82%E0%A4%B5%E0%A4%BE%E0%A4%A6%20%E0%A4%95%E0%A4%B0%E0%A5%87%E0%A4%82_1.mp3',
    },
    {
      id: 2,
      title: 'अध्याय 2 - करुणा प्रतिस्पर्धी लाभ पैदा करती है',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/%E0%A4%85%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AF%202%20-%20%E0%A4%95%E0%A4%B0%E0%A5%81%E0%A4%A3%E0%A4%BE%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A4%E0%A4%BF%E0%A4%B8%E0%A5%8D%E0%A4%AA%E0%A4%B0%E0%A5%8D%E0%A4%A7%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%95%20%E0%A4%B2%E0%A4%BE%E0%A4%AD%20%E0%A4%AA%E0%A5%88%E0%A4%A6%E0%A4%BE%20%E0%A4%95%E0%A4%B0%E0%A4%A4%E0%A5%80%20%E0%A4%B9%E0%A5%88_1.mp3',
    },
    {
      id: 3,
      title: 'अध्याय 3 - चलो एक व्यापार करते हैं',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/%E0%A4%85%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AF%203%20-%20%E0%A4%9A%E0%A4%B2%E0%A5%8B%20%E0%A4%8F%E0%A4%95%20%E0%A4%B5%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AA%E0%A4%BE%E0%A4%B0%20%E0%A4%95%E0%A4%B0%E0%A4%A4%E0%A5%87%20%E0%A4%B9%E0%A5%88%E0%A4%82_1.mp3',
    },
    {
      id: 4,
      title: 'अध्याय 4 - खूबसूरती से बोलें (क्यूरो लोगों से एक सबक)',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/%E0%A4%85%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AF%204-.mp3',
    },
    {
      id: 5,
      title: 'अध्याय 5 - छह पारमिता (पुण्य से व्यापार)',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/%E0%A4%85%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AF%205%20-%E0%A4%9B%E0%A4%B9%20%E0%A4%AA%E0%A4%BE%E0%A4%B0%E0%A4%AE%E0%A4%BF%E0%A4%A4%E0%A4%BE%20(%20%E0%A4%AA%E0%A5%81%E0%A4%A3%E0%A5%8D%E0%A4%AF%20%E0%A4%B8%E0%A5%87%20%E0%A4%B5%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AA%E0%A4%BE%E0%A4%B0%20)-.mp3',
    },
    {
      id: 6,
      title: 'अध्याय 6 - अनलर्निंग',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/%E0%A4%85%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AF%206%20-%20%E0%A4%85%E0%A4%A8%E0%A4%B2%E0%A4%B0%E0%A5%8D%E0%A4%A8%E0%A4%BF%E0%A4%82%E0%A4%97-.mp3',
    },
    {
      id: 7,
      title: 'अध्याय 7 - जीतने के लिए हारना',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/%E0%A4%85%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AF%207%20-%20%E0%A4%9C%E0%A5%80%E0%A4%A4%E0%A4%A8%E0%A5%87%20%E0%A4%95%E0%A5%87%20%E0%A4%B2%E0%A4%BF%E0%A4%8F%20%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%A8%E0%A4%BE-.mp3',
    },
    {
      id: 8,
      title: 'अध्याय 8 - मदद के लिए बातचीत',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/%E0%A4%85%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AF%208%20-%20%E0%A4%AE%E0%A4%A6%E0%A4%A6%20%E0%A4%95%E0%A5%87%20%E0%A4%B2%E0%A4%BF%E0%A4%8F%20%E0%A4%AC%E0%A4%BE%E0%A4%A4%E0%A4%9A%E0%A5%80%E0%A4%A4_1.mp3',
    },
    {
      id: 9,
      title: 'अध्याय 9 - एक अपहरण',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/%E0%A4%85%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AF%209%20-%20%E0%A4%8F%E0%A4%95%20%E0%A4%85%E0%A4%AA%E0%A4%B9%E0%A4%B0%E0%A4%A3-.mp3',
    },
    {
      id: 10,
      title: 'अध्याय 10 - दर्पण के साथ बातचीत करें',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/%E0%A4%85%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AF%2010%20-%20%E0%A4%A6%E0%A4%B0%E0%A5%8D%E0%A4%AA%E0%A4%A3%20%E0%A4%95%E0%A5%87%20%E0%A4%B8%E0%A4%BE%E0%A4%A5%20%E0%A4%AC%E0%A4%BE%E0%A4%A4%E0%A4%9A%E0%A5%80%E0%A4%A4%20%E0%A4%95%E0%A4%B0%E0%A5%87%E0%A4%82_1.mp3',
    },
    {
      id: 11,
      title: 'अध्याय 11 - धन्यवाद',
      duration: '',
      audioSrc: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/%E0%A4%85%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AF%2011%20-%20%E0%A4%A7%E0%A4%A8%E0%A5%8D%E0%A4%AF%E0%A4%B5%E0%A4%BE%E0%A4%A6_1.mp3',
    },
  ],
};
