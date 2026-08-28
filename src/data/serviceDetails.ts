export interface ServiceDetailItem {
  id: string;
  badge: { en: string; hy: string; ru: string };
  title: { en: string; hy: string; ru: string };
  tagline: { en: string; hy: string; ru: string };
  heroImage?: string;
  overview: {
    en: string[];
    hy: string[];
    ru: string[];
  };
  deliverables: Array<{
    title: { en: string; hy: string; ru: string };
    desc: { en: string; hy: string; ru: string };
  }>;
  benefits: {
    en: string[];
    hy: string[];
    ru: string[];
  };
  industries: {
    en: string[];
    hy: string[];
    ru: string[];
  };
  serviceModels: {
    en: string[];
    hy: string[];
    ru: string[];
  };
  faqs?: Array<{
    q: { en: string; hy: string; ru: string };
    a: { en: string; hy: string; ru: string };
  }>;
}

export const serviceDetailsData: Record<string, ServiceDetailItem> = {
  outsourcing: {
    id: "outsourcing",
    badge: {
      en: "Enterprise IT Support",
      hy: "Կորպորատիվ ՏՏ Սպասարկում",
      ru: "Комплексный IT Аутсорсинг",
    },
    title: {
      en: "IT Outsourcing Services in Armenia",
      hy: "ՏՏ Աութսորսինգ Ծառայություններ Հայաստանում",
      ru: "Услуги IT-аутсорсинга в Армении",
    },
    tagline: {
      en: "Focus on growing your business — we will take care of your IT.",
      hy: "Կենտրոնացեք Ձեր բիզնեսի աճի վրա — ՏՏ հոգսերը թողեք մեզ:",
      ru: "Сосредоточьтесь на росте бизнеса — заботу об IT мы берем на себя.",
    },
    overview: {
      en: [
        "IT outsourcing means delegating your company's IT operations to an external team of certified experts. Instead of hiring, training, and managing an expensive in-house IT department, you gain immediate access to a complete team of specialized engineers.",
        "Q Group provides managed IT outsourcing services in Armenia for organizations that require reliable technical support, high-availability infrastructure management, and proactive maintenance. We support servers, networks, cloud platforms, Microsoft 365 environments, cybersecurity defenses, and end-user workstations.",
      ],
      hy: [
        "ՏՏ աութսորսինգը ենթադրում է կազմակերպության տեղեկատվական տեխնոլոգիաների ամբողջական սպասարկման պատվիրակումը փորձառու արտաքին թիմին: Սեփական ՏՏ բաժին պահելու փոխարեն դուք ստանում եք բարձրակարգ մասնագետների ամբողջական թիմ:",
        "Q Group-ը տրամադրում է կառավարվող ՏՏ աութսորսինգի ծառայություններ Հայաստանում՝ ապահովելով սերվերների, կորպորատիվ ցանցերի, ամպային համակարգերի (Microsoft 365, Azure), կիբեռանվտանգության և աշխատակիցների աշխատատեղերի անխափան շահագործումը:",
      ],
      ru: [
        "IT-аутсорсинг означает передачу управления всей IT-инфраструктурой компании внешней команде сертифицированных экспертов. Вместо затрат на содержание штатного IT-отдела вы получаете готовую команду инженеров разного профиля.",
        "Q Group предоставляет управляемые услуги IT-аутсорсинга в Армении для организаций, которым требуется надежная техподдержка, отказоустойчивость серверов, облачных сред (Microsoft 365, Azure) и защита рабочих мест.",
      ],
    },
    deliverables: [
      {
        title: {
          en: "Full IT Infrastructure Management",
          hy: "ՏՏ Ենթակառուցվածքի Ամբողջական Կառավարում",
          ru: "Полное управление IT-инфраструктурой",
        },
        desc: {
          en: "End-to-end administration of physical and virtual servers, enterprise switches, routers, firewalls, and active directories.",
          hy: "Ֆիզիկական և վիրտուալ սերվերների, ցանցային սարքավորումների, երթուղիչների և Active Directory-ի համալիր կառավարում:",
          ru: "Администрирование физических и виртуальных серверов, сетевого оборудования, маршрутизаторов и служб каталогов.",
        },
      },
      {
        title: {
          en: "Help Desk & Fast Remote Support",
          hy: "Help Desk և Արագ Հեռավար Աջակցություն",
          ru: "Help Desk и оперативная удаленная поддержка",
        },
        desc: {
          en: "Direct line technical assistance for employees, resolving software glitches, email issues, and peripheral problems within guaranteed SLAs.",
          hy: "Անմիջական տեխնիկական աջակցություն աշխատակիցներին՝ ծրագրային, էլ. փոստի և սարքավորումների խնդիրների արագ լուծմամբ:",
          ru: "Прямая линия поддержки пользователей, быстрое решение проблем с ПО, почтой и оргтехникой по четкому регламенту SLA.",
        },
      },
      {
        title: {
          en: "Cybersecurity & 24/7 Monitoring",
          hy: "Կիբեռանվտանգություն և 24/7 Մոնիտորինգ",
          ru: "Кибербезопасность и мониторинг 24/7",
        },
        desc: {
          en: "Proactive automated monitoring of system health, backup validation, antivirus enforcement, and vulnerability patching before downtime occurs.",
          hy: "Համակարգերի 24/7 ավտոմատացված մոնիտորինգ, պահուստային պատճենահանում (Backup) և վիրուսային սպառնալիքների կանխարգելում:",
          ru: "Круглосуточный мониторинг доступности, контроль резервного копирования и предотвращение инцидентов до сбоя.",
        },
      },
      {
        title: {
          en: "Cloud & Microsoft 365 Administration",
          hy: "Ամպային Համակարգեր և Microsoft 365",
          ru: "Облачные сервисы и Microsoft 365",
        },
        desc: {
          en: "Deployment, migration, and management of Microsoft 365, Azure, AWS, Google Workspace, and secure hybrid cloud environments.",
          hy: "Microsoft 365, Azure, AWS և Google Workspace միջավայրերի ներդրում, միգրացիա և անվտանգ շահագործում:",
          ru: "Внедрение, миграция и поддержка сред Microsoft 365, Azure, AWS и корпоративной гибридной инфраструктуры.",
        },
      },
      {
        title: {
          en: "On-Site Engineer Dispatch",
          hy: "Արտագնա Ինժեներական Սպասարկում",
          ru: "Выездные инженеры и обслуживание на месте",
        },
        desc: {
          en: "Scheduled on-site visits and rapid emergency dispatch across Yerevan and Armenian regions for hardware repairs and physical diagnostics.",
          hy: "Պլանային այցելություններ և շտապ արտագնա արձագանքում Երևանում և մարզերում՝ սարքավորումների վերանորոգման և կարգավորման համար:",
          ru: "Регулярные выезды и экстренное реагирование по Еревану и регионам Армении для аппаратного ремонта и настройки.",
        },
      },
    ],
    benefits: {
      en: [
        "Predictable, transparent monthly IT budget without unexpected repair bills",
        "Over 60% cost reduction compared to maintaining full-time in-house IT staff",
        "<15 min guaranteed response time for critical operational incidents",
        "Access to certified senior network, system, and cloud architects",
        "Proactive problem prevention rather than reactive firefighting",
      ],
      hy: [
        "Կանխատեսելի և թափանցիկ ամսական բյուջե՝ առանց անսպասելի ծախսերի",
        "Մինչև 60% ծախսերի կրճատում՝ սեփական ՏՏ հաստիքների հետ համեմատած",
        "<15 րոպե արձագանքման երաշխավորված ժամանակ կրիտիկական խնդիրների դեպքում",
        "Հասանելիություն առաջատար սերտիֆիկացված ինժեներների փորձին",
        "Խնդիրների ակտիվ կանխարգելում՝ նախքան դրանց ի հայտ գալը",
      ],
      ru: [
        "Прогнозируемый ежемесячный IT-бюджет без скрытых затрат",
        "Экономия до 60% средств по сравнению с содержанием собственного штата",
        "Гарантированное время реакции <15 минут на критические инциденты",
        "Доступ к компетенциям ведущих системных и сетевых инженеров",
        "Предотвращение сбоев вместо устранения последствий",
      ],
    },
    industries: {
      en: [
        "Retail Chains & Commercial Showrooms",
        "Banks, Credit Organizations & Fintech",
        "Hospitality, Restaurants & Breweries",
        "Logistics, Warehousing & Distribution",
        "Healthcare, Clinics & Laboratories",
        "International Companies operating in Armenia",
      ],
      hy: [
        "Ռիթեյլ ցանցեր և առևտրային կենտրոններ",
        "Բանկեր, վարկային կազմակերպություններ և ֆինտեխ",
        "Ռեստորանային ցանցեր և հյուրընկալության ոլորտ",
        "Լոգիստիկա, պահեստներ և բաշխիչ կենտրոններ",
        "Առողջապահական կենտրոններ և կլինիկաներ",
        "Հայաստանում գործող միջազգային ընկերություններ",
      ],
      ru: [
        "Розничные торговые сети и магазины",
        "Банки, кредитные организации и финтех",
        "Ресторанные сети и гостиничный бизнес",
        "Логистические и складские комплексы",
        "Медицинские центры и клиники",
        "Международные компании в Армении",
      ],
    },
    serviceModels: {
      en: ["Full Managed IT (All-Inclusive)", "Co-Managed IT (Supporting Internal Team)", "Helpdesk & Desktop Only", "Emergency Incident SLA"],
      hy: ["Ամբողջական ՏՏ Աութսորսինգ", "Համատեղ ՏՏ Սպասարկում", "Միայն Helpdesk և Աշխատատեղեր", "Վթարային Սպասարկման Պայմանագիր"],
      ru: ["Полный IT-аутсорсинг «под ключ»", "Совместное управление (в помощь штатному IT)", "Поддержка рабочих мест (Helpdesk)", "Аварийный контракт с фиксированным SLA"],
    },
  },

  infrastructure: {
    id: "infrastructure",
    badge: {
      en: "Cabling & Data Networks",
      hy: "Մալուխային Ցանցեր և Սերվերային",
      ru: "СКС и Сетевая Инфраструктура",
    },
    title: {
      en: "IT Infrastructure & Low Current Systems",
      hy: "ՏՏ Ենթակառուցվածք և Թույլ Հոսանքային Համակարգեր",
      ru: "IT-инфраструктура и слаботочные системы",
    },
    tagline: {
      en: "Robust structured cabling, certified server rooms, and seamless wireless connectivity.",
      hy: "Հուսալի կառուցվածքային մալուխավորում, սերվերային սենյակներ և անլար ցանցեր:",
      ru: "Надежные структурированные кабельные сети, серверные комнаты и Wi-Fi покрытия.",
    },
    overview: {
      en: [
        "IT Infrastructure and Low Current Systems form the backbone of modern business operations. Q Group designs, deploys, and maintains mission-critical network environments, structured cabling systems, server rooms, and integrated building security technologies throughout Armenia.",
        "Our engineers handle the entire project lifecycle: from architectural audit and CAD blueprints to Fluke-certified testing, rack assembly, cable labeling, and ongoing maintenance.",
      ],
      hy: [
        "ՏՏ ենթակառուցվածքը և թույլ հոսանքային համակարգերը ցանկացած ժամանակակից բիզնեսի հիմքն են: Q Group-ը նախագծում, մոնտաժում և սպասարկում է կորպորատիվ համակարգչային ցանցեր, սերվերային հանգույցներ, տեսահսկման և անվտանգության համակարգեր ամբողջ Հայաստանում:",
        "Մեր ինժեներները իրականացնում են աշխատանքները «բանալի առձեռն» սկզբունքով՝ նախագծումից և մալուխների անցկացումից մինչև սերվերային պահարանների մոնտաժ և սարքավորումների կարգավորում:",
      ],
      ru: [
        "IT-инфраструктура и слаботочные системы — фундамент стабильной работы предприятия. Q Group проектирует, монтирует и обслуживает корпоративные сети, серверные узлы, системы видеонаблюдения и контроля доступа по всей Армении.",
        "Наши специалисты выполняют полный цикл работ: от аудита объекта и составления схем до прокладки СКС, сборки серверных стоек, сертификации Fluke и сервисного обслуживания.",
      ],
    },
    deliverables: [
      {
        title: {
          en: "Structured Cabling Systems (SCS / UTP / Fiber)",
          hy: "Կառուցվածքային Մալուխային Համակարգեր (СКС)",
          ru: "Структурированные кабельные системы (СКС / Оптика)",
        },
        desc: {
          en: "Cat 6, Cat 6A, Cat 7 copper cabling and high-speed optical fiber backbones with certified Fluke testing and structured patch panel termination.",
          hy: "Cat 6, 6A, 7 մալուխների և օպտիկամանրաթելային գծերի անցկացում, Fluke թեստավորում և պաչ-պանելների պրոֆեսիոնալ կոմուտացիա:",
          ru: "Монтаж медных линий Cat 6/6A/7 и оптоволоконных магистралей с тестированием Fluke и маркировкой патч-панелей.",
        },
      },
      {
        title: {
          en: "Server Room & Data Center Buildout",
          hy: "Սերվերային Սենյակների Կառուցում և Կահավորում",
          ru: "Проектирование и оснащение серверных комнат",
        },
        desc: {
          en: "Installation of 19\" server racks, power distribution units (PDU), precision climate cooling, raised flooring, and cable tray management.",
          hy: "19 դյույմանոց սերվերային պահարանների, PDU սնուցման բաշխիչների, հովացման համակարգերի և մալուխային դարակաշարերի մոնտաժ:",
          ru: "Установка 19-дюймовых серверных стоек, блоков распределения питания PDU, систем охлаждения и органайзеров кабелей.",
        },
      },
      {
        title: {
          en: "Enterprise Networking (Cisco, Fortinet, Mikrotik)",
          hy: "Կորպորատիվ Ցանցային Սարքավորումներ",
          ru: "Корпоративное сетевое оборудование",
        },
        desc: {
          en: "Configuration of managed L2/L3 switches, core routers, secure VLAN segmentation, QoS traffic shaping, and site-to-site VPN tunnels.",
          hy: "L2/L3 սվիչների, երթուղիչների, VLAN սեգմենտացիայի, QoS առաջնահերթությունների և ապահով VPN կապուղիների կարգավորում:",
          ru: "Настройка управляемых коммутаторов L2/L3, маршрутизаторов, изоляции VLAN, приоритизации трафика QoS и VPN-туннелей.",
        },
      },
      {
        title: {
          en: "High-Density Business Wi-Fi Coverage",
          hy: "Անխափան Կորպորատիվ Wi-Fi Ծածկույթ",
          ru: "Бесшовный корпоративный Wi-Fi",
        },
        desc: {
          en: "Heatmap radio planning, controller-based seamless Wi-Fi roaming for enterprise offices, hotels, warehouses, and open venues.",
          hy: "Ռադիոհաճախականությունների պլանավորում, անխափան Roaming և Wi-Fi ցանցերի ներդրում գրասենյակների ու պահեստների համար:",
          ru: "Радиообследование, построение бесшовного роуминга Wi-Fi для больших офисов, складов, ресторанов и отелей.",
        },
      },
      {
        title: {
          en: "IP Video Surveillance (CCTV) & Access Control (ACS)",
          hy: "Տեսահսկման Համակարգեր (CCTV) և Մուտքի Վերահսկում (СКУД)",
          ru: "Видеонаблюдение (CCTV) и Контроль Доступа (СКУД)",
        },
        desc: {
          en: "AI-powered IP cameras, centralized NVR storage, facial/biometric access control, turnstiles, and security alarm integration.",
          hy: "Խելացի IP տեսախցիկների, NVR սերվերների, կենսաչափական անցագրային համակարգերի (Face ID, մատնահետք) և ազդանշանային համակարգերի տեղադրում:",
          ru: "Установка IP-камер с аналитикой, видеосерверов NVR, биометрических терминалов СКУД, турникетов и охранной сигнализации.",
        },
      },
    ],
    benefits: {
      en: [
        "Certified structured cabling ensuring 10+ Gbps high-speed data transmission",
        "Tidy, standardized cable management preventing accidental disconnects",
        "Redundant power and network failover preventing business outages",
        "Comprehensive architectural blueprints and cable mapping documentation",
      ],
      hy: [
        "Սերտիֆիկացված մալուխային ցանց՝ մինչև 10+ Գբիթ/վ արագության ապահովմամբ",
        "Կոկիկ, ստանդարտացված կոմուտացիա՝ բացառելով պատահական անջատումները",
        "Պահուստային սնուցման և ինտերնետ կապուղիների ավտոմատ անցում (Failover)",
        "Լիարժեք նախագծային փաստաթղթավորում և մալուխների համարակալում",
      ],
      ru: [
        "Сертифицированная кабельная сеть со скоростью передачи до 10+ Гбит/с",
        "Аккуратный кабельный менеджмент, исключающий случайные обрывы",
        "Резервирование питания и интернет-каналов (Failover)",
        "Полный комплект исполнительной документации и схем кабельной разводки",
      ],
    },
    industries: {
      en: ["Business Centers & Modern Offices", "Retail Malls & Supermarket Chains", "Logistics Warehouses & Cold Storages", "Hotels, Resorts & Restaurants", "Manufacturing Plants"],
      hy: ["Բիզնես կենտրոններ և գրասենյակներ", "Առևտրի կենտրոններ և սուպերմարկետներ", "Լոգիստիկ պահեստներ և արտադրամասեր", "Հյուրանոցներ և ռեստորաններ", "Արդյունաբերական օբյեկտներ"],
      ru: ["Бизнес-центры и офисные пространства", "Торговые центры и сетевой ритейл", "Складские комплексы и логистика", "Отели, курорты и рестораны", "Производственные предприятия"],
    },
    serviceModels: {
      en: ["Turnkey Implementation Project", "Modernization & Cable Clean-Up", "Annual Infrastructure Maintenance", "Emergency Network Troubleshooting"],
      hy: ["Ամբողջական Նախագիծ («բանալի առձեռն»)", "Գործող Ցանցի Արդիականացում և Կարգավորում", "Տարեկան Տեխնիկական Սպասարկում", "Վթարային Վերանորոգում"],
      ru: ["Проект внедрения «под ключ»", "Модернизация и наведение порядка в серверных", "Годовое сервисное обслуживание", "Экстренный выезд и устранение аварий"],
    },
  },

  cybersecurity: {
    id: "cybersecurity",
    badge: {
      en: "Zero-Trust Security & SOC",
      hy: "Կիբեռպաշտպանություն և SOC",
      ru: "Кибербезопасность и SOC",
    },
    title: {
      en: "Cybersecurity Services & Threat Defense",
      hy: "Կիբեռանվտանգության Ծառայություններ",
      ru: "Услуги кибербезопасности и защита от угроз",
    },
    tagline: {
      en: "Protect your enterprise data, prevent ransomware, and monitor threats 24/7.",
      hy: "Պաշտպանեք կորպորատիվ տվյալները, կանխեք հարձակումները և վերահսկեք սպառնալիքները 24/7:",
      ru: "Защитите корпоративные данные, предотвратите вымогателей и контролируйте угрозы 24/7.",
    },
    overview: {
      en: [
        "Cyber threats and ransomware attacks are evolving rapidly. Q Group delivers proactive, enterprise-grade cybersecurity solutions designed to protect corporate digital assets, detect breaches in real time, and ensure business resilience.",
        "From professional penetration testing and employee phishing simulation campaigns to round-the-clock Security Operations Center (SOC) monitoring and official Bitdefender MSP endpoint solutions, we safeguard organizations across Armenia.",
      ],
      hy: [
        "Կիբեռսպառնալիքները և շորթող ծրագրերը (Ransomware) օրեցօր ավելի վտանգավոր են դառնում: Q Group-ը տրամադրում է պրոֆեսիոնալ կիբեռանվտանգության լուծումներ՝ պաշտպանելով բիզնեսի տվյալները և կանխելով հարձակումները նախքան դրանց ազդեցությունը:",
        "Թափանցելիության թեստավորումից (Penetration Testing) և ֆիշինգային ուսուցումից մինչև 24/7 Անվտանգության Կենտրոնի (SOC) մոնիտորինգ և Bitdefender-ի պաշտոնական MSP լիցենզավորում՝ մենք ապահովում ենք Ձեր տվյալների անվտանգությունը:",
      ],
      ru: [
        "Киберугрозы и вирусы-вымогатели наносят колоссальный ущерб бизнесу. Q Group предоставляет комплексные решения информационной безопасности для защиты данных, раннего обнаружения атак и непрерывности бизнеса.",
        "От тестирования на проникновение (PenTest) и симуляций фишинга до круглосуточного мониторинга в собственном центре безопасности (SOC) и внедрения решений Bitdefender MSP — мы выстраиваем эшелонированную защиту.",
      ],
    },
    deliverables: [
      {
        title: {
          en: "Penetration Testing (Ethical Hacking)",
          hy: "Թափանցելիության Թեստավորում (PenTest)",
          ru: "Тестирование на проникновение (Пентест)",
        },
        desc: {
          en: "Simulated real-world cyberattacks on web applications, network perimeters, wireless environments, and internal Active Directory domains to uncover hidden vulnerabilities.",
          hy: "Իրական հաքերային հարձակումների սիմուլյացիա վեբ հավելվածների, արտաքին և ներքին ցանցերի վրա՝ խոցելիությունները հայտնաբերելու նպատակով:",
          ru: "Имитация реальных атак на веб-сервисы, сетевой периметр и внутреннюю инфраструктуру для выявления уязвимостей.",
        },
      },
      {
        title: {
          en: "Phishing Simulation & Employee Awareness",
          hy: "Ֆիշինգի Սիմուլյացիա և Անձնակազմի Ուսուցում",
          ru: "Симуляция фишинга и обучение персонала",
        },
        desc: {
          en: "Controlled phishing campaigns and interactive cyber hygiene training to transform employees from the weakest security link into a vigilant human firewall.",
          hy: "Վերահսկվող ֆիշինգային նամակների ուղարկում և աշխատակիցների կրթում՝ սոցիալական ինժեներիայի սպառնալիքները նվազագույնի հասցնելու համար:",
          ru: "Обучающие рассылки учебного фишинга и тренинги по кибергигиене для снижения рисков человеческого фактора.",
        },
      },
      {
        title: {
          en: "24/7 Security Operations Center (SOC)",
          hy: "24/7 Անվտանգության Կառավարման Կենտրոն (SOC)",
          ru: "Круглосуточный центр мониторинга (SOC 24/7)",
        },
        desc: {
          en: "Real-time SIEM event correlation, threat hunting, continuous log analysis, and immediate containment of suspicious malicious activity.",
          hy: "Իրական ժամանակում ցանցային իրադարձությունների (SIEM) վերլուծություն, սպառնալիքների որոնում և կասկածելի գործողությունների ակնթարթային արգելափակում:",
          ru: "Непрерывный анализ событий безопасности (SIEM), обнаружение аномалий и мгновенное блокирование подозрительной активности.",
        },
      },
      {
        title: {
          en: "Official Bitdefender MSP Endpoint Security",
          hy: "Bitdefender MSP Պաշտոնական Լուծումներ",
          ru: "Официальные решения Bitdefender MSP",
        },
        desc: {
          en: "Next-gen EDR/XDR protection, cloud workload security, advanced anti-exploit, patch management, and centralized multi-tenant management console.",
          hy: "Հաջորդ սերնդի EDR/XDR հակավիրուսային պաշտպանություն, ամպային անվտանգություն, թարմացումների կառավարում և կենտրոնացված կառավարման վահանակ:",
          ru: "Продвинутая защита рабочих станций и серверов EDR/XDR, защита от эксплойтов и централизованная консоль управления.",
        },
      },
      {
        title: {
          en: "Incident Response & Forensics",
          hy: "Արձագանքում Կիբեռմիջադեպերին և Վերականգնում",
          ru: "Реагирование на инциденты и расследование",
        },
        desc: {
          en: "Rapid mobilization team for breach containment, ransomware isolation, data recovery, root cause analysis, and post-incident hardening.",
          hy: "Անհապաղ միջամտություն կիբեռհարձակման դեպքում, համակարգերի մեկուսացում, տվյալների վերականգնում և պատճառների մանրակրկիտ վերլուծություն:",
          ru: "Экстренное реагирование при взломе, локализация заражения, восстановление данных и устранение первопричин инцидента.",
        },
      },
    ],
    benefits: {
      en: [
        "Multi-layered defense safeguarding sensitive intellectual property & customer records",
        "Official authorized Bitdefender Gold MSP partner pricing & direct technical support",
        "Zero-trust architecture preventing lateral movement inside internal networks",
        "Compliance with international cybersecurity standards (ISO 27001, GDPR)",
      ],
      hy: [
        "Բազմամակարդակ պաշտպանություն՝ կորպորատիվ գաղտնի տվյալների անվտանգության համար",
        "Bitdefender Gold MSP պաշտոնական գործընկերոջ արտոնյալ գներ և ուղիղ աջակցություն",
        "Zero-Trust ճարտարապետություն՝ կանխելով ներքին ցանցով վիրուսների տարածումը",
        "Համապատասխանություն միջազգային ստանդարտներին (ISO 27001, GDPR)",
      ],
      ru: [
        "Многоуровневая защита конфиденциальных корпоративных и клиентских данных",
        "Официальные партнерские цены и прямая поддержка Bitdefender Gold MSP",
        "Концепция Zero-Trust, блокирующая распространение угроз внутри сети",
        "Соответствие требованиям стандартов информационной безопасности (ISO 27001)",
      ],
    },
    industries: {
      en: ["Fintech & Banking Institutions", "E-Commerce & Payment Processors", "Medical Institutions & Labs", "Software & IT Companies", "Corporate Holding Groups"],
      hy: ["Ֆինտեխ և բանկային կազմակերպություններ", "Էլեկտրոնային առևտուր և վճարային համակարգեր", "Բժշկական կենտրոններ և լաբորատորիաներ", "ՏՏ և ծրագրավորման ընկերություններ", "Կորպորատիվ հոլդինգներ"],
      ru: ["Финтех и банковский сектор", "Электронная коммерция и платежные сервисы", "Медицинские и диагностические центры", "IT-компании и разработчики ПО", "Крупные холдинги и корпорации"],
    },
    serviceModels: {
      en: ["Annual Cybersecurity Retainer", "One-Time Penetration Testing Project", "24/7 Managed SOC Service", "Bitdefender Endpoint Licensing & Setup"],
      hy: ["Տարեկան Կիբեռանվտանգության Պայմանագիր", "Մեկանգամյա PenTest Թեստավորում", "24/7 Managed SOC Ծառայություն", "Bitdefender Լիցենզիաների Տրամադրում և Կարգավորում"],
      ru: ["Годовой контракт на сопровождение ИБ", "Разовый проект пентеста (PenTest)", "Управляемый сервис SOC 24/7", "Поставка и настройка лицензий Bitdefender"],
    },
  },

  grc: {
    id: "grc",
    badge: {
      en: "Governance, Risk & Compliance",
      hy: "Կառավարում, Ռիսկեր և Աուդիտ",
      ru: "Управление, Риски и Комплаенс",
    },
    title: {
      en: "GRC Services in Armenia",
      hy: "GRC Ծառայություններ Հայաստանում",
      ru: "Услуги GRC (Governance, Risk, Compliance)",
    },
    tagline: {
      en: "Strengthen business governance, minimize operational risks, and achieve audit readiness.",
      hy: "Ամրապնդեք կորպորատիվ կառավարումը, նվազեցրեք ռիսկերը և պատրաստվեք աուդիտին:",
      ru: "Укрепите корпоративное управление, минимизируйте риски и пройдите аудит.",
    },
    overview: {
      en: [
        "GRC stands for Governance, Risk Management, and Compliance. Q Group helps organizations establish structured, auditable, and secure IT governance models that align business objectives with strict regulatory requirements.",
        "We assist companies with internal controls, corporate cybersecurity policies, comprehensive risk assessments, third-party vendor audits, and preparation for ISO 27001, PCI-DSS, and local regulatory evaluations in Armenia.",
      ],
      hy: [
        "GRC-ն (Governance, Risk, Compliance) կառավարման, ռիսկերի գնահատման և համապատասխանության համալիր գործընթաց է: Q Group-ն օգնում է ընկերություններին ստեղծել կառուցվածքային, աուդիտի ենթակա և ապահով ՏՏ կառավարման մոդելներ:",
        "Մենք մշակում ենք ներքին կանոնակարգեր, անվտանգության քաղաքականություններ, իրականացնում ենք ռիսկերի գնահատում և նախապատրաստում միջազգային ստանդարտների աուդիտներին (ISO 27001, PCI-DSS և տեղական օրենսդրություն):",
      ],
      ru: [
        "GRC (Governance, Risk and Compliance) — это система корпоративного управления, оценки рисков и соответствия стандартам. Q Group помогает выстроить прозрачные, проверяемые и защищенные IT-процессы.",
        "Мы разрабатываем внутренние регламенты, политики информационной безопасности, проводим оценку рисков и готовим компании к прохождению аудитов (ISO 27001, PCI-DSS и требованиям регуляторов).",
      ],
    },
    deliverables: [
      {
        title: {
          en: "Governance & Corporate Security Policies",
          hy: "Կառավարման և Անվտանգության Քաղաքականություններ",
          ru: "Политики безопасности и корпоративное управление",
        },
        desc: {
          en: "Drafting, reviewing, and rolling out custom information security policies, password standards, acceptable use policies, and disaster recovery playbooks.",
          hy: "Տեղեկատվական անվտանգության քաղաքականությունների, գաղտնաբառերի կանոնակարգերի և վթարային վերականգնման պլանների (DRP) մշակում:",
          ru: "Разработка регламентов информационной безопасности, политик паролей, правил использования ресурсов и планов аварийного восстановления.",
        },
      },
      {
        title: {
          en: "Comprehensive IT Risk Assessment",
          hy: "ՏՏ և Գործառնական Ռիսկերի Գնահատում",
          ru: "Оценка операционных и IT-рисков",
        },
        desc: {
          en: "Identifying single points of failure across infrastructure, supply chain vendors, data pipelines, and implementing concrete risk reduction roadmaps.",
          hy: "Ենթակառուցվածքում և բիզնես գործընթացներում առկա թույլ կողմերի բացահայտում և ռիսկերի մեղմացման հստակ ռազմավարության կազմում:",
          ru: "Анализ узких мест в инфраструктуре и процессах, расчет вероятности угроз и внедрение мер по снижению ущерба.",
        },
      },
      {
        title: {
          en: "Audit Readiness & Regulatory Compliance",
          hy: "Նախապատրաստում Աուդիտին և Համապատասխանություն",
          ru: "Подготовка к аудиту и соответствие стандартам",
        },
        desc: {
          en: "Structured preparation and gap analysis for ISO/IEC 27001, Central Bank of Armenia (CBA) guidelines, data privacy laws, and international client assessments.",
          hy: "ISO 27001 ստանդարտի, ՀՀ Կենտրոնական Բանկի պահանջների և անձնական տվյալների պաշտպանության օրենքների համապատասխանության ապահովում:",
          ru: "Подготовка к сертификации ISO/IEC 27001, требованиям ЦБ РА, законам о защите персональных данных и внешним аудитам.",
        },
      },
      {
        title: {
          en: "Access Control & Identity Governance (IAM)",
          hy: "Մուտքի Իրավունքների Կառավարում (IAM)",
          ru: "Управление правами доступа и идентификацией (IAM)",
        },
        desc: {
          en: "Role-based access controls (RBAC), least-privilege principles, privileged account monitoring, and automated onboarding/offboarding workflows.",
          hy: "Դերերի վրա հիմնված մուտքի իրավունքների (RBAC) բաշխում, արտոնյալ հաշիվների վերահսկում և աշխատակիցների մուտքերի ավտոմատացում:",
          ru: "Внедрение ролевой модели доступа (RBAC), принципа минимальных привилегий и контроль учетных записей администраторов.",
        },
      },
      {
        title: {
          en: "Continuous GRC Maintenance & Advisory",
          hy: "Շարունակական GRC Աջակցություն և Խորհրդատվություն",
          ru: "Непрерывное GRC-сопровождение и консалтинг",
        },
        desc: {
          en: "Periodic policy audits, compliance health checks, change management oversight, and executive reporting to leadership and stakeholders.",
          hy: "Կանոնակարգերի պարբերական վերանայում, համապատասխանության ստուգումներ և հաշվետվությունների տրամադրում ղեկավարությանը:",
          ru: "Регулярный аудит политик, контроль изменений, отчетность для руководства и поддержание комплаенс-статуса.",
        },
      },
    ],
    benefits: {
      en: [
        "Clear, auditable proof of compliance for international partners and financial regulators",
        "Significant reduction in operational errors and internal data leaks",
        "Practical business-oriented compliance without bureaucratic gridlock",
        "Streamlined onboarding of foreign enterprise clients requiring strict vendor security",
      ],
      hy: [
        "Համապատասխանության հստակ ապացույցներ միջազգային գործընկերների և աուդիտորների համար",
        "Գործառնական սխալների և տվյալների ներքին արտահոսքերի էական նվազեցում",
        "Գործնական և բիզնեսին հարմարեցված քաղաքականություններ՝ առանց ավելորդ բյուրոկրատիայի",
        "Արտասահմանյան խոշոր հաճախորդների անվտանգության պահանջների հեշտ բավարարում",
      ],
      ru: [
        "Официальное подтверждение соответствия для регуляторов и зарубежных партнеров",
        "Снижение вероятности утечек данных и человеческих ошибок",
        "Практичный подход к безопасности без торможения бизнес-процессов",
        "Быстрое прохождение проверок безопасности со стороны крупных заказчиков",
      ],
    },
    industries: {
      en: ["Financial Sector & Payment Gateways", "Healthcare Providers & Pharma", "IT Outstaffing & SaaS Vendors", "Legal & Accounting Consultancies", "Corporations with Foreign Investment"],
      hy: ["Ֆինանսական և վճարահաշվարկային ընկերություններ", "Առողջապահություն և դեղագործություն", "ՏՏ աութսթաֆինգ և SaaS ընկերություններ", "Իրավաբանական և աուդիտորական ծառայություններ", "Օտարերկրյա ներդրումներով ընկերություններ"],
      ru: ["Банковский и платежный сектор", "Медицина и фармацевтика", "IT-разработка и SaaS-сервисы", "Юридические и консалтинговые компании", "Предприятия с иностранными инвестициями"],
    },
    serviceModels: {
      en: ["Full GRC Implementation Project", "Pre-Audit Gap Analysis", "Virtual CISO (vCISO) Advisory", "Policy Review & Staff Training"],
      hy: ["GRC Համակարգի Ամբողջական Ներդրում", "Նախաաուդիտային Գնահատում (Gap Analysis)", "Virtual CISO Խորհրդատվություն", "Քաղաքականությունների Մշակում և Թրեյնինգ"],
      ru: ["Проект внедрения GRC «под ключ»", "Анализ готовности к аудиту (Gap Analysis)", "Услуга виртуального директора по ИБ (vCISO)", "Разработка документации и обучение сотрудников"],
    },
  },

  electrical: {
    id: "electrical",
    badge: {
      en: "Industrial & Office Power",
      hy: "Էլեկտրամոնտաժ և ԻԲՊ",
      ru: "Электромонтаж и ИБП",
    },
    title: {
      en: "Electrical Installation & Maintenance Services",
      hy: "Էլեկտրամոնտաժային և Տեխնիկական Սպասարկման Ծառայություններ",
      ru: "Электромонтажные работы и техническое обслуживание",
    },
    tagline: {
      en: "Safe, certified electrical infrastructure, distribution panels, and uninterruptible backup power.",
      hy: "Անվտանգ, սերտիֆիկացված էլեկտրասնուցում, բաշխիչ վահանակներ և անխափան սնուցման համակարգեր:",
      ru: "Безопасное электроснабжение, распределительные щиты и гарантированное резервное питание.",
    },
    overview: {
      en: [
        "Reliable electrical infrastructure is the critical foundation for all enterprise IT, server rooms, lighting, and building automation. Q Group delivers professional electrical installation, distribution panel assembly, lighting design, and preventive maintenance across Armenia.",
        "Our certified electricians and electrical engineers work in full compliance with modern safety regulations, ensuring balanced electrical loads, surge protection, and seamless integration with backup diesel generators and enterprise UPS systems.",
      ],
      hy: [
        "Հուսալի էլեկտրամատակարարումը ցանկացած գրասենյակի, սերվերային սենյակի և առևտրային օբյեկտի անխափան աշխատանքի կարևորագույն երաշխիքն է: Q Group-ն իրականացնում է որակյալ էլեկտրամոնտաժային աշխատանքներ, վահանակների հավաքում և շահագործում:",
        "Մեր սերտիֆիկացված մասնագետները երաշխավորում են էլեկտրական անվտանգության բոլոր նորմերի պահպանումը, բեռնվածքի ճիշտ բաշխումը և անխափան սնուցման (UPS, Գեներատոր) համակարգերի կատարյալ ինտեգրումը:",
      ],
      ru: [
        "Бесперебойное электроснабжение — ключевой фактор работы серверов, офисной техники, освещения и инженерных систем. Q Group выполняет профессиональный электромонтаж, сборку силовых щитов и сервисное обслуживание объектов в Армении.",
        "Наши квалифицированные инженеры-электрики строго соблюдают нормы безопасности, рассчитывают нагрузки, обеспечивают защиту от скачков напряжения и подключают системы резервного питания (ИБП, ДГУ).",
      ],
    },
    deliverables: [
      {
        title: {
          en: "Commercial & Office Electrical Installation",
          hy: "Գրասենյակային և Առևտրային Էլեկտրամոնտաժ",
          ru: "Электромонтаж коммерческих и офисных помещений",
        },
        desc: {
          en: "Complete electrical wiring, cable trays, socket circuits, dedicated power feeds for server rooms, workstations, and high-load appliances.",
          hy: "Մալուխային ուղիների, վարդակների, սերվերային սենյակի անհատական սնուցման գծերի և բաշխիչ ցանցերի մոնտաժ:",
          ru: "Прокладка силовых кабелей в лотках, монтаж розеточных групп, выделенных линий для серверных и рабочих мест.",
        },
      },
      {
        title: {
          en: "Electrical Distribution Panels (MDB / DB)",
          hy: "Էլեկտրական Բաշխիչ Վահանակների Հավաքում",
          ru: "Сборка и монтаж электрических щитов (ГРЩ, ВРУ, ЩО)",
        },
        desc: {
          en: "Assembly, testing, and mounting of main distribution boards, automatic circuit breakers, RCD residual current devices, contactors, and surge arrestors (SPD).",
          hy: "Գլխավոր և միջանկյալ բաշխիչ վահանակների հավաքում, ավտոմատ անջատիչների, RCD պաշտպանիչների և լարման տատանումների պաշտպանության տեղադրում:",
          ru: "Проектирование и сборка главных распределительных щитов, автоматов защиты, УЗО, контакторов и ограничителей перенапряжения (УЗИП).",
        },
      },
      {
        title: {
          en: "Commercial, Industrial & Smart Lighting",
          hy: "Առևտրային և Արդյունաբերական Լուսավորություն",
          ru: "Офисное, промышленное и архитектурное освещение",
        },
        desc: {
          en: "LED track lighting, high-bay warehouse luminaires, emergency evacuation signage, motion sensors, and automated architectural lighting controls.",
          hy: "LED լուսատուների, պահեստային լուսավորության, վթարային լույսերի, շարժման ցուցիչների և խելացի կառավարման համակարգերի տեղադրում:",
          ru: "Монтаж трековых светильников, промышленного LED-освещения, аварийной подсветки, датчиков движения и систем автоматизации.",
        },
      },
      {
        title: {
          en: "Uninterruptible Power Systems (UPS) & Generators",
          hy: "Անխափան Սնուցման Համակարգեր (UPS) և Գեներատորներ",
          ru: "Системы бесперебойного питания (ИБП) и генераторы",
        },
        desc: {
          en: "Integration of industrial online UPS battery banks, Automatic Transfer Switches (ATS), and diesel generator backup synchronizers for zero-second downtime.",
          hy: "Արդյունաբերական UPS մարտկոցների, ավտոմատ գործարկման համակարգերի (ATS/АВР) և դիզելային գեներատորների տեղադրում և ինտեգրում:",
          ru: "Подключение промышленных онлайн-ИБП, шкафов автоматического ввода резерва (АВР) и дизельных генераторов для гарантированного электропитания.",
        },
      },
      {
        title: {
          en: "Preventive Electrical Maintenance & Thermal Inspection",
          hy: "Տեխնիկական Սպասարկում և Ջերմատեսիլ Դիագնոստիկա",
          ru: "Техобслуживание, замеры и тепловизионный контроль",
        },
        desc: {
          en: "Infrared thermal imaging to detect overheating breaker connections, insulation resistance testing, grounding measurements, and fast emergency repair dispatch.",
          hy: "Վահանակների ջերմատեսիլ (Thermal) ստուգում, հողանցման չափումներ, պրոֆիլակտիկ սպասարկում և շտապ արձագանքում:",
          ru: "Тепловизионная диагностика перегрева контактов в щитах, замеры сопротивления изоляции и заземления, оперативное устранение неисправностей.",
        },
      },
    ],
    benefits: {
      en: [
        "100% compliance with strict electrical and fire safety standards in Armenia",
        "Protection of sensitive servers, computers, and medical equipment from electrical surges",
        "Zero-downtime automatic switchover to backup generator and UPS during power grid outages",
        "Lower utility bills through energy-efficient LED and load optimization",
      ],
      hy: [
        "100% համապատասխանություն ՀՀ էլեկտրաանվտանգության և հակահրդեհային նորմերին",
        "Սերվերների և թանկարժեք սարքավորումների պաշտպանություն լարման տատանումներից",
        "Ավտոմատ անցում պահուստային գեներատորին՝ առանց գրասենյակի աշխատանքը դադարեցնելու",
        "Էլեկտրաէներգիայի ծախսի նվազեցում՝ էներգախնայող LED և ճիշտ բաշխման շնորհիվ",
      ],
      ru: [
        "Полное соответствие нормам электро- и пожарной безопасности",
        "Защита дорогостоящей серверной и офисной техники от скачков напряжения в сети",
        "Мгновенный переход на резервное питание (ИБП/Генератор) при отключении электричества",
        "Снижение энергопотребления за счет эффективных LED-технологий и балансировки фаз",
      ],
    },
    industries: {
      en: ["Office Buildings & Business Centers", "Residential Buildings & Condos", "Industrial Manufacturing Plants", "Warehouses & Storage Facilities", "Supermarkets & Hospitality"],
      hy: ["Գրասենյակային շենքեր և բիզնես կենտրոններ", "Բնակելի շենքեր և համալիրներ", "Արտադրական ձեռնարկություններ և գործարաններ", "Պահեստներ և բաշխիչ կենտրոններ", "Սուպերմարկետներ և ռեստորաններ"],
      ru: ["Офисные здания и бизнес-центры", "Жилые комплексы и новостройки", "Производственные цеха и заводы", "Складские и логистические терминалы", "Супермаркеты и объекты торговли"],
    },
    serviceModels: {
      en: ["Turnkey Electrical Installation Project", "Panel Modernization & Rewiring", "Annual Electrical Maintenance SLA", "Emergency Electrical Repair Dispatch"],
      hy: ["Ամբողջական Էլեկտրամոնտաժային Նախագիծ", "Վահանակների Արդիականացում և Վերազինում", "Տարեկան Տեխնիկական Սպասարկում", "Վթարային Էլեկտրիկի Արագ Արձագանքում"],
      ru: ["Электромонтаж объекта «под ключ»", "Модернизация щитов и перераспределение нагрузок", "Годовое сервисное обслуживание электрохозяйства", "Экстренный выезд аварийной электротехнической бригады"],
    },
  },
};
