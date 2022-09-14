<template>
<div v-if="store.suggest_from" class="p-2 mb-4 mt-3" :key="store.suggest_from">
    <h2>{{$t('notifications.similar')}}</h2>
    <ul class="nav nav-pills flex-column flex-md-row gap-3 pt-2" >
        <li class="nav-item" v-for="(item, idx) in suggestions" :key="idx">
            <NuxtLink class="nav-link btn btn-outline-primary" :to="suggest_link(item[0])"><BootstrapIcon icon="bi-search"/> <span class="link-content">{{item[0]}}</span></NuxtLink>
        </li>
    </ul>
</div>
</template>

<script setup>

import { useStore } from '~/stores/searchStore'
const store = useStore()

const suggest_link = (suggestion) => {
    if (store.advanced) {
        let url = `/${store.dict}/submit?q=${suggestion}&scope=${store.scope}`
        if (store.pos) {
            url = url + '&pos=' + store.pos
        }
        return url + "&suggestion=true"
    }
    else {
        return "submit?q="+suggestion + "&suggestion=true"
    }
}

const suggestions = computed(() => {
    console.log("FILTER SUGGESTIONS")
    let assembled = []
    let seen = new Set()

    if (store.suggest.a.inflect) {
        store.suggest.a.inflect.forEach(item => {
            if (store.suggest_from != item[0]) {
                assembled.push(item)
                seen.add(item[0])
            }
        })
    }

    if (store.suggest.a.exact) {
        store.suggest.a.exact.forEach(item => {
            if (!seen.has(item[0])
            && store.suggest_from != item[0]
            && (item[0].length <= store.suggest_from.length
            || (item[0].slice(0, store.suggest_from.length) != store.suggest_from && item[0] != "å "+store.suggest_from))) {
                assembled.push(item)
                seen.add(item[0])
            }
        })
    }

    if (store.suggest.a.similar) {
        store.suggest.a.similar.forEach(item => {
                if (!seen.has(item[0])) {
                assembled.push(item)
                }
        })
    }

    store.top_suggestion = assembled[0][0]

    return assembled
});



</script>

<style scoped lang="scss">

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
