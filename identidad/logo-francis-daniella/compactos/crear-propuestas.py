from pathlib import Path
import sys,json
sys.path.insert(0,'/private/tmp/dany-logo-fonttools')
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
base=Path(__file__).parent
options=[('01-gesto-libre','Caveat.ttf',600,.025,-6,0),('02-trazo-claro','Kalam.ttf',None,-.025,-8,0),('03-firma-compacta','BriemHand.ttf',540,.015,-8,0),('04-flower','Pacifico.ttf',None,0,-9,22)]
meta=[]
for key,filename,weight,slant,tracking,stroke in options:
 font=TTFont(base/'fuentes'/filename)
 glyphs=font.getGlyphSet(location={'wght':weight} if weight else None)
 cmap=font.getBestCmap();kern={}
 if 'kern' in font:
  for table in font['kern'].kernTables:kern.update(table.kernTable)
 def line(text):
  x=0;parts=[];bounds=[];prev=None
  for ch in text:
   name=cmap[ord(ch)]
   if prev:x+=kern.get((prev,name),0)
   path=SVGPathPen(glyphs);bound=BoundsPen(glyphs);matrix=(1,0,slant,-.86 if key=='04-flower' else -1,x,0)
   glyphs[name].draw(TransformPen(path,matrix));glyphs[name].draw(TransformPen(bound,matrix))
   if path.getCommands():parts.append(path.getCommands())
   if bound.bounds:bounds.append(bound.bounds)
   x+=glyphs[name].width+tracking
   prev=name
  return ''.join(parts),(min(b[0] for b in bounds),min(b[1] for b in bounds),max(b[2] for b in bounds),max(b[3] for b in bounds))
 def output(suffix,groups,bounds):
  x0,y0,x1,y1=bounds;pad=font['head'].unitsPerEm*.035+stroke/2
  w=x1-x0+pad*2;h=y1-y0+pad*2
  paths=''.join(f'<path d="{p}" transform="translate({x},{y})"/>' for p,x,y in groups)
  svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="240" height="{240*h/w:.2f}" viewBox="{x0-pad} {y0-pad} {w} {h}" role="img" aria-labelledby="title"><title id="title">francis daniella</title><g fill="#000" stroke="#000" stroke-width="{stroke}" stroke-linejoin="round">{paths}</g></svg>'
  name=key+suffix+'.svg';(base/name).write_text(svg)
  return {'file':name,'viewBox':[x0-pad,y0-pad,w,h],'paths':paths}
 p,b=line('francis daniella');horizontal=output('',[(p,0,0)],b)
 p1,b1=line('francis');p2,b2=line('daniella')
 dy=b1[3]-b2[1]+font['head'].unitsPerEm*.015
 dx=(b1[2]-b1[0])*.1
 output('-apilado',[(p1,0,0),(p2,dx,dy)],(min(b1[0],b2[0]+dx),b1[1],max(b1[2],b2[2]+dx),b2[3]+dy))
 meta.append({'key':key,'font':filename,'weight':weight,'stroke':stroke,**horizontal})
(base/'composiciones.json').write_text(json.dumps(meta))
# Pure comparison sheet, with no product mockup or styling effects.
labels=['1 · Gesto libre','2 · Trazo claro','3 · Firma compacta','4 · Inspirada en flower']
board=['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="840" viewBox="0 0 1200 840"><rect width="1200" height="840" fill="#fff"/>']
for i,item in enumerate(meta):
 x=60+(i%2)*590;y=45+(i//2)*410
 board.append(f'<text x="{x}" y="{y}" fill="#000" font-family="Arial,sans-serif" font-size="19">{labels[i]}</text>')
 view=' '.join(str(v) for v in item['viewBox'])
 board.append(f'<svg x="{x}" y="{y+45}" width="450" height="150" viewBox="{view}" preserveAspectRatio="xMinYMid meet"><g fill="#000" stroke="#000" stroke-width="{item["stroke"]}" stroke-linejoin="round">{item["paths"]}</g></svg>')
 board.append(f'<text x="{x}" y="{y+245}" fill="#000" font-family="Arial,sans-serif" font-size="13">Versión reducida · 220 px</text>')
 board.append(f'<svg x="{x}" y="{y+265}" width="220" height="70" viewBox="{view}" preserveAspectRatio="xMinYMid meet"><g fill="#000" stroke="#000" stroke-width="{item["stroke"]}" stroke-linejoin="round">{item["paths"]}</g></svg>')
board.append('</svg>');(base/'comparativa.svg').write_text(''.join(board))
print('Cuatro propuestas vectoriales horizontales y apiladas creadas.')
