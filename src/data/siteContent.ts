import type {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  LinkItem,
  LearningHistoryItem,
  LocalizedInlineText,
  OtherItem,
  PortfolioItem,
  SkillItem,
  SkillCategory,
} from "../types";
import type { Locale, ProjectItem } from "../types";

const text = (value: string) => ({ text: value });
const plainDescription = (ko: string, en: string): LocalizedInlineText => ({
  ko: [text(ko)],
  en: [text(en)],
});

export const profile = {
  name: "Inryeol Choi",
  githubUrl: "https://github.com/InryeolChoi",
  headline: {
    ko: "늘 우직하게, 늘 갈망하는 개발자",
    en: "Stay foolish, Stay hungry",
  },
  intro: {
    ko: "백엔드 시스템의 구조와 흐름을 이해하고 설계하는 개발자를 지향합니다. 늘 우직하게 도전하고, 늘 갈망하며 성장하려는 개발자 최인렬입니다. 학부 수업을 들으며 프로그래밍을 처음 접했고, 알고리즘 공부를 시작으로 42서울에 들어가며 개발을 더 깊이 있게 공부했습니다.\n\n처음에는 빅데이터를 통해 혁신적인 서비스를 개발해 보고 싶다는 마음으로 공부를 시작했지만, 데이터 분석을 공부할수록 데이터를 해석하는 일 자체보다 데이터를 어떻게 저장하고 관리하고 처리할지 구조를 설계하는 일에 더 큰 흥미를 느끼게 되었습니다.\n\n그 경험을 계기로 자연스럽게 컴퓨터공학 전반에 관심을 가지게 되었고, 지금은 백엔드 프로그래밍, 데이터베이스, 클라우드 같은 분야를 중심으로 꾸준히 공부하고 있습니다. 멈추지 않고 끊임없이 나아가며, 기술로 더 단단한 서비스를 만드는 개발자가 되고 싶습니다.",
    en: "I aspire to become a developer who understands and designs the structure and flow of backend systems. I am a developer who keeps moving forward with steady curiosity. I first encountered programming through university courses, then began studying more seriously through algorithms and continued that journey at 42 Seoul.\n\nAt first, I wanted to build innovative services through big data, but the more I studied data analysis, the more I became interested in designing how data is stored, managed, and processed.\n\nThat shift naturally led me deeper into computer science as a whole, and I am now continuously studying backend programming, databases, and cloud technologies. I want to keep growing and build stronger services through technology.",
  },
  email: "dlsfuf0316@gmail.com",
  location: {
    ko: "Seoul, South Korea",
    en: "Seoul, South Korea",
  },
  photoPath: "/1208axx_light.jpg",
  resumeLinks: {
    ko: {
      label: "이메일 보내기",
      href: "mailto:dlsfuf0316@gmail.com",
    },
    en: {
      label: "Send email",
      href: "mailto:dlsfuf0316@gmail.com",
    },
  },
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/InryeolChoi",
    },
    {
      label: "Email",
      href: "mailto:dlsfuf0316@gmail.com",
    },
  ] satisfies LinkItem[],
};

