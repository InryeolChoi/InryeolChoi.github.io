from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageTemplate,
    PageBreak,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "downloads"
FONT_PATH = Path("/System/Library/Fonts/Supplemental/AppleGothic.ttf")
FONT_NAME = "AppleGothic"

INK = colors.HexColor("#172235")
SOFT = colors.HexColor("#475467")
LINE = colors.HexColor("#cdd7e3")
ACCENT = colors.HexColor("#2859a6")


def register_fonts() -> None:
    if not FONT_PATH.exists():
        raise FileNotFoundError(f"Required Korean font not found: {FONT_PATH}")
    pdfmetrics.registerFont(TTFont(FONT_NAME, str(FONT_PATH)))


def clean(value: str) -> str:
    return escape(value).replace("\n", "<br/>")


def make_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    body = ParagraphStyle(
        "Body",
        parent=base["BodyText"],
        fontName=FONT_NAME,
        fontSize=8.6,
        leading=13.2,
        textColor=INK,
        wordWrap="CJK",
        splitLongWords=1,
    )
    small = ParagraphStyle(
        "Small",
        parent=body,
        fontSize=7.4,
        leading=11.2,
        textColor=SOFT,
    )
    label = ParagraphStyle(
        "Label",
        parent=small,
        fontSize=7.3,
        leading=10,
        textColor=ACCENT,
        alignment=TA_LEFT,
    )
    title = ParagraphStyle(
        "Title",
        parent=body,
        fontSize=25,
        leading=29,
        textColor=INK,
        alignment=TA_LEFT,
    )
    subtitle = ParagraphStyle(
        "Subtitle",
        parent=body,
        fontSize=9.8,
        leading=14,
        textColor=SOFT,
    )
    section = ParagraphStyle(
        "Section",
        parent=body,
        fontSize=11.3,
        leading=15,
        textColor=INK,
        spaceBefore=6,
        spaceAfter=5,
    )
    item_title = ParagraphStyle(
        "ItemTitle",
        parent=body,
        fontSize=9.6,
        leading=13,
        textColor=INK,
    )
    meta = ParagraphStyle(
        "Meta",
        parent=small,
        fontSize=7.6,
        leading=10.5,
        textColor=ACCENT,
    )
    cover_title = ParagraphStyle(
        "CoverTitle",
        parent=body,
        fontSize=28,
        leading=35,
        textColor=INK,
        alignment=TA_LEFT,
    )
    cover_subtitle = ParagraphStyle(
        "CoverSubtitle",
        parent=subtitle,
        fontSize=10.5,
        leading=15,
        alignment=TA_LEFT,
    )
    return {
        "body": body,
        "small": small,
        "label": label,
        "title": title,
        "subtitle": subtitle,
        "section": section,
        "item_title": item_title,
        "meta": meta,
        "cover_title": cover_title,
        "cover_subtitle": cover_subtitle,
    }


class ProfileDocTemplate(BaseDocTemplate):
    def __init__(self, filename: Path, title: str):
        super().__init__(
            str(filename),
            pagesize=A4,
            title=title,
            author="Inryeol Choi",
            leftMargin=16 * mm,
            rightMargin=16 * mm,
            topMargin=16 * mm,
            bottomMargin=16 * mm,
        )
        frame = Frame(
            self.leftMargin,
            self.bottomMargin,
            self.width,
            self.height,
            id="normal",
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        self.addPageTemplates([PageTemplate(id="default", frames=[frame], onPage=self.footer)])

    def footer(self, canvas, doc) -> None:
        canvas.saveState()
        canvas.setFont(FONT_NAME, 7.2)
        canvas.setFillColor(SOFT)
        canvas.drawString(doc.leftMargin, 9 * mm, "Inryeol Choi")
        canvas.drawRightString(A4[0] - doc.rightMargin, 9 * mm, f"{doc.page}")
        canvas.restoreState()


def p(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(clean(text), style)


def section_title(title: str, styles: dict[str, ParagraphStyle]) -> list:
    return [
        Spacer(1, 4),
        Table(
            [[p(title, styles["section"])]],
            colWidths=[None],
            style=[
                ("LINEBELOW", (0, 0), (-1, -1), 0.6, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ],
        ),
        Spacer(1, 5),
    ]


def bullet_list(items: list[str], styles: dict[str, ParagraphStyle]) -> Table:
    bullet_style = ParagraphStyle(
        "Bullet",
        parent=styles["body"],
        spaceAfter=1.8,
    )
    table = Table([[p(f"- {item}", bullet_style)] for item in items], colWidths=[None])
    table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]
        )
    )
    return table


