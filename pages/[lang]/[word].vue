<template>
<div>
  <h1>Word</h1>
  <SearchForm/>
  <NuxtLink to="/">
    Index page
  </NuxtLink>
  <br>
  {{$route.params}}
  {{$route.query}}
</div>
</template>