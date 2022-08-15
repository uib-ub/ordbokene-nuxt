<template>
<form class="input-group mb-3 active" :class="{active: isActive}">
<button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
  <ul class="dropdown-menu">
    <li class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
  <label class="form-check-label" for="flexRadioDefault1">
    {{$t('dicts.bm,nn')}}
  </label>
</li>
<li class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
  <label class="form-check-label" for="flexRadioDefault2">
    {{$t('dicts.bm')}}
  </label>
</li>
<li class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
  <label class="form-check-label" for="flexRadioDefault3">
    {{$t('dicts.nn')}}
  </label>
</li>
  </ul>
  <i class="bi bi-search input-group-text" aria-hidden="true"></i>
  <input type="text" class="form-control" :aria-label="$t('search_placeholder')" :placeholder="$t('search_placeholder')" v-model="searchValue">
  <button class="" @click="clearText"><i class="bi bi-x-lg" aria-hidden="true"></i></button>
</form>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    clearText() {
      this.searchValue = "";
    },
  },
};
</script>

<style scoped>
.input-group{
  border: solid 1px var(--bs-primary);
  width: 90%;
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
  padding: 0.5rem 0 0.5rem 0.5rem;
  font-size: 1.3rem;
}
</style>