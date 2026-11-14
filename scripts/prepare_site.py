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
print("Original site assets extracted")

