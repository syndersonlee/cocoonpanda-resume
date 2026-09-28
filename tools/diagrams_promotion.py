"""프로모션·요금제 경험 다이어그램 6종을 그린다.

실행: python3 tools/diagrams_promotion.py
출력: src/images/diagrams/promo-*.svg
"""
import html
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from svg_kit import SVG, C, save  # noqa: E402

W = 820
LS = 12      # 본문 줄 글자 크기
TS = 13.5    # 상자 제목 글자 크기


def tw(text, size):
    """글자 폭 추정. 한글·기호는 1.0, 라틴·숫자는 0.6."""
    w = 0.0
    for ch in text:
        w += size * (1.0 if ord(ch) >= 0x2000 else 0.6)
    return w


def lab(s, x, y, text, size=LS, color=C["muted"], anchor="middle", weight="500", bg=True):
    """한글 폭 기준으로 흰 배경을 깐 라벨."""
    if bg:
        w = tw(text, size) + 10
        rx = x - w / 2 if anchor == "middle" else (x - 5 if anchor == "start" else x - w + 5)
        s.parts.append(f'<rect x="{rx:.1f}" y="{y - size - 1:.1f}" width="{w:.0f}" height="{size + 7}" '
                       f'fill="{C["white"]}" opacity="0.95" rx="3"/>')
    s.parts.append(f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-size="{size}" font-weight="{weight}" '
                   f'fill="{color}">{html.escape(text)}</text>')


def grp(s, x, y, w, h, label, fill=C["skyPale"], stroke=C["sky"], bottom=False, color=None):
    """그룹 상자. bottom=True면 이름을 아래쪽 왼편에 둔다."""
    s.parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{fill}" stroke="{stroke}" '
                   f'stroke-width="1.5" stroke-dasharray="8 5"/>')
    ty = y + h - 12 if bottom else y + 21
    s.text(x + 12, ty, label, size=13, color=color or C["skyDark"], weight="700")


def box(s, x, y, w, h, title, lines=(), **kw):
    kw.setdefault("lsize", LS)
    kw.setdefault("tsize", TS)
    s.box(x, y, w, h, title, lines, **kw)


def rect(s, x, y, w, h, fill, stroke, dashed=False, opacity=1.0, rx=7):
    d = ' stroke-dasharray="5 4"' if dashed else ""
    s.parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" '
                   f'stroke-width="1.4"{d} opacity="{opacity}"/>')


def legend_item(s, x, y, color, dashed, text):
    s.path(f"M {x} {y} L {x + 34} {y}", color, dashed=dashed)
    s.text(x + 44, y + 4.5, text, size=12, color=C["ink"])