export const skillCategories: SkillCategory[] = [
  {
    title: {
      ko: "핵심 스택",
      en: "Core Stack",
    },
    items: [
      {
        name: "Java",
        iconKey: "java",
        description: plainDescription(
          "학교 수업에서 Java로 객체지향의 기본기를 잡은 뒤, <모던 자바 인 액션>을 따라가며 람다, 스트림, Optional, Fork/Join, 비동기 API 같은 주제를 예제 중심으로 정리했습니다. 단순히 문법을 외우는 데서 멈추지 않고, 반복문 중심 코드가 스트림 기반 코드로 바뀌면 가독성과 책임 분리가 어떻게 달라지는지, null 처리와 비동기 흐름을 어떤 방식으로 더 명확하게 표현할 수 있는지를 계속 비교해보며 모던 자바 스타일을 익혔습니다.",
          "After building my Java fundamentals in class, I studied lambdas, streams, Optional, Fork/Join, and asynchronous APIs through example-driven practice with Modern Java in Action. I focused less on memorizing syntax and more on how Java changes code structure, especially in readability, responsibility separation, null handling, and asynchronous flow design.",
        ),
      },
      {
        name: "Spring",
        iconKey: "spring",
        description: plainDescription(
          "Spring을 공부하면서 가장 많이 고민한 지점은 기능을 구현하는 것보다 백엔드 구조를 어디까지 프레임워크의 흐름에 맡기고, 어디까지 직접 의도를 드러내며 설계할 것인가였습니다. 컨트롤러, 서비스, 리포지토리로 책임을 나누는 방식, 의존성 주입과 설정 분리, 요청이 들어와 응답으로 나가기까지의 흐름을 따라가며, 코드가 커질수록 일관된 구조와 명확한 역할 분담이 왜 중요한지 더 실감하게 되었습니다.",
          "While studying Spring, the main question I kept returning to was not just how to build features, but how much of the backend structure should rely on the framework and how much should be expressed explicitly through design. By working through controller-service-repository separation, dependency injection, configuration, and request flow, I came to appreciate why consistent structure and clear role boundaries matter more as an application grows.",
        ),
      },
      {
        name: "Docker",
        iconKey: "docker",
        description: plainDescription(
          "Docker를 사용하면서 가장 크게 느낀 점은 '내 로컬에서는 되는데 다른 환경에서는 안 되는 문제'를 줄이려면 실행 환경 자체를 함께 관리해야 한다는 것이었습니다. 데이터베이스 실습과 웹 프로젝트에서 컨테이너를 분리해 보며 이미지, 볼륨, 네트워크, 환경 변수 구성을 반복해서 맞춰봤고, 무엇을 컨테이너로 감싸고 무엇은 로컬에 두는 것이 개발 흐름상 더 단순한지 계속 고민했습니다. 그 과정을 통해 Docker를 단순한 실행 도구가 아니라 개발 환경을 재현 가능하게 만드는 설계 도구로 보게 되었습니다.",
          "What stood out to me most while using Docker was that reducing environment-specific issues requires managing the runtime itself, not just the code. As I separated databases and app environments into containers, I repeatedly worked through images, volumes, networks, and environment variables, and thought carefully about what should be containerized versus kept local. That made me see Docker not just as a way to run services, but as a tool for making development environments reproducible by design.",
        ),
      },
      {
        name: "Linux",
        iconKey: "linux",
        description: plainDescription(
          "Linux 환경에서는 단순히 명령어를 쓰는 수준을 넘어서 파일 권한, 프로세스, 파이프, 시그널, 표준 입출력 같은 운영체제의 기본 추상화를 몸으로 익히게 되었습니다. 셸 환경과 시스템 콜 중심 과제를 수행하면서 프로그램이 실행되고 연결되는 흐름을 더 낮은 수준에서 이해하게 되었고, 개발 도구를 사용할 때도 결국 그 아래에서 어떤 프로세스와 자원이 움직이는지를 의식하게 되었습니다. 이런 경험 덕분에 리눅스 기반 개발 환경을 훨씬 덜 막연하게 다루게 되었습니다.",
          "Working in Linux pushed me beyond basic command usage and into the operating system ideas underneath, such as permissions, processes, pipes, signals, and standard I/O. Through shell-oriented and system-call-heavy assignments, I learned to understand programs at the level of execution flow and resource handling, which also changed how I think about development tools running on top of the OS. That experience made Linux feel much less abstract and much more intuitive as a development environment.",
        ),
      },
      {
        name: "GCP",
        iconKey: "gcp",
        description: plainDescription(
          "GCP Compute Engine의 free tier 환경을 사용해보며 VS Code Server와 RStudio Server를 직접 띄워 운영해봤습니다. 그 과정에서 메모리가 쉽게 부족해지는 문제를 자주 마주했고, 한정된 자원 안에서 어떤 서비스를 우선적으로 유지하고 어떻게 나눠 써야 하는지 계속 고민하며 자원 관리 감각을 키웠습니다.",
          "Using the free tier of GCP Compute Engine, I ran both VS Code Server and RStudio Server and learned by dealing with frequent memory constraints. That experience pushed me to think carefully about how to prioritize, split, and sustain services under limited resources.",
        ),
      },
      {
        name: "Nginx",
        iconKey: "nginx",
        description: plainDescription(
          "Nginx를 사용해 프론트엔드와 백엔드가 함께 동작하는 웹 애플리케이션 연결 구조를 구성해보고, 데이터베이스를 포함한 전체 서비스 흐름을 운영 관점에서 맞춰보았습니다. 또한 SSL/TLS 설정도 직접 적용해보며 웹 애플리케이션의 보안 안정성을 높이는 과정을 경험했습니다.",
          "I used Nginx to set up the connection structure for a web application where the frontend, backend, and database work together as one service flow. I also configured SSL/TLS myself, gaining hands-on experience in improving the security and operational stability of the application.",
        ),
      },
    ] satisfies SkillItem[],
  },
  {
    title: {
      ko: "익숙한 기술",
      en: "Familiar With",
    },
    items: [
      {
        name: "C",
        iconKey: "c",
        description: plainDescription(
          "C는 문법 자체보다 직접 구현하면서 훨씬 많이 배운 언어였습니다. 가변 인자와 포맷 문자열 처리, `read()` 기반 버퍼 관리, `pipe`·`fork`·`dup2`·`execve`를 이용한 프로세스 연결, 스레드와 뮤텍스를 통한 동기화 문제까지 차례로 다뤄보면서 메모리 관리, 파일 디스크립터, 시스템 콜, 멀티프로세싱, 멀티스레딩을 구현 맥락에서 이해하게 되었습니다. 특히 작은 실수 하나가 바로 버그로 이어지는 경험을 반복하면서, 저수준에서 정확하게 사고하는 습관이 얼마나 중요한지 몸으로 배웠습니다.",
          "I learned C far more through implementation than through syntax alone. By working through variadic formatting, buffered input around `read()`, process pipelines with `pipe`, `fork`, `dup2`, and `execve`, and synchronization with threads and mutexes, I developed a practical understanding of memory management, file descriptors, system calls, multiprocessing, and multithreading. Repeatedly seeing how small mistakes turn directly into bugs taught me the value of careful low-level thinking.",
        ),
      },
      {
        name: "C++",
        iconKey: "cplusplus",
        description: plainDescription(
          "C++를 공부하면서는 클래스 설계, 생성자와 소멸자, 레퍼런스, OCCF, 상속, 다형성, 추상 클래스, 템플릿, STL, 타입 변환을 단계적으로 따라가며 객체지향을 더 넓게 바라보게 되었습니다. 특히 C++는 복사 제어와 자원 관리가 언어 차원에서 훨씬 직접적으로 드러나기 때문에, Java나 Python에서 익힌 객체지향과 무엇이 같고 무엇이 다른지를 계속 비교하게 만들었습니다. 덕분에 인터페이스 설계와 추상화뿐 아니라 소유권과 생명주기까지 함께 생각하는 습관을 얻게 되었습니다.",
          "Studying C++ broadened the way I think about object-oriented design through classes, constructors and destructors, references, the Orthodox Canonical Class Form, inheritance, polymorphism, abstract classes, templates, STL, and type conversion. Because C++ makes copy control and resource management much more explicit, it pushed me to compare what is shared with Java and Python and what is fundamentally different. That gave me a stronger sense of abstraction, ownership, and object lifetime together.",
        ),
      },
      {
        name: "Python",
        iconKey: "python",
        description: plainDescription(
          "Python은 알고리즘 풀이, 백엔드 학습, 데이터 분석까지 가장 폭넓게 활용해본 언어입니다. 문제 풀이에서는 빠르게 로직을 세우고 자료구조를 다루는 감각을 길렀고, Django 기반 프로젝트를 구성할 때는 앱 분리, 모델, URL, 뷰, 직렬화 같은 웹 서비스 기본 구조를 익히는 데 활용했습니다. 또 노트북 환경에서 데이터를 다루며 실험적인 분석 흐름도 경험해보았습니다. 이런 과정을 통해 Python은 아이디어를 빠르게 검증하기에 강하지만, 프로젝트가 커질수록 구조를 의식하며 써야 한다는 점도 함께 느끼게 되었습니다.",
          "Python is the language I have used across the widest range of contexts, including algorithm practice, backend learning, and data analysis. It helped me build fast implementation habits in problem solving, while also supporting backend fundamentals such as app structure, models, URLs, views, and serialization in Django-based work. I also used it in notebook-driven analysis. That range made Python feel especially strong for quick experimentation, while also reminding me that larger projects still require deliberate structure and discipline.",
        ),
      },
      {
        name: "Django",
        iconKey: "django",
        description: plainDescription(
          "Django로 프로젝트를 구성하면서 앱 단위 구조화, 모델과 마이그레이션, URL 라우팅, 뷰와 직렬화, 기본 인증 흐름처럼 백엔드 웹 프레임워크의 핵심 구성을 익혔습니다.",
          "I studied Django through real project structure, learning app organization, models and migrations, URL routing, views, serializers, and core backend workflow.",
        ),
      },
      {
        name: "Git",
        iconKey: "git",
        description: plainDescription(
          "Git을 활용한 협업을 반복해보며 브랜치를 나누어 작업하고, 변경 이력을 관리하고, 서로 다른 작업 내용을 합치는 흐름에 익숙해졌습니다. 특히 브랜치가 꼬이거나 충돌이 복잡하게 나는 상황도 직접 겪어보면서, 단순히 명령어를 쓰는 것을 넘어 히스토리를 어떻게 읽고 정리해야 협업이 덜 흔들리는지 많이 배우게 되었습니다.",
          "By collaborating with Git repeatedly, I became comfortable with splitting work across branches, managing change history, and merging different lines of work. Handling messy branch states and complex conflicts also taught me that effective collaboration depends not just on commands, but on understanding and cleaning up history carefully.",
        ),
      },
      {
        name: "PostgreSQL",
        iconKey: "postgresql",
        description: plainDescription(
          "PostgreSQL을 사용해 데이터베이스를 직접 구축해보며 테이블 구조를 설계하고, 관계를 정의하고, 애플리케이션과 연결해 데이터를 저장하고 조회하는 흐름을 익혔습니다. 실제 프로젝트에서 스키마를 어떻게 나누고 어떤 식으로 데이터를 쌓아야 이후 기능 확장과 조회가 더 자연스러운지도 함께 고민해보았습니다.",
          "Using PostgreSQL, I built databases directly and learned how to design table structures, define relationships, and connect applications to store and retrieve data. In real project contexts, I also thought carefully about how schema decisions affect future feature growth and query flow.",
        ),
      },
      {
        name: "GitHub Actions",
        iconKey: "githubactions",
        description: plainDescription(
          "GitHub Actions는 단순히 배포 버튼을 대신 눌러주는 도구라기보다, 반복 작업을 어떤 조건에서 자동화해야 팀과 개인의 흐름이 가장 덜 끊기는지 고민하게 만든 도구였습니다. 노트 동기화, 정적 사이트 배포, 체크 자동화 같은 작업을 구성하면서 트리거 시점, 실패 시 확인 방식, 작업 단위 분리를 직접 다뤄봤고, 그 과정에서 자동화는 편의 기능이 아니라 작업 품질과 일관성을 지키는 장치라는 점을 분명히 느꼈습니다.",
          "GitHub Actions felt less like a button replacement for deployment and more like a tool that made me think carefully about which repetitive tasks should be automated and under what conditions. While setting up note sync, static site deployment, and routine checks, I worked through trigger timing, failure visibility, and job separation, and came to see automation as a way to protect consistency and workflow quality rather than just save clicks.",
        ),
      },
    ] satisfies SkillItem[],
  },
  {
    title: {
      ko: "탐색해 본 기술",
      en: "Explored",
    },
    items: [
      {
        name: "R",
        iconKey: "r",
        description: plainDescription(
          "통계학과 수업을 통해 R을 배우면서 통계적 검정 방법을 직접 연습하고, 데이터를 시각화하며 결과를 해석하는 흐름을 함께 익혔습니다.",
          "Through statistics coursework, I learned R by practicing statistical testing methods and working on data visualization alongside result interpretation.",
        ),
      },
      {
        name: "TypeScript",
        iconKey: "typescript",
        description: plainDescription(
          "React 프로젝트에서 타입 안정성을 높이기 위해 사용했고, 데이터 구조를 명확하게 정의하며 유지보수성을 높였습니다. 그 과정에서 단순히 문법만 쓰는 데 그치지 않고 Node.js가 어떻게 동작하는지도 함께 의식하며 살펴보았습니다.",
          "I used TypeScript in React projects to improve type safety and keep data structures explicit and maintainable. Along the way, I also paid close attention to how Node.js works underneath rather than treating TypeScript as syntax alone.",
        ),
      },
      {
        name: "React",
        iconKey: "react",
        description: plainDescription(
          "포트폴리오 사이트와 학습용 UI를 만들면서 컴포넌트 설계, 상태 흐름, 화면 구조 분리에 익숙해졌습니다.",
          "I used React to build this portfolio and study-focused interfaces, becoming comfortable with component design, state flow, and screen composition.",
        ),
      },
      {
        name: "FastAPI",
        iconKey: "fastapi",
        description: plainDescription(
          "개인 학습 프로젝트에서 FastAPI로 API를 나누고 시험 생성, 제출, 채점, 결과 조회 흐름을 연결해보며 가볍고 명확한 웹 API 구성을 경험했습니다. 타입 힌트와 Pydantic 기반 검증 덕분에 빠르게 구조를 잡는 데는 장점이 컸지만, 애플리케이션 규모가 커질수록 구조를 어디까지 세분화할지 계속 고민하게 되어서 지금은 탐색과 비교의 대상으로 두고 있습니다.",
          "I explored FastAPI in personal projects by structuring APIs around exam creation, submission, grading, and result flows. Its type hints and Pydantic-based validation made it easy to move quickly, but it also made me think more carefully about how far to separate structure as an application grows, so I currently view it as part of my ongoing exploration and comparison.",
        ),
      },
      {
        name: "Swift",
        iconKey: "swift",
        description: plainDescription(
          "Swift로 42서울 내 교육생 위치를 확인하는 앱인 42Where를 유지보수하고 신기능을 추가해보며 iOS 앱 구조와 화면 흐름, 실제 서비스 코드를 다루는 경험을 쌓았습니다.",
          "Using Swift, I worked on maintenance and feature additions for 42Where, an internal app used to check student locations at 42 Seoul, gaining experience with iOS app structure, screen flow, and real service code.",
        ),
      },
    ] satisfies SkillItem[],
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Active Recall Quiz",
    description: {
      ko: "외부 markdown 노트를 동기화해 문제 생성, 시험 응시, 채점, 오답 복습까지 이어지는 학습 앱입니다.",
      en: "A learning app that syncs external markdown notes and turns them into quiz creation, exam, grading, and review flows.",
    },
    techStack: ["Next.js", "React", "FastAPI", "SQLite", "GitHub Actions"],
    githubUrl: "https://github.com/InryeolChoi/active-recall-quiz",
  },
  {
    title: "Active Recall Notes",
    description: {
      ko: "정처기 실기 대비를 위해 markdown 기반 이론 자료를 구조화하고, 학습 앱에 공급하는 노트 저장소입니다.",
      en: "A markdown-driven note repository that structures study materials and supplies content to the learning app.",
    },
    techStack: ["Markdown", "GitHub Actions", "Content Modeling", "Study Workflow"],
    githubUrl: "https://github.com/InryeolChoi/active-recall-notes",
  },
  {
    title: "Database Playground",
    description: {
      ko: "PostgreSQL와 Docker를 기반으로 SQL과 데이터베이스 개념을 실습하는 저장소입니다.",
      en: "A hands-on repository for practicing SQL and database concepts with PostgreSQL and Docker.",
    },
    techStack: ["PostgreSQL", "Docker", "SQL"],
    githubUrl: "https://github.com/InryeolChoi/database-playground",
  },
  {
    title: "Profile Site",
    description: {
      ko: "개인 소개, 프로젝트, 경력과 교육 이력을 정리하는 GitHub Pages 기반 포트폴리오 사이트입니다.",
      en: "A GitHub Pages portfolio site that organizes profile, projects, career, and education content.",
    },
    techStack: ["React", "TypeScript", "Vite", "Motion"],
    githubUrl: "https://github.com/InryeolChoi/inchoi.github.io",
  },
  {
    title: "심심조각",
    description: {
      ko: "감정 기록 기반 일기 서비스의 Spring Boot 백엔드로, 소셜 로그인과 일기 관리, AI 편지, 월간 리포트 흐름을 하나로 연결한 프로젝트입니다.",
      en: "A Spring Boot backend for an emotion-based diary service that ties together social login, diary management, AI letters, and monthly reports.",
    },
    techStack: ["Spring Boot", "Java", "MySQL", "Redis", "JWT"],
    githubUrl: "https://github.com/InryeolChoi/simsim-server",
  },
];

