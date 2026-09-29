export type Lang = 'id' | 'en'
type L = Record<Lang, string>

export const profile = {
  name: 'Thony Hermawan',
  email: 'thony.her@gmail.com',
  location: 'Kab. Pasuruan, Jawa Timur',
  // Nov 2015: first professional role
  careerStart: '2015-11',
  github: 'https://github.com/caktoy',
  typedRoles: ['Software Engineer', 'Web Developer', 'Mobile Developer', 'Fullstack Developer'],
}

export const ui: Record<string, L> = {
  navAbout: { id: 'Profil', en: 'About' },
  navCareer: { id: 'Karier', en: 'Career' },
  navSkills: { id: 'Keahlian', en: 'Skills' },
  navBackground: { id: 'Pendidikan', en: 'Education' },
  navContact: { id: 'Kontak', en: 'Contact' },
  roleLine: {
    id: 'Software Engineer · Web · Mobile · Fullstack',
    en: 'Software Engineer · Web · Mobile · Fullstack',
  },
  heroLead: {
    id: 'Berpengalaman membangun sistem informasi yang andal dan efisien di berbagai platform yang dibutuhkan bisnis, mulai dari desktop, website, mobile, hingga automation services.',
    en: 'Experienced in building reliable, efficient information systems across the platforms a business needs, from desktop, web, and mobile to automation services.',
  },
  ctaContact: { id: 'Hubungi saya', en: 'Get in touch' },
  ctaPrint: { id: 'Simpan sebagai PDF', en: 'Save as PDF' },
  statusNow: { id: 'Saat ini', en: 'Currently' },
  statusSince: { id: 'Berkarier sejak', en: 'Working since' },
  aboutTitle: { id: 'Profil', en: 'Profile' },
  timelineTitle: { id: 'Perjalanan karier', en: 'Career at a glance' },
  timelineHint: {
    id: 'Klik salah satu bar untuk melihat detail perannya.',
    en: 'Select a bar to jump to that role.',
  },
  careerTitle: { id: 'Pengalaman kerja', en: 'Work experience' },
  now: { id: 'Sekarang', en: 'Present' },
  skillsTitle: { id: 'Keahlian', en: 'Skills' },
  eduTitle: { id: 'Pendidikan', en: 'Education' },
  certTitle: { id: 'Pelatihan & sertifikasi', en: 'Training & certifications' },
  gpa: { id: 'IPK', en: 'GPA' },
  graduated: { id: 'Lulus', en: 'Graduated' },
  contactTitle: { id: 'Mari berdiskusi.', en: "Let's connect." },
  contactBody: {
    id: 'Terbuka untuk diskusi mengenai arsitektur sistem, kolaborasi, maupun peluang profesional yang relevan. Silakan hubungi melalui email.',
    en: 'Open to discussions on system architecture, collaboration, and relevant professional opportunities. Please reach out by email.',
  },
  openTo: { id: 'diskusi & kolaborasi', en: 'discussion & collaboration' },
  langLabel: { id: 'Bahasa', en: 'Language' },
  themeLabel: { id: 'Ganti tema', en: 'Toggle theme' },
  skipLink: { id: 'Lewati ke konten', en: 'Skip to content' },
  yrs: { id: 'th', en: 'y' },
  mos: { id: 'bln', en: 'mo' },
}

// Whole years since the first professional role; updates itself every year.
export const yearsOfExperience = (now = new Date()) => {
  const [y, m] = profile.careerStart.split('-').map(Number)
  const months = now.getFullYear() * 12 + now.getMonth() - (y * 12 + (m - 1))
  return Math.floor(months / 12)
}

