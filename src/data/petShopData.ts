import { ServiceItem, ServiceAddon, ProductItem, TestimonialItem, FaqItem } from '../types';

export const ATTACHED_IMAGE = '/assets/aistudio/d49fcf78-411b-4ffa-a5a0-32983b6ea0a2_1d433908.png';
export const HERO_IMAGE = ATTACHED_IMAGE;
export const SERVICE_BATH_IMAGE = ATTACHED_IMAGE;
export const SERVICE_GROOMING_IMAGE = ATTACHED_IMAGE;
export const VITRINE_IMAGE = ATTACHED_IMAGE;

export const SERVICES: ServiceItem[] = [
  {
    id: 'banho',
    name: 'Banho Relaxante',
    shortDesc: 'Higiene completa com água quentinha, massagem e produtos hipoalergênicos.',
    fullDesc: 'Nosso banho inclui limpeza auricular suave, corte de unhas inicial, massagem relaxante com água em temperatura controlada, shampoo dermatológico neutro e secagem silenciosa para total tranquilidade do seu pet.',
    durationMinutes: 50,
    prices: {
      small: 45,
      medium: 65,
      large: 90,
    },
    recommendedFor: 'Recomendado a cada 15 a 30 dias para cães e conforme rotina para gatos.',
    image: SERVICE_BATH_IMAGE,
    includes: [
      'Água morna e agradável',
      'Shampoo neutro hipoalergênico',
      'Limpeza suave de ouvidos',
      'Secagem gradual e silenciosa',
      'Penteado e perfume suave (opcional)',
    ],
  },
  {
    id: 'tosa-higienica',
    name: 'Tosa Higiênica',
    shortDesc: 'Aparação cuidadosa das patinhas, barriguinha e região íntima para saúde e bem-estar.',
    fullDesc: 'Essencial para a saúde e higiene diária. Aparação cuidadosa dos coxins (almofadas das patas) para evitar derrapagens, corte ao redor dos olhos para desobstruir a visão e higienização das áreas íntimas.',
    durationMinutes: 30,
    prices: {
      small: 35,
      medium: 45,
      large: 60,
    },
    recommendedFor: 'Ideal para manter o pet sempre limpo e protegido entre as tosas completas.',
    image: SERVICE_GROOMING_IMAGE,
    includes: [
      'Almofadas das patas (coxins)',
      'Região genital e perianal',
      'Aparação da barriga',
      'Limpeza de contorno dos olhos',
    ],
  },
  {
    id: 'tosa-completa',
    name: 'Tosa Completa',
    shortDesc: 'Estilização personalizada (máquina ou tesoura), tosa da raça ou tosa bebê.',
    fullDesc: 'Tosa estilizada feita por profissionais com pós-graduação em estética animal. Adaptamos a tosa padrão da raça ou tosa bebê com tesouras especiais japonesas, garantindo contornos suaves e sem marcas.',
    durationMinutes: 80,
    prices: {
      small: 85,
      medium: 115,
      large: 155,
    },
    recommendedFor: 'Cães e gatos com pelagem média a longa necessitando de alívio térmico ou renovação estética.',
    image: SERVICE_GROOMING_IMAGE,
    includes: [
      'Tosa na máquina ou tesoura',
      'Acabamento fino no rosto e orelhas',
      'Banho preparatório e secagem especial',
      'Tosa higiênica inclusa',
      'Corte e lixamento de unhas',
    ],
  },
  {
    id: 'hidratacao',
    name: 'Hidratação Profunda',
    shortDesc: 'Nutrição com óleos naturais de argan e queratina para pelos macios e brilhantes.',
    fullDesc: 'Tratamento intensivo para pelagens ressecadas ou danificadas. Utilizamos máscara ultra emoliente com queratina vegetal e óleo de argan puro, selando a cutícula dos pelos e facilitando a escovação diária.',
    durationMinutes: 25,
    prices: {
      small: 35,
      medium: 50,
      large: 70,
    },
    recommendedFor: 'Pets com pelos longos, cacheados ou com tendência a embolar.',
    image: SERVICE_BATH_IMAGE,
    includes: [
      'Aplicação de máscara reconstrutora',
      'Tempo de pausa com massagem relaxante',
      'Enxágue com água morna filtrada',
      'Finalizador térmico anti-frizz',
    ],
  },
  {
    id: 'corte-unhas',
    name: 'Corte de Unhas & Lixamento',
    shortDesc: 'Corte seguro milimétrico e acabamento lixado para evitar arranhões e desconforto.',
    fullDesc: 'Corte preciso respeitando o canal vascular da unha do pet, seguido de acabamento lixado para que as pontas não fiquem ásperas. Evita postura incorreta e lesões articulares causadas por unhas compridas.',
    durationMinutes: 15,
    prices: {
      small: 20,
      medium: 25,
      large: 30,
    },
    recommendedFor: 'Pets que caminham pouco em asfalto ou que apresentam unhas pontiagudas.',
    image: ATTACHED_IMAGE,
    includes: [
      'Alicate esterilizado de precisão',
      'Lixamento mecânico suave',
      'Pó hemostático de segurança pré-disponível',
      'Petisco de recompensa no final',
    ],
  },
];

