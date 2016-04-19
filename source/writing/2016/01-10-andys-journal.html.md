---
title: Andy's letters
subtitle: A handmade book for my brother's travel journal
tags: 
  - bookbinding
  - design
  - layout
  - side project
color: blue
image: chart.png
published: false
---

My brother Andy went to Germany this summer as part of a research project for the engineering degree he's working on. My brother is a gearhead, talented mechanic, and a fan of stout-style beer; Germany is essentially paradise for him. This three-month trip would be his first experience living abroad, immersed in a language that he didn't speak natively (he had a few years of German classes under his belt, though). In short: there was adventure to be had.

Once he'd caught up with his jetlag and found a few minutes, Andy wrote us an email update that described a pretty great week: meeting lots of other students and professors, digging into his research, and lots of excellent-but-inexpensive beer to be had at picturesque sidewalk cafes. Germany was more than living up to expectations, and Andy started sending similar updates each Friday. He's an excellent writer, and his emails were filled with funny stories and interesting details. The _Fritag Abend_ ("Friday Update") became a kind of newsletter with a growing list of subscribers. 

As a Christmas gift, I decided to print all the emails and bind them in a hardcover as a momento for him. Bookbinding is a hobby of mine; I've done half a dozen blank sketchbooks and journals for myself and friends, but this would be the first time I worked with typeset pages. It'd been a few years, though, and I discovered I was rusty. A few online tutorials were enormously helpful:

[A bookbinding tutorial](http://www.davethedesigner.net/booktut/index.html) by Dave the Designer

[A really nice series of video tutorials](https://www.youtube.com/watch?v=8gc9wnUCfIk&list=PLHLPxhK9q222MPRhMq_jK0chDYsUn5-5u) by Sage Reynolds

### Layout and formatting

Because the content was fairly simple (running text, photos, a couple levels of subheaders), I decided to handle formatting with [Markdown](http://daringfireball.net/projects/markdown/) (a simple markup language) and I set up basic styling and page layout with [Ulysses'](http://www.ulyssesapp.com) CSS-like langage, ["Ulysses Style Sheets."](http://www.ulyssesapp.com/styles/) It took some trial and error but it worked pretty well. I was actually hoping to lay out the book with regular CSS using a markdown processor like [Marked](http://marked2app.com) (which is excellent), but unfortunately the print spec isn't quite there yet for what I needed to do. Ulysses' formatting language -- tied, unfortunately, to a proprietary application -- makes slightly more complex stuff like running headers and page numbering quite simple. 

The really hard part, it turns out, was handling _imposition_, or the way pages need to be ordered to appear correctly in the folded signatures. This is mathematically complex and very difficult to do by hand. On larger book projects, where I've used enterprise software like [Adobe's InDesign](http://www.adobe.com/products/indesign.html), this is a simple matter of checking a box on the PDF export setup. I could have done that here, too, but this time I _really_ wanted to finish an entire book project using simple, inexpensive, and ideally code-based tools. I was feeling stubborn. This was the last piece of the puzzle I needed.

Eventually I found a little Mac app called [BookLightning](https://itunes.apple.com/us/app/booklightning/id480149078?mt=12), for about $10, which worked really well. Just give it a PDF, tell it how pages in each signature, and it spits out a new file with the correct page order.

One thing I love about web design, you see, is the fact that pretty much anybody can create their own website with nothing more than a computer (or tablet), an internet connection, a text editor, and an FTP/SSH client. In print, however, (a much older technology, of course) things are surprisingly less accessible. There are open source tools available, but they only take you so far. For this project, I was able to do the whole thing with roughly $100 in software (Ulysses, Book Lightning, and an image editor called [Affinity Photo](https://affinity.serif.com/en-us/photo/)). Hopefully someday it will be possible to do complex, rich page layouts with (mostly) free, open tools.
