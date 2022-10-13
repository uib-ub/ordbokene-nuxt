<template>
<main class="secondary-page">
  <h2>{{$t('help')}}</h2>
<div v-if="$i18n.locale === 'eng'">
  <p>Search the website by entering a word, press <kbd>return</kbd> or pick a search suggestion in the drop-down menu. Press <kbd>/</kbd> whenever you want to jump back to the search box.
    The heading of each search result is a link to a lookup page for the article in question. If you get no more than one result in each dictionary, the entire article is shown in the list of results, and you won't need to click the link. If there are more resutls, you may expand the article content in the results list by clicking "Show article" at the bottom of the result item. You can make the articles expand by default in the settings below.
    </p><p>
    The dictionary from which to get search results depends on the dictionary selected, and if the word is used in both written languages. Currently, the two dictionaries are not linked at word level. Thus a ‘Did you mean’ function has been developed. The hope is that this function will be helpful in finding the right words in both Bokmål and Nynorsk. It is possible to search for fixed expressions, e.g.
    <em>gi katten i</em> (not give a damn). It is also possible to find such expressions at the end of each article or the articles they are linked to. When typing a single word in the search field, the drop-down menu also shows the common expressions the word is part of.
</p>
<h3>Wildcard search</h3>
<p>If unsure of the spelling of a word or want results from more than one article, it is possible to use <kbd>%</kbd> and <kbd>*</kbd> to replace zero, one or more characters.
Underscore (<kbd>_</kbd>) replaces only one character. You may use the wilcard symbols multiple times in your search expression.</p>

Examples:
<p>The search query “<a href="https://ordbokene.no/bm,nn/search?q=arbeid%2ar&scope=ei">arbeid*r</a>”, will result in results in the drop-down menu with “arbeider” (worker) in the Bokmål dictionary and “arbeidar” (worker) in the Nynorsk Dictionary.</p>
<p>The search query “<a href="https://ordbokene.no/bm,nn/search?q=inter%25es%25ant&scope=ei">inter%es%ant</a>” returns the result “interessant” (interesting) in both dictionaries. </p>
<p>The search query “<a href="https://ordbokene.no/bm,nn/search?q=f%C3%B8rsk%25l%C3%A6r_r&scope=ei">førsk%lær_r</a>” gives resutls for “førskolelærer” (pre-school teacher) in the Bokmål dictionary and “førskolelærar/førskulelærar” (pre-school teacher) in the Nynorsk dictionary.</p>
<p>The search query «<a href="https://ordbokene.no/bm,nn/search?q=ku__&scope=e">ku__</a>» returns four letter words starting with «ku».</p>

<h3>Combine search terms</h3>
<p>The symbol <kbd>|</kbd> allows you to use in several search words at the same time. You can also combine search words that contain wildcard symbols.</p>

Examples:
<p>The search “<a href="https://ordbokene.no/bm,nn/search?q=kj%C3%A6rlighet%7Ckj%C3%A6rleik&scope=ei">kjærlighet|kjærleik</a>” yields the result “kjærlighet” in the Bokmål dictionary and “kjærleik” (love) in the Nynorsk dictionary.</p>
<p>Søket “<a href="https://ordbokene.no/bm,nn/search?q=undervis_r%7Cl%C3%A6r_r&scope=ei">undervis_r|lær_r</a>” results in “underviser” (teacher) and “lærer” (teacher) in the Bokmål dictionary and “undervisar” and “lærar” in the Nynorsk dictionary.</p>
  </div>

