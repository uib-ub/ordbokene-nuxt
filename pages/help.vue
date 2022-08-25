<template>
<main class="secondary-page">
  <h2>Help</h2>
<div>
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


  </main>
</template>