# ------------------------------------------------------------------ 1
def promo_context():
    H = 510
    s = SVG(W, H)
    # 그룹
    grp(s, 10, 20, 215, 480, "B2B 영역", bottom=True)
    grp(s, 505, 110, 305, 260, "B2C 영역 · 요금제·재고 도메인 (담당)", bottom=True)

    # 왼쪽 열
    box(s, 22, 44, 191, 62, "공급사 관리 화면", ["B2B 파트너가", "요금·프로모션 설정"])
    box(s, 22, 140, 191, 220, "공급사 요금제 서비스", ["요금제 원장", "공급사 재고 원장"])
    box(s, 22, 400, 191, 62, "프로모션 서비스", ["번들 생성 (담당)"], fill=C["goodPale"], stroke=C["good"])
    s.path("M 117 106 L 117 138", "ink")
    s.path("M 95 360 L 95 398", "ink")
    s.path("M 140 400 L 140 362", "ink")
    lab(s, 150, 385, "gRPC", anchor="start", bg=False)

    # 오른쪽 열
    box(s, 520, 140, 165, 76, "요금제/재고 API", ["차감·조회·캘린더 요약", "판매 설정 동기화"])
    box(s, 520, 270, 165, 60, "요금제 관리 서비스", ["설정 이벤트 소비", "취소 복원"])
    box(s, 705, 140, 92, 50, "Redis", ["분산 Lock"], fill=C["white"], stroke=C["gray"])
    box(s, 705, 262, 92, 76, "MySQL", ["재고·요금제", "오픈 일정"], fill=C["white"], stroke=C["gray"])
    s.path("M 685 165 L 703 165", "gray")
    s.path("M 685 204 L 751 204 L 751 260", "gray")
    s.path("M 685 300 L 703 300", "gray")

    # 호출자
    box(s, 520, 40, 110, 38, "예약 서비스")
    box(s, 645, 40, 130, 38, "상품 노출 API")
    s.path("M 575 78 L 575 138", "ink")
    s.path("M 670 78 L 670 138", "ink")
    lab(s, 575, 104, "차감 REST", color=C["ink"])
    lab(s, 670, 104, "조회 HTTP", color=C["ink"])

    # 동기 호출 (요금제 서비스 <-> API)
    s.path("M 213 160 L 518 160", "ink")
    lab(s, 365, 164, "판매 설정 동기화", color=C["ink"])
    s.path("M 520 196 L 215 196", "ink")
    lab(s, 365, 200, "원장 차감 HTTP", color=C["ink"])

    # Kafka
    box(s, 320, 250, 90, 100, "Kafka", fill=C["purplePale"], stroke=C["purple"])
    s.path("M 213 300 L 318 300", "purple", dashed=True)
    lab(s, 266, 270, "설정 이벤트", color=C["purple"])
    lab(s, 266, 288, "(규칙셋 id 키)", color=C["purple"])
    s.path("M 410 300 L 518 300", "purple", dashed=True)
    s.path("M 560 216 L 560 236 L 390 236 L 390 248", "purple", dashed=True)
    lab(s, 475, 229, "결과 이벤트 (객실 유형 id 키)", color=C["purple"], bg=False)
    s.path("M 320 335 L 215 335", "purple", dashed=True)

    # 범례
    legend_item(s, 525, 408, "ink", False, "동기 호출")
    legend_item(s, 525, 436, "purple", True, "Kafka 이벤트")
    legend_item(s, 525, 464, "gray", False, "데이터 읽기·쓰기")
    save(s, "promo-context")


# ------------------------------------------------------------------ 2
def promo_decouple():
    H = 340
    s = SVG(W, H)
    grp(s, 10, 10, 395, 320, "Before · 유형마다 요금제 코드에 분기",
        fill=C["redPale"], stroke=C["red"], color=C["red"])
    grp(s, 415, 10, 395, 320, "After · 조합 규칙을 데이터로 분리",
        fill=C["goodPale"], stroke=C["good"], color=C["good"])

    rect(s, 30, 46, 355, 222, C["white"], C["gray"])
    s.text(207, 74, "요금제 생성", size=TS, weight="700", anchor="middle")
    rows = [("if MEMBERSHIP → …", C["ink"]), ("if 기간 할인 → …", C["ink"]),
            ("if 상품 연계 → …", C["ink"]), ("if 새 유형 → 코드 추가", C["red"])]
    for i, (t, col) in enumerate(rows):
        s.text(56, 112 + i * 38, t, size=13, color=col, weight="600" if col == C["red"] else "500")
    s.text(207, 300, "유형이 늘 때마다 요금제 코드 수정·회귀 테스트", size=13, color=C["red"],
           anchor="middle", weight="600")

    box(s, 430, 46, 180, 60, "프로모션 정의", ["(유형·그룹·자격 정책)"])
    box(s, 620, 46, 175, 60, "중첩 규칙", ["(타입 그룹 데이터)"])
    s.path("M 520 106 L 575 138", "good")
    s.path("M 707 106 L 652 138", "good")
    box(s, 465, 140, 295, 56, "번들 생성", ["(조합 탐색 + 규칙 판정)"])
    s.path("M 612 196 L 612 222", "good")
    box(s, 465, 224, 295, 50, "요금제 생성", ["(번들만 앎)"], stroke=C["good"])
    s.text(612, 300, "새 유형 = 정의·그룹 데이터 추가, 요금제 코드 그대로", size=13, color=C["good"],
           anchor="middle", weight="600")
    save(s, "promo-decouple")


