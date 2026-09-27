"""캠핑 내재화 다이어그램 7종을 그린다.

실행: python3 tools/diagrams_camping.py
출력: src/images/diagrams/camp-*.svg
"""
import html, os, sys

sys.path.insert(0, os.path.dirname(__file__))
from svg_kit import SVG, C, save  # noqa: E402

W = 820
WIDE = set("①②③④⑤⑥⑦→↓…·")


def tw(text, size):
    """한글은 1.0, 그 밖의 문자는 0.6 배로 폭을 어림한다."""
    w = 0.0
    for ch in text:
        o = ord(ch)
        if 0xAC00 <= o <= 0xD7A3 or 0x3130 <= o <= 0x318F or ch in WIDE:
            w += size
        else:
            w += size * 0.6
    return w


def check(text, size, room, where):
    if tw(text, size) > room:
        print(f"  [overflow] {where}: '{text}' {tw(text, size):.0f} > {room:.0f}")


def rect(s, x, y, w, h, fill=C["white"], stroke=C["sky"], dash=False, rx=6, sw=1.4, opacity=None):
    d = ' stroke-dasharray="6 4"' if dash else ""
    op = f' opacity="{opacity}"' if opacity is not None else ""
    st = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
    s.parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"{st}{d}{op}/>')


def lbl(s, x, y, text, size=12, color=C["muted"], anchor="middle", weight="500", bg=True):
    """한글 폭 기준으로 흰 배경을 깔고 글자를 쓴다."""
    if bg:
        w = tw(text, size) + 10
        x0 = x - w / 2 if anchor == "middle" else (x - 5 if anchor == "start" else x - w + 5)
        rect(s, round(x0, 1), y - size - 1, round(w, 1), size + 7, fill=C["white"], stroke=None, rx=3, opacity=0.95)
    s.text(x, y, text, size, color, anchor, weight)


def box(s, x, y, w, h, title, lines=(), tsize=13.5, **kw):
    check(title, tsize, w - 12, "box title")
    for ln in lines:
        check(ln, 12, w - 12, "box line")
    s.box(x, y, w, h, title, lines, tsize=tsize, lsize=12, **kw)


def note(s, x, y, w, lines, fill, stroke, color, size=12, weight="500", lh=16, pad=8, anchor="middle"):
    h = len(lines) * lh + pad * 2 - (lh - size) + 2
    rect(s, x, y, w, h, fill=fill, stroke=stroke)
    for i, ln in enumerate(lines):
        check(ln, size, w - 12, "note")
        tx = x + w / 2 if anchor == "middle" else x + 14
        s.text(tx, y + pad + size + i * lh, ln, size, color, anchor, weight)
    return h


# 1. 캠핑 도메인 매핑 ------------------------------------------------------------
def camp_domain():
    s = SVG(W, 472)
    s.group(20, 20, 230, 380, "캠핑 (별도 예매 시스템)")
    s.group(490, 20, 310, 380, "숙박 플랫폼 모델")
    for y, t in [(60, "캠핑장"), (150, "존 (Zone)"), (240, "자리 (Site)")]:
        box(s, 45, y, 180, 44, t)
    s.path("M135,104 V148")
    s.path("M135,194 V238")
    for y, t in [(60, "숙소"), (240, "객실 유형"), (330, "요금제 · 재고")]:
        box(s, 580, y, 200, 44, t)
    # 캠핑장 -> 숙소
    s.path("M225,82 H578")
    # 존 -> 객실 유형 (그룹 정보)
    s.path("M225,172 H640 V238", color="gray", dashed=True)
    lbl(s, 360, 164, "객실 유형의 그룹 정보 (존 id)", color=C["muted"])
    # 자리 -> 객실 유형
    s.path("M225,262 H578")
    lbl(s, 400, 253, "자리 1개 = 객실 유형 1개", color=C["ink"], weight="600")
    lbl(s, 400, 282, "수량 1 재고", color=C["ink"], weight="600")
    # 객실 유형 -> 요금제·재고
    s.path("M680,284 V328")
    lbl(s, 670, 302, "한 객실 유형의 여러 요금제가", anchor="end")
    lbl(s, 670, 320, "재고 공유", anchor="end")
    rect(s, 20, 416, 780, 40, fill=C["skyPale"], stroke=C["sky"])
    s.text(410, 441, "재고 공유 단위 = 객실 유형 → Lock 단위도 객실 유형", 13.5, C["ink"], "middle", "700")
    save(s, "camp-domain")


