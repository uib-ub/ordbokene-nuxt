<script setup>
    import { useStore } from '~/stores/searchStore'
    const store = useStore()
    
    
    const [{ bm_pending, data: welcome_bm },  { nn_pending, data: welcome_nn }] = await Promise.all([
        useLazyAsyncData('welcome_bm', () => $fetch(store.endpoint + 'bm/parameters.json')),
        useLazyAsyncData('welcome_nn', () => $fetch(store.endpoint + '/nn/parameters.json'))
      ])
    
    </script>
    
    <template>
      
      <div class="row px-lg-5 py-lg-2 align-items-center h-75 pb-5" v-if="welcome_bm && welcome_nn">
        <div class="row m-0 align-items-top">
          <section class="col-lg px-0 p-lg-3">
          <Article :article_id="parseInt(welcome_bm.front_article.value)" dict="bm" welcome/>
          </section>
          <section class="col-lg px-0 p-lg-3">
          <Article :article_id="parseInt(welcome_nn.front_article.value)" dict="nn" welcome/>
          </section>
        </div>            
      </div> 
      <div v-else class="row justify-content-center  align-items-center h-50">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
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
  background-color: var(--bs-primary);

  border-radius: 2rem;
	text-align: center;
  letter-spacing: .1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--bs-white);
}

</style>
    