# ------------------------------------------------------------------ 3
def lane(s, y0, title, steps, per_row, only_b=()):
    inner_x, inner_w = 26, 768
    gap = 40 if per_row == 3 else 32
    bw = (inner_w - gap * (per_row - 1)) / per_row
    bh = 66
    rows = (len(steps) + per_row - 1) // per_row
    gh = 36 + rows * bh + (rows - 1) * 38 + 16
    grp(s, 10, y0, 800, gh, title)
    pos = []
    for i, (t, lines) in enumerate(steps):
        r, c = divmod(i, per_row)
        x = inner_x + c * (bw + gap)
        y = y0 + 34 + r * (bh + 38)
        warn = (i + 1) in only_b
        box(s, x, y, bw, bh, t, lines,
            fill=C["warnPale"] if warn else C["white"], stroke=C["warn"] if warn else C["sky"])
        pos.append((x, y))
    for i in range(len(steps) - 1):
        (x1, y1), (x2, y2) = pos[i], pos[i + 1]
        if y1 == y2:
            s.path(f"M {x1 + bw:.1f} {y1 + bh / 2} L {x2 - 2:.1f} {y2 + bh / 2}", "ink")
        else:
            mid = y1 + bh + 19
            s.path(f"M {x1 + bw / 2:.1f} {y1 + bh} L {x1 + bw / 2:.1f} {mid} L {x2 + bw / 2:.1f} {mid} "
                   f"L {x2 + bw / 2:.1f} {y2 - 2}", "ink")
    return y0 + gh


def promo_pipeline():
    H = 500
    s = SVG(W, H)
    a = [("① 범위 조회", ["숙소·객실 유형·규칙셋"]),
         ("② 유효 프로모션", ["삭제 제외", "상시 또는 기간 내"]),
         ("③ 중첩 조합 탐색", []),
         ("④ 규칙 판정", ["취소정책 제외"]),
         ("⑤ 자격 정책 병합", []),
         ("⑥ 요금제 변형 생성", ["(공급사 요금제 서비스)"])]
    b = [("① 숙소 기준 캐시 조회", []),
         ("② 필터", ["ACTIVE, 노출 기간", "예약일 제외 조건"]),
         ("③ 단독 번들", []),
         ("④ 조합 탐색", ["(탐색 중 규칙 판정)"]),
         ("⑤ 적용 범위 교집합", ["(같은 레벨만)"]),
         ("⑥ 취소정책 제외", []),
         ("⑦ 체크인 제외 요일", ["합집합 7일이면 제외"])]
    end_a = lane(s, 10, "요금제 생성용 번들 (공급사 요금제 서비스가 호출)", a, 3)
    end_b = lane(s, end_a + 18, "예약 가능 번들 조회", b, 4, only_b=(5, 7))
    ly = end_b + 26
    rect(s, 26, ly - 13, 26, 17, C["warnPale"], C["warn"], rx=4)
    s.text(62, ly, "예약 가능 조회 경로에만 있는 단계", size=12, color=C["ink"])
    s.h = ly + 16
    save(s, "promo-pipeline")
    return s.h