# 2. 차감 요청 한 건의 흐름 ------------------------------------------------------
def camp_deduction():
    steps = [
        ("① Redis MultiLock 획득", ["키: 객실 유형 : 이용 유형 : 날짜, 날짜마다 1개"]),
        ("② 멱등 확인", ["같은 거래가 이미 성공했으면 중단"]),
        ("③ 공급사 원장 재고 차감 (HTTP)", []),
        ("④ 요금제별 반영", ["원래 요금제 + 재고 공유 요금제", "SELECT … FOR UPDATE 후", "event_times CAS UPDATE"]),
        ("⑤ Kafka 재고 이벤트 발행", []),
        ("⑥ 재고 이력 기록", ["멱등 키로 중복 건너뜀"]),
        ("⑦ 거래 기록 저장", ["별도 트랜잭션, finally"]),
    ]
    heights = {0: 40, 1: 50, 2: 66, 3: 82}
    gaps = [14, 14, 44, 14, 14, 14]
    sx, sw = 124, 328
    ys, y = [], 130
    for i, (t, ln) in enumerate(steps):
        ys.append((y, heights[len(ln)]))
        y += heights[len(ln)] + (gaps[i] if i < len(gaps) else 0)
    end = ys[-1][0] + ys[-1][1]
    H = end + 32
    s = SVG(W, H)

    box(s, 198, 14, 180, 36, "예약 서비스")
    s.path("M288,50 V96")
    lbl(s, 298, 78, "차감 요청", anchor="start", color=C["ink"])
    s.group(112, 98, 352, end + 14 - 98, "요금제/재고 API")
    for (t, ln), (yy, hh) in zip(steps, ys):
        box(s, sx, yy, sw, hh, t, ln)

    # 왼쪽 레일
    (y1, h1), (y3, h3), (y4, h4) = ys[0], ys[2], ys[3]
    rect(s, 16, y1, 8, end - y1, fill=C["sky"], stroke=None, rx=3)
    rect(s, 29, y3, 7, h3, fill=C["warn"], stroke=None, rx=3)
    rect(s, 29, y4, 7, h4, fill=C["good"], stroke=None, rx=3)
    for yy, lines in [(y1, ["1층", "분산 Lock", "끝까지 보유"]), (y3, ["2층", "공급사 원장"]), (y4, ["3층", "DB 마지막", "방어선"])]:
        for i, ln in enumerate(lines):
            check(ln, 12, 112 - 40 - 4, "rail")
            s.text(40, yy + 15 + i * 16, ln, 13 if i == 0 else 12, C["ink"] if i == 0 else C["muted"], "start", "700" if i == 0 else "500")

    # MySQL
    y2 = ys[1][0]
    box(s, 718, y2, 86, end - y2, "MySQL", fill=C["skyPale"])
    for k, off in [(1, None), (3, 10), (5, None), (6, None)]:
        yy, hh = ys[k]
        ay = yy + (off if off is not None else hh / 2)
        s.path(f"M{sx + sw},{ay} H716", color="gray")

    # ① 옆 빨간 메모
    s.path(f"M{sx + sw},{y1 + 25} H530", color="red", dashed=True, head=False)
    note(s, 530, y1 - 4, 170, ["획득 실패·Redis 장애 →", "차감 실패로 닫힘", "(초과 판매보다 미판매)"],
         C["redPale"], C["red"], C["red"])

    # ③ 공급사 원장
    box(s, 540, y3 - 2, 160, 44, "공급사 재고 원장", fill=C["warnPale"], stroke=C["warn"])
    s.path(f"M{sx + sw},{y3 + 12} H538")
    s.path(f"M540,{y3 + 30} H{sx + sw + 2}")
    lbl(s, 620, y3 + 58, "매진이면 SOLD_OUT", color=C["ink"])
    lbl(s, 620, y3 + 75, "성공이면 날짜별 수량", color=C["ink"])

    # ④ 옆 빨간 메모
    s.path(f"M{sx + sw},{y4 + 50} H530", color="red", dashed=True, head=False)
    note(s, 530, y4 + 22, 170, ["Lock이 유실돼도", "동시 요청 중 한쪽은", "CAS에서 실패"],
         C["redPale"], C["red"], C["red"])

    # ⑤ Kafka
    y5, h5 = ys[4]
    box(s, 570, y5, 100, h5, "Kafka", fill=C["purplePale"], stroke=C["purple"])
    s.path(f"M{sx + sw},{y5 + h5 / 2} H568", color="purple", dashed=True)
    save(s, "camp-deduction")