<div  v-if="$i18n.locale === 'nob'">
  <p>Du søker ved å skrive inn ordet og trykke på returtasten (<kbd>enter</kbd>) eller velge et søkeforslag i nedtrekksmenyen. Tast <kbd>Shift</kbd>+<kbd>7</kbd> hvis du vil hoppe tilbake til søkefeltet etter å ha søkt.
  Overskriften i toppen av hvert søketreff er en lenke til en ny artikkelside for det aktuelle ordet. Hvis du ikke får mer enn ett treff i hver ordbok, vises hele artikkelen i resultatlisten, og du trenger ikke trykke på lenken. Er det flere treff, kan du også vise artikkelinnholdet i resultatlisten ved å trykke på "Vis artikkel" i bunnen av søketreffet. Se innstillingene nedenfor hvis du ønsker at resultatlisten alltid skal vise fullstendige artikler.</p>
  <p>Hvilken ordbok du får treff i, avhenger av hvilken ordbok du har valgt å søke i, og om ordet blir brukt i begge skriftspråkene. Det ligger per i dag ikke inne koblinger mellom ordbøkene, men vi har utviklet en mente-du-funksjon, som vi håper blir til hjelp for å finne de riktige ordene både i bokmål og nynorsk.</p>
  <p>Du kan søke direkte på faste uttrykk, f.eks. <em>gi katten i</em>. Alternativt finner du uttrykkene samlet til slutt i artikkelen eller artiklene de er knyttet til. Når du skriver inn et enkelt ord i søkefeltet, viser nedtrekksmenyen også de faste uttrykkene som ordet inngår i.</p>
  
  <h3>Søk med jokertegn</h3>
  <p>Dersom du er usikker på skrivemåten av et ord eller ønsker treff i mer enn én artikkel, kan du bruke <kbd>%</kbd> og <kbd>*</kbd> for å få treff på null, ett eller flere tegn. 
  Symbolet <kbd>_</kbd> erstatter kun ett tegn. Du kan plassere jokertegnene flere steder i søkeordet.</p>

Eksempler:
<p>Søker du på «<a href="https://ordbokene.no/bm,nn/search?q=arbeid%2ar&scope=ei">arbeid*r</a>», er de første treffene i nedtrekksmenyen «arbeider» i <em>Bokmålsordboka</em> og «arbeidar» i <em>Nynorskordboka</em>.</p>
<p>Søket «<a href="https://ordbokene.no/bm,nn/search?q=inter%25es%25ant&scope=ei">inter%es%ant</a>» gir treff på «interessant» i begge ordbøkene. </p>
<p>Søket «<a href="https://ordbokene.no/bm,nn/search?q=f%C3%B8rsk%25l%C3%A6r_r&scope=ei">førsk%lær_r</a>» gir treff på «førskolelærer» i <em>Bokmålsordboka</em> og «førskolelærar/førskulelærar» i <em>Nynorskordboka</em>.</p>
<p>Søket «<a href="https://ordbokene.no/bm,nn/search?q=ku__&scope=e">ku__</a>» gir treff på ord på fire bokstaver som begynner med «ku».</p>

<h3>Kombiner søkeord</h3>
<p>Symbolet <kbd>|</kbd> gjør det mulig å søke med flere søkeord samtidig. Det er også mulig å kombinere søkeord som inneholder jokertegn.</p>

Eksempler:
<p>Søket «<a href="https://ordbokene.no/bm,nn/search?q=kj%C3%A6rlighet%7Ckj%C3%A6rleik&scope=ei">kjærlighet|kjærleik</a>» gir treff på «kjærlighet» i <em>Bokmålsordboka</em> og «kjærleik» i <em>Nynorskordboka</em>.</p>
<p>Søket «<a href="https://ordbokene.no/bm,nn/search?q=undervis_r%7Cl%C3%A6r_r&scope=ei">undervis_r|lær_r</a>» gir treff på «underviser» og «lærer» i <em>Bokmålsordboka</em> og «undervisar» og «lærar» i <em>Nynorskordboka</em>.</p>
</div>


