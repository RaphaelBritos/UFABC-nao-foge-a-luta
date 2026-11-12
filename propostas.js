/* Edite as propostas e os eixos aqui quando o site estiver sem Supabase.
 * Com Supabase, cadastre ou edite pelo painel administrativo.
 * Se o Supabase já está ativo e tem dados, execute schema.sql para importar a nova lista.
 */
window.EIXOS_PROPOSTAS = [
  {
    "name": "R.U.",
    "description": "Alimentação acessível, de qualidade e adequada à rotina de quem estuda."
  },
  {
    "name": "Auxílios",
    "description": "Mais recursos, transparência e acesso à assistência estudantil."
  },
  {
    "name": "Chutes",
    "description": "Matrícula justa, combate às reprovações e formação de qualidade."
  },
  {
    "name": "Cultura",
    "description": "Arte, encontros e uma vida universitária pulsante."
  },
  {
    "name": "Esportes",
    "description": "Espaços e iniciativas para praticar, competir e conviver."
  },
  {
    "name": "Acessibilidade",
    "description": "Inclusão não é favor: é direito e obrigação institucional."
  },
  {
    "name": "Mulheres",
    "description": "Enfrentar a violência de gênero e fortalecer redes de acolhimento."
  },
  {
    "name": "Étnico-racial",
    "description": "Valorização cultural e combate ao racismo na universidade."
  },
  {
    "name": "Moradia",
    "description": "Condições dignas para estudar e permanecer na UFABC."
  },
  {
    "name": "Transporte",
    "description": "Deslocamentos melhores entre os campi e pela região."
  },
  {
    "name": "Infraestrutura",
    "description": "Campi seguros, cuidados e com espaços de convivência e estudo."
  },
  {
    "name": "Participação",
    "description": "Um DCE aberto e presente no cotidiano da comunidade estudantil."
  }
];

