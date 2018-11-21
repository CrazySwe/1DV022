---
layout: post
title:  "Humans.txt och Robots.txt"
date:   2018-11-18 20:00:00 +0100
tags: web jekyll
comments: true
---
### Vad är robots.txt ###
Robots.txt är en fil som används för att ge information till webcrawlers som hoppar runt på internet för att indexera information till sin sökmotor som t.ex. google. Denna fil säger till boten vad den borde gå in på och sånt som man inte vill att den ska gå in på. Detta betyder inte att den inte kan gå in. Detta blockerar bara "de goda" ifrån att indexera sånt som är oväsentligt för den vanliga användaren. En "ond" crawler skulle kunna använda denna för att hitta känslig information eller vägar till inloggningsidor för administratörer.  
Det bästa isåfall är att blockera allt i en mapp men kanske inte specifiera fulla länken till inloggningen.
#### Konfiguration ####
Min robots.txt är till för att blockera allt.
```
User-agent: *
Disallow: /
```
### Vad är humans.txt ###
Humans.txt är en fil som man lägger i root-mappen för hemsidan som är en inofficiell fil med information om människorna bakom hemsidan. De som har byggt den och vilka som hjälpt till. Med vilka verktyg hemsidan har skapats med eller bilder som har blivit tagna och redigerade.
Man kan specifiera i stort sett vad man vill. Det finns lite riktlinjer men i stort sett handlar det endast om att ge information till upphovspersonerna bakom hemsidan.
Initiativet kommer ifrån [http://humanstxt.org](http://humanstxt.org).  
Min [robots.txt](/robots.txt).
#### Konfiguration ####
Min konfiguration är endast simpel information om sidan.
```
/* TEAM */
Artifex: Kevin Cederholm
Contact: kc222en[at]student.lnu.se
Github: crazyswe
Location: Varberg, Sweden

/* THANKS */

/* SITE */
Last Updated: 2018/11/19
Standards: HTML5, CSS3
Technology: Docker, Ruby, Jekyll
Software: Visual Studio Code
```
Min [humans.txt](/humans.txt).