# 3. Lock 획득 순서 --------------------------------------------------------------
def camp_lock_order():
    s = SVG(W, 380)
    x0, cw = 270, 130
    dates = ["9/10", "9/11", "9/12", "9/13"]
    for i, d in enumerate(dates):
        rect(s, x0 + cw * i + 4, 20, cw - 8, 34, fill=C["skyPale"], stroke=C["line"])
        s.text(x0 + cw * i + cw / 2, 42, d, 13.5, C["ink"], "middle", "700")
    s.text(24, 42, "날짜별 Lock 키", 13, C["muted"], "start", "600")

    def cell(ci, y, num):
        x = x0 + cw * ci + 20
        rect(s, x, y, 90, 52, fill=C["skyLight"], stroke=C["sky"])
        s.text(x + 45, y + 32, f"{num} Lock", 14, C["skyDark"], "middle", "700")

    ya, yb = 74, 190
    # 9/11 경쟁 구간 배경
    cx = x0 + cw
    rect(s, cx + 8, ya - 8, 114, yb + 60 - ya, fill=C["redPale"], stroke=C["red"], dash=True, rx=8, sw=1.2)
    s.text(24, ya + 31, "요청 A (9/10 ~ 9/12 숙박)", 13, C["ink"], "start", "700")
    cell(0, ya, "①"); cell(1, ya, "②")
    s.path(f"M{x0 + 110},{ya + 26} H{x0 + cw + 18}")
    xd = x0 + cw * 2 + 5
    rect(s, xd, ya, 120, 52, fill=C["white"], stroke=C["gray"], dash=True)
    s.text(xd + 60, ya + 22, "체크아웃 날짜는", 12, C["muted"], "middle")
    s.text(xd + 60, ya + 40, "잠그지 않음", 12, C["muted"], "middle")

    s.text(24, yb + 31, "요청 B (9/11 ~ 9/13 숙박)", 13, C["ink"], "start", "700")
    cell(1, yb, "①"); cell(2, yb, "②")
    s.path(f"M{x0 + cw + 110},{yb + 26} H{x0 + 2 * cw + 18}")

    # 9/11 경쟁 표시
    s.path(f"M{cx + 65},{ya + 56} V{yb - 4}", color="red", head=True)
    s.path(f"M{cx + 65},{yb - 4} V{ya + 56}", color="red", head=True)
    lbl(s, cx + 132, 164, "같은 키 경쟁 → 먼저 잡은 쪽 진행, 다른 쪽 대기", color=C["red"], anchor="start", weight="600")

    # 날짜 오름차순
    s.path(f"M{x0 + 20},262 H{x0 + cw * 4 - 20}", color="ink")
    lbl(s, x0 + cw * 2, 267, "날짜 오름차순으로 획득", color=C["ink"], weight="600")

    note(s, 20, 286, 780, ["키 = 객실 유형 : 이용 유형(OVERNIGHT/DAYUSE) : 날짜",
                           "모든 요청이 같은 순서로 잡으므로 순환 대기 없음",
                           "하나라도 실패하면 잡은 Lock을 모두 풀고 처음부터 재시도"],
         C["skyPale"], C["sky"], C["ink"], size=13, lh=20, pad=12, anchor="start")
    save(s, "camp-lock-order")


