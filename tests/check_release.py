from pathlib import Path
from html.parser import HTMLParser
import subprocess,tempfile,json
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.scripts=[];self.current=None
 def handle_starttag(self,t,a):
  a=dict(a)
  if t in ('a','script','img','link'):
   u=a.get('src') or a.get('href')
   if u:self.links.append(u)
  if t=='script' and not a.get('src'):self.current=''
 def handle_data(self,s):
  if self.current is not None:self.current+=s
 def handle_endtag(self,t):
  if t=='script' and self.current is not None:self.scripts.append(self.current);self.current=None
r=Path('.');n=0;pages={}
for p in r.rglob('*.html'):
 s=Parser();s.feed(p.read_text());pages[str(p.relative_to(r))]=s.scripts
 for u in s.links:
  if ':' in u or u.startswith('#'):continue
  assert (p.parent/u.split('#')[0].split('?')[0]).exists(),(p,u)
 for script in s.scripts:
  with tempfile.NamedTemporaryFile(suffix='.js',mode='w') as f:
   f.write(script);f.flush();subprocess.run(['node','--check',f.name],check=True,capture_output=True);n+=1
for p in r.rglob('*.js'):subprocess.run(['node','--check',str(p)],check=True,capture_output=True);n+=1

print('PASS all 13 HTML local links/assets and',n,'JS syntax checks')
