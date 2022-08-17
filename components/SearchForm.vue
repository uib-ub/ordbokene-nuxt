<template>
<form class="input-group active" :class="{active: isActive}">
{{searchStore.$state.dict}}
<select class="dropdown-toggle" v-model="searchStore.$state.dict">
  <option v-for="(item, idx) in  ['bm,nn', 'bm', 'nn']" :key="idx">{{item}}</option>
</select>
<button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
  <ul class="dropdown-menu">
    <li class="form-check" v-for="(item, idx) in ['bm,nn', 'bm', 'nn']" :key="idx">
      <button class="btn"><NuxtLink :to="item">{{$t(`dicts.${item}`)}}</NuxtLink></button>
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" :value="$t(`dicts.${item}`)">
</li>
  </ul>
  <i class="bi bi-search input-group-text" aria-hidden="true"></i>
  <input type="text" class="form-control" :aria-label="$t('search_placeholder')" :placeholder="$t('search_placeholder')" v-model="searchValue">
  <button class="clear btn" @click="clearText"><i class="bi bi-x-lg" aria-hidden="true"></i></button>
  <ul>
    <li></li>
  </ul>
</form>
</template>

<script>
import { useSearchStore } from '~/stores/searchStore'

export default defineComponent({
  setup() {
    const searchStore = useSearchStore()
    //const filtersList = filtersStore.filtersList

    return { searchStore }
  },
  
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    clearText() {
      this.searchValue = "";
    },
    params: {
      q: this.searchValue, 
      dict: "nn", 
      include: "e"
      },
//    async setup(props) {
//      const {data: words} = await useFetch(`https://ord.uib.no/api/suggest?${this.params}`)
//      return {words}
//    },
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