# 4. Row Lock + CAS 시퀀스 -------------------------------------------------------
def camp_cas():
    s = SVG(W, 640)
    T1, DB, T2 = 110, 410, 710
    top, bottom = 56, 548
    for x, t in [(T1, "차감 T1"), (DB, "MySQL (재고 행)"), (T2, "동기화 T2")]:
        box(s, x - 85, 16, 170, 40, t, fill=C["skyPale"])
        s.path(f"M{x},{top} V{bottom}", color="gray", dashed=True, head=False, width=1.2)
    # Row Lock 보유 구간
    rect(s, DB - 6, 92, 12, 164, fill=C["warnPale"], stroke=C["warn"], rx=2)
    rect(s, DB - 6, 402, 12, 126, fill=C["warnPale"], stroke=C["warn"], rx=2)

    def msg(y, a, b, lines, color="ink", dashed=False):
        x1 = a + (8 if a < b else -8) if a == DB else a
        x2 = b - 8 if a < b else b + 8
        s.path(f"M{x1},{y} H{x2}", color=color, dashed=dashed)
        mid = (a + b) / 2 + (8 if a == T2 else 0)
        col = {"ink": C["ink"], "red": C["red"], "good": C["good"]}[color]
        for i, ln in enumerate(lines):
            check(ln, 12, abs(b - a) - 16, "msg")
            lbl(s, mid, y - 8 - (len(lines) - 1 - i) * 16, ln, color=col, weight="600" if color != "ink" else "500")

    msg(100, T1, DB, ["SELECT … FOR UPDATE (Row Lock 획득)"])
    msg(160, T2, DB, ["SELECT (Lock 없이 읽기)", "→ event_times = S0"])
    msg(210, T1, DB, ["UPDATE 수량↓, event_times = S1"])
    msg(256, T1, DB, ["COMMIT (Lock 해제)"])
    msg(310, T2, DB, ["UPDATE … WHERE event_times = S0"])
    msg(356, DB, T2, ["0행 갱신 → CAS 실패"], color="red")
    msg(410, T2, DB, ["SELECT … FOR UPDATE 로 다시 읽기 → S1"])
    note(s, 604, 428, 196, ["요청 시각이 더 최신일 때만", "재계산 후 재시도 (최대 2회)"],
         C["warnPale"], C["warn"], C["ink"])
    msg(520, T2, DB, ["UPDATE … WHERE event_times = S1 → 성공"], color="good")

    rect(s, 16, 564, 788, 60, fill=C["skyPale"], stroke=C["sky"])
    s.text(36, 588, "Row Lock", 13, C["ink"], "start", "700")
    s.text(130, 588, "동시에 쓰는 것을 막음", 13, C["ink"], "start")
    s.text(36, 610, "CAS", 13, C["ink"], "start", "700")
    s.text(130, 610, "오래된 값을 읽고 쓰는 것을 막음", 13, C["ink"], "start")
    save(s, "camp-cas")


