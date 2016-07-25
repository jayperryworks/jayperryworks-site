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

<% partial "components/figure", :locals => { :source => "/writing/2016/01-10-andys-journal/cover.jpg" } do %>
    Test test test
<% end %>

Once he'd caught up with his jetlag and found a few minutes, Andy wrote us an email update that described a pretty great week: meeting lots of other students and professors, digging into his research, and lots of excellent-but-inexpensive beer available at picturesque sidewalk cafes. Germany was more than living up to expectations, and Andy started sending similar updates each Friday. He's an excellent writer and his emails were filled with funny stories and interesting details. The _Fritag Abend_ ("Friday Update"), as the subject line always read, became a kind of newsletter with a growing list of followers.

As a Christmas gift, I decided to print and bind all his emails in a hardcover as a momento for him. Bookbinding is a hobby of mine; I've done half a dozen blank sketchbooks and journals for myself and friends, but this would be the first time I worked with typeset pages. It'd been a few years, though, and I was rusty. I used a few online tutorials that were enormously helpful:

-  [A bookbinding tutorial](http://www.davethedesigner.net/booktut/index.html) by Dave the Designer
- [A really nice series of video tutorials](https://www.youtube.com/watch?v=8gc9wnUCfIk&list=PLHLPxhK9q222MPRhMq_jK0chDYsUn5-5u) by Sage Reynolds

### Layout and formatting

Because the content was fairly simple (running text, photos, a couple levels of subheaders), I decided to handle formatting with [Markdown](http://daringfireball.net/projects/markdown/) and I set up basic styling and page layout with [Ulysses'](http://www.ulyssesapp.com) CSS-like langage, ["Ulysses Style Sheets."](http://www.ulyssesapp.com/styles/) It took some trial and error but it worked pretty well. I was actually hoping to lay out the book with regular CSS using a markdown processor like [Marked](http://marked2app.com) (which is excellent) or [Pandocs](http://pandoc.org), but unfortunately the CSS print spec isn't quite there for what I needed to do. Ulysses' formatting language is excellent and makes slightly more complex stuff like running headers and page numbering quite simple. Its only drawback is that it's proprietary, and I'd have really preferred an open-source solution.

The hardest part, as it turned out, was handling _imposition_, or the way pages need to be ordered to appear correctly in the folded signatures. This is mathematically complex and very difficult to do by hand. On larger book projects, where I've used Adobe's [InDesign](http://www.adobe.com/products/indesign.html), this is a simple matter of checking a box on the PDF export setup. I could have done that here, too, but this time I _really_ wanted to finish an entire book using simple, inexpensive, and ideally code-based tools. I was feeling stubborn. This was the last piece of the puzzle I needed.

After lots of digging I eventually found a little Mac app called [BookLightning](https://itunes.apple.com/us/app/booklightning/id480149078?mt=12), for about $10, which worked really well. Just give it a PDF, tell it how many pages you'll have in each signature, and it spits out a new file with the correct page order.

One thing I love about web design is the fact that pretty much anybody can create a website with nothing more than a computer, an internet connection, a text editor, and some kind of FTP/SSH/Git client. In the print world, however, the tools are surprisingly less accessible despite being a much older technology. For this project, I was able to do the whole thing with roughly $100 in software (Ulysses, Book Lightning, and an image editor called [Affinity Photo](https://affinity.serif.com/en-us/photo/)). Hopefully someday it will be possible to do complex, rich page layouts with (mostly) free, open tools.

### Binding

Once I had the pages printed and set up correctly, I got to work folding and sewing signatures. This is a little terrifying when you have actual copy printed on the pages. When I've done blank notebooks, the cost of a mistake is having to cut a new sheet of paper, which is about 3 minutes and $0.30. In this book, I'd have to reprint that leaf, and I'd already burned 2 sets of ink cartridges. But I was roughly as methodical/anal with this as I imagine the techs in the engine room of a nuclear submarine are, and it paid off. No ruined pages, no midnight runs for printer ink. Yay.

There's something incredibly satisfying about folding and sewing signatures. It's a simple, methodical task, for one. You can let your mind wander a little. 

But the *really* scary, high-stakes part is 




