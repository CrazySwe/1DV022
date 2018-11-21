---
layout: post
title:  "Implementera Disqus i Jekyll"
date:   2018-11-19 20:00:00 +0100
tags: disqus comments jekyll
comments: true
---

### Implementera Disqus i Jekyll ###
Till att ha kommentarer på mina blog posts så valde jag [Disqus](https://disqus.com) tjänsten då den verkade enklast att implementera. Direkt efter jag skapa kontot på Disqus så fick jag även anvisningar hur jag skulle gå tillväga för att implementera det i Jekyll.  
Jag skapade en variabel i _config.yml för mitt kortnamn på Disqus:  
`Disqus_shortname: crazyswe`  
Sen fick jag lägga till  
`comments: true`  
i YAML för varje blogg-inlägg så kommentarskoden skulle skrivas ut av Jekyll vid renderingen av html-sidorna.