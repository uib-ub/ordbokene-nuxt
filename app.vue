<template>
<div class="d-flex flex-column h-100">
      <nav role="navigation" class="navbar navbar-expand-lg navbar-dark bg-primary" id="navbar-main">
  <div class="container-fluid">
    <NuxtLink class="navbar-brand" to="/">ordbøkene.no</NuxtLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" v-bind:class="{'active': $route.name == 'help'}">
          <NuxtLink class="nav-link" aria-current="page" to="/help">{{$t('help')}}</NuxtLink>
        </li>

        <li class="nav-item" v-bind:class="{'active': $route.name == 'about'}">
          <NuxtLink class="nav-link" to="/about">{{$t('about')}}</NuxtLink>
        </li>
                <li class="nav-item" v-bind:class="{'active': $route.name == 'settings'}">
          <NuxtLink class="nav-link"  to="/settings">{{$t('settings.title')}}</NuxtLink>
        </li>
                <li class="nav-item" v-bind:class="{'active': $route.name == 'contact'}">
          <NuxtLink class="nav-link" to="/contact">{{$t('contact.title')}}</NuxtLink>
        </li>
      </ul>
      <div class="navbar-nav ml-auto">
        <div class="nav-item dropdown">
          <NuxtLink class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             <i :aria-label="$t('settings.locale.title')" class="bi bi-globe"/> {{$t('name')}}
          </NuxtLink>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><button class="dropdown-item" @click="$i18n.locale = 'eng'">English</button></li>
            <li><button class="dropdown-item" @click="$i18n.locale = 'nob'">Norsk (bokmål)</button></li>
            <li><button class="dropdown-item" @click="$i18n.locale = 'nno'">Norsk (nynorsk)</button></li>
        </ul>
        </div>
      </div>

    </div>
  </div>
</nav>

<br>
    <NuxtPage class="page-container" />


  <footer class="footer mt-auto py-3 bg-darkoter">
<div>test</div>
</footer>
  </div>
</template>


<style>
input[type="text"]:focus,input[type="radio"],.btn:focus{
  box-shadow: none;
}

html, body, #__nuxt {
  height: 100% !important;
}

.page-container, #navbar-main, footer>div {
  position: relative;
  padding-left: calc((100vw - 1200px) / 2);
  padding-right: calc((100vw - 1200px) / 2);
  
}

h1 {
  font-family: Inria Serif;
  color: var(--bs-primary);
  font-weight: bold;

}

.navbar {
  padding-top: 0.25rem;
}

.navbar-brand {
  font-family: Inria Serif;
  
}

.navbar-expand-lg .nav-item.active {
  border-left: 0.25rem solid var(--bs-secondary);
}

.navbar-expand-lg .nav-item {
  border-left: 0.25rem solid var(--bs-primary);
  padding-left: 0.5rem;
}


@media (min-width: 992px) {
  .navbar-expand-lg .nav-item.active {
  border-bottom: 0.25rem solid var(--bs-secondary);
  border-left: 0.25rem solid var(--bs-primary);
  padding-left: 0px;
  }

  .navbar-expand-lg .nav-item {
  padding-left: 0px;
  }


}


.navbar-expand-lg .nav-item {
  border-bottom: 0.25rem solid var(--bs-primary);
}

.navbar-brand  {
  border-bottom: 0.25rem solid var(--bs-primary);
}

footer {
  background-color: var(--bs-primary);
  color: white;
}

</style>