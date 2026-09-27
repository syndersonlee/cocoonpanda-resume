"""portfolio 다이어그램 공통 도구.

docs-local/interview/design/build_arch_svg.py의 SVG 클래스와 팔레트를 옮겨 왔다.
SVG는 <img>로 들어가 페이지 웹폰트를 못 쓰므로 시스템 한글 폰트 순서로 지정한다.
"""
import html, pathlib

C = dict(sky="#4FA3E0", skyDark="#0E7AC4", skyLight="#DCEFFA", skyPale="#F1F8FE", ink="#1B2A41", muted="#6B7A90",
         line="#CFE3F1", white="#FFFFFF", warn="#E8A33D", warnPale="#FFF4E3", good="#3BA776", goodPale="#E8F6EF",
         red="#D9534F", redPale="#FBE9E8", gray="#8A97A8", purple="#7B4FD0", purplePale="#F1EBFB")

class SVG:
    def __init__(self, w, h):
        self.w, self.h = w, h
        self.parts = []
    def defs(self):
        m = ""
        for name, col in [("ink", C["ink"]), ("sky", C["skyDark"]), ("gray", C["gray"]), ("purple", C["purple"]), ("good", C["good"]), ("red", C["red"])]:
            m += f'<marker id="arr-{name}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{col}"/></marker>'
        return f"<defs>{m}</defs>"
    def group(self, x, y, w, h, label, fill=C["skyPale"], stroke=C["sky"], dash=True):
        d = ' stroke-dasharray="8 5"' if dash else ""
        self.parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{fill}" stroke="{stroke}" stroke-width="1.5"{d}/>')
        self.parts.append(f'<text x="{x+12}" y="{y+20}" font-size="12.5" font-weight="700" fill="{C["skyDark"]}">{html.escape(label)}</text>')
    def box(self, x, y, w, h, title, lines=(), fill=C["white"], stroke=C["sky"], tcolor=C["ink"], lcolor=C["muted"], tsize=13.5, lsize=11, bold=True):
        self.parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="7" fill="{fill}" stroke="{stroke}" stroke-width="1.4"/>')
        n = 1 + len(lines)
        total = tsize + 4 + len(lines) * (lsize + 3.5)
        ty = y + (h - total) / 2 + tsize
        fw = "700" if bold else "500"
        self.parts.append(f'<text x="{x + w/2}" y="{ty:.1f}" text-anchor="middle" font-size="{tsize}" font-weight="{fw}" fill="{tcolor}">{html.escape(title)}</text>')
        cy = ty + 5
        for ln in lines:
            cy += lsize + 3.5
            self.parts.append(f'<text x="{x + w/2}" y="{cy:.1f}" text-anchor="middle" font-size="{lsize}" fill="{lcolor}">{html.escape(ln)}</text>')
    def path(self, d, color="ink", dashed=False, width=1.6, head=True):
        col = {"ink": C["ink"], "sky": C["skyDark"], "gray": C["gray"], "purple": C["purple"], "good": C["good"], "red": C["red"]}[color]
        da = ' stroke-dasharray="6 4"' if dashed else ""
        mk = f' marker-end="url(#arr-{color})"' if head else ""
        self.parts.append(f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{width}"{da}{mk}/>')
    def label(self, x, y, text, size=10.5, color=C["muted"], anchor="middle", bg=True, weight="500"):
        if bg:
            tw = len(text) * size * 0.62 + 10
            self.parts.append(f'<rect x="{x - tw/2 if anchor=="middle" else x - 4}" y="{y - size}" width="{tw:.0f}" height="{size + 6}" fill="{C["white"]}" opacity="0.92" rx="3"/>')
        self.parts.append(f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-size="{size}" font-weight="{weight}" fill="{color}">{html.escape(text)}</text>')
    def text(self, x, y, text, size=12, color=C["ink"], anchor="start", weight="500"):
        self.parts.append(f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-size="{size}" font-weight="{weight}" fill="{color}">{html.escape(text)}</text>')
    def render(self):
        body = "\n".join(self.parts)
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" width="100%" '
                f'font-family="Pretendard, -apple-system, Apple SD Gothic Neo, Malgun Gothic, Noto Sans KR, sans-serif" style="max-width:{self.w}px;background:#fff">'
                f'{self.defs()}<rect width="{self.w}" height="{self.h}" fill="#ffffff"/>{body}</svg>')


def save(svg, name):
    """src/images/diagrams/<name>.svg 로 저장한다."""
    out = pathlib.Path(__file__).resolve().parent.parent / "src" / "images" / "diagrams" / f"{name}.svg"
    out.write_text(svg.render(), encoding="utf-8")
    print("wrote", out.name)
