const profile = {
  nameKo: "이상윤",
  nameEn: "LEE SANGYUN",
  role: "Backend Software Engineer",
  email: "winnery93@gmail.com",
  github: "https://github.com/syndersonLEE",
  summary:
    "B2C 플랫폼에서 동시성 제어와 성능 최적화를 고민해 온 백엔드 엔지니어입니다. 숙박 플랫폼의 동시 예약 재고 정합성 문제를 Redis 분산 Lock과 DB Lock을 겹친 구조로 해결했고, 프로모션 중첩 검증과 쿠폰 최저가 조합 탐색처럼 복잡한 도메인 규칙을 확장 가능한 구조로 풀어 왔습니다. 글로벌 호텔 체인(메리어트/하얏트) 실시간 연동, 100개 이상 금융사 API 통합, 은행 메시징 플랫폼 개발 등 Kotlin/Java Spring 기반 MSA 환경에서 다양한 문제를 맡아 대응해 왔습니다.",
};

export const skills = [
  { category: "Language", items: ["Kotlin", "Java", "SQL", "Python(도구 개발)"] },
  {
    category: "Framework",
    items: ["Spring Boot", "Spring Data JPA", "QueryDSL", "MyBatis"],
  },
  {
    category: "Infra & Tools",
    items: [
      "MySQL",
      "Redis(Redisson)",
      "Kafka",
      "AWS EKS(Kubernetes)",
      "Istio",
      "Grafana",
      "Datadog",
      "Sentry",
      "ELK",
    ],
  },
  {
    category: "AI Workflow",
    items: [
      "AI 코딩 에이전트 워크플로우 구성(Claude Code)",
      "코드 정적 분석 기반 문서 생성",
    ],
  },
];

export const education = [
  { title: "국민대학교 소프트웨어학과 졸업", period: "2014.03 – 2020.02" },
];

export const activities = [
  { title: "Software Maestro 10기 수료", period: "2019.06 – 2019.12" },
  { title: "NEXTERS 17/18기", period: "2020.06 – 2021.02" },
  { title: "SOPT 23/24/25기 서버 파트", period: "2018.09 – 2019.08" },
  { title: "CONCAT INC. React Native 개발 인턴", period: "2018.12 – 2019.06" },
  { title: "㈜Neuro Associates 웹 개발 인턴", period: "2018.06 – 2018.08" },
];

export const awards = [
  "SOPT APPJAM 최우수상",
  "NH 챌린지해커톤 장려상",
  "Inchon Civic Hack 장려상",
];

export const awardsYear = "2019";

export const sideProjects = [
  {
    name: "Plot",
    description: "영화 관심사 기반 소개팅 매칭 앱",
    link: "https://github.com/TeamMoBo/plot-server",
    image: "Plot.png",
  },
  {
    name: "뭐라하지",
    description: "상황별 인사말 자동 생성 앱",
    link: "https://github.com/Nexters/what-do-you-say-server",
    image: "what-to-do.png",
  },
  {
    name: "Cake-it",
    description: "레터링 케이크 가게 연결 앱",
    link: "https://github.com/project-cake-it/api-server",
    image: "Cake-it.png",
  },
  {
    name: "Artoo",
    description: "학생 예술 작가들의 작품 판매 앱",
    link: "https://github.com/soptart/Server",
    image: "Artoo.png",
  },
  {
    name: "LocAin",
    description: "인천시 유휴 공간 대여 앱",
    link: "https://github.com/syndersonLEE/LocAinServer",
    image: "LocAin.png",
  },
  {
    name: "전하",
    description: "서울시의 전통체험 / 한옥 예약 앱",
    link: "https://github.com/JeonHa/JeonHa-Server",
    image: "jeonha.png",
  },
  {
    name: "올라",
    description: "NH농협 카페 사이렌오더 / 생산지 추적 앱",
    link: "https://github.com/OrlaProject/Orla_Server",
    image: "orla.png",
  },
  {
    name: "쉬자",
    description: "취준생을 위한 정보 제공 앱",
    link: "https://github.com/soptrest/soptgetrestserver",
    image: "get-rest.png",
  },
  {
    name: "짤내투어",
    description: "간단하게 만드는 우리만의 짤 생성기 앱",
    link: "https://github.com/amathon-2019/GodokChatting",
    image: "zzal.png",
  },
  {
    name: "카툰월드",
    description: "사용자가 만들어가는 만화 앱",
    link: "https://github.com/kcartoonworld/kcartoonserver",
    image: "cartoon.png",
  },
  {
    name: "Lets-Touch",
    description: "손 마디 압력 센서, 밴딩 센서 및 가속도 센서를 이용한 장갑 디바이스",
    link: "https://github.com/syndersonLEE/LetsTouch",
    image: "letstouch.png",
  },
];

export default profile;
