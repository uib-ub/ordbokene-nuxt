<template>
<main class="secondary-page">
  <h2>{{$t('about')}}</h2>
  <div v-if="$i18n.locale === 'eng'">
  <p>This is the new website for the two Norwegian standard dictionaries <em>Bokmålsordboka</em> and <em>Nynorskordboka</em>. The website is still under development, so some features may not yet be in place. The content of the dictionaries is undergoing revision, and the editorial staff continuously publishes new word-articles, or articles which have been revised and quality checked.</p>
  <p>Should you wish to use the old dictionary interface, you can it here: <a href="http://www.ordbok.uib.no/">ordbok.uib.no</a></p>
  <p>In connection with the website upgrade, we have cleaned up both the interface and our data. Therefore, there may be errors and omissions in the new solution that have not yet discovered, or have had time to get sorted. Should you discover an error or a wrong or defective article, we appreciate your feedback very much! Feel free to contact us via email:</p>
	  <p><ul>
		  <li>{{$t('contact.content[2]')}}<a href="mailto:ordbok@uib.no">ordbok@uib.no</a></li>
		  <li>{{$t('contact.content[3]')}}<a href="mailto:ordbok-teknisk@uib.no">ordbok-teknisk@uib.no</a></li>
	  </ul></p>

<details>
<summary>What if I cannot find a word in the dictionary?</summary>
<p><em>Bokmålsordboka</em> and <em>Nynorskordboka</em> are medium-sized online dictionaries. The original dictionary in Bokmål contained around 65,000 articles and the Nynorsk dictionary freatured almost 90,000. After the <a href="https://www.uib.no/lle/revisjonsprosjektet">current dictionary revision</a>, it is estimated that both dictionaries will contain around 100,000 articles. The dictionaries document the central vocabulary in Norwegian – basically the most commonly occurring words in the written languages Bokmål and Nynorsk in the last 50 years that have been included. Specialised terms and terminology are only included if also used outside the field in which they have arisen.</p>
<p>The most common way to make new words in Norwegian is to compound existing words in new ways – and there are countless combination possibilities. Therefore, many compounds will not have their own articles in Bokmålsordboka and Nynorskordboka. Thus, if you do not find the Norwegian term for ‘bicycle seat’ (<em>sykkelsete</em>) as an entry in the dictionaries, it does not mean that the word does not exist or is not allowed to use. Compound words are generally only included based on the following considerations:</p>
<p><ul>
<li>when the compound is not immediately understandable from the knowledge of each individual compound element</li>
<li>so that the dictionary user confer on what other compounds with the same first element mean, based on selection of compound words included</li>
<li>to show which binding letter the composition should have (<em>skogbruk</em> (forestry), but skog<u>s</u>arbeid (forestry work); <em>sakfører</em> (lawyer), but <em>sak<u>s</u>sbehandler</em> (caseworker); <em>ost<u>e</u>klokke</em> (cheese bell), but <em>dørklokke</em> (door bell))</li>
</ul></p>
<p>Similarly, only a limited selection of derivatives (for example, verbal nouns in <em>-ing</em>) are included in the standard dictionaries. In Norwegian it is possible to form ing-forms from most verbs. Thus, you will be able to find the words <em>organisere</em> (to organise) and <em>sitere</em> (to quote, to cite) in <em>Bokmålsordboka</em> and <em>Nynorskordboka</em>, and form the derivations <em>organisering</em> (organisation) and <em>sitering</em> (quotation, citation) yourself. Note, however, that there are potential <em>ing-</em>forms that are rarely used, such as <em>komming</em> (coming) and <em>væring</em> (being).</p>
<p>The <em>Bokmålsordboka</em> and <em>Nynorskordboka</em> are not to be regarded as lists of words permitted to use in Norwegian. There are many words – old as well as new – that are not in the dictionaries. But you can use anyway. New words do not need official approval before they can be used. It is the language users who jointly decide which words are commonly used in Norwegian. Normally, new words do not enter the dictionaries until they have been in use for some time and are well-established in the language. The dictionary editors decide which words are to be included based on surveys of large text corpora, and the Norwegian Language Council decides how the words are to be spelled and inflected.</p>
<p><a href="https://www.sprakradet.no/Vi-og-vart/Publikasjoner/Spraaknytt/spraknytt-2014/Spraknytt-12014/Ord-som-finst-og-ikkje-finst/">Read more about the word selection</a> in e.g. <em>Bokmålsordboka</em> and <em>Nynorskordboka</em>.</p>
<p>If you do not find the word you are looking for, you can check the larger documentation dictionaries <a href="https://alfa.norsk-ordbok.no">Norsk Ordbok (for Nynorsk and dialect words)</a> and <a href="https://naob.no/">NAOB (for Bokmål)</a>.</p>
</details>


  </div>

  <div v-if="$i18n.locale === 'nno'">
    <p>
      Dette er den nye nettsida til standardordbøkene <em>Bokmålsordboka</em> og <em>Nynorskordboka</em>. Sida er
      framleis under utvikling, så det er visse
      funksjonar som ikkje er heilt på plass enno. Arbeidet med å revidere
      innhaldet i ordbøkene er på gang, og redaksjonen legg fortløpande ut
      ordartiklar som er reviderte og kvalitetssjekka.
    </p>
    <p>
      Dersom du vil søkje i ordbøkene med det gamle grensesnittet, finn du dei
      framleis her: <a href="http://www.ordbok.uib.no/">ordbok.uib.no</a>.
    </p>
    <p>
      I samband med oppgraderinga har vi rydda både i grensesnittet og dataa
      våre. Derfor kan det vere feil og manglar i den nye løysinga som vi ikkje
      har oppdaga enno, eller ikkje har hatt tid til å få på plass. Dersom du
      oppdagar noko som er feil eller mangelfullt, vil vi gjerne ha
      tilbakemelding om det! Kontakt oss gjerne på e-post:</p>
	  <p><ul>
		  <li>{{$t('contact.content[2]')}}<a href="mailto:ordbok@uib.no">ordbok@uib.no</a></li>
		  <li>{{$t('contact.content[3]')}}<a href="mailto:ordbok-teknisk@uib.no">ordbok-teknisk@uib.no</a></li>
	  </ul></p>

  </div>

  <div v-if="$i18n.locale === 'nob'">
      <p>Dette er den nye nettsiden til standardordbøkene <em>Bokmålsordboka</em> og <em>Nynorskordboka.</em> Siden er fortsatt under utvikling, så enkelte funksjoner er ikke på plass ennå. Arbeidet med å revidere innholdet i ordbøkene pågår, og redaksjonen legger fortløpende ut ordartikler som er revidert og kvalitetssjekket. </p>
      <p>Dersom du vil søke i ordbøkene med det gamle grensesnittet, kan du fortsatt finne dem her: <a href="https://ordbok.uib.no/">ordbok.uib.no</a></p>
      <p>I forbindelse med oppgraderingen har vi gjort en opprydding både i grensesnittet og i dataene våre. Derfor kan det være feil og mangler i den nye løsningen vi ikke har oppdaget ennå, eller ikke har hatt tid til å få på plass. Dersom du oppdager noe som er feil eller mangelfullt, vil vi gjerne ha tilbakemelding om det! Kontakt oss gjerne på e-post:</p>
		<p><ul>
		  <li>{{$t('contact.content[2]')}}<a href="mailto:ordbok@uib.no">ordbok@uib.no</a></li>
		  <li>{{$t('contact.content[3]')}}<a href="mailto:ordbok-teknisk@uib.no">ordbok-teknisk@uib.no</a></li>
	  </ul></p>

  </div>
  </main>
</template>