export const ADDONS: ServiceAddon[] = [
  {
    id: 'dentes',
    name: 'Escovação de Dentes',
    price: 18,
    desc: 'Pasta dental enzimática com sabor carne/frango e dedeira macia descartável.',
  },
  {
    id: 'hidratacao-express',
    name: 'Máscara Iluminadora Express',
    price: 25,
    desc: 'Ampola de brilho instantâneo com aminoácidos para pelagens curtas ou médias.',
  },
  {
    id: 'desembaraco',
    name: 'Desembolo Suave Preventivo',
    price: 30,
    desc: 'Fluido bifásico desenredante sem repuxar para nós localizados.',
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    name: 'Ração Super Premium Cães Adultos 3kg',
    category: 'racao',
    price: 139.9,
    badge: 'Mais Vendida',
    desc: 'Fórmula natural de frango e batata doce, rica em ômega 3 e 6 para pelagem brilhante.',
    details: 'Sem corantes nem conservantes artificiais. Níveis ótimos de proteína para digestão suave.',
    volumeOrWeight: 'Pacote 3 kg',
  },
  {
    id: 'p2',
    name: 'Ração Grain-Free Gatos Castrados 1.5kg',
    category: 'racao',
    price: 89.9,
    badge: 'Equilíbrio Renal',
    desc: 'Salmão fresco com fibras funcionais para controle de bolas de pelos e peso ideal.',
    details: 'Enriquecida com taurina e minerais balanceados para saúde urinária de felinos castrados.',
    volumeOrWeight: 'Pacote 1.5 kg',
  },
  {
    id: 'p3',
    name: 'Brinquedo Mordedor Corda Náutica Bicolor',
    category: 'brinquedos',
    price: 34.5,
    badge: 'Ultra Resistente',
    desc: 'Algodão atóxico entrelaçado que auxilia na higienização mecânica dos dentes.',
    details: 'Ideal para brincadeiras de cabo de guerra e alívio do estresse diário em cães de todos os portes.',
    volumeOrWeight: '35 cm',
  },
  {
    id: 'p4',
    name: 'Bola Interativa Dispenser de Petiscos',
    category: 'brinquedos',
    price: 46.0,
    badge: 'Estimulação Mental',
    desc: 'Labirinto interno que libera petiscos aos poucos enquanto o pet rola o brinquedo.',
    details: 'Fabricado em borracha natural atóxica de alta durabilidade com abertura ajustável.',
    volumeOrWeight: 'Diâmetro 8 cm',
  },
  {
    id: 'p5',
    name: 'Guia & Peitoral Ergonômico Anti-Puxão',
    category: 'acessorios',
    price: 79.0,
    badge: 'Passeio Confortável',
    desc: 'Fita reforçada com trama macia respirável e engates rápidos de trava dupla.',
    details: 'Distribui a tração no peito sem estrangular o pescoço. Ajustável para pequeno a grande porte.',
    volumeOrWeight: 'Tam. P / M / G',
  },
  {
    id: 'p6',
    name: 'Shampoo Hipoalergênico Aveia e Camomila 500ml',
    category: 'acessorios',
    price: 42.0,
    badge: 'Dermatológico',
    desc: 'Extrato puro de aveia coloidal para acalmar coceiras e peles sensíveis.',
    details: 'pH fisiológico para cães e gatos. Fórmula biodegradável, suave e sem sulfatos agressivos.',
    volumeOrWeight: 'Frasco 500 ml',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    tutorName: 'Mariana Duarte',
    petName: 'Bento',
    petBreed: 'Shih-tzu',
    serviceUsed: 'Banho & Tosa Bebê',
    rating: 5,
    comment: 'O Bento sempre tremia em outros pet shops. No Focinho Feliz ele vai abanando o rabo e volta super cheiroso e calmo! A tosa bebê ficou impecável e sem marcas.',
  },
  {
    id: 't2',
    tutorName: 'Rodrigo Albuquerque',
    petName: 'Maya',
    petBreed: 'Golden Retriever',
    serviceUsed: 'Banho & Hidratação Profunda',
    rating: 5,
    comment: 'Agendar pelo site sabendo o valor pelo porte da Maya com antecedência facilitou demais minha rotina. O pelo dela ficou incrivelmente sedoso e sem cheiro forte.',
  },
  {
    id: 't3',
    tutorName: 'Camila Ferreira',
    petName: 'Mingau',
    petBreed: 'Gato Persa',
    serviceUsed: 'Tosa Higiênica & Corte de Unhas',
    rating: 5,
    comment: 'Gatos são hiper sensíveis com barulhos de soprador. A equipe teve uma paciência admirável e carinho enorme com o Mingau. Nota 10 em transparência e cuidado!',
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'O valor estimado no agendamento pode sofrer alterações?',
    answer: 'O valor estimado calculado no site é fiel ao porte e serviços selecionados. Caso haja nós excessivos que exijam desembaraço terapêutico ou presença de pulgas/carrapatos com necessidade de banho medicamentoso, nossa equipe sempre consultará e pedirá autorização prévia ao tutor na recepção antes de qualquer custo extra.',
  },
  {
    question: 'É necessário levar a carteirinha de vacinação do meu pet?',
    answer: 'Sim! Para garantir um ambiente 100% seguro para todos os bichinhos, solicitamos que cães e gatos estejam com a vacina múltipla (V8/V10 ou V4/V5) e a vacina antirrábica em dia. Filhotes são aceitos após completarem o ciclo vacinal inicial.',
  },
  {
    question: 'Quanto tempo dura, em média, o atendimento de banho e tosa?',
    answer: 'Um banho convencional leva em torno de 40 a 60 minutos. Banhos acompanhados de tosa completa duram aproximadamente 1h20 a 1h40. Nós prezamos pelo tempo de secagem respeitoso e intervalos para o pet descansar e tomar água.',
  },
  {
    question: 'Vocês atendem cães idosos, filhotes ou com necessidades especiais?',
    answer: 'Com certeza! Temos protocolos adaptados com água morna, mesas rebaixadas com tapetes antiderrapantes, sopradores silenciosos com controle de temperatura e atendimento prioritário sem espera para reduzir qualquer estresse.',
  },
  {
    question: 'Como funciona o envio do agendamento para o WhatsApp?',
    answer: 'Ao terminar as etapas, o site gera um resumo completo com pet, data, hora e valor estimado. Você tem o botão de "Copiar resumo" para colar onde desejar e o botão "Abrir WhatsApp", que abre o aplicativo diretamente no número digitado por você, sem enviar dados a terceiros sem a sua aprovação explícita.',
  },
  {
    question: 'Quais são as formas de pagamento aceitas na loja física?',
    answer: 'O pagamento é feito diretamente na recepção no momento do reencontro com seu pet. Aceitamos Pix, cartões de crédito e débito das principais bandeiras e dinheiro.',
  },
];

export const STORE_INFO = {
  name: 'Focinho Feliz',
  tagline: 'Cuidado afetuoso e estética de confiança para quem você mais ama',
  address: 'Rua das Palmeiras, 142 - Bairro Jardim Pet, São Paulo - SP',
  addressDisclaimer: '(Endereço demonstrativo)',
  phoneDisplay: '(11) 98765-4321',
  phoneDisclaimer: '(Número demonstrativo)',
  email: 'agendamentos@focinhofeliz.pet.exemplo',
  hoursWeekday: 'Segunda a Sexta: 08:00 às 18:30',
  hoursSaturday: 'Sábados: 08:00 às 17:00',
  hoursSunday: 'Domingos e Feriados: Fechado para descanso da equipe',
  legalNotice: 'Focinho Feliz é um pet shop fictício criado exclusivamente para demonstração do fluxo de agendamento online de banho e tosa. Preços, marcas e informações exibidas são para fins ilustrativos.',
};