def tag_table(tags: list[str], styles: dict[str, ParagraphStyle], columns: int = 4) -> Table:
    rows = []
    for index in range(0, len(tags), columns):
        row = tags[index : index + columns]
        rows.append([p(tag, styles["small"]) for tag in row] + [""] * (columns - len(row)))
    table = Table(rows, colWidths=[None] * columns, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("LINEBELOW", (0, -1), (-1, -1), 0.35, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return table


def card(flowables: list, padding: int = 7) -> Table:
    table = Table([[flowables]], colWidths=[None], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("LINEBEFORE", (0, 0), (0, -1), 1.5, ACCENT),
                ("LINEBELOW", (0, -1), (-1, -1), 0.35, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), padding),
                ("RIGHTPADDING", (0, 0), (-1, -1), padding),
                ("TOPPADDING", (0, 0), (-1, -1), padding),
                ("BOTTOMPADDING", (0, 0), (-1, -1), padding),
            ]
        )
    )
    return table


def entry(
    title: str,
    meta: str,
    summary: str,
    highlights: list[str],
    styles: dict[str, ParagraphStyle],
) -> KeepTogether:
    content = [
        p(title, styles["item_title"]),
        p(meta, styles["meta"]),
        Spacer(1, 3),
        p(summary, styles["body"]),
    ]
    if highlights:
        content.extend([Spacer(1, 3), bullet_list(highlights, styles)])
    return KeepTogether([card(content), Spacer(1, 6)])


def compact_entry(
    title: str,
    meta: str,
    summary: str,
    highlights: list[str],
    styles: dict[str, ParagraphStyle],
) -> KeepTogether:
    content = [
        p(title, styles["item_title"]),
        p(meta, styles["meta"]),
        Spacer(1, 2),
        p(summary, styles["body"]),
    ]
    if highlights:
        content.extend([Spacer(1, 2), bullet_list(highlights, styles)])
    content.append(Spacer(1, 5))
    return KeepTogether(content)


def header_block(styles: dict[str, ParagraphStyle], document_type: str) -> list:
    contact = "Seoul, South Korea | dlsfuf0316@gmail.com | github.com/InryeolChoi"
    return [
        Table(
            [
                [
                    [
                        p("Inryeol Choi", styles["title"]),
                        p("Backend Developer", styles["subtitle"]),
                    ],
                    [
                        p(document_type, styles["label"]),
                        p(contact, styles["small"]),
                    ],
                ]
            ],
            colWidths=[95 * mm, None],
            style=[
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                ("LINEBELOW", (0, 0), (-1, -1), 0.7, LINE),
            ],
        ),
        Spacer(1, 8),
    ]