# 5. Gap Lock Deadlock 전후 -----------------------------------------------------
def camp_gaplock():
    s = SVG(W, 498)
    s.group(16, 16, 470, 414, "Before · 전체 삭제 후 재삽입", fill=C["white"], stroke=C["red"])
    A, DB, B = 80, 250, 420
    for x, w, t in [(A, 100, "동기화 A"), (DB, 160, "MySQL (보조 인덱스)"), (B, 100, "동기화 B")]:
        box(s, x - w / 2, 44, w, 36, t, fill=C["skyPale"])
        s.path(f"M{x},80 V366", color="gray", dashed=True, head=False, width=1.2)

    def msg(y, a, b, lines, color="ink"):
        x2 = b - 6 if a < b else b + 6
        s.path(f"M{a},{y} H{x2}", color=color)
        col = C["red"] if color == "red" else C["ink"]
        for i, ln in enumerate(lines):
            check(ln, 12, abs(b - a) - 12, "gap msg")
            lbl(s, (a + b) / 2, y - 8 - (len(lines) - 1 - i) * 16, ln, color=col)

    msg(130, A, DB, ["DELETE WHERE", "재고 id = … (0건)"])
    msg(190, B, DB, ["DELETE WHERE", "재고 id = … (0건)"])
    rect(s, DB - 100, 206, 200, 34, fill=C["warnPale"], stroke=C["warn"])
    s.text(DB, 228, "같은 구간 Gap Lock (서로 호환)", 12, C["ink"], "middle", "600")
    msg(290, A, DB, ["INSERT →", "B의 Gap Lock에 막힘"], color="red")
    msg(350, B, DB, ["INSERT →", "A의 Gap Lock에 막힘"], color="red")
    rect(s, 30, 374, 442, 42, fill=C["redPale"], stroke=C["red"])
    s.text(251, 400, "Deadlock → 한쪽 롤백 → 재고만 반영, 일정 누락", 13, C["red"], "middle", "700")

    s.group(500, 16, 304, 414, "After · 변경분만 반영", fill=C["white"], stroke=C["good"])
    steps = [("① 기존 일정 조회", ["→ (오픈, 마감) 키 집합"]),
             ("② 목표와 비교", ["→ 제거 대상 / 신규 대상"]),
             ("③ 제거 대상 있을 때만 DELETE", ["WHERE id IN (…) (PK)"]),
             ("④ 신규 대상만 INSERT", []),
             ("⑤ 변경 없으면", ["아무 쿼리도 실행하지 않음"])]
    y = 44
    for i, (t, ln) in enumerate(steps):
        h = 50 if ln else 40
        box(s, 514, y, 276, h, t, ln)
        if i < len(steps) - 1:
            s.path(f"M652,{y + h} V{y + h + 12}")
        y += h + 14
    rect(s, 514, 356, 276, 58, fill=C["goodPale"], stroke=C["good"])
    s.text(652, 380, "Lock 범위 = 실제 변경 행(PK)", 13, C["good"], "middle", "700")
    s.text(652, 400, "→ Deadlock 제거", 13, C["good"], "middle", "700")

    rect(s, 16, 444, 788, 38, fill=C["warnPale"], stroke=C["warn"])
    s.text(410, 468, "REPEATABLE READ에서는 매칭 0건인 보조 인덱스 DELETE도 그 값이 들어갈 구간을 잠급니다",
           13, C["ink"], "middle", "600")
    save(s, "camp-gaplock")


# 6. 오픈 일정 동기화와 판정 지점 -----------------------------------------------
def camp_open_schedule():
    s = SVG(W, 452)
    box(s, 16, 40, 160, 56, "공급사 요금제 서비스", fill=C["warnPale"], stroke=C["warn"])
    s.path("M176,68 H314")
    lbl(s, 245, 42, "판매 설정 동기화", color=C["ink"])
    lbl(s, 245, 59, "(오픈 일정 포함)", color=C["ink"])
    rect(s, 316, 20, 240, 160, fill=C["white"], stroke=C["sky"])
    s.text(436, 42, "요금제/재고 API", 13.5, C["ink"], "middle", "700")
    s.text(436, 61, "판매 설정 동기화", 12, C["muted"], "middle")
    box(s, 332, 74, 208, 40, "1) 재고 반영 (날짜별 CAS)", tsize=13, bold=False, fill=C["skyPale"])
    box(s, 332, 124, 208, 40, "2) 오픈 일정 변경분 반영", tsize=13, bold=False, fill=C["skyPale"])
    lbl(s, 436, 204, "전용 API 없이 기존 동기화에 통합", color=C["skyDark"], weight="600")
    s.path("M556,100 H618", color="gray")
    box(s, 620, 60, 184, 80, "MySQL", ["재고 · 오픈 일정"], fill=C["skyPale"])

    s.group(16, 250, 788, 128, "판정 적용 지점")
    items = [("재고 조회 API", ["구간 밖 재고 제외"]), ("캘린더 일별 요약", ["요약 쿼리에 판정 결합"]),
             ("가용성 응답", ["다중 구간 리스트"]), ("감면 할인 필터", [])]
    bw = 182
    centers = []
    for i, (t, ln) in enumerate(items):
        x = 28 + i * (bw + 12)
        box(s, x, 308, bw, 56, t, ln)
        centers.append(x + bw / 2)
    s.path("M712,140 V290", color="gray", head=False)
    s.path(f"M{centers[0]},290 H712", color="gray", head=False)
    for c in centers:
        s.path(f"M{c},290 V306", color="gray")

    rect(s, 16, 394, 788, 42, fill=C["goodPale"], stroke=C["good"])
    s.text(410, 420, "판정 규칙: 일정이 없으면 제한 없음 · 있으면 구간 안일 때만 판매 가능", 13.5, C["ink"], "middle", "700")
    save(s, "camp-open-schedule")


