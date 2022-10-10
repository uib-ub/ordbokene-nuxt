<script setup>
    import { useStore } from '~/stores/searchStore'
    const store = useStore()
    
    
    const [{ bm_pending, data: welcome_bm },  { nn_pending, data: welcome_nn }] = await Promise.all([
        useLazyAsyncData('welcome_bm', () => $fetch('https://odd.uib.no/opal/dev/bm/parameters.json')),
        useLazyAsyncData('welcome_nn', () => $fetch('https://odd.uib.no/opal/dev/nn/parameters.json'))
      ])
    
    </script>
    
    <template>
      <main class="m-lg-5 px-lg-5 py-lg-2" v-if="welcome_bm && welcome_nn">
        <div class="row">
          <div class="col-lg">
          <Article :article_id="parseInt(welcome_bm.front_article.value)" dict="bm" welcome/>
          </div>
          <div class="col-lg">
          <Article :article_id="parseInt(welcome_nn.front_article.value)" dict="nn" welcome/>
          </div>
        </div>            
      </main> 
      <main v-else class="m-lg-5 px-lg-5 py-lg-2">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
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
    