window.PROPOSTAS_INICIAIS = [
  {
    "id": "base-001",
    "title": "GT paritário para analisar reprovações e abandonos em massa",
    "category": "Chutes",
    "description": "Reunir docentes, TAEs e estudantes em um grupo de trabalho paritário para analisar turmas com altas taxas de reprovação ou abandono, identificar causas — como organização da disciplina ou didática — e propor soluções.",
    "is_published": true
  },
  {
    "id": "base-002",
    "title": "Pesquisa de demanda por cursos e disciplinas",
    "category": "Chutes",
    "description": "Mapear quais cursos estudantes querem seguir e quais disciplinas apresentam demanda reprimida para planejar melhor a oferta de vagas e componentes curriculares.",
    "is_published": true
  },
  {
    "id": "base-003",
    "title": "Participação estudantil na distribuição de novas vagas docentes",
    "category": "Chutes",
    "description": "Criar espaços para a comunidade estudantil se manifestar sobre as áreas prioritárias para contratação de novos professores.",
    "is_published": true
  },
  {
    "id": "base-004",
    "title": "Prova substitutiva aberta para evitar reprovação por nota",
    "category": "Chutes",
    "description": "Defender que a prova substitutiva seja disponibilizada a todos os estudantes, de modo a reduzir reprovações por nota.",
    "is_published": true
  },
  {
    "id": "base-005",
    "title": "Integralização do noturno adequada à realidade dos estudantes",
    "category": "Chutes",
    "description": "Mapear, junto às coordenações e aos estudantes, a possibilidade de reorganizar o quadrimestre ideal do noturno, considerando quem trabalha e não consegue seguir a oferta prevista atualmente.",
    "is_published": true
  },
  {
    "id": "base-006",
    "title": "Transparência das estatísticas de matrícula e dos chutes",
    "category": "Chutes",
    "description": "Cobrar a divulgação dos dados de matrícula, demanda e exclusão de turmas, permitindo dimensionar o problema dos chutes e formular soluções.",
    "is_published": true
  },
  {
    "id": "base-007",
    "title": "Revisão democrática do sistema de matrícula",
    "category": "Chutes",
    "description": "Aprofundar, com discentes, docentes e TAEs, o debate sobre os problemas do sistema de matrícula e construir alternativas para o próximo ano.",
    "is_published": true
  },
  {
    "id": "base-008",
    "title": "Ampliar e revitalizar espaços de convivência",
    "category": "Infraestrutura",
    "description": "Abrir as salas do DCE e dos CAs de cada curso nos dois campi; recuperar espaços existentes; instalar mais torres de tomadas, sofás e mesas de estudo.",
    "is_published": true
  },
  {
    "id": "base-009",
    "title": "Mais espaços de estudo, salas e computadores",
    "category": "Infraestrutura",
    "description": "Ampliar os ambientes de estudo com salas de aula disponíveis, mesas e novos computadores para a comunidade estudantil.",
    "is_published": true
  },
  {
    "id": "base-010",
    "title": "Dossiê de melhorias e obras dos campi",
    "category": "Infraestrutura",
    "description": "Mapear demandas pontuais de salas, goteiras, bebedouros, toldos nas filas do R.U. e dos fretados, iluminação e equipamentos quebrados, cobrando reformas e a conclusão das obras.",
    "is_published": true
  },
  {
    "id": "base-011",
    "title": "Mais segurança no entorno e dentro dos campi",
    "category": "Infraestrutura",
    "description": "Cobrar melhor iluminação nos arredores, ampliação das linhas de ônibus para o campus São Bernardo do Campo e atividades que movimentem os campi e integrem a comunidade externa.",
    "is_published": true
  },
  {
    "id": "base-012",
    "title": "Retorno da enfermaria e protocolo de emergências",
    "category": "Infraestrutura",
    "description": "Estudar a demanda e as alternativas para o retorno da enfermaria na UFABC e construir um protocolo institucional para lidar com emergências de saúde.",
    "is_published": true
  },
  {
    "id": "base-013",
    "title": "GT para concluir obras e discutir seu financiamento",
    "category": "Infraestrutura",
    "description": "Criar um grupo de trabalho sobre conclusão e financiamento de obras, como o hangar em São Bernardo, o Tamanduatehy e o bloco cultural em Santo André.",
    "is_published": true
  },
  {
    "id": "base-014",
    "title": "Piscina da UFABC: estudar demandas e alternativas",
    "category": "Esportes",
    "description": "Investigar alternativas para uso e implementação da piscina da UFABC, considerando a demanda estudantil e parcerias com a comunidade externa.",
    "is_published": true
  },
  {
    "id": "base-015",
    "title": "Volta do NETEL e acesso a cursos de idiomas",
    "category": "Cultura",
    "description": "Entender as razões da interrupção do NETEL, mapear a demanda estudantil e defender alternativas para a oferta de cursos de idiomas.",
    "is_published": true
  },
  {
    "id": "base-016",
    "title": "Protocolo de acolhimento e enfrentamento da violência de gênero",
    "category": "Mulheres",
    "description": "Consolidar um protocolo que reconheça diferentes formas de violência de gênero; estabeleça procedimentos de acolhimento e responsabilização por assédio e machismo, inclusive quando envolvam docentes; e promova formação de funcionários e ações educativas.",
    "is_published": true
  },
  {
    "id": "base-017",
    "title": "Acolhimento a mulheres ingressantes em STEM",
    "category": "Mulheres",
    "description": "Organizar, com veteranas do BC&T e da LCNE, rodas de conversa, apresentações sobre o funcionamento da UFABC e monitorias de disciplinas basilares com alta reprovação.",
    "is_published": true
  },
  {
    "id": "base-018",
    "title": "Prioridades de moradia, sala de acolhimento e creche",
    "category": "Moradia",
    "description": "Defender prioridade de moradia para estudantes em situação de violência, vulnerabilidade e necessidade de mudança para estudar; além de sala de acolhimento e creche.",
    "is_published": true
  },
  {
    "id": "base-019",
    "title": "Moradia estudantil com orçamento e GT permanente",
    "category": "Moradia",
    "description": "Pressionar prefeituras para disponibilizar imóveis ociosos adequados à política de moradia estudantil, cobrar mais orçamento e retomar o grupo de trabalho para ampliar o debate.",
    "is_published": true
  },
  {
    "id": "base-020",
    "title": "Linha intermunicipal entre os campi",
    "category": "Transporte",
    "description": "Reivindicar uma linha intermunicipal que conecte os campi de Santo André e São Bernardo do Campo.",
    "is_published": true
  },
  {
    "id": "base-021",
    "title": "Melhorias nos ônibus fretados",
    "category": "Transporte",
    "description": "Aumentar a frota; retomar parada na estação de Santo André em todos os horários para embarque e desembarque; revisar normas de uso, como as carteirinhas; ampliar toldos e criar espaço de debate aberto à comunidade, a exemplo da CAFRU.",
    "is_published": true
  },
  {
    "id": "base-022",
    "title": "Desburocratizar e ampliar AESA, Legal e SIM",
    "category": "Transporte",
    "description": "Cobrar ampliação do acesso e simplificação dos procedimentos dos sistemas de transporte AESA, Legal e SIM.",
    "is_published": true
  },
  {
    "id": "base-023",
    "title": "Reestruturar e financiar o Núcleo de Acessibilidade",
    "category": "Acessibilidade",
    "description": "Garantir recursos, equipe e condições adequadas para o Núcleo de Acessibilidade executar seus projetos.",
    "is_published": true
  },
  {
    "id": "base-024",
    "title": "Cumprimento efetivo dos direitos de estudantes com deficiência",
    "category": "Acessibilidade",
    "description": "Exigir as medidas de acessibilidade que já são obrigação institucional: acessibilidade não é mera recomendação.",
    "is_published": true
  },
  {
    "id": "base-025",
    "title": "Plano de acessibilidade física nos campi",
    "category": "Acessibilidade",
    "description": "Criar e implementar um plano de reformas e manutenção para assegurar infraestrutura acessível nos dois campi.",
    "is_published": true
  },
  {
    "id": "base-026",
    "title": "Formação anticapacitista e monitores inclusivos",
    "category": "Acessibilidade",
    "description": "Promover formação anticapacitista para funcionários e monitores inclusivos, inclusive com caráter educativo e de reeducação em casos de capacitismo.",
    "is_published": true
  },
  {
    "id": "base-027",
    "title": "Mais docentes e intérpretes de Libras",
    "category": "Acessibilidade",
    "description": "Lutar pela ampliação do quadro de docentes de Libras e profissionais intérpretes de Libras.",
    "is_published": true
  },
  {
    "id": "base-028",
    "title": "Mais recursos do PNAES",
    "category": "Auxílios",
    "description": "Lutar pela ampliação das verbas do Programa Nacional de Assistência Estudantil (PNAES).",
    "is_published": true
  },
  {
    "id": "base-029",
    "title": "Auxílios menos burocráticos e editais debatidos com estudantes",
    "category": "Auxílios",
    "description": "Revisar os editais de auxílios com participação estudantil e reduzir barreiras burocráticas ao acesso.",
    "is_published": true
  },
  {
    "id": "base-030",
    "title": "Comunicação mais direta com a ProAP",
    "category": "Auxílios",
    "description": "Fortalecer os canais de divulgação das ações de permanência e o contato direto entre estudantes e a Pró-Reitoria de Assuntos Comunitários e Políticas Afirmativas.",
    "is_published": true
  },
  {
    "id": "base-031",
    "title": "Reuniões permanentes da ProAP com bolsistas",
    "category": "Auxílios",
    "description": "Realizar encontros regulares com bolsistas para atualizações, esclarecimento de dúvidas e revisão dos editais.",
    "is_published": true
  },
  {
    "id": "base-032",
    "title": "Plantões de dúvidas e atendimento da ProAP",
    "category": "Auxílios",
    "description": "Cobrar plantões e atendimento acessível para orientar estudantes sobre auxílios e processos administrativos.",
    "is_published": true
  },
  {
    "id": "base-033",
    "title": "Café da manhã no Restaurante Universitário",
    "category": "R.U.",
    "description": "Lutar pela implementação de café da manhã no R.U. para ampliar as condições de alimentação estudantil.",
    "is_published": true
  },
  {
    "id": "base-034",
    "title": "Aumento do subsídio no R.U.",
    "category": "R.U.",
    "description": "Defender mais subsídio público para reduzir o custo das refeições aos estudantes.",
    "is_published": true
  },
  {
    "id": "base-035",
    "title": "Fortalecer a CAFRU e a transparência do restaurante",
    "category": "R.U.",
    "description": "Manter e ampliar a CAFRU como espaço de fiscalização, debate e construção coletiva do funcionamento do R.U.",
    "is_published": true
  },
  {
    "id": "base-036",
    "title": "Janta com horário estendido",
    "category": "R.U.",
    "description": "Ampliar o horário do jantar para contemplar a rotina de estudantes do período noturno.",
    "is_published": true
  },
  {
    "id": "base-037",
    "title": "Aplicativo unificado da UFABC com recarga do R.U.",
    "category": "R.U.",
    "description": "Defender um aplicativo que integre os sistemas e informações da UFABC e permita também recarregar créditos do Restaurante Universitário.",
    "is_published": true
  },
  {
    "id": "base-038",
    "title": "Manutenção e melhorias da infraestrutura do R.U.",
    "category": "R.U.",
    "description": "Cobrar reformas e manutenção para melhorar os espaços e o funcionamento do Restaurante Universitário.",
    "is_published": true
  },
  {
    "id": "base-039",
    "title": "Programação permanente de valorização cultural",
    "category": "Étnico-racial",
    "description": "Promover atividades permanentes que valorizem a cultura negra, LGBT+ e manifestações culturais marginalizadas.",
    "is_published": true
  },
  {
    "id": "base-040",
    "title": "InterCurso na UFABC",
    "category": "Esportes",
    "description": "Organizar e fortalecer o InterCurso como oportunidade de integração estudantil por meio do esporte.",
    "is_published": true
  },
  {
    "id": "base-041",
    "title": "Cinedebates, karaokês e atividades na Salinha do DCE",
    "category": "Cultura",
    "description": "Ocupar a Salinha do DCE com programação cultural organizada com a comunidade estudantil.",
    "is_published": true
  },
  {
    "id": "base-042",
    "title": "Grupos de estudo e trocas de idiomas entre discentes",
    "category": "Cultura",
    "description": "Estimular espaços de aprendizagem de idiomas baseados na troca de conhecimentos entre estudantes.",
    "is_published": true
  },
  {
    "id": "base-043",
    "title": "Saraus e shows de talentos periódicos",
    "category": "Cultura",
    "description": "Promover, de forma periódica, saraus e espaços para apresentação de talentos artísticos da comunidade universitária.",
    "is_published": true
  },
  {
    "id": "base-044",
    "title": "Transparência e comunicação sobre a cultura na UFABC",
    "category": "Cultura",
    "description": "Cobrar divulgação clara, frequente e acessível das ações e políticas culturais da universidade.",
    "is_published": true
  },
  {
    "id": "base-045",
    "title": "Apoio institucional e canal permanente com entidades estudantis",
    "category": "Participação",
    "description": "Lutar por mais apoio da universidade às entidades estudantis e criar comunicação permanente entre universidade, DCE e entidades.",
    "is_published": true
  },
  {
    "id": "base-046",
    "title": "Revisão da resolução anti-festa e financiamento coletivo",
    "category": "Cultura",
    "description": "Defender o fim da resolução que impede festas nos campi e viabilizar formas coletivas de arrecadação para atividades festivas.",
    "is_published": true
  },
  {
    "id": "base-047",
    "title": "Festas e manifestações musicais diversas",
    "category": "Cultura",
    "description": "Promover mais festas e atividades musicais com diferentes gêneros e expressões culturais.",
    "is_published": true
  },
  {
    "id": "base-048",
    "title": "Divulgação ampla de eventos e mural do DCE",
    "category": "Cultura",
    "description": "Ampliar a divulgação das atividades da UFABC, inclusive com aplicativo unificado e mural do DCE.",
    "is_published": true
  },
  {
    "id": "base-049",
    "title": "Acervo coletivo de equipamentos e instrumentos musicais",
    "category": "Cultura",
    "description": "Construir um acervo compartilhado de instrumentos e equipamentos para atividades artísticas estudantis.",
    "is_published": true
  },
  {
    "id": "base-050",
    "title": "Festas temáticas integradas entre entidades",
    "category": "Cultura",
    "description": "Organizar eventos como festa junina e Halloween em conjunto com entidades, com atividades e decoração nos campi.",
    "is_published": true
  },
  {
    "id": "base-051",
    "title": "Diálogo permanente entre DCE, entidades e estudantes",
    "category": "Participação",
    "description": "Fortalecer a articulação entre as entidades culturais, o DCE e a comunidade estudantil por meio de um canal permanente de comunicação.",
    "is_published": true
  },
  {
    "id": "base-052",
    "title": "DCE aberto: plantões, banquinhas e reuniões públicas",
    "category": "Participação",
    "description": "Garantir plantões na Salinha do DCE, banquinhas com caixa “Deixe sua proposta!” e reuniões abertas e temáticas.",
    "is_published": true
  },
  {
    "id": "base-053",
    "title": "Reclame Aqui do DCE",
    "category": "Participação",
    "description": "Criar um canal para receber denúncias e demandas estudantis, registrar encaminhamentos e permitir acompanhamento dos casos.",
    "is_published": true
  }
];
