from pathlib import Path
from zipfile import ZipFile
root=Path(__file__).resolve().parent.parent
with ZipFile(root/"rtb-trading-homepage.zip") as z:
    prefix="rtb-trading-homepage/"
    for name in z.namelist():
        if not name.startswith(prefix) or name.endswith("/"):
            continue
        rel=Path(name[len(prefix):])
        if ".." in rel.parts: raise ValueError("Invalid ZIP file path")
        if rel.name=="index.html":
            target=root/"site-original.html"
        elif rel.name in ("styles.css","app.js") or rel.parts[0]=="assets":
            target=root/"public"/rel
        else:
            continue
        target.parent.mkdir(parents=True,exist_ok=True)
        target.write_bytes(z.read(name))

# Match the mobile menu's close breakpoint to the responsive header CSS.
script_path = root/"public"/"app.js"
script = script_path.read_text(encoding="utf-8")
if "window.innerWidth > 950" not in script:
    raise RuntimeError("Mobile menu breakpoint not found in original script")
script = script.replace("window.innerWidth > 950", "window.innerWidth > 1180")
copy_start = script.find("const copyEmail = document.getElementById('copy-email');")
if copy_start != -1:
    copy_end = script.find("});", copy_start)
    if copy_end == -1:
        raise RuntimeError("Could not safely remove the obsolete email-prefix copy handler")
    script = script[:copy_start] + script[copy_end + 3:]
script_path.write_text(script, encoding="utf-8")
print("Original site assets extrac¶»§q«^