def build_cv(styles: dict[str, ParagraphStyle]) -> None:
    story = []
    story.extend(header_block(styles, "이력서"))
    story.extend(section_title("소개", styles))
    story.append(
        p(
            "백엔드의 데이터 흐름과 운영 중인 상태를 함께 다루는 개발자입니다. "
            "Go와 SQLite로 1,400여 편의 학습 기록을 이관·편집하는 블로그를 만들었고, "
            "Spring Boot 서비스에서는 인증, 데이터 저장, AI 응답 연동과 예외 처리를 구현했습니다.",
            styles["body"],
        )
    )
    story.append(Spacer(1, 7))

    story.extend(section_title("핵심 역량", styles))
    story.append(
        bullet_list(
            [
                "요구사항을 기능 단위가 아니라 데이터 흐름, 인증 흐름, 운영 환경까지 포함한 구조로 파악합니다.",
                "C/C++ 시스템 과제와 42서울 프로젝트를 통해 프로세스, 파일 디스크립터, 네트워크, 동시성의 기초를 구현 맥락에서 익혔습니다.",
                "콘텐츠 이관 오류를 전수 검사하고 재실행 결과가 수렴하도록 보정 규칙을 코드로 관리했습니다.",
                "Spring Boot와 Django REST Framework 프로젝트에서 인증, API, 데이터베이스 흐름을 구현했습니다.",
            ],
            styles,
        )
    )
    story.append(Spacer(1, 7))

    story.extend(section_title("기술", styles))
    story.append(
        tag_table(
            [
                "Java",
                "Spring Boot",
                "Go",
                "SQLite",
                "C",
                "C++",
                "PostgreSQL",
                "MySQL",
                "Redis",
                "Docker",
                "Nginx",
                "Linux",
                "Git",
                "Django REST Framework",
            ],
            styles,
            columns=5,
        )
    )
    story.append(Spacer(1, 7))

    story.extend(section_title("경력", styles))
    story.append(
        compact_entry(
            "PwC Korea - Full-time",
            "2025.04 - Present",
            "기업 IT 시스템의 운영 절차와 내부통제를 점검하며 거래 데이터 흐름, 시스템 프로세스, 데이터 정합성을 분석하고 있습니다.",
            [
                "이커머스, 핀테크 등 약 14개 클라이언트 환경에서 거래 흐름, 시스템 구조, 통제 design test 분석 및 설계 지원",
                "Java, Kotlin 코드 로직과 Git 기반 저장소의 변경 이력을 검토하며 시스템 동작 구조 분석",
                "데이터 정합성 검증을 통해 시스템 구조와 통제 로직 이해",
            ],
            styles,
        )
    )
    story.append(
        compact_entry(
            "PwC Korea - Intern",
            "2024.10 - 2025.04",
            "기업 IT 시스템 운영 절차와 내부통제 문서를 점검하고 거래 데이터 검증을 수행했습니다.",
            [
                "시스템 운영 프로세스를 따라가며 업무 처리 구조와 주요 통제 포인트 파악",
                "Java 코드 로직과 GitHub commit 로그를 검토하며 시스템 동작 방식과 변경 이력 이해",
            ],
            styles,
        )
    )

    story.extend(section_title("주요 프로젝트", styles))
    story.append(
        compact_entry(
            "심심조각 - Spring Boot backend",
            "Spring Boot, Java, MySQL, Redis, JWT",
            "감정 기록 기반 일기 서비스의 백엔드를 구축하며 소셜 로그인, 일기 관리, AI 편지, 월간 리포트를 하나의 서비스 흐름으로 연결했습니다.",
            [
                "Google, Apple 소셜 로그인과 JWT 재발급 흐름 구현",
                "일기 저장, 조회, 수정, 삭제 및 월별 기록 조회 API 구성",
                "외부 AI API 응답 형식 차이를 분석해 파싱 로직을 수정하고 테스트 케이스로 검증",
            ],
            styles,
        )
    )
    story.append(
        compact_entry(
            "열렬히.뛰기 - 개인 블로그",
            "Go, SQLite, 콘텐츠 이관, 운영 데이터 보존",
            "노션과 GitHub에 흩어진 학습 기록 1,400여 편을 이관하고, 공개 화면과 Admin 편집기를 Go 단일 바이너리로 구현했습니다.",
            [
                "수식·목록·이미지·내부 링크 오류를 유형별로 전수 검사하고 변환 규칙 보정",
                "재이관 시 결과가 수렴하도록 분류·제외·본문 보정 규칙을 코드로 관리",
                "서버 DB를 정본으로 두고 배포와 DB 교체를 분리, 백업과 업로드 가드 구성",
            ],
            styles,
        )
    )
    story.append(
        compact_entry(
            "ft_malloc / ft_irc / minishell / transcendence",
            "C, C++, mmap, pthread, kqueue, Django REST Framework, Docker",
            "42서울 프로젝트에서 메모리 할당자, 네트워크 서버, 쉘, 웹 서비스 백엔드를 직접 구현했습니다.",
            [
                "ft_malloc에서 zone별 할당·병합과 mutex 기반 동시성, 실패 안전한 munmap 처리 구현",
                "IRC 서버에서 다중 클라이언트 연결과 채널 상태를 이벤트 기반 구조로 처리",
                "minishell에서 파싱 결과를 실행 구조로 변환하고 pipe 기반 프로세스 연결 구현",
                "transcendence에서 42 OAuth, JWT, 이메일 기반 2차 인증, Docker Compose 환경 구성",
            ],
            styles,
        )
    )

    story.extend(section_title("학력과 학습", styles))
    story.append(
        compact_entry(
            "Dongguk University",
            "2018.03 - 2025.02 | Management Information Systems, Statistics",
            "경영정보학과를 주전공으로, 통계학과를 복수전공으로 이수하며 서비스 개발, 비즈니스 프로세스, 데이터 분석과 통계 모델링을 함께 학습했습니다.",
            [
                "MIS: 비즈니스프로그래밍, 클라우드컴퓨팅서비스, 비즈니스프로세스관리, 빅데이터와비즈니스애널리틱스",
                "Statistics: 통계수학및R실습, 회귀분석, 다변량해석, 데이터마이닝",
            ],
            styles,
        )
    )
    story.append(
        compact_entry(
            "42 Seoul",
            "2023.03 - 2024.10 | Project-based software engineering program",
            "C/C++ 기반 시스템 프로그래밍 프로젝트와 동료평가를 통해 구현 중심의 컴퓨터공학 기초를 다졌습니다.",
            [
                "월 160시간 수준의 프로젝트 기반 학습을 이어가며 몰입도 높은 개발 경험 축적",
                "동료평가와 팀 프로젝트를 통해 협업, 리뷰, 문제 해결 역량 강화",
            ],
            styles,
        )
    )

    story.extend(section_title("자격 및 기타", styles))
    story.append(
        bullet_list(
            [
                "SQLD - 2021.12.17",
                "빅데이터분석기사 - 2024.12.20",
                "정보처리기사 - 2026.09.11",
                "KATUSA, Eighth Army interpretation and administrative support - 2020.09 - 2022.03",
            ],
            styles,
        )
    )

    doc = ProfileDocTemplate(OUTPUT_DIR / "inryeol-choi-cv.pdf", "Inryeol Choi CV")
    doc.build(story)


