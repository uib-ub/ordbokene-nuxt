<template>
<form class="input-group active">
<select class="dropdown-toggle btn btn-outline-primary" v-model="searchStore.$state.dict">
  <option v-for="(item, idx) in  ['bm,nn', 'bm', 'nn']" :key="idx" :value="item">{{$t(`dicts.${item}`)}}</option>
</select>
<!--<button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
  <ul class="dropdown-menu">
    <li class="form-check" v-for="(item, idx) in ['bm,nn', 'bm', 'nn']" :key="idx">
      <button class="btn"><NuxtLink :to="item">{{$t(`dicts.${item}`)}}</NuxtLink></button>
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" :value="$t(`dicts.${item}`)" v-model="searchStore.$state.dict">
</li>
  </ul>-->
  <i class="bi bi-search input-group-text" aria-hidden="true"></i>
  <input type="text" class="form-control" :aria-label="$t('search_placeholder')" :placeholder="$t('search_placeholder')" v-model="searchStore.q">
  <button class="clear btn" @click.prevent="clearText"><i class="bi bi-x-lg" aria-hidden="true"></i></button>
  <Autocomplete/>
</form>
</template>

<script>
import { useSearchStore } from '~/stores/searchStore'

export default defineComponent({
  setup() {
    const searchStore = useSearchStore()
    return { searchStore }
  },
methods: {
    clearText() {
      this.searchStore.q = ""
    },
  },
});
</script>

<style scoped>
input[type="text"]:focus,input[type="radio"],.btn:focus{
  box-shadow: none;
}
.dropdown-menu{
  padding: 0.5rem;
  border-color: var(--bs-primary);
  box-shadow: 2px 2px 1px var(--bs-primary);
  margin-top: 0.4rem !important;
}
.form-check-input:checked{
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
}
.clear.btn{
  background: transparent;
  border-radius: 0 2rem 2rem 0;
}
.clear.btn:hover{
  border: transparent;
  transition: none;
}
.input-group{
  outline: solid 1px var(--bs-primary);
  width: 95%;
  margin: 0 auto;
  border-radius: 2rem;
  background-color: white;
}
.active:focus-within{
box-shadow: 2px 2px 1px var(--bs-primary);
}
.btn-outline-primary{
  border: none;
  border-right: solid 1px var(--bs-primary);
}
.btn{
  border-radius: 2rem 0 0 2rem;
}
.btn:hover,.btn:focus{
  background-color: white;
  color: var(--bs-primary);
}
option:hover,option:focus{
  background-color: var(--bs-primary) !important;
  color: white !important;
}
.form-control{
  border: none;
  border-radius: 0 2rem 2rem 0;
  height: 40px;
  background-color: white;
}
.input-group-text{
  color: var(--bs-primary);
  background-color: transparent;
  border: none;
  border-radius: 0;
  padding: 0.3rem 0 0.3rem 0.5rem;
  font-size: 1.3rem;
}
</style>