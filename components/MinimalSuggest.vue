<template>
   <div class="mb-10 mx-2">
    <SuggestResults v-if="!pending && data.length" :minimal="true" :dict="dict" :suggestions="data"><h3>{{$t('notifications.similar')}}</h3></SuggestResults>
    <div v-if="!pending && !data.length" class="callout pt-0 my-0">
        <h3><BiInfoCircleFill class="mr-3 mb-1"/>{{$t('notifications.no_results.title', 1, {locale: scoped_locale})}}</h3>
        <p>
            <i18n-t keypath="notifications.no_results.description[0]" :locale="scoped_locale">
                <template #dict>
                    <em>{{$t('dicts.'+dict)}}</em>.
                </template>
            </i18n-t>
        </p>
        <p v-if="store.q.length > 10" class="my-2">{{$t('notifications.no_results.description[1]', 1, {locale: scoped_locale})}}
            <NuxtLink :to="`/${$i18n.locale}/about/missing-word`">{{$t('notifications.no_results.link', 1, {locale: scoped_locale})}}</NuxtLink>
        </p>
    </div>
  </div>

</template>

<script setup>
import { useSearchStore } from '~/stores/searchStore'
import { useSessionStore } from '~/stores/sessionStore'
const store = useSearchStore()
const session = useSessionStore()
const route = useRoute()

const props = defineProps({
    dict: String,
    scoped_locale: String
})

const query = `${session.endpoint}api/suggest?&q=${store.q}&dict=${props.dict}${route.query.pos ? '&wc=' + route.query.pos : ''}&n=8&dform=int&meta=n&include=s`
const { data, error, pending } = useFetch(query, {key: query,
                                    transform: response => {
                                        if (response.a && response.a.similar) {
                                            return response.a.similar.filter(item => item[0] !== "-"
                                                                                    && item[0].slice(-1) !== '-' ).map(pair => pair[0])
                                        }
                                        else {
                                            useTrackEvent('no_suggestions_advanced', {props: {query: props.dict + "/" + store.q}})
                                            return []
                                            
                                        }
                                    }})


if (error.value && session.endpoint === "https://oda.uib.no/opal/prod/`") {
  session.endpoint = `https://odd.uib.no/opal/prod/`
  console.log("ERROR", error.value)
  refresh()
}

</script>