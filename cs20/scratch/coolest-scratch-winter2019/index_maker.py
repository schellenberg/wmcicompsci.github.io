""" Build index from directory listing

make_index.py </path/to/directory> [--header <header text>]
"""

INDEX_TEMPLATE = r"""
<html>
<body>
<h2>${header}</h2>
<p>
% for name in names:
    <li><a href="${name}">${name}</a></li>
% endfor
</p>
</body>
</html>
"""

EXCLUDED = ['index.html', 'index_maker.py', '.git', '.gitattributes', 'LICENSE', 'README.md', 'CNAME']

import os
import datetime
import argparse

# May need to do "pip install mako"
from mako.template import Template

def modification_date(filename):
    t = os.path.getmtime(filename)
    return datetime.datetime.fromtimestamp(t)

def main():
##    only needed if running this from command line...
##    parser = argparse.ArgumentParser()
##    parser.add_argument("directory")
##    parser.add_argument("--header")
##    args = parser.parse_args()
    
    dir_path = os.path.dirname(os.path.realpath("__file__"))
    fnames = [fname for fname in sorted(os.listdir(dir_path), key=modification_date, reverse=True)
              if fname not in EXCLUDED]
    header = "Short Story Assignments"
    with open("index.html", "w") as text_file:
        print(Template(INDEX_TEMPLATE).render(names=fnames, header=header), file=text_file)


if __name__ == '__main__':
    main()