export const projectItems: ProjectItem[] = [
  {
    title: "ft_malloc",
    role: {
      ko: "메모리 할당자 설계와 동적 메모리 관리 구현",
      en: "Memory allocator design and dynamic memory management implementation",
    },
    problem: {
      ko: "동적 메모리 할당자는 요청 크기에 맞는 영역을 빠르게 찾는 것뿐 아니라 정렬, 단편화, 잘못된 포인터, 크기 계산 overflow, 사용이 끝난 메모리의 반환까지 함께 다뤄야 했습니다.",
      en: "A dynamic memory allocator has to do more than find space for each request; it also needs to handle alignment, fragmentation, invalid pointers, size calculation overflow, and returning unused memory to the operating system.",
    },
    approach: {
      ko: "`mmap()`으로 확보한 영역을 TINY, SMALL, LARGE zone으로 나누고, 사용자 영역 앞의 tag 메타데이터로 할당 상태와 크기를 추적했습니다. free tag를 재사용하고 필요할 때 분할하며, `free()`에서는 인접한 빈 tag를 병합하고 완전히 비어진 box를 조건에 따라 `munmap()`하도록 구성했습니다.",
      en: "I divided memory obtained through `mmap()` into TINY, SMALL, and LARGE zones and tracked allocation state and size with tag metadata placed before each user area. Free tags are reused and split when appropriate, while `free()` coalesces adjacent free tags and conditionally releases empty boxes with `munmap()`.",
    },
    summary: {
      ko: "C 표준 라이브러리의 동적 메모리 관리 흐름을 더 낮은 수준에서 이해하기 위해 `malloc`, `free`, `realloc`, `show_alloc_mem`을 직접 구현한 프로젝트입니다.",
      en: "A project where I implemented `malloc`, `free`, `realloc`, and `show_alloc_mem` to understand the lower-level mechanics behind dynamic memory management in the C standard library.",
    },
    highlights: {
      ko: [
        "TINY·SMALL·LARGE zone별 box 관리와 16-byte 정렬 구현",
        "free tag 탐색·분할·재사용 및 인접 free tag 병합 구현",
        "완전히 비어진 LARGE 및 여분의 TINY·SMALL box를 `munmap()`으로 반환",
        "포인터 검증과 overflow 방지를 포함한 `realloc` 및 주소순 `show_alloc_mem` 구현",
      ],
      en: [
        "Implemented box management across TINY, SMALL, and LARGE zones with 16-byte alignment",
        "Implemented free-tag lookup, splitting, reuse, and adjacent free-tag coalescing",
        "Returned fully unused LARGE boxes and surplus TINY/SMALL boxes with `munmap()`",
        "Implemented `realloc` with pointer validation and overflow checks, plus address-ordered `show_alloc_mem` output",
      ],
    },
    githubUrl: "https://github.com/InryeolChoi/ft_malloc",
  },
  {
    title: "ft_irc",
    role: {
      ko: "서버 구조 설계와 이벤트 기반 I/O 흐름 이해",
      en: "Server structure design and event-driven I/O flow understanding",
    },
    problem: {
      ko: "IRC 서버는 여러 클라이언트 연결과 채널 상태를 동시에 다뤄야 해서, 전체 구조를 먼저 잡지 않으면 기능이 추가될수록 흐름이 쉽게 복잡해지는 문제가 있었습니다.",
      en: "An IRC server has to manage multiple clients and channel states at once, so the architecture could quickly become tangled without a clear structure from the start.",
    },
    approach: {
      ko: "서버의 큰 구조를 먼저 나누어 보고, 여러 소켓 이벤트를 어떻게 감시하고 처리하는지를 `kqueue()` 흐름을 중심으로 이해하며 이벤트 기반 서버 동작 방식을 정리했습니다.",
      en: "I focused on structuring the server first, then studied how multiple socket events are observed and processed through multi-`kqueue()` flow to understand event-driven server behavior.",
    },
    summary: {
      ko: "여러 사용자 연결을 처리하는 IRC 서버를 구현하며 네트워크 서버 구조와 이벤트 기반 입출력 방식을 학습한 프로젝트입니다. 대규모 동시 연결 환경에서도 서버 구조가 쉽게 무너지지 않도록 이벤트 기반 구조를 설계하고 안정적으로 동작하는 서버를 구현해보았습니다.",
      en: "A project where I learned network server architecture and event-driven I/O while implementing an IRC server that handles multiple user connections. I focused on designing an event-driven structure that could stay stable even under heavy concurrent connections.",
    },
    highlights: {
      ko: [
        "기능 추가 전 전체 서버 구조를 먼저 나누어 설계",
        "멀티플렉싱 기반 논블로킹 I/O 시스템 콜인 `kqueue()`의 이벤트 감지 흐름 이해",
        "클라이언트 연결과 채널 상태를 다루는 서버 동작 방식 학습",
      ],
      en: [
        "Designed the overall server structure before expanding features",
        "Studied the event detection flow of `kqueue()`, a multiplexing-based non-blocking I/O system call",
        "Learned how the server handles client connections and channel state",
      ],
    },
    githubUrl: "https://github.com/ByteTalkers/FT_IRC",
  },
  {
    title: "minishell",
    role: {
      ko: "파싱 구조 학습과 파이프 실행 흐름 구현",
      en: "Parsing structure study and pipe execution flow implementation",
    },
    problem: {
      ko: "쉘은 입력을 단순히 실행하는 것이 아니라, 명령어를 해석하고 파이프와 리다이렉션 같은 규칙에 맞게 흐름을 나눠 처리해야 해서 파싱 구조를 먼저 이해하는 것이 중요했습니다.",
      en: "A shell does more than execute input; it has to parse commands and handle rules like pipes and redirections, so understanding the parsing structure was essential first.",
    },
    approach: {
      ko: "명령어가 어떤 단계로 파싱되어 실행 구조로 이어지는지 공부하고, 그 위에서 여러 명령을 연결하는 pipe 흐름을 직접 구성하면서 쉘의 실행 과정을 이해했습니다.",
      en: "I studied how commands are parsed into executable structures and built the pipe flow that connects multiple commands, which helped me understand how a shell executes user input.",
    },
    summary: {
      ko: "쉘이 입력을 해석하고 여러 명령을 연결해 실행하는 과정을 직접 구현하며 파싱과 프로세스 흐름을 익힌 프로젝트입니다. 쉘 명령 실행의 복잡도를 낮추기 위해 파싱 결과를 실행 구조로 변환하는 흐름을 설계하고, pipe 기반 프로세스 연결 구조를 직접 구현했습니다.",
      en: "A project where I implemented how a shell interprets input and connects commands, learning parsing and process flow along the way. To reduce the complexity of shell execution, I designed a flow that transforms parsing results into execution structures and implemented the pipe-based process chaining directly.",
    },
    highlights: {
      ko: [
        "입력을 실행 가능한 구조로 바꾸는 파싱 흐름 학습",
        "여러 명령을 연결하는 pipe 구조 구현",
        "쉘 명령 실행 과정과 프로세스 연결 방식 이해",
      ],
      en: [
        "Learned the parsing flow that turns input into executable structures",
        "Implemented the pipe structure that connects multiple commands",
        "Understood shell command execution and process chaining",
      ],
    },
    githubUrl: "https://github.com/berryyogurt-minishell/42_minishell",
  },
  {
    title: "transcendence",
    role: {
      ko: "백엔드 구축, 인증 흐름 구현, 인프라 환경 구성",
      en: "Backend development, authentication flow implementation, and infrastructure setup",
    },
    problem: {
      ko: "실제 서비스 형태의 웹 프로젝트에서는 API 서버, 로그인, 보안, 데이터베이스, 배포용 실행 환경이 함께 맞물려야 해서 백엔드 전반을 통합적으로 설계할 필요가 있었습니다.",
      en: "A service-style web project required the API server, authentication, security, database, and runtime environment to work together, so the backend had to be designed as an integrated system.",
    },
    approach: {
      ko: "Django와 Django REST Framework로 백엔드를 구축하고, 42 OAuth 로그인과 JWT 발급 흐름을 연결했습니다. 인증 실패나 토큰 만료 상황에서도 사용자 경험이 끊기지 않도록 JWT 재발급 구조를 설계해 전체 인증 흐름에 통합했고, 여기에 이메일 기반 2차 인증 링크를 붙여 인증 단계를 강화했습니다. PostgreSQL과 Docker Compose로 실행 환경까지 함께 구성했습니다.",
      en: "I built the backend with Django and Django REST Framework, connected 42 OAuth login with JWT issuance, and designed a JWT refresh flow so the overall authentication experience would remain stable even when authentication fails or tokens expire. I also added email-based two-factor verification links and set up the runtime environment with PostgreSQL and Docker Compose.",
    },
    summary: {
      ko: "실제 웹 서비스 흐름을 기준으로 인증과 데이터 저장, 실행 환경까지 포함한 백엔드를 구축해본 프로젝트입니다.",
      en: "A project where I built a backend for a real web-service flow, covering authentication, persistence, and runtime environment setup.",
    },
    highlights: {
      ko: [
        "Django + Django REST Framework 기반 백엔드 구축",
        "42 OAuth 로그인, JWT 발급, 이메일 기반 2차 인증 링크 구현",
        "PostgreSQL와 Docker Compose를 이용한 개발 환경 구성",
      ],
      en: [
        "Built the backend with Django and Django REST Framework",
        "Implemented 42 OAuth login, JWT issuance, and email-based two-factor verification links",
        "Set up the development environment with PostgreSQL and Docker Compose",
      ],
    },
    githubUrl: "https://github.com/InryeolChoi/transcendence",
  },
  {
    title: "심심조각",
    role: {
      ko: "Spring Boot 백엔드 설계, 인증 흐름 구성, AI 연동 API 구현",
      en: "Spring Boot backend design, authentication flow setup, and AI-integrated API implementation",
    },
    problem: {
      ko: "감정 기록 기반 일기 서비스는 소셜 로그인, 일기 저장과 수정, 토큰 재발급, AI 편지와 월간 리포트 생성까지 여러 흐름이 자연스럽게 이어져야 해서 인증과 데이터 저장, 외부 AI 호출을 함께 안정적으로 설계할 필요가 있었습니다.",
      en: "An emotion-based diary service needed social login, diary creation and editing, token refresh, AI letters, and monthly reports to work together smoothly, so authentication, persistence, and AI integration had to be designed as one stable flow.",
    },
    approach: {
      ko: "Spring Boot와 Spring Security, JPA를 기반으로 Google·Apple 로그인과 JWT 인증 구조를 구성하고, MySQL과 Redis를 연결해 사용자 정보와 토큰 상태를 관리했습니다. 여기에 일기 저장·조회·수정·삭제 API를 만들고, 로컬 AI 서버와 연동해 일일 편지, 요약, 월간 키워드 리포트 생성 흐름까지 하나의 백엔드 안에서 정리했습니다. 이 과정에서 외부 AI API의 응답 형식이 예상과 달라 오류가 발생하는 상황을 직접 분석했고, 응답 데이터 구조와 예외 케이스를 고려해 파싱 로직을 수정한 뒤 다양한 테스트 케이스로 정상 동작을 검증했습니다.",
      en: "Using Spring Boot, Spring Security, and JPA, I set up Google and Apple login with JWT-based authentication and connected MySQL and Redis to manage user data and token state. On top of that, I built diary create, read, update, and delete APIs and integrated a local AI server so daily letters, summaries, and monthly keyword reports could be handled within a single backend flow. During that work, I encountered failures caused by external AI API responses not matching the expected format, analyzed the response structure directly, updated the parsing logic to handle edge cases, and verified stable behavior with multiple test cases.",
    },
    summary: {
      ko: "감정 기록형 일기 서비스의 백엔드를 구축하며 인증, 데이터 저장, AI 응답 생성, 운영 기능까지 하나의 서비스 흐름으로 연결한 프로젝트입니다.",
      en: "A project where I built the backend for an emotion-tracking diary service, connecting authentication, persistence, AI response generation, and operational features into one service flow.",
    },
    highlights: {
      ko: [
        "Google·Apple 소셜 로그인과 JWT 재발급 흐름 구현",
        "일기 저장·조회·수정·삭제와 월별 기록 조회 API 구성",
        "외부 AI API 응답 형식 차이를 분석해 파싱 로직을 수정하고 테스트 케이스로 검증",
        "AI 편지, 요약, 월간 키워드 리포트 생성을 위한 로컬 AI 서버 연동",
      ],
      en: [
        "Implemented Google and Apple social login with JWT refresh flow",
        "Built diary create, read, update, delete, and monthly record query APIs",
        "Analyzed external AI API response mismatches, updated parsing logic, and verified behavior with test cases",
        "Integrated a local AI server for AI letters, summaries, and monthly keyword reports",
      ],
    },
    githubUrl: "https://github.com/InryeolChoi/simsim-server",
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    period: "2025.04 - Present",
    company: {
      ko: "삼일회계법인",
      en: "PwC Korea",
    },
    position: {
      ko: "정규직",
      en: "Full-time",
    },
    summary: {
      ko: "기업 IT 시스템의 운영 절차와 내부통제를 점검하며, 거래 데이터 흐름과 시스템 프로세스를 분석하고 데이터 정합성 검증을 통해 시스템 구조와 통제 로직을 이해하는 업무를 수행하고 있습니다.",
      en: "Reviewing enterprise IT operating procedures and internal controls while analyzing transaction data flows and system processes, using data consistency checks to understand system structures and control logic.",
    },
    highlights: {
      ko: [
        "거래 데이터 흐름과 시스템 프로세스를 분석해 주요 처리 구조와 통제 포인트 파악",
        "데이터 정합성 검증을 통해 시스템 구조와 통제 로직 이해",
        "이커머스·핀테크 등 약 14개 클라이언트 환경에서 거래 흐름, 시스템 구조, 통제 design test 분석 및 설계 지원",
        "Java·Kotlin 코드 로직과 Git 기반 저장소(GitHub, GitLab, Bitbucket)의 변경 이력을 검토하며 시스템 동작 구조와 구현 흐름 분석",
      ],
      en: [
        "Analyzed transaction data flows and system processes to understand processing structures and key control points",
        "Validated data consistency to build an understanding of system structures and control logic",
        "Supported analysis and design of control design tests across about 14 client environments in e-commerce, fintech, and related sectors",
        "Reviewed Java and Kotlin application logic alongside change histories in Git-based repositories including GitHub, GitLab, and Bitbucket to analyze system behavior and implementation flows",
      ],
    },
  },
  {
    period: "2024.10 - 2025.04",
    company: {
      ko: "삼일회계법인",
      en: "PwC Korea",
    },
    position: {
      ko: "인턴",
      en: "Intern",
    },
    summary: {
      ko: "기업 IT 시스템 운영 절차와 내부통제를 점검하며, 시스템 운영 프로세스를 이해하고 데이터 검증을 통해 거래 데이터의 정합성을 확인하는 업무를 수행했습니다.",
      en: "Supported reviews of enterprise IT operating procedures and internal controls, building an understanding of system operations while validating transaction data for consistency.",
    },
    highlights: {
      ko: [
        "기업 IT 시스템 운영 절차와 내부통제 문서 및 실제 운영 흐름 점검",
        "시스템 운영 프로세스를 따라가며 업무 처리 구조와 주요 통제 포인트 파악",
        "거래 데이터 검증을 통해 데이터 정합성과 처리 일관성 확인",
        "Java 코드 로직과 GitHub commit 로그를 검토하며 시스템 동작 방식과 변경 이력 이해",
      ],
      en: [
        "Reviewed enterprise IT operating procedures, internal control documentation, and operational flows",
        "Followed system operation processes to understand processing structures and key control points",
        "Validated transaction data to confirm data consistency and processing integrity",
        "Reviewed Java logic and GitHub commit histories to understand system behavior and change history",
      ],
    },
  },
];