# ------------------------------------------------------------------ 4
def node(s, cx, cy, text, kind="good", w=None):
    w = w or max(64, tw(text, 13) + 26)
    h = 36
    fill, stroke, col, dashed, op = {
        "root": (C["white"], C["ink"], C["ink"], False, 1),
        "good": (C["goodPale"], C["good"], C["ink"], False, 1),
        "bad": (C["redPale"], C["red"], C["red"], False, 1),
        "ghost": (C["white"], C["gray"], C["gray"], True, 1),
        "faded": (C["white"], C["red"], C["gray"], True, 0.55),
    }[kind]
    rect(s, cx - w / 2, cy - h / 2, w, h, fill, stroke, dashed=dashed, opacity=op)
    s.parts.append(f'<text x="{cx}" y="{cy + 4.7}" text-anchor="middle" font-size="13" font-weight="700" '
                   f'fill="{col}" opacity="{op}">{html.escape(text)}</text>')


def edge(s, x1, y1, x2, y2, color="gray", dashed=False):
    s.path(f"M {x1} {y1 + 18} L {x2} {y2 - 20}", color, dashed=dashed, width=1.4)


def promo_search_tree():
    H = 400
    s = SVG(W, H)
    y0, y1, y2, y3 = 30, 116, 202, 288
    root = (410, y0)
    l1 = {"M1": 175, "S1": 465, "S2": 650, "T1": 760}
    l2 = [("M1,S1", 65, "M1"), ("M1,S2", 175, "M1"), ("M1,T1", 285, "M1"),
          ("S1,S2", 405, "S1"), ("S1,T1", 525, "S1"), ("S2,T1", 650, "S2")]
    node(s, *root, "{ }", "root")
    for k, x in l1.items():
        edge(s, root[0], y0, x, y1)
        node(s, x, y1, k)
    for t, x, p in l2:
        edge(s, l1[p], y1, x, y2, color="red" if t == "S1,S2" else "gray")
        node(s, x, y2, t, "bad" if t == "S1,S2" else "good")
    # 크기 3 (운영 상한으로 생성 안 함)
    edge(s, 65, y2, 65, y3, dashed=True)
    node(s, 65, y3, "M1,S1,T1", "ghost")
    lab(s, 122, y3 + 5, "운영 상한 2 → 크기 3은 생성 안 함", anchor="start", bg=False)
    # 충돌 뒤 가지치기
    s.parts.append(f'<path d="M 405 {y2 + 18} L 405 {y3 - 20}" stroke="{C["red"]}" stroke-width="1.4" '
                   f'stroke-dasharray="4 4" opacity="0.55" fill="none"/>')
    node(s, 405, y3, "S1,S2,…", "faded")
    cy = (y2 + 18 + y3 - 18) / 2
    s.parts.append(f'<path d="M 397 {cy - 8} L 413 {cy + 8} M 413 {cy - 8} L 397 {cy + 8}" '
                   f'stroke="{C["red"]}" stroke-width="2.6" fill="none"/>')
    lab(s, 462, y3 + 5, "같은 그룹 충돌 → 즉시 되돌아감", color=C["red"], anchor="start", weight="700", bg=False)
    # 범례
    s.text(410, 350, "M=멤버십 · S=기간 할인(STANDARD) · T=타겟", size=12.5, color=C["ink"], anchor="middle")
    s.text(410, 374, "index 이후만 진행하므로 같은 조합을 두 번 만들지 않음", size=12.5, color=C["muted"],
           anchor="middle")
    save(s, "promo-search-tree")


# ------------------------------------------------------------------ 5
def promo_bundle_x6():
    H = 184
    s = SVG(W, H)
    box(s, 20, 24, 190, 46, "기본 요금제 1개")
    s.text(115, 96, "+", size=18, color=C["muted"], anchor="middle", weight="700")
    box(s, 20, 108, 190, 56, "프로모션 (그룹당 1개)", ["M, S, T"])
    s.path("M 222 94 L 292 94", "ink", width=2)
    s.text(257, 82, "× 6", size=15, color=C["ink"], anchor="middle", weight="700")
    rows = [(["M", "S", "T"], "단독 3", 30), (["M+S", "M+T", "S+T"], "짝 3", 110)]
    for names, tag, y in rows:
        for i, n in enumerate(names):
            box(s, 304 + i * 84, y, 70, 46, n, fill=C["goodPale"], stroke=C["good"])
        s.text(566, y + 28, tag, size=13, color=C["ink"], weight="700")
    rect(s, 630, 24, 175, 140, C["skyPale"], C["sky"])
    for i, t in enumerate(["요금제·재고·동기화", "데이터가 같은 배수로 증가", "→ 런칭 전 k6로", "6배 조건 부하 검증"]):
        s.text(718, 66 + i * 24, t, size=12.5, color=C["ink"] if i < 2 else C["skyDark"], anchor="middle",
               weight="500" if i < 2 else "700")
    save(s, "promo-bundle-x6")