def build_cv_en(styles: dict[str, ParagraphStyle]) -> None:
    story = []
    story.extend(header_block(styles, "CV - English"))
    story.extend(section_title("Profile", styles))
    story.append(
        p(
            "Backend developer focused on data flow and preserving live state. "
            "I built a Go and SQLite blog that migrated and edits more than 1,400 study notes, "
            "and implemented authentication, persistence, AI response integration, and error handling in a Spring Boot service.",
            styles["body"],
        )
    )
    story.append(Spacer(1, 7))

    story.extend(section_title("Core Strengths", styles))
    story.append(
        bullet_list(
            [
                "Understand requirements through data flow, authentication flow, runtime constraints, and operational context, not only through feature lists.",
                "Built practical fundamentals in processes, file descriptors, networking, and concurrency through C/C++ system projects at 42 Seoul.",
                "Audited content migration errors and codified correction rules so repeated imports converge.",
                "Implemented authentication, APIs, and database flows in Spring Boot and Django REST Framework projects.",
            ],
            styles,
        )
    )
    story.append(Spacer(1, 7))

    story.extend(section_title("Skills", styles))
    story.append(
        tag_table(
            [
                "Java",
                "Spring Boot",
                "Go",
                "SQLite",
                "C",
                "C++",
                "PostgreSQL",
                "MySQL",
                "Redis",
                "Docker",
                "Nginx",
                "Linux",
                "Git",
                "Django REST Framework",
            ],
            styles,
            columns=5,
        )
    )
    story.append(Spacer(1, 7))

    story.extend(section_title("Experience", styles))
    story.append(
        compact_entry(
            "PwC Korea - Full-time",
            "2025.04 - Present",
            "Reviewing enterprise IT operating procedures and internal controls while analyzing transaction data flows, system processes, and data consistency.",
            [
                "Supported control design test analysis and design across about 14 client environments, including e-commerce and fintech.",
                "Reviewed Java and Kotlin logic alongside Git-based repository histories to understand system behavior and implementation flow.",
                "Used data consistency checks to understand system structures and control logic.",
            ],
            styles,
        )
    )
    story.append(
        compact_entry(
            "PwC Korea - Intern",
            "2024.10 - 2025.04",
            "Reviewed enterprise IT operating procedures and internal control documentation, and supported transaction data validation.",
            [
                "Followed system operation processes to identify processing structures and key control points.",
                "Reviewed Java logic and GitHub commit logs to understand system behavior and change history.",
            ],
            styles,
        )
    )

    story.append(PageBreak())
    story.extend(section_title("Selected Projects", styles))
    story.append(
        compact_entry(
            "Simsimjogak - Spring Boot backend",
            "Spring Boot, Java, MySQL, Redis, JWT",
            "Built the backend for an emotion-based diary service, connecting social login, diary management, AI letters, and monthly reports into one service flow.",
            [
                "Implemented Google and Apple social login with JWT refresh flow.",
                "Built diary create, read, update, delete, and monthly record query APIs.",
                "Analyzed external AI API response mismatches, adjusted parsing logic, and verified behavior with test cases.",
            ],
            styles,
        )
    )
    story.append(
        compact_entry(
            "열렬히.뛰기 - Personal blog",
            "Go, SQLite, content migration, live data preservation",
            "Built a Go and SQLite blog with a public site and admin editor, migrating more than 1,400 study notes from Notion and GitHub.",
            [
                "Audited equation, list, image, and internal-link errors across the migrated content and fixed conversion rules.",
                "Codified curation rules so repeated imports converge instead of overwriting manual edits.",
                "Made the server database authoritative, separated deployment from database replacement, and added backups and upload guards.",
            ],
            styles,
        )
    )
    story.append(
        compact_entry(
            "ft_malloc / ft_irc / minishell / transcendence",
            "C, C++, mmap, pthread, kqueue, Django REST Framework, Docker",
            "Implemented an allocator, network server, shell, and web-service backend through 42 Seoul projects.",
            [
                "Built zone-based allocation and coalescing, mutex protection, and failure-safe munmap handling in ft_malloc.",
                "Handled IRC client connections and channel state through an event-driven server structure.",
                "Converted minishell parsing results into execution structures and implemented pipe-based process chaining.",
                "Built 42 OAuth, JWT, email-based second-factor verification, and a Docker Compose runtime setup in transcendence.",
            ],
            styles,
        )
    )

    story.extend(section_title("Education and Learning", styles))
    story.append(
        compact_entry(
            "Dongguk University",
            "2018.03 - 2025.02 | Management Information Systems, Statistics",
            "Completed a major in Management Information Systems and a double major in Statistics, combining service development, business process understanding, data analysis, and statistical modeling.",
            [
                "MIS: Business Programming, Cloud Computing Service, Business Process Management, Big Data and Business Analytics.",
                "Statistics: Statistical Mathematics and R Practice, Regression Analysis, Multivariate Analysis, Data Mining.",
            ],
            styles,
        )
    )
    story.append(
        compact_entry(
            "42 Seoul",
            "2023.03 - 2024.10 | Project-based software engineering program",
            "Strengthened computer science fundamentals through C/C++ system programming projects and peer review.",
            [
                "Maintained an intensive project-based learning rhythm of about 160 hours per month.",
                "Improved collaboration, code review, and problem-solving skills through peer evaluation and team projects.",
            ],
            styles,
        )
    )

    story.extend(section_title("Certifications and Other", styles))
    story.append(
        bullet_list(
            [
                "SQLD - 2021.12.17",
                "Big Data Analysis Engineer - 2024.12.20",
                "Engineer Information Processing - 2026.09.11",
                "KATUSA, Eighth Army interpretation and administrative support - 2020.09 - 2022.03",
            ],
            styles,
        )
    )

    doc = ProfileDocTemplate(OUTPUT_DIR / "inryeol-choi-cv-en.pdf", "Inryeol Choi CV English")
    doc.build(story)