<div  v-if="$i18n.locale === 'nno'">
  <p>Du søkjer ved å skrive inn ordet og trykkje på returtasten (<kbd>enter</kbd>) eller velje eit søkjeforslag i nedtrekksmenyen. Tast <kbd>Shift</kbd>+<kbd>7</kbd> dersom du vil hoppa tilbake til søkjefeltet etter å ha søkt.
  Overskrifta i toppen av kvart søkjetreff er ei lenkje til ei ny artikkelside for det aktuelle ordet. Om du ikkje får meir enn eitt treff i kvar ordbok, viser heile artikkelen i resultatlista, og du treng ikkje trykkje på lenkja. Er det fleire treff, kan du òg sjå artikkelinnhaldet i resultatlista ved å trykkje på "Vis artikkel" i botnen av søkjetreffet. Sjå innstillingane nedanfor om du ønskjer at resultatlista alltid skal vise fullstendige artiklar.
    </p><p>
    Kva ordbok du får treff i, avheng av kva ordbok du har valt å søkje i, og om ordet blir brukt i begge skriftspråka. Det ligg per i dag ikkje inne koplingar mellom ordbøkene, men vi har utvikla ein meinte-du-funksjon, som vi håpar blir til hjelp for å finne dei riktige orda både i bokmål og nynorsk.</p>
    <p>Du kan søkje direkte på faste uttrykk, t.d. <em>gi katten i</em>. Alternativt finn du uttrykka samla til slutt i artikkelen eller artiklane dei er knytte til. Når du skriv inn eit enkelt ord i søkjefeltet, viser nedtrekksmenyen òg dei faste uttrykka som ordet er ein del av.</p>
<h3>Søk med jokerteikn</h3>
<p>Dersom du er usikker på skrivemåten av eit ord eller ønskjer treff i meir
        enn éin artikkel, kan du bruke <kbd>%</kbd> og <kbd>*</kbd> for å få treff på null, eitt eller fleire teikn.
Symbolet <kbd>_</kbd> erstattar berre eitt teikn. Du kan plassere jokerteikna fleire stader i søkjeordet.</p>

Døme:
<p>Søkjer du på «<a href="https://ordbokene.no/bm,nn/search?q=arbeid%2ar&scope=ei">arbeid*r</a>», er dei første treffa i nedtrekksmenyen «arbeider» i <em>Bokmålsordboka</em> og «arbeidar» i <em>Nynorskordboka</em>.</p>
<p>Søket «<a href="https://ordbokene.no/bm,nn/search?q=inter%25es%25ant&scope=ei">inter%es%ant</a>» gjev treff på «interessant» i begge ordbøkene. </p>
<p>Søket «<a href="https://ordbokene.no/bm,nn/search?q=f%C3%B8rsk%25l%C3%A6r_r&scope=ei">førsk%lær_r</a>» gjev treff på «førskolelærer» i <em>Bokmålsordboka</em> og «førskolelærar/førskulelærar» i <em>Nynorskordboka</em>.</p>
<p>Søket «<a href="https://ordbokene.no/bm,nn/search?q=ku__&scope=e">ku__</a>» gjev treff på ord på fire bokstavar som startar på «ku».</p>

<h3>Kombiner søkjeord</h3>
<p>Symbolet <kbd>|</kbd> gjer det mogleg å søkje med fleire søkjeord samtidig. Det er òg mogleg å kombinere søkjeord som inneheld jokerteikn.</p>

Døme:
<p>Søket «<a href="https://ordbokene.no/bm,nn/search?q=kj%C3%A6rlighet%7Ckj%C3%A6rleik&scope=ei">kjærlighet|kjærleik</a>» gjev treff på «kjærlighet» i <em>Bokmålsordboka</em> og «kjærleik» i <em>Nynorskordboka</em>.</p>
<p>Søket «<a href="https://ordbokene.no/bm,nn/search?q=undervis_r%7Cl%C3%A6r_r&scope=ei">undervis_r|lær_r</a>» gjev treff på «underviser» og «lærer» i <em>Bokmålsordboka</em> og «undervisar» og «lærar» i <em>Nynorskordboka</em>.</p>
</div>



  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('help')
  })
</script>