export const summary = (years: number): L[] => [
  {
    id: `Software Engineer dengan pengalaman profesional lebih dari ${years} tahun dalam pengembangan aplikasi web, desktop, dan mobile secara end-to-end. Berkompetensi dalam perancangan arsitektur sistem, pengembangan backend dan frontend, integrasi API, optimasi performa, serta penyelesaian masalah pada lingkungan produksi.`,
    en: `Software engineer with over ${years} years of professional experience delivering web, desktop, and mobile applications end to end. Proficient in system architecture, backend and frontend development, API integration, performance optimization, and production problem solving.`,
  },
  {
    id: 'Berfokus pada solusi yang scalable, andal, dan mendukung efisiensi proses bisnis. Berpengalaman dalam team building dan manajemen tim pengembang, mulai dari memimpin tim dan berkoordinasi dengan stakeholder hingga menjaga standar kualitas dan kepatuhan ISO 27001.',
    en: 'Focused on solutions that are scalable, reliable, and that improve business process efficiency. Experienced in team building and development team management, from leading teams and coordinating with stakeholders to upholding quality standards and ISO 27001 compliance.',
  },
]

export interface Role {
  id: string
  title: L
  company: string
  place: string
  start: string // YYYY-MM
  end: string | null // null = present
  bullets: L[]
  stack?: string[]
}

// Newest first
export const roles: Role[] = [
  {
    id: 'avian-spv',
    title: { id: 'Software Engineer Supervisor', en: 'Software Engineer Supervisor' },
    company: 'PT Avia Avian Tbk.',
    place: 'Surabaya, Jawa Timur',
    start: '2022-07',
    end: null,
    bullets: [
      {
        id: 'Memastikan proyek digitalisasi sistem informasi berjalan baik, dari analisis dan perancangan sampai distribusi, bersama tim pengembang dan stakeholder terkait.',
        en: 'Keep digitalization projects on track, from analysis and design through rollout, working with the dev team and stakeholders.',
      },
      {
        id: 'Bertanggung jawab atas sistem internal perusahaan dan kelengkapan dokumentasinya.',
        en: 'Own the company’s internal systems and keep their documentation up to date.',
      },
      {
        id: 'Menyelenggarakan sharing session untuk bertukar pengetahuan dengan seluruh tim internal.',
        en: 'Run sharing sessions so knowledge moves across the whole internal team.',
      },
      {
        id: 'Terlibat langsung dalam pengembangan sistem bersama tim.',
        en: 'Hands-on in building the systems alongside the team.',
      },
      {
        id: 'Mengoptimalkan sistem, baik di sisi aplikasi maupun infrastruktur pendukungnya.',
        en: 'Optimize systems at both the application and supporting infrastructure level.',
      },
      {
        id: 'Turut memastikan perusahaan memenuhi standar ISO 27001:2022.',
        en: 'Help the company meet ISO 27001:2022 requirements.',
      },
    ],
  },
  {
    id: 'avian-staff',
    title: { id: 'Software Engineer Staff', en: 'Software Engineer Staff' },
    company: 'PT Avia Avian Tbk.',
    place: 'Surabaya, Jawa Timur',
    start: '2020-06',
    end: '2022-06',
    bullets: [
      {
        id: 'Mengembangkan berbagai sistem informasi untuk menunjang pekerjaan seluruh departemen internal.',
        en: 'Built information systems supporting the work of every internal department.',
      },
      {
        id: 'Ikut menganalisis kebutuhan sistem yang diajukan pengguna.',
        en: 'Took part in analyzing the system requirements users submitted.',
      },
      {
        id: 'Memastikan sistem yang dibangun terintegrasi dengan baik.',
        en: 'Made sure the systems integrate cleanly with each other.',
      },
      {
        id: 'Debugging dan problem solving atas kendala yang dihadapi pengguna.',
        en: 'Debugged and resolved issues reported by users.',
      },
    ],
  },
  {
    id: 'santini',
    title: { id: 'Software Programmer', en: 'Software Programmer' },
    company: 'PT Santinilestari Energi Indonesia',
    place: 'Kab. Pasuruan, Jawa Timur',
    start: '2019-11',
    end: '2020-05',
    bullets: [
      {
        id: 'Mengembangkan aplikasi mobile Android (Kotlin) untuk mengendalikan lampu pintar.',
        en: 'Built an Android (Kotlin) app to control smart lights.',
      },
      {
        id: 'Membuat backend pendukung aplikasi dengan PHP (Laravel).',
        en: 'Built the supporting backend with PHP (Laravel).',
      },
      {
        id: 'Bekerja dengan Tim R&D yang mengembangkan perangkat keras lampu pintar.',
        en: 'Worked with the R&D team developing the smart-light hardware.',
      },
      {
        id: 'Debugging dan problem solving bersama tim pengembang.',
        en: 'Debugged and solved problems with the rest of the dev team.',
      },
    ],
    stack: ['Kotlin', 'Laravel', 'Android'],
  },
  {
    id: 'renjana',
    title: { id: 'Lead Backend Developer', en: 'Lead Backend Developer' },
    company: 'PT Renjana Abi Yasa',
    place: 'Surabaya, Jawa Timur',
    start: '2018-08',
    end: '2019-10',
    bullets: [
      {
        id: 'Mengembangkan backend proyek workr.id menggunakan C# dan .NET Core.',
        en: 'Built the backend for workr.id with C# and .NET Core.',
      },
      {
        id: 'Memastikan seluruh endpoint dan informasi yang disediakan sesuai kriteria.',
        en: 'Made sure every endpoint and the data it returns met the agreed criteria.',
      },
      {
        id: 'Memimpin meeting internal tim dua kali seminggu.',
        en: 'Led the team’s internal meetings twice a week.',
      },
    ],
    stack: ['C#', '.NET Core'],
  },
  {
    id: 'medixsoft',
    title: { id: 'Software Engineer', en: 'Software Engineer' },
    company: 'PT Medixsoft',
    place: 'Surabaya, Jawa Timur',
    start: '2015-11',
    end: '2019-10',
    bullets: [
      {
        id: 'Mengembangkan aplikasi desktop untuk kebutuhan medis, dengan fungsi utama pengarsipan citra radiologi (Visual Basic, .NET Framework).',
        en: 'Built desktop applications for medical use, mainly archiving radiology images (Visual Basic, .NET Framework).',
      },
      {
        id: 'Membangun integrasi dengan sistem rumah sakit lainnya.',
        en: 'Built integrations with other hospital systems.',
      },
      {
        id: 'Debugging dan problem solving pada aplikasi yang ditangani.',
        en: 'Debugged and solved problems in the applications I maintained.',
      },
    ],
    stack: ['Visual Basic', '.NET Framework'],
  },
]

