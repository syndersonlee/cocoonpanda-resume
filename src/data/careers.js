const careers = [
  {
    company: "NOL-UNIVERSE (야놀자)",
    period: "2024.04 – 현재",
    team: "국내숙박개발팀 백엔드 엔지니어",
    stack: [
      "Kotlin",
      "Java",
      "Spring Boot",
      "JPA",
      "QueryDSL",
      "Kafka",
      "Redis(Redisson)",
      "MySQL",
      "EKS",
      "Istio",
      "Grafana",
      "Datadog",
    ],
    projects: [
      {
        title: "캠핑 서비스 내재화 – 재고 차감·동기화·조회",
        description:
          "캠핑 서비스를 별도 예매 시스템에서 숙박 플랫폼으로 통합. 예약 오픈 시각 동시 요청으로 자리 1개에 예약 2건 이상 확정되던 재고 차감 경로 설계, 공급사·노출 시스템 간 동기화와 조회 경로 안정화 담당.",
        items: [
          {
            heading: "재고 차감 경로 설계",
            details: [
              "공급사 재고 테이블과 서비스 내 복제 재고 두 저장소에 걸친 차감을 Redis 분산 Lock(Redisson)으로 직렬화하고, DB Row Lock과 event_times 필드 기반 CAS를 하위 방어선으로 구성하였음",
              "자리당 예약 1건을 보장하고, Lock이 유실되어도 DB 층에서 차단되도록 하였음",
            ],
          },
          {
            heading: "Lock 단위 설계",
            details: [
              "객실 유형·이용 유형·날짜를 Lock 키로 두고, 다중 날짜 예약은 날짜 오름차순으로 MultiLock을 획득하도록 구현하였음",
              "재고를 공유하는 요금제를 한 Lock으로 묶어 날짜 간 경합을 제거하고 Deadlock을 원천 차단하였음",
            ],
          },
          {
            heading: "운영 Lock 구조 진단·개선",
            details: [
              "Redisson 소스 분석으로 Lock 만료 시간을 명시한 설정이 Watchdog(자동 연장)을 끄고 있던 것과, 트랜잭션 내 Lock 대기로 인한 Connection 점유, 예외 덮어쓰기 결함을 식별하였음",
              "Watchdog을 2~3초 리스 타임 기준으로 활성화하여 작업 중 Lock이 만료되지 않도록 하였고, 트랜잭션 분리와 Row Lock 순서 통일을 적용하였음",
            ],
          },
          {
            heading: "오픈 일정 동기화 Deadlock 제거",
            details: [
              "전체 삭제 후 재삽입 방식을 기존·목표 비교 후 변경분만 반영하는 방식으로 바꾸고, 삭제는 PK 조건만 사용하도록 변경하였음",
              "0건 DELETE의 Gap Lock으로 발생하던 동시 요청 간 Deadlock과 일정 부분 누락을 해소하였음",
            ],
          },
          {
            heading: "동기화·차감 경합 처리",
            details: [
              "event_times 필드 비교로 오래된 요청을 건너뛰고, CAS 충돌 시 Lock 재조회 후 재시도하도록 구현하였음",
              "동기화 경로에 긴 트랜잭션을 두지 않고도 최신 차감 상태가 유지되도록 하였음",
            ],
          },
          {
            heading: "요금제 조회 장애 대응",
            details: [
              "캠핑 요금제 오픈 시 캘린더 요약 조회가 판매 대상이 아닌 감면할인 요금제(전체의 약 2/3)까지 재고 조회 대상에 포함해 DB를 점유하였고, 예약·결제 경로까지 수 분간 약 2만 건 실패(에러율 약 8%, 요약 조회 p95 약 5초)가 발생하였음",
              "요약 요청에 제외 파라미터를 추가해 조회 대상 자체를 축소하였음 (후보 약 1,700건→약 600건, 소요 약 4초→0.2초)",
            ],
          },
        ],
      },
      {
        title: "프로모션 요금제 시스템 설계·개발",
        description:
          "멤버십(Gold Class)·기간 할인·상품 연계 프로모션을 함께 적용하는 요금제 중첩 구조 설계·개발.",
        items: [
          {
            heading: "프로모션·요금제 의존성 분리",
            details: [
              "프로모션 정의와 중첩 규칙을 요금제 생성 코드에서 분리한 구조로 설계하였음",
              "신규 프로모션 유형 추가 시 요금제 코드 수정 없이 확장 가능하도록 하였음",
            ],
          },
          {
            heading: "최대 N개 프로모션 중첩 설계 구현",
            details: [
              "기획자와 프로모션을 노드, 중첩 허용을 간선으로 두는 조합 모델을 정리하고, 백트래킹 탐색으로 최대 N개 프로모션 조합을 생성·검증하는 구조를 구현하였음",
              "중첩 규칙과 상한 N을 데이터로 조정할 수 있게 하여 검증 코드 변경 없이 대응하도록 하였음",
            ],
          },
          {
            heading: "확장 부하 검증",
            details: [
              "요금제 최대 6배 증가 조건으로 k6 부하 테스트를 수행하였음",
              "DB 로직이 단순 조회·갱신 위주라 HikariCP Pool을 20에서 40으로 올려도 DB 부하 이슈가 없음을 확인하고 적용하였으며, 감당 가능한 프로모션 수 상한을 확인하였음",
            ],
          },
          {
            heading: "B2C·B2B 동기화 전환",
            details: [
              "유실이 발생하던 동기 REST 경로를 Kafka로 전환하고, 소비자에서 event_times 필드 비교로 오래된 이벤트를 건너뛰며 반영 실패 건은 별도 실패 토픽으로 분리하였음",
              "상대 팀과 장애 케이스를 재현한 뒤 구간별 보장 수준과 재처리 방식을 문서화하였음",
            ],
          },
        ],
      },
      {
        title: "최대혜택가 서비스 개발",
        description: "적용 가능한 쿠폰 조합 중 최저가를 산출하는 B2C 조회 API 설계·개발.",
        items: [
          {
            heading: "최저가 조합 탐색 구현",
            details: [
              "정액·정률 할인과 요금제·쿠폰 제약을 반영하고, 제약 위반 가지를 탐색 중 제거하는 방식을 적용하였음",
              "조합 수가 늘어도 응답 시간이 유지되도록 하였음",
            ],
          },
          {
            heading: "런칭 전 부하 테스트",
            details: [
              "피크 TPS 500, 숙소 10개 조건으로 수행하였음",
              "p99 500ms~1s, 오류율 0.1% 이하, OOM·Connection 고갈 없음을 확인하였음",
            ],
          },
        ],
      },
      {
        title: "글로벌 호텔 체인 PMS 연동 (메리어트/하얏트, Derby 4.0 규격)",
        description: "해외 호텔 체인 숙소 콘텐츠·재고 실시간 수신 시스템 신규 구축.",
        items: [
          {
            heading: "요금제 테이블 스키마 설계",
            details: [
              "글로벌 체인의 요금 체계를 수용하는 신규 요금제 테이블 스키마를 설계하였음",
            ],
          },
          {
            heading: "수신 API 개발 및 유입 제어",
            details: [
              "중개 플랫폼 요구 사양에 맞춘 수신 API를 개발하였음",
              "Redis Rate Limiter로 유입 트래픽을 초당 5회로 제한하였음",
            ],
          },
          {
            heading: "조회·결제 경로 분리",
            details: [
              "조회 API는 캐싱, 결제에 쓰이는 API는 DB 직접 조회로 분리하였음",
              "정확도가 필요한 경로의 캐시 오염을 방지하였음",
            ],
          },
        ],
      },
      {
        title: "서비스 운영 (EKS)",
        items: [
          {
            heading: "런타임 운영",
            details: [
              "EKS 매니페스트로 파드 리소스·HPA·JVM 메모리 비율 등 런타임 옵션을 조정하며 서비스를 운영하였음",
              "배포 브랜치 머지와 릴리스 계획 문서 등록처럼 배포마다 반복되던 절차를 에이전트 워크플로우로 자동화하였음",
            ],
          },
        ],
      },
      {
        title: "AI 개발 워크플로우 구축",
        items: [
          {
            heading: "AI 에이전트·문서 자동화 규칙 정의",
            details: [
              "설계·구현·테스트 역할의 AI 에이전트와 PR 본문·커밋 메시지·이슈 코멘트·배포 계획 문서 자동 작성 규칙을 정의하였음",
              "반복 문서 작성을 제거하였음",
            ],
          },
          {
            heading: "API 문서·데이터 흐름 색인 생성 도구 개발",
            details: [
              "두 저장소의 API 코드를 정적 분석해 단일 HTML API 문서와 데이터 흐름 색인(DB 테이블·서비스 간 호출·메시지 토픽)을 생성하는 도구를 Python으로 구현하였음",
              "데이터 출처·흐름 문의를 색인으로 응답하도록 하였음",
            ],
          },
          {
            heading: "도메인 지식 문서 표준화",
            details: [
              "숙박 도메인 용어·코드 구조를 AI가 읽는 문서로 표준화하였음",
              "구두로 전달하던 배경 지식을 파일 하나로 전달하도록 하였음",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "FINDA",
    period: "2022.09 – 2024.04",
    team: "금융상품 PG 백엔드 개발자",
    stack: [
      "Kotlin",
      "Java",
      "Spring Boot",
      "JPA",
      "QueryDSL",
      "Feign",
      "Kafka",
      "Redis",
      "MySQL",
      "AWS KMS",
      "Grafana",
      "Sentry",
    ],
    projects: [
      {
        title: "대출 상품 연동 시스템 구축 (신용/주택담보/대환대출)",
        description:
          "금융결제원 및 100개 이상 금융사 API 연동 대출 한도 조회·신청·상태 관리 시스템 개발. 초기 단일 모듈(Java)로 구축한 뒤, 운영 중 드러난 한계를 바탕으로 Kotlin 멀티 모듈로 재설계.",
        items: [
          {
            heading: "요청 처리와 금융사 대기 분리",
            details: [
              "접수 요청은 신청 저장 후 즉시 응답하고, 금융사별 호출은 전용 고정 Thread Pool이 병렬 송신하도록 구현하였음",
              "동기 응답 금융사는 Read Timeout 안에서 결과를 받고, 비동기 금융사는 HTTP 콜백·TCP 전문 수신으로 결과를 신청별 상태에 기록하도록 하였음",
              "응답 없는 신청은 점검 Thread가 70초에 실패 처리하여 한 금융사 지연이 조회 전체를 막지 않게 하였음",
            ],
          },
          {
            heading: "금융사 연동 통합",
            details: [
              "통신 규격(HTTP-JSON, TCP 고정 길이 전문)·암복호화(AES/CBC, SEED)·인증서/프록시 인증을 금융사 유형별 모듈로 분리하였음",
              "자격 조건 사전 필터와 OAuth 토큰 캐시(30분)로 호출 수와 호출당 비용을 줄였음",
            ],
          },
          {
            heading: "재설계(v2): 모듈 분리와 은행별 핸들러",
            details: [
              "core(도메인·저장소)·client(금융사 규격·Feign 클라이언트)·worker(연동 실행)·batch·backoffice·mock 모듈로 분리하고, 공통 클라이언트 모듈을 라이브러리로 배포하여 기존 서비스가 의존하도록 하였음",
              "금융사별 요청 생성·응답 파싱을 BankHandler 인터페이스와 레지스트리로 정리하여 신규 금융사는 핸들러 추가로 연동되도록 하였음",
              "금융사 서버별 HTTP 클라이언트를 액션별 Timeout(조회·계약·취소·상태 확인)으로 캐시해 재사용하고, 쿠콘·카드사·대환 은행 목업 서버로 연동을 검증하였음",
            ],
          },
          {
            heading: "운영 한계 진단",
            details: [
              "무한 대기열·금융사별 상한 부재·메모리 기반 점검의 한계를 진단하고, 유한 대기열·금융사별 동시 상한·DB 기반 만료 점검으로의 개선안을 설계하였음",
            ],
          },
          {
            heading: "서비스 분리",
            details: [
              "비교대출(Java)·대환대출(Kotlin) 서버를 분리하여 독립 배포·스케일링을 확보하였음",
            ],
          },
        ],
      },
      {
        title: "FINDA Open API 설계",
        items: [
          {
            heading: "금융사 제공용 Open API 설계",
            details: ["Open API 스펙을 설계하고 BackOffice 관리 API를 개발하였음"],
          },
        ],
      },
    ],
  },
  {
    company: "신한은행",
    period: "2021.08 – 2022.09",
    team: "NEXT 추진팀 인프라플랫폼셀",
    stack: [
      "Java",
      "Spring Boot",
      "MyBatis",
      "MariaDB",
      "Confluent Kafka",
      "Reactor Kafka",
      "ELK",
      "JEUS",
    ],
    projects: [
      {
        title: "차세대 메시지 큐 플랫폼 개발 (The NEXT)",
        description:
          "영업점 웹 단말과 코어 시스템 간 실시간 메시지 처리 플랫폼 개발. 외주 개발자와 함께 담당 영역 개발·튜닝.",
        items: [
          {
            heading: "Reactor Kafka 클라이언트 개발",
            details: ["최대 15,000 TPS를 처리하는 Reactor Kafka 기반 클라이언트를 개발하였음"],
          },
          {
            heading: "Consumer Lag 튜닝",
            details: [
              "소비자 배치 설정(max.poll.records, fetch.min.bytes) 조정과 캐시 갱신 일괄 처리를 적용하였고, 파티션 증설은 순서 보장 문제로 배제하였음",
              "Lag를 수만 건에서 1,000건 이내로, 캐시 반영 지연을 30분에서 1분으로 단축하였음",
            ],
          },
          {
            heading: "실시간 Push 구현",
            details: [
              "SSE 기반 실시간 Push를 구현하고, 시각 비교 기반 무효 연결 정리 로직을 개발하였음",
            ],
          },
          {
            heading: "승인 워크플로우 메시지 설계",
            details: ["거래·책임자 승인 워크플로우의 메시지 발행/소비 로직을 설계하였음"],
          },
        ],
      },
      {
        title: "채널통합시스템 운영",
        items: [
          {
            heading: "전문 변환 플랫폼 개발",
            details: ["JSON ↔ 고정 길이 은행 코어 전문 양방향 변환 플랫폼을 개발하였음"],
          },
          {
            heading: "통합 로그 모니터링 구축",
            details: [
              "ELK 기반 통합 인터페이스 로그 모니터링과 Kibana 대시보드를 구축하였음",
              "장애 구간을 즉시 식별할 수 있게 하였음",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "현대오토에버",
    period: "2020.03 – 2021.02",
    team: "경영데이터분석팀",
    stack: [
      "Spring Framework",
      "MyBatis",
      "Oracle",
      "Tibero",
      "Kafka",
      "Informatica PowerCenter",
      "SAP BW",
    ],
    projects: [
      {
        title: "차세대 Global BI 시스템 구축",
        description: "현대·기아 임원·현업 대상 약 20개국 해외 판매 법인 데이터 차트 플랫폼 개발.",
        items: [
          {
            heading: "SQL 성능 개선",
            details: [
              "500줄 이상 SQL을 리팩토링하여 절반 이하로 축소하였음",
              "초기 페이지 로딩을 30초에서 3초 이내로 단축하였음",
            ],
          },
          {
            heading: "레거시 리포트 전환",
            details: ["Flex 레거시 리포트를 HTML5로 전환하고 다국어 메뉴를 개발하였음"],
          },
          {
            heading: "ETL 파이프라인 개발·운영",
            details: [
              "해외 법인 판매/회계 데이터 ETL 파이프라인을 개발·운영하였음 (Kafka, Informatica, SAP BW)",
            ],
          },
        ],
      },
    ],
  },
];

export default careers;
