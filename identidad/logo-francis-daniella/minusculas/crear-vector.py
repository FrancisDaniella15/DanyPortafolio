from pathlib import Path
import sys
sys.path.insert(0,'/private/tmp/dany-logo-fonttools')
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
from html import escape
base=Path(__file__).parent
font=TTFont(base/'fuentes/Sacramento-Regular.ttf')
glyphs=font.getGlyphSet();cmap=font.getBestCmap();metrics=font['hmtx'].metrics
kern={}
if 'kern' in font:
 for table in font['kern'].kernTables:
  kern.update(table.kernTable)

def line(text):
 paths=[];x=0;bounds=[];last=None
 for ch in text:
  name=cmap[ord(ch)]
  if last is not None:x+=kern.get((last,name),0)
  pen=SVGPathPen(glyphs);bound=BoundsPen(glyphs)
  transform=(1,0,.035,-1,x,0)
  glyphs[name].draw(TransformPen(pen,transform));glyphs[name].draw(TransformPen(bound,transform))
  if bound.bounds:bounds.append(bound.bounds)
  if pen.getCommands():paths.append(pen.getCommands())
  x+=metrics[name][0]-12
  if ch==' ':x+=70
  last=name
 return ''.join(paths),(min(b[0] for b in bounds),min(b[1] for b in bounds),max(b[2] for b in bounds),max(b[3] for b in bounds))

horizontal,hb=line('francis daniella')
a,ab=line('francis');b,bb=line('daniella')
def svg(name,groups,bounds):
 x0,y0,x1,y1=bounds;pad=110
 width=x1-x0+pad*2;height=y1-y0+pad*2
 content=''.join(f'<path d="{path}" transform="translate({x},{y})"/>' for path,x,y in groups)
 result=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0-pad} {y0-pad} {width} {height}" role="img" aria-labelledby="logo-title logo-desc">
<title id="logo-title">francis daniella</title><desc id="logo-desc">Logo tipográfico manuscrito en minúsculas de Francis Daniella.</desc>
<g fill="#000000" stroke="#000000" stroke-width="14" stroke-linejoin="round" stroke-linecap="round">{content}</g></svg>'''
 (base/name).write_text(result)
 return (width,height)
svg('francis-daniella-horizontal.svg',[(horizontal,0,0)],hb)
# Tight but collision-free line spacing. The second line is slightly inset,
# echoing the natural, informal alignment of the reference.
offset_x=(ab[2]-ab[0])*.12
offset_y=ab[3]-bb[1]+90
bounds=(min(ab[0],bb[0]+offset_x),ab[1],max(ab[2],bb[2]+offset_x),bb[3]+offset_y)
svg('francis-daniella-apilado.svg',[(a,0,0),(b,offset_x,offset_y)],bounds)
print({'horizontal':hb,'linea_1':ab,'linea_2':bb,'apilado':bounds})
