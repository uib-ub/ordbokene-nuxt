<template>
<main class="secondary-page">
  <h2>{{$t('about')}}</h2>
  <div v-if="$i18n.locale === 'eng'">
  <p>This is the new website for the two Norwegian standard dictionaries <em>Bokmålsordboka</em> and <em>Nynorskordboka</em>. The website is still under development, so some features may not yet be in place. The content of the dictionaries is undergoing revision, and the editorial staff continuously publishes new word-articles, or articles which have been revised and quality checked.</p>
  <p>Should you wish to use the old dictionary interface, you can it here: <a href="http://www.ordbok.uib.no/">ordbok.uib.no</a></p>
  <p>In connection with the website upgrade, we have cleaned up both the interface and our data. Therefore, there may be errors and omissions in the new solution that have not yet discovered, or have had time to get sorted. Should you discover an error or a wrong or defective article, we appreciate your feedback very much! Feel free to contact us via email:</p>
	  <p><ul class="bullet">
		  <li>{{$t('contact.content[2]')}}<a href="mailto:ordbok@uib.no">ordbok@uib.no</a></li>
		  <li>{{$t('contact.content[3]')}}<a href="mailto:ordbok-teknisk@uib.no">ordbok-teknisk@uib.no</a></li>
	  </ul></p>

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
	  <p><ul class="bullet">
		  <li>{{$t('contact.content[2]')}}<a href="mailto:ordbok@uib.no">ordbok@uib.no</a></li>
		  <li>{{$t('contact.content[3]')}}<a href="mailto:ordbok-teknisk@uib.no">ordbok-teknisk@uib.no</a></li>
	  </ul></p>

  </div>

  <div v-if="$i18n.locale === 'nob'">
      <p>Dette er den nye nettsiden til standardordbøkene <em>Bokmålsordboka</em> og <em>Nynorskordboka.</em> Siden er fortsatt under utvikling, så enkelte funksjoner er ikke på plass ennå. Arbeidet med å revidere innholdet i ordbøkene pågår, og redaksjonen legger fortløpende ut ordartikler som er revidert og kvalitetssjekket. </p>
      <p>Dersom du vil søke i ordbøkene med det gamle grensesnittet, kan du fortsatt finne dem her: <a href="https://ordbok.uib.no/">ordbok.uib.no</a></p>
      <p>I forbindelse med oppgraderingen har vi gjort en opprydding både i grensesnittet og i dataene våre. Derfor kan det være feil og mangler i den nye løsningen vi ikke har oppdaget ennå, eller ikke har hatt tid til å få på plass. Dersom du oppdager noe som er feil eller mangelfullt, vil vi gjerne ha tilbakemelding om det! Kontakt oss gjerne på e-post:</p>
		<p><ul class="bullet">
		  <li>{{$t('contact.content[2]')}}<a href="mailto:ordbok@uib.no">ordbok@uib.no</a></li>
		  <li>{{$t('contact.content[3]')}}<a href="mailto:ordbok-teknisk@uib.no">ordbok-teknisk@uib.no</a></li>
	  </ul></p>

  </div>
  </main>
</template>