export const educationItems: EducationItem[] = [
  {
    period: "2015.02 - 2018.02",
    institution: {
      ko: "대일외국어고등학교",
      en: "Daeil Foreign Language High School",
    },
    program: {
      ko: "스페인어과 졸업",
      en: "Graduated from the Spanish Language Department",
    },
    summary: {
      ko: "대일외국어고등학교 스페인어과에서 영어 회화가 필수적으로 이루어지는 시간과 영어 토론 수업, 모의 유엔 대회 등 다양한 활동을 통해 영어를 실제로 말하고 쓰는 경험을 쌓았습니다. 또한 문법, 독해, 어휘를 포괄하는 고급 영어 수업과 스페인어 학습, 영자신문 동아리 활동을 함께 경험하며 외국어를 입체적으로 익혔습니다.",
      en: "At Daeil Foreign Language High School, I built practical English communication skills through required speaking sessions, English debate classes, and Model United Nations activities. Alongside advanced English coursework covering grammar, reading, vocabulary, Spanish studies, and English newspaper club activities, I developed a broad and applied language foundation.",
    },
    highlights: {
      ko: [
        "영어 회화가 필수적으로 이루어지는 시간을 통해 말하기 중심의 영어 사용 경험 축적",
        "영어 토론 수업과 모의 유엔 대회 참여를 통해 의견을 정리하고 전달하는 훈련 수행",
        "문법, 독해, 어휘를 포괄하는 고급 영어 수업을 통해 전반적인 영어 역량 강화",
        "스페인어과 수업과 영자신문 동아리 활동을 병행하며 제2외국어 학습과 시사 영어 감각 확장",
      ],
      en: [
        "Built speaking-focused English experience through required conversation-based class sessions",
        "Trained in organizing and presenting ideas through English debate classes and Model United Nations activities",
        "Strengthened overall English ability through advanced coursework covering grammar, reading, and vocabulary",
        "Expanded both second-language learning and current-affairs English familiarity through Spanish studies and the English newspaper club",
      ],
    },
  },
  {
    period: "2018.03 - 2025.02",
    institution: {
      ko: "동국대학교",
      en: "Dongguk University",
    },
    program: {
      ko: "주전공: 경영정보학과 / 복수전공: 통계학과",
      en: "Major in Management Information Systems / Double Major in Statistics",
    },
    summary: {
      ko: "경영정보학과를 주전공으로, 통계학과를 복수전공으로 이수하며 서비스 개발, 비즈니스 프로세스 이해, 데이터 분석과 통계 모델링을 함께 학습했습니다.",
      en: "Completed a major in Management Information Systems and a double major in Statistics, combining service development, business process understanding, data analysis, and statistical modeling.",
    },
    highlights: {
      ko: [
        "경영정보학과: 모바일시스템개발(B+), 비즈니스프로그래밍(A0), 클라우드컴퓨팅서비스(B+)",
        "경영정보학과: 비즈니스프로세스관리(A+), 경영과학(B+), 데이터마케팅(A0), 빅데이터와비즈니스애널리틱스(A+)",
        "통계학과: 통계수학및R실습(B+), 확률과정론(B+), 탐색적자료분석(A+)",
        "통계학과: 회귀분석(A0), 다변량해석(B+), 데이터마이닝(B+)",
      ],
      en: [
        "Management Information Systems: Mobile System Development (B+), Business Programming (A0), Cloud Computing Service (B+)",
        "Management Information Systems: Business Process Management (A+), Management Science (B+), Data Marketing (A0), Big Data and Business Analytics (A+)",
        "Statistics: Statistical Mathematics and R Practice (B+), Stochastic Processes (B+), Exploratory Data Analysis (A+)",
        "Statistics: Regression Analysis (A0), Multivariate Analysis (B+), Data Mining (B+)",
      ],
    },
  },
];