export const skills: { label: L; items: string[] }[] = [
  {
    label: { id: 'Bahasa pemrograman', en: 'Languages' },
    items: [
      'PHP (Native, Laravel, CI)',
      'C#',
      'JavaScript (Node.js, React, Vue)',
      'Java',
      'Kotlin',
      'Flutter',
      'Python',
      'Android Native',
    ],
  },
  {
    label: { id: 'Database', en: 'Databases' },
    items: ['MySQL / MariaDB', 'SQL Server', 'MongoDB', 'PostgreSQL'],
  },
  {
    label: { id: 'Sistem operasi', en: 'Operating systems' },
    items: ['Linux', 'Windows Server'],
  },
  {
    label: { id: 'Tools & infrastruktur', en: 'Tools & infrastructure' },
    items: ['Docker', 'MQTT', 'LDAP', 'Dremio', 'MinIO', 'FTP', 'Mail Server', 'n8n'],
  },
]

export const education = {
  degree: { id: 'Strata 1 — Sarjana Komputer (S.Kom)', en: 'Bachelor’s — Computer Science (S.Kom)' } as L,
  major: { id: 'Sistem Informasi', en: 'Information Systems' } as L,
  school: 'Institut Bisnis dan Informatika STIKOM Surabaya',
  year: '2015',
  gpa: '3,63',
}

export const certs: L[] = [
  { id: 'Training Audit Internal ISO 27001', en: 'ISO 27001 Internal Audit Training' },
  { id: 'Training Business Acumen', en: 'Business Acumen Training' },
  { id: 'Training ISO 31000 Risk Management', en: 'ISO 31000 Risk Management Training' },
]