def project_card(
    title: str,
    subtitle: str,
    overview: str,
    details: list[tuple[str, str]],
    highlights: list[str],
    tech: list[str],
    styles: dict[str, ParagraphStyle],
) -> KeepTogether:
    content = [
        p(title, styles["item_title"]),
        p(subtitle, styles["meta"]),
        Spacer(1, 4),
        p(overview, styles["body"]),
        Spacer(1, 5),
    ]
    for label, text in details:
        content.extend([p(label, styles["label"]), p(text, styles["body"]), Spacer(1, 3)])
    if highlights:
        content.extend([Spacer(1, 2), bullet_list(highlights, styles), Spacer(1, 4)])
    content.extend([p("사용 기술" if details[0][0] == "문제" else "Tech Stack", styles["label"]), tag_table(tech, styles, columns=4)])
    return KeepTogether([card(content), Spacer(1, 8)])


def build_portfolio(styles: dict[str, ParagraphStyle]) -> None:
    story = [
        Spacer(1, 20),
        p("Inryeol Choi", styles["cover_title"]),
        Spacer(1, 8),
        p("백엔드 포트폴리오", styles["cover_title"]),
        Spacer(1, 12),
        p(
            "서비스 흐름, 데이터 구조, 인증, 운영 환경을 함께 바라보며 백엔드 시스템을 설계하고 구현한 프로젝트 기록입니다.",
            styles["cover_subtitle"],
        ),
        Spacer(1, 12),
        p("dlsfuf0316@gmail.com | github.com/InryeolChoi | Seoul, South Korea", styles["cover_subtitle"]),
    ]
    story.append(Spacer(1, 24))
    story.extend(section_title("작업의 초점", styles))
    story.append(
        bullet_list(
            [
                "API를 단순 엔드포인트가 아니라 사용자 흐름, 데이터 상태, 예외 케이스가 이어지는 구조로 정리합니다.",
                "인증, 데이터베이스, 배포 환경처럼 서비스 안정성에 직접 영향을 주는 기반 요소를 함께 다룹니다.",
                "직접 구현한 시스템 프로그래밍 프로젝트를 통해 네트워크, 프로세스, 파일 디스크립터, 동시성의 기초를 실전 맥락에서 익혔습니다.",
            ],
            styles,
        )
    )
    story.append(Spacer(1, 10))

    story.extend(section_title("주요 프로젝트", styles))
    story.append(
        project_card(
            "ft_malloc",
            "Thread-safe dynamic memory allocator in C",
            "mmap 기반으로 malloc, free, realloc, show_alloc_mem, show_alloc_mem_ex를 구현하고 다중 스레드 환경까지 확장했습니다.",
            [
                (
                    "문제",
                    "할당자는 정렬, 단편화, 잘못된 포인터, 크기 계산 overflow, munmap 실패를 처리하면서 동시 접근에도 일관성을 유지해야 했습니다.",
                ),
                (
                    "구현",
                    "TINY·SMALL·LARGE zone의 box와 tag 메타데이터로 할당 상태를 추적하고, free tag 재사용·분할·병합을 구현했습니다. zone별 pthread mutex로 상태 변경을 보호하고 munmap 성공 후에만 목록을 갱신했습니다.",
                ),
                (
                    "결과",
                    "16-byte 정렬과 실패 안전한 메모리 반환을 구현하고, 멀티스레드 스트레스 테스트에서 교착과 메모리 손상 없이 동작을 검증했습니다.",
                ),
            ],
            [
                "malloc, free, realloc 및 메모리 상태 출력 함수 구현",
                "free tag 탐색·분할·재사용과 인접 tag 병합",
                "show_alloc_mem_ex에서 사용 중인 영역을 hexadecimal dump로 출력",
            ],
            ["C", "mmap", "pthread mutex", "Dynamic memory", "Thread safety"],
            styles,
        )
    )
    story.append(
        project_card(
            "심심조각",
            "Spring Boot backend for an emotion-based diary service",
            "감정 기록 기반 일기 서비스에서 소셜 로그인, 일기 CRUD, AI 편지, 요약, 월간 키워드 리포트 흐름을 하나의 백엔드로 연결했습니다.",
            [
                (
                    "문제",
                    "소셜 로그인, 토큰 재발급, 일기 데이터 관리, 외부 AI 응답 생성이 서로 끊기지 않고 안정적으로 이어져야 했습니다.",
                ),
                (
                    "구현",
                    "Spring Security와 JWT를 중심으로 인증 흐름을 구성하고, MySQL과 Redis를 연결해 사용자 정보와 토큰 상태를 분리했습니다. AI 응답은 로컬 AI 서버와 연동하고, 응답 형식이 달라지는 예외 상황을 분석해 파싱 로직을 보강했습니다.",
                ),
                (
                    "결과",
                    "인증, 데이터 저장, AI 생성, 월간 조회 흐름을 하나의 백엔드 안에서 관리할 수 있는 구조를 만들었습니다.",
                ),
            ],
            [
                "Google, Apple 소셜 로그인과 JWT 재발급 흐름 구현",
                "일기 저장, 조회, 수정, 삭제 및 월별 기록 조회 API 구성",
                "외부 AI API 응답 구조 차이를 분석하고 테스트 케이스로 검증",
            ],
            ["Spring Boot", "Java", "Spring Security", "JPA", "MySQL", "Redis", "JWT"],
            styles,
        )
    )
    story.append(
        project_card(
            "열렬히.뛰기",
            "Go와 SQLite로 만든 학습 기록 블로그",
            "노션과 GitHub에 흩어진 학습 기록 1,400여 편을 이관하고, 공개 화면과 Admin 편집기를 Go 단일 바이너리로 구현했습니다.",
            [
                (
                    "문제",
                    "이관 중 수식·목록·이미지·내부 링크가 깨질 수 있었고, 이후 재이관이나 배포가 새 글을 덮어쓰지 않아야 했습니다.",
                ),
                (
                    "구현",
                    "이관 오류를 유형별로 전수 검사해 변환 규칙을 고쳤습니다. 사람의 분류·제외·본문 보정은 코드에 기록해 재실행 결과가 수렴하도록 했습니다.",
                ),
                (
                    "결과",
                    "서버 DB를 정본으로 삼아 코드 배포와 DB 교체를 분리하고 백업·업로드 가드를 마련했습니다.",
                ),
            ],
            [
                "노션 블록을 Markdown으로 변환하고 GitHub 글·이미지·내부 링크 이관",
                "공개 렌더러를 공유하는 미리보기와 블록 인라인 편집 구현",
                "변경 충돌 검사와 재이관 시 수렴하는 보정 규칙 적용",
            ],
            ["Go", "SQLite", "Markdown", "Content migration", "Backup"],
            styles,
        )
    )
    story.append(
        project_card(
            "ft_irc",
            "Event-driven IRC server",
            "여러 사용자 연결과 채널 상태를 다루는 IRC 서버를 구현하며 네트워크 서버 구조와 이벤트 기반 입출력 방식을 학습했습니다.",
            [
                (
                    "문제",
                    "여러 클라이언트 연결, 명령 처리, 채널 상태가 동시에 움직이기 때문에 기능을 추가할수록 서버 구조가 쉽게 복잡해질 수 있었습니다.",
                ),
                (
                    "구현",
                    "서버의 큰 책임을 먼저 나누고, kqueue 기반 이벤트 감시 흐름을 중심으로 클라이언트 연결과 채널 상태 처리를 정리했습니다.",
                ),
                (
                    "결과",
                    "이벤트 기반 서버가 연결, 명령, 상태를 어떤 흐름으로 처리하는지 구현 맥락에서 이해했습니다.",
                ),
            ],
            [
                "기능 추가 전 전체 서버 구조를 먼저 나누어 설계",
                "멀티플렉싱 기반 논블로킹 I/O 시스템 콜인 kqueue의 이벤트 감지 흐름 이해",
                "클라이언트 연결과 채널 상태를 다루는 서버 동작 방식 학습",
            ],
            ["C++", "Socket", "kqueue", "IRC", "Network server"],
            styles,
        )
    )
    story.append(
        project_card(
            "minishell",
            "Unix shell parsing and process execution",
            "쉘이 입력을 해석하고 여러 명령을 연결해 실행하는 과정을 직접 구현하며 파싱과 프로세스 흐름을 익힌 프로젝트입니다.",
            [
                (
                    "문제",
                    "쉘은 입력 문자열을 그대로 실행하는 것이 아니라 파이프, 리다이렉션, 환경 변수 같은 규칙에 맞게 구조화해야 했습니다.",
                ),
                (
                    "구현",
                    "입력이 어떤 단계로 파싱되어 실행 구조로 이어지는지 학습하고, pipe, fork, dup2, execve를 이용해 여러 명령을 연결했습니다.",
                ),
                (
                    "결과",
                    "문자열 파싱, 실행 계획 생성, 프로세스 연결이 한 흐름으로 이어지는 방식을 직접 구현했습니다.",
                ),
            ],
            [
                "입력을 실행 가능한 구조로 바꾸는 파싱 흐름 학습",
                "여러 명령을 연결하는 pipe 구조 구현",
                "쉘 명령 실행 과정과 프로세스 연결 방식 이해",
            ],
            ["C", "Unix process", "pipe", "fork", "dup2", "execve"],
            styles,
        )
    )
    story.append(
        project_card(
            "transcendence",
            "Service-style web backend with authentication and runtime setup",
            "실제 웹 서비스 흐름을 기준으로 인증, 데이터 저장, 실행 환경까지 포함한 백엔드를 구축했습니다.",
            [
                (
                    "문제",
                    "API 서버, 로그인, 보안, 데이터베이스, 배포용 실행 환경이 함께 맞물려야 했습니다.",
                ),
                (
                    "구현",
                    "Django REST Framework로 API를 구성하고, 42 OAuth 로그인, JWT 발급과 재발급, 이메일 기반 2차 인증 링크를 인증 흐름에 통합했습니다.",
                ),
                (
                    "결과",
                    "인증 실패와 토큰 만료 상황까지 고려한 백엔드 흐름과 PostgreSQL, Docker Compose 기반 실행 환경을 구성했습니다.",
                ),
            ],
            [
                "Django + Django REST Framework 기반 백엔드 구축",
                "42 OAuth 로그인, JWT 발급, 이메일 기반 2차 인증 링크 구현",
                "PostgreSQL와 Docker Compose를 이용한 개발 환경 구성",
            ],
            ["Django", "DRF", "PostgreSQL", "Docker", "JWT", "OAuth"],
            styles,
        )
    )

    doc = ProfileDocTemplate(OUTPUT_DIR / "inryeol-choi-portfolio.pdf", "Inryeol Choi Portfolio")
    doc.build(story)


