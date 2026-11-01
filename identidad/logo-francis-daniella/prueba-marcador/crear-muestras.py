from pathlib import Path
import sys
sys.path.insert(0,'/private/tmp/dany-logo-fonttools')
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
b=Path(__file__).parent
families=[('01-caveat-brush','Caveat Brush','CaveatBrush-Regular.ttf'),('02-mansalva','Mansalva','Mansalva-Regular.ttf'),('03-kalam-bold','Kalam Bold','Kalam-Bold.ttf')]
entries=[]
for key,label,file in families:
 font=TTFont(b/'fuentes'/file);gs=font.getGlyphSet();cmap=font.getBestCmap();upm=font['head'].unitsPerEm
 kern={}
 if 'kern' in font:
  for table in font['kern'].kernTables:kern.update(table.kernTable)
 def line(text):
  pos=0;prev=None;paths=[];bounds=[]
  for ch in text:
   name=cmap[ord(ch)]
   if prev:pos+=kern.get((prev,name),0)
   pen=SVGPathPen(gs);bp=BoundsPen(gs);t=(1,0,0,-1,pos,0)
   gs[name].draw(TransformPen(pen,t));gs[name].draw(TransformPen(bp,t))
   if pen.getCommands():paths.append(pen.getCommands())
   if bp.bounds:bounds.append(bp.bounds)
   pos+=gs[name].width;prev=name
  return ''.join(paths),(min(v[0] for v in bounds),min(v[1] for v in bounds),max(v[2] for v in bounds),max(v[3] for v in bounds))
 def save(suffix,text,stack=False):
  if stack:
   a,c=text.split(' ');p1,r1=line(a);p2,r2=line(c)
   dy=r1[3]-r2[1]+upm*.13
   w1=r1[2]-r1[0];w2=r2[2]-r2[0];width=max(w1,w2)
   x1=(width-w1)/2-r1[0];x2=(width-w2)/2-r2[0]
   paths=f'<path d="{p1}" transform="translate({x1},0)"/><path d="{p2}" transform="translate({x2},{dy})"/>'
   bounds=(0,r1[1],width,r2[3]+dy)
  else:
   p,bounds=line(text);paths=f'<path d="{p}"/>'
  x,y,x1,y1=bounds;pad=upm*.045;vb=f'{x-pad} {y-pad} {x1-x+pad*2} {y1-y+pad*2}'
  svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="240" height="{240*(y1-y+pad*2)/(x1-x+pad*2):.2f}" viewBox="{vb}" role="img" aria-labelledby="name"><title id="name">{text} · {label}</title><g fill="#000">{paths}</g></svg>'
  filename=key+'-'+suffix+'.svg';(b/filename).write_text(svg)
  return {'file':filename,'view':vb,'paths':paths}
 entry={'key':key,'label':label}
 for suffix,text in [('mayusculas','FRANCIS DANIELLA'),('minusculas','francis daniella')]:
  entry[suffix]=save(suffix,text,True)
  entry[suffix+'-horizontal']=save(suffix+'-horizontal',text)
 entries.append(entry)
board=['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1060" viewBox="0 0 1200 1060"><rect width="1200" height="1060" fill="#fff"/>']
def txt(x,y,text,size=15):
 board.append(f'<text x="{x}" y="{y}" font-family="Arial,sans-serif" font-size="{size}" fill="#000">{text}</text>')
def place(item,x,y,w,h):
 board.append(f'<svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="{item["view"]}" preserveAspectRatio="xMinYMid meet"><g fill="#000">{item["paths"]}</g></svg>')
txt(48,42,'Francis Daniella · Prueba con fuentes reales',24)
txt(48,86,'MAYÚSCULAS',12);txt(470,86,'MINÚSCULAS',12);txt(906,86,'ENCABEZADO · 220 PX',12)
for i,e in enumerate(entries):
 y=122+i*302
 txt(48,y,str(i+1)+' · '+e['label'],19)
 place(e['mayusculas'],48,y+24,350,172)
 place(e['minusculas'],470,y+24,350,172)
 place(e['minusculas-horizontal'],906,y+74,220,64)
txt(48,1032,'Negro sobre blanco · Fuentes sin cambios de forma, inclinación ni grosor.',13)
board.append('</svg>');(b/'comparativa.svg').write_text(''.join(board))
# Static local gallery with real font previews, no external dependencies.
html=['''<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Francis Daniella · Fuentes manuscritas</title><style>*{box-sizing:border-box}body{margin:0;background:#fff;color:#000;font:16px/1.5 Arial,sans-serif}main{max-width:1200px;margin:auto;padding:32px 24px}h1{font-size:28px;font-weight:500;margin:20px 0 8px}h2{font-size:20px;font-weight:500}h3{font-size:13px;font-weight:400;margin:0 0 20px}p{margin:8px 0 24px}a{color:inherit;text-underline-offset:4px}a:focus-visible{outline:2px solid;outline-offset:5px}.board{width:100%;height:auto}section{padding:28px 0 48px;scroll-margin-top:24px}.samples{display:grid;grid-template-columns:1fr 1fr 250px;gap:40px}.main-logo{width:100%;max-width:350px;height:180px;object-fit:contain;object-position:left center}.small-logo{width:220px;max-width:100%;height:64px;object-fit:contain;object-position:left center}.links{display:flex;gap:14px;flex-wrap:wrap;font-size:14px}nav{display:flex;gap:20px;flex-wrap:wrap;margin:24px 0}footer{font-size:13px;margin:36px 0}@media(max-width:850px){.samples{grid-template-columns:1fr 1fr}.header-size{grid-column:1/-1}}@media(max-width:520px){main{padding:24px 20px}.samples{grid-template-columns:1fr;gap:32px}.main-logo{height:150px}.header-size{grid-column:auto}}</style></head><body><main><a href="../index.html">← Todas las propuestas</a><h1>Fuentes manuscritas para Francis Daniella</h1><p>Caveat Brush, Mansalva y Kalam Bold. Muestras de las fuentes reales en mayúsculas y minúsculas, con su grosor e inclinación originales.</p><nav aria-label="Fuentes">''']
for e in entries:html.append(f'<a href="#{e["key"]}">{e["label"]}</a>')
html.append('</nav><a href="comparativa.png"><img class="board" src="comparativa.png" alt="Comparativa de las tres fuentes con Francis Daniella en mayúsculas, minúsculas y tamaño de encabezado" width="1200" height="1060"></a>')
for e in entries:
 html.append(f'<section id="{e["key"]}"><h2>{e["label"]}</h2><div class="samples">')
 for suffix,label in [('mayusculas','Mayúsculas'),('minusculas','Minúsculas'),('minusculas-horizontal','Encabezado · 220 px')]:
  file=e[suffix]['file'];cls='small-logo' if 'horizontal' in suffix else 'main-logo'
  html.append(f'<div class="{"header-size" if "horizontal" in suffix else "case"}"><h3>{label}</h3><img class="{cls}" src="{file}" alt="Francis Daniella · {e["label"]} · {label}"><div class="links"><a href="{file}" download>SVG</a><a href="{file[:-4]}.png" download>PNG</a></div></div>')
 html.append('</div></section>')
html.append('''<footer>Las formas no se han dibujado de nuevo ni se han generado con IA. Son muestras de fuentes existentes, convertidas a curvas. No se ha elegido todavía una nueva dirección. <a href="LEEME.md">Fuentes, licencias y notas</a> · <a href="comparativa.png" download>Descargar comparativa</a>.</footer></main></body></html>''')
(b/'index.html').write_text(''.join(html))
print('12 muestras vectoriales y galería preparadas.')
