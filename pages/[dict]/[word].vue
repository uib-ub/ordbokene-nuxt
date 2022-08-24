<template>
<div>
  <SearchForm/>
  <NuxtLink to="/">
    Index page
  </NuxtLink>
  <br>
  {{$route.params}}
  {{$route.query}}
</div>
</template>