export const learningHistoryItems: LearningHistoryItem[] = [
  {
    period: "2023.03 - 2024.10",
    institution: {
      ko: "42서울",
      en: "école 42 (Seoul Campus)",
    },
    program: {
      ko: "프로젝트 기반 소프트웨어 개발 과정",
      en: "Project-based software engineering program",
    },
    summary: {
      ko: "42서울에서 프로젝트 기반 학습을 통해 C/C++ 기반 시스템 프로그래밍을 집중적으로 익히며 개발의 기초 체력과 컴퓨터과학의 기본기를 단단히 다졌습니다. 추상적으로 느껴질 수 있는 개념들을 직접 구현해 보며 바닥부터 이해하는 경험을 했고, 동료평가와 팀 프로젝트를 통해 협업과 문제 해결 역량도 함께 키웠습니다.",
      en: "At 42 Seoul, I strengthened both programming fundamentals and core computer science foundations through project-based learning centered on C/C++ systems programming. By implementing concepts from the ground up, I developed a deeper understanding of ideas that can otherwise remain abstract, while peer review and team projects sharpened my collaboration and problem-solving skills.",
    },
    highlights: {
      ko: [
        "C/C++ 기반 시스템 프로그래밍을 통해 개발 기초와 컴퓨터과학 기본기 강화",
        "직접 구현하는 프로젝트들을 통해 추상적인 개념을 바닥부터 만들어보며 심도 있게 이해",
        "동료평가(peer review)를 통해 평가자와 피평가자 양쪽 입장에서 이해 수준을 함께 점검",
        "월 160시간의 학습을 이어가며 몰입감 있는 개발 경험 축적",
        "다양한 팀 프로젝트와 스터디를 경험하며 갈등을 마주하고 해결하는 과정에서 문제 해결 능력 향상",
      ],
      en: [
        "Strengthened programming fundamentals and core computer science foundations through C/C++ systems programming",
        "Built deeper understanding by implementing abstract concepts directly from the ground up",
        "Used peer review to evaluate understanding from both reviewer and reviewee perspectives",
        "Maintained an intensive learning rhythm of about 160 hours per month, developing a strong sense of immersion in programming",
        "Improved problem-solving skills by navigating conflicts and collaboration through diverse team projects and study groups",
      ],
    },
  },
];

