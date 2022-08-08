<template>
<div>
  <h1>Search</h1>
  <NuxtLink to="/">
    Index page
  </NuxtLink>
  <br>
  {{$route.params}}
  {{$route.query}}
</div>
</template>