def build_portfolio_en(styles: dict[str, ParagraphStyle]) -> None:
    story = [
        Spacer(1, 20),
        p("Inryeol Choi", styles["cover_title"]),
        Spacer(1, 8),
        p("Backend Portfolio", styles["cover_title"]),
        Spacer(1, 12),
        p(
            "A project record focused on backend systems that connect service flow, data structure, authentication, and runtime environments.",
            styles["cover_subtitle"],
        ),
        Spacer(1, 12),
        p("dlsfuf0316@gmail.com | github.com/InryeolChoi | Seoul, South Korea", styles["cover_subtitle"]),
    ]
    story.append(Spacer(1, 24))
    story.extend(section_title("Portfolio Focus", styles))
    story.append(
        bullet_list(
            [
                "Treat APIs as structured user flows that connect data state, validation, exceptions, and operational behavior.",
                "Work across foundational backend concerns such as authentication, databases, deployment, and runtime configuration.",
                "Built system programming fundamentals through hands-on projects involving networking, processes, file descriptors, and concurrency.",
            ],
            styles,
        )
    )
    story.append(Spacer(1, 10))

    story.extend(section_title("Representative Projects", styles))
    story.append(
        project_card(
            "ft_malloc",
            "Thread-safe dynamic memory allocator in C",
            "Implemented malloc, free, realloc, show_alloc_mem, and show_alloc_mem_ex on top of mmap, then extended the allocator for concurrent access.",
            [
                (
                    "Problem",
                    "A memory allocator must handle alignment, fragmentation, invalid pointers, size overflow, and munmap failure while remaining consistent under concurrent access.",
                ),
                (
                    "Approach",
                    "Tracked allocation with boxes and tag metadata across TINY, SMALL, and LARGE zones. Implemented free-tag reuse, splitting, and coalescing, protected each zone with a pthread mutex, and updated box lists only after munmap succeeds.",
                ),
                (
                    "Result",
                    "Achieved 16-byte alignment and failure-safe release, and verified multithreaded stress runs without deadlocks or memory corruption.",
                ),
            ],
            [
                "Implemented malloc, free, realloc, and memory inspection functions.",
                "Added free-tag lookup, splitting, reuse, and adjacent-tag coalescing.",
                "Printed live user areas as hexadecimal dumps in show_alloc_mem_ex.",
            ],
            ["C", "mmap", "pthread mutex", "Dynamic memory", "Thread safety"],
            styles,
        )
    )
    story.append(
        project_card(
            "Simsimjogak",
            "Spring Boot backend for an emotion-based diary service",
            "Built a backend that connects social login, diary CRUD, AI letters, summaries, and monthly keyword reports for an emotion-based diary service.",
            [
                (
                    "Problem",
                    "Social login, token refresh, diary data management, and external AI response generation needed to work together without breaking the user flow.",
                ),
                (
                    "Approach",
                    "Set up authentication around Spring Security and JWT, connected MySQL and Redis to separate user data from token state, and integrated a local AI server. When external AI responses differed from the expected format, I analyzed the response structure and strengthened the parsing logic.",
                ),
                (
                    "Result",
                    "Created a backend structure that handles authentication, persistence, AI response generation, and monthly lookup flow in one service.",
                ),
            ],
            [
                "Implemented Google and Apple social login with JWT refresh flow.",
                "Built diary create, read, update, delete, and monthly record query APIs.",
                "Analyzed external AI API response structure differences and verified fixes with test cases.",
            ],
            ["Spring Boot", "Java", "Spring Security", "JPA", "MySQL", "Redis", "JWT"],
            styles,
        )
    )
    story.append(
        project_card(
            "열렬히.뛰기",
            "Go and SQLite blog for long-lived study notes",
            "Built a public site and admin editor in a single Go binary, migrating more than 1,400 study notes from Notion and GitHub.",
            [
                (
                    "Problem",
                    "Equations, lists, images, and internal links could break during migration; later imports and deployments also had to preserve new writing.",
                ),
                (
                    "Approach",
                    "Audited migration defects by type, fixed conversion rules, and codified manual classification and corrections so repeated imports converge.",
                ),
                (
                    "Result",
                    "Made the server database authoritative, separated code deployment from database replacement, and added backups and upload guards.",
                ),
            ],
            [
                "Converted Notion blocks to Markdown and migrated GitHub notes, images, and internal links.",
                "Shared the public renderer with previews and added inline block editing.",
                "Added edit conflict checks and curation rules for convergent re-imports.",
            ],
            ["Go", "SQLite", "Markdown", "Content migration", "Backup"],
            styles,
        )
    )
    story.append(
        project_card(
            "ft_irc",
            "Event-driven IRC server",
            "Implemented an IRC server that handles multiple user connections and channel state, learning network server structure and event-driven I/O.",
            [
                (
                    "Problem",
                    "Multiple client connections, command processing, and channel state could quickly make the server architecture hard to follow.",
                ),
                (
                    "Approach",
                    "Separated the server responsibilities early and centered the implementation around kqueue-based event monitoring for connection and channel state handling.",
                ),
                (
                    "Result",
                    "Built a practical understanding of how event-driven servers process connections, commands, and shared state.",
                ),
            ],
            [
                "Designed the server structure before expanding features.",
                "Studied the event detection flow of kqueue, a multiplexing-based non-blocking I/O system call.",
                "Learned how a server manages client connections and channel state.",
            ],
            ["C++", "Socket", "kqueue", "IRC", "Network server"],
            styles,
        )
    )
    story.append(
        project_card(
            "minishell",
            "Unix shell parsing and process execution",
            "Implemented how a shell interprets input and connects commands, learning parsing and process flow through direct implementation.",
            [
                (
                    "Problem",
                    "A shell has to structure input according to rules such as pipes, redirection, and environment variables instead of simply executing raw strings.",
                ),
                (
                    "Approach",
                    "Studied how input is parsed into executable structures, then connected commands with pipe, fork, dup2, and execve.",
                ),
                (
                    "Result",
                    "Implemented the full flow from string parsing to execution planning and process chaining.",
                ),
            ],
            [
                "Learned the parsing flow that turns input into executable structures.",
                "Implemented pipe-based command chaining.",
                "Understood shell command execution and process connection.",
            ],
            ["C", "Unix process", "pipe", "fork", "dup2", "execve"],
            styles,
        )
    )
    story.append(
        project_card(
            "transcendence",
            "Service-style web backend with authentication and runtime setup",
            "Built a backend for a real web-service flow, covering authentication, persistence, and runtime environment setup.",
            [
                (
                    "Problem",
                    "The API server, login, security, database, and deployment runtime needed to work together as one integrated system.",
                ),
                (
                    "Approach",
                    "Built APIs with Django REST Framework and integrated 42 OAuth login, JWT issuance and refresh, and email-based second-factor verification links into the authentication flow.",
                ),
                (
                    "Result",
                    "Configured an authentication flow that considered failures and token expiration, plus a PostgreSQL and Docker Compose runtime environment.",
                ),
            ],
            [
                "Built the backend with Django and Django REST Framework.",
                "Implemented 42 OAuth login, JWT issuance, and email-based second-factor verification links.",
                "Set up a development environment with PostgreSQL and Docker Compose.",
            ],
            ["Django", "DRF", "PostgreSQL", "Docker", "JWT", "OAuth"],
            styles,
        )
    )

    doc = ProfileDocTemplate(
        OUTPUT_DIR / "inryeol-choi-portfolio-en.pdf",
        "Inryeol Choi Portfolio English",
    )
    doc.build(story)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    register_fonts()
    styles = make_styles()
    build_cv(styles)
    build_cv_en(styles)
    build_portfolio(styles)
    build_portfolio_en(styles)


if __name__ == "__main__":
    main()