export const certificationItems: CertificationItem[] = [
  {
    title: {
      ko: "OPIC",
      en: "OPIC",
    },
    grade: "AL",
    acquiredAt: "2024.09.20",
  },
  {
    title: {
      ko: "SQLD",
      en: "SQLD",
    },
    acquiredAt: "2021.12.17",
    description: {
      ko: "데이터 모델링과 SQL 기본 및 활용 능력을 검정하는 자격증입니다.",
      en: "A certification that validates practical understanding of data modeling and core SQL usage.",
    },
  },
  {
    title: {
      ko: "빅데이터분석기사",
      en: "Big Data Analysis Engineer",
    },
    acquiredAt: "2024.12.20",
    description: {
      ko: "빅데이터 이해, 탐색, 모델링, 결과 해석 등 데이터 분석 전반을 다루는 국가기술자격입니다.",
      en: "A national technical certification covering big-data understanding, analysis workflow, modeling, and interpretation.",
    },
  },
];

export const otherItems: OtherItem[] = [
  {
    period: "2020.09 - 2022.03",
    organization: {
      ko: "대한민국 육군 카투사",
      en: "KATUSA",
    },
    role: {
      ko: "미8군 통역·행정 지원",
      en: "Eighth Army interpretation and administrative support",
    },
    summary: {
      ko: "미8군 환경에서 통역과 행정 지원 업무를 수행하며 카투사 대상 한국군 행정 절차를 관리했습니다. 코로나 시기 행정 절차 운영과 신규 카투사 보직 관련 논의에 참여했고, 이후 Senior KATUSA 역할을 맡아 조율과 책임 있는 운영 경험을 쌓았습니다.",
      en: "In the Eighth Army environment, I supported interpretation and administrative operations while managing Korean military procedures for KATUSA personnel. During the COVID period, I handled administrative processes and discussions around new KATUSA assignments, and later served as a Senior KATUSA with added coordination and leadership responsibility.",
    },
    highlights: {
      ko: [
        "미8군 통역 업무를 수행하며 한미 간 커뮤니케이션 지원",
        "카투사 대상 한국군 행정 업무와 코로나 시기 행정 절차 관리",
        "신규 카투사 보직 관련 논의와 조율 수행",
        "임시 Senior KATUSA 역할을 맡아 책임 분담, 안내, 운영 리더십 경험 축적",
      ],
      en: [
        "Supported communication between Korean and U.S. personnel through interpretation work in the Eighth Army environment",
        "Managed Korean military administrative procedures for KATUSA personnel, including processes during the COVID period",
        "Participated in discussion and coordination around new KATUSA assignments",
        "Served as an interim Senior KATUSA, building leadership through responsibility sharing, guidance, and operational support",
      ],
    },
  },
];

export const sectionAnchors = [
  { id: "skills", label: { ko: "기술 스택", en: "Tech Stack" } },
  { id: "projects", label: { ko: "프로젝트", en: "Projects" } },
  { id: "learning-history", label: { ko: "학습이력", en: "Learning History" } },
  { id: "education", label: { ko: "교육", en: "Education" } },
  { id: "certifications", label: { ko: "자격증", en: "Certifications" } },
  { id: "experience", label: { ko: "경력", en: "Experience" } },
  { id: "other", label: { ko: "기타", en: "Other" } },
];

export const getLocale = (language: string): Locale =>
  language.startsWith("ko") ? "ko" : "en";
