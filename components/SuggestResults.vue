<template>
<div v-if="suggestions" class="p-2 mb-4 mt-3">
    <h2>{{$t('notifications.similar')}}</h2>
    <ul class="nav nav-pills flex-column flex-md-row gap-3 pt-2">
        <li class="nav-item" v-for="(item, idx) in suggestions" :key="idx">
            <NuxtLink class="nav-link btn btn-outline-primary" :to="suggest_link(item[0])"><BootstrapIcon icon="bi-search" left/><span class="link-content">{{item[0]}}</span></NuxtLink>
        </li>
    </ul>
</div>
</template>

<script setup>

import { useStore } from '~/stores/searchStore'
const store = useStore()

const props = defineProps({
    suggestions: Object
})

const suggest_link = (suggestion) => {
    if (store.advanced) {
        let url = `/${store.dict}/search?q=${suggestion}&scope=${store.scope}`
        if (store.pos) {
            url = url + '&pos=' + store.pos
        }
        return url
    }
    else {
        return suggestion
    }
}


</script>

<style scoped lang="scss">
.btn:focus{
  outline: solid 1px var(--bs-primary);
}

a {
    font-size: 1.17rem;
    letter-spacing: .1rem;
}

.nav-item {
    border: solid 1px rgba(0,0,0,.5);
    border-radius: 2rem;
}

.nav-link {
  &:hover {
      .link-content {
        border-bottom: solid 1px var(--bs-link);
      }

  }
}

</style>
