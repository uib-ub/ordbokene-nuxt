<script setup>
    import { useStore } from '~/stores/searchStore'
    const store = useStore()
    
    
    const [{ bm_pending, data: welcome_bm },  { nn_pending, data: welcome_nn }] = await Promise.all([
        useLazyAsyncData('welcome_bm', () => $fetch('https://odd.uib.no/opal/dev/bm/parameters.json')),
        useLazyAsyncData('welcome_nn', () => $fetch('https://odd.uib.no/opal/dev/nn/parameters.json'))
      ])
    
    </script>
    
    <template>
      <main class="m-lg-5 px-lg-5 py-lg-2">
        <div class="row" v-if="welcome_bm && welcome_nn">
          <div class="monthly-title monthly-title mb-4"><h2 class="px-5 pb-2 pt-1 mb-0"><span class="px-md-5">{{$t('monthly')}}</span></h2></div>
          <div class="col-lg">
          <Article :article_id="parseInt(welcome_bm.front_article.value)" dict="bm"/>
          </div>
          <div class="col-lg">
          <Article :article_id="parseInt(welcome_nn.front_article.value)" dict="nn"/>
          </div>
        </div>
            <div v-else>
        <h1>WAITING</h1>
      
        </div>
      </main> 
    </template>

<style scoped>


.monthly-title {
  font-size: 1.17em;
  display: flex;
  justify-content: center;
}

.monthly-title h2 {
  background-color: var(--bs-primary);

  border-radius: 2rem;
	text-align: center;
  letter-spacing: .1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
}


</style>
    