# 7. 단계별 자원 점유 ------------------------------------------------------------
def camp_connection():
    s = SVG(W, 364)
    x0 = 162
    cw = (804 - x0) / 4
    stages = ["진입 (요금제 조회)", "Lock 대기", "공급사 원장 호출", "로컬 반영"]
    for i, t in enumerate(stages):
        x = x0 + cw * i
        rect(s, x + 3, 16, cw - 6, 36, fill=C["skyPale"], stroke=C["line"])
        check(t, 13, cw - 12, "stage")
        s.text(x + cw / 2, 39, t, 13, C["ink"], "middle", "700")
        if i:
            s.path(f"M{x},58 V290", color="gray", dashed=True, head=False, width=1)
    rows = [(70, 56, "개선 전 · DB 커넥션"), (146, 64, "개선 후 · DB 커넥션"), (230, 56, "개선 후 · Redis Lock")]
    for y, h, t in rows:
        check(t, 13, x0 - 24, "row label")
        s.text(20, y + h / 2 + 5, t, 13, C["ink"], "start", "700")

    def bar(c0, c1, y, h, lines, fill, stroke, color, dash=False, weight="600"):
        x = x0 + cw * c0 + 4
        w = cw * (c1 - c0 + 1) - 8
        rect(s, round(x, 1), y, round(w, 1), h, fill=fill, stroke=stroke, dash=dash)
        n = len(lines)
        for i, ln in enumerate(lines):
            check(ln, 12.5, w - 12, "bar")
            s.text(round(x + w / 2, 1), y + h / 2 + 4.5 + (i - (n - 1) / 2) * 16, ln, 12.5, color, "middle", weight)

    bar(0, 3, 70, 56, ["트랜잭션 안에서 Lock 대기 → 대기자도 커넥션 점유"], C["redPale"], C["red"], C["red"])
    bar(0, 0, 146, 64, ["읽기 후 즉시 반환"], C["skyLight"], C["sky"], C["skyDark"])
    bar(3, 3, 146, 64, ["짧은 트랜잭션", "정렬된 Row Lock", "+ CAS"], C["skyLight"], C["sky"], C["skyDark"])
    bar(1, 1, 230, 56, ["대기 (커넥션 없이)"], C["white"], C["purple"], C["purple"], dash=True)
    bar(2, 3, 230, 56, ["보유"], C["purplePale"], C["purple"], C["purple"], weight="700")

    rect(s, 16, 306, 788, 42, fill=C["skyPale"], stroke=C["sky"])
    s.text(410, 332, "오픈 직후 몰리는 요청이 Lock을 기다려도 DB 커넥션을 붙잡지 않도록 바꿈",
           12.5, C["ink"], "middle", "600")
    save(s, "camp-connection")


if __name__ == "__main__":
    camp_domain()
    camp_deduction()
    camp_lock_order()
    camp_cas()
    camp_gaplock()
    camp_open_schedule()
    camp_connection()
