<script setup>
    import { useStore } from '~/stores/searchStore'
    const store = useStore()
    
    
    const [{ bm_pending, data: welcome_bm },  { nn_pending, data: welcome_nn }] = await Promise.all([
        useLazyAsyncData('welcome_bm', () => $fetch(store.endpoint + 'bm/parameters.json')),
        useLazyAsyncData('welcome_nn', () => $fetch(store.endpoint + '/nn/parameters.json'))
      ])
    
    </script>
    
    <template>
      
      <div class="inline-grid grid-cols-2 lg:px-5 lg:py-2 align-center h-3/5 pb-5" v-if="welcome_bm && welcome_nn">
        
        
          <section class="lg:col-auto px-0lg:p-3">
          <Article :article_id="parseInt(welcome_bm.front_article.value)" dict="bm" welcome/>
          </section>
          <section class="lg:col-auto px-0lg:p-3">
          <Article :article_id="parseInt(welcome_nn.front_article.value)" dict="nn" welcome/>
          </section>
                  
      </div> 
      <div v-else class="row justifycenter  align-items-center h-50">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading</span>
        </div>


      </div> 
    </template>

<style scoped>


.monthly-title {
  font-size: 1.17em;
  display: flex;
  justify-content: center;
}

.monthly-title h2 {
  @apply bg-primary;

  border-radius: 2rem;
	text-align: center;
  letter-spacing: .1rem;
  font-size: 1.25rem;
  font-weight: 600;
  @apply text-white;
}

</style>
    