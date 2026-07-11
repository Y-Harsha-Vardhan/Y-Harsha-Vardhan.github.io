"""Overlay the institute-style header on the four headerless resume PDFs.

Reproduces the layout from `assets/resumes/old/24B1069-4.pdf`:
- IITB logo top-left
- Name / branch / institute block (left, three lines)
- Roll / degree / gender / DOB block (right, four lines)
- Education table: Graduation | Intermediate | Matriculation

Updated fields (Jul 2026): CPI = 8.15, Core credits = 134, Total credits = 155.
"""
from pathlib import Path
import fitz

HERE = Path(__file__).parent
LOGO = HERE / "iitb_logo.png"

IN_DIR = Path("/home/zoro/Downloads/resumes (no header)")
OUT_DIR = Path("/home/zoro/Downloads/resumes (with header)")
OUT_DIR.mkdir(exist_ok=True)

FILES = [
    "Quant_Sem_4_2pg (LONG).pdf",
    "Software_Sem_4_2pg (LONG).pdf",
]

# ---- Header data ----------------------------------------------------------
NAME       = "Yalamanchili Harsha Vardhan"
BRANCH     = "Computer Science & Engineering"
INSTITUTE  = "Indian Institute of Technology Bombay"
ROLL       = "24B1069"
DEGREE     = "B.Tech."
GENDER     = "Gender: Male"
DOB        = "DOB: 03/01/2007"

# Education table rows
ROWS = [
    # (Examination, University, Institute, Year, CPI/% + credits)
    ("Graduation",   "IIT Bombay", "IIT Bombay",                    "2028",
        ("8.15", "Core: 134 | Total: 155")),
    ("Intermediate", "CBSE",       "Narayana English Medium School","2024",
        ("97.80%", None)),
    ("Matriculation","CBSE",       "Narayana High School",          "2022",
        ("97.60%", None)),
]

# ---- Drawing --------------------------------------------------------------
def draw_header(page: fitz.Page):
    # LONG-only: headerless PDFs start body content at y ≈ 180, so we have
    # ~170pt for the header — matches the original 24B1069-4 layout.

    BLACK  = (0, 0, 0)
    GREY   = (0.35, 0.35, 0.35)
    F_BOLD = "helvetica-bold"
    F_REG  = "helvetica"
    F_ITAL = "helvetica-oblique"

    # 1. Logo (matches original 40,20 → 104,84)
    page.insert_image(fitz.Rect(40, 15, 100, 75), filename=str(LOGO))

    # 2. Left name / branch / institute block (bold black)
    left_x = 115
    y = 25
    for line in (NAME, BRANCH, INSTITUTE):
        page.insert_text((left_x, y), line, fontname=F_BOLD, fontsize=11, color=BLACK)
        y += 14

    # 3. Right roll / degree / gender / DOB block
    right_x = 405
    y = 25
    for line in (ROLL, DEGREE, GENDER, DOB):
        page.insert_text((right_x, y), line, fontname=F_BOLD, fontsize=10, color=BLACK)
        y += 13

    # 4. Rule under name block
    page.draw_line(fitz.Point(40, 82), fitz.Point(555, 82),
                   color=BLACK, width=0.6)

    # 5. Education table
    COL_X   = [40, 135, 230, 445, 505]
    HEADERS = ["Examination", "University", "Institute", "Year", "CPI / %"]

    header_y = 96
    for x, h in zip(COL_X, HEADERS):
        page.insert_text((x, header_y), h, fontname=F_BOLD, fontsize=9.5, color=BLACK)
    page.insert_text((COL_X[4], header_y + 10), "Credits",
                     fontname=F_ITAL, fontsize=8, color=GREY)

    page.draw_line(fitz.Point(40, header_y + 14), fitz.Point(555, header_y + 14),
                   color=BLACK, width=0.4)

    row_y = header_y + 26
    for exam, univ, inst, year, (cpi, credits) in ROWS:
        page.insert_text((COL_X[0], row_y), exam,  fontname=F_REG, fontsize=9.5, color=BLACK)
        page.insert_text((COL_X[1], row_y), univ,  fontname=F_REG, fontsize=9.5, color=BLACK)
        page.insert_text((COL_X[2], row_y), inst,  fontname=F_REG, fontsize=9.5, color=BLACK)
        page.insert_text((COL_X[3], row_y), year,  fontname=F_REG, fontsize=9.5, color=BLACK)
        page.insert_text((COL_X[4], row_y), cpi,   fontname=F_REG, fontsize=9.5, color=BLACK)
        if credits:
            page.insert_text((COL_X[4], row_y + 10), credits,
                             fontname=F_REG, fontsize=8, color=GREY)
            row_y += 22
        else:
            row_y += 14

    page.draw_line(fitz.Point(40, row_y + 2), fitz.Point(555, row_y + 2),
                   color=BLACK, width=0.4)


def process(path_in: Path, path_out: Path):
    doc = fitz.open(path_in)
    draw_header(doc[0])
    doc.save(path_out, deflate=True, garbage=3)
    doc.close()
    print(f"  {path_in.name}  ->  {path_out.name}")


if __name__ == "__main__":
    print(f"Writing headered PDFs to: {OUT_DIR}")
    for name in FILES:
        process(IN_DIR / name, OUT_DIR / name)