# ------------------------------------------------------------------ 6
def promo_kafka():
    H = 466
    s = SVG(W, H)
    grp(s, 10, 10, 800, 124, "Before · 동기 REST", fill=C["redPale"], stroke=C["red"], color=C["red"])
    box(s, 30, 44, 140, 72, "B2C 요금제")
    box(s, 330, 44, 140, 72, "B2B 파트너")
    s.path("M 170 66 L 328 66", "ink")
    lab(s, 250, 70, "변경 1", color=C["ink"])
    s.path("M 170 96 L 328 96", "ink")
    lab(s, 250, 100, "변경 2 (재시도)", color=C["ink"])
    for i, t in enumerate(["• 응답 실패 시 재시도 안 하면 유실",
                           "• 파트너가 느리면 B2C 스레드가 묶임"]):
        s.text(500, 74 + i * 24, t, size=12.5, color=C["red"], weight="600")

    grp(s, 10, 150, 800, 302, "After · Kafka (양방향)", fill=C["goodPale"], stroke=C["good"], color=C["good"])
    # 1행
    y = 186
    box(s, 26, y, 160, 64, "공급사 요금제 서비스")
    box(s, 216, y, 140, 64, "Kafka", ["설정 이벤트", "(규칙셋 id 키)"], fill=C["purplePale"], stroke=C["purple"])
    box(s, 386, y, 150, 64, "요금제 관리 서비스")
    rect(s, 566, y + 2, 230, 60, C["white"], C["gray"], dashed=True)
    s.text(681, y + 27, "저장된 시각보다 오래된 이벤트는", size=12, color=C["ink"], anchor="middle")
    s.text(681, y + 46, "건너뜀 (event_times 비교)", size=12, color=C["ink"], anchor="middle")
    s.path(f"M 186 {y + 32} L 214 {y + 32}", "purple", dashed=True)
    s.path(f"M 356 {y + 32} L 384 {y + 32}", "purple", dashed=True)
    s.path(f"M 536 {y + 32} L 564 {y + 32}", "gray")
    # 2행
    y = 282
    box(s, 26, y, 160, 64, "요금제/재고 API")
    box(s, 216, y, 140, 64, "Kafka", ["결과 이벤트", "(객실 유형 id 키)"], fill=C["purplePale"], stroke=C["purple"])
    box(s, 386, y, 150, 64, "공급사 요금제 서비스")
    s.path(f"M 186 {y + 32} L 214 {y + 32}", "purple", dashed=True)
    s.path(f"M 356 {y + 32} L 384 {y + 32}", "purple", dashed=True)
    # 실패 분기
    y3 = 372
    box(s, 216, y3, 140, 64, "Kafka", ["실패 이벤트", "(별도 실패 토픽)"], fill=C["redPale"], stroke=C["red"])
    s.path(f"M 106 346 L 106 {y3 + 32} L 214 {y3 + 32}", "red", dashed=True)
    lab(s, 116, y3 + 20, "실패 시", color=C["red"], anchor="start", bg=False)
    save(s, "promo-kafka")


if __name__ == "__main__":
    promo_context()
    promo_decouple()
    promo_pipeline()
    promo_search_tree()
    promo_bundle_x6()
    promo_kafka()
