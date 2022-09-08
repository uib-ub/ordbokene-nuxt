<template>
    <li class="compound_list">
      <ul>
        <DefElement :body="body.intro" v-if="body.intro" :dictionary="dictionary" />
        <li
          :key="index"
          v-for="(item, index) in body.elements"
          >{{' '}}<NuxtLink
            :to="'/' + dictionary + '/' + item.article_id + (item.definition_id ? '#def'+item.definition_id : '')"
            @click="link_click(item)"
            >{{item.lemmas[0].lemma}}</NuxtLink>
        </li>
      </ul>
    </li>
  </template>
<script setup>

const props = defineProps({
    body: Object,
    dict: String
})

const emit = defineEmits(['link-click'])
const link_click = (event) => {
    emit('link-click', event)
}

</script>

<style scoped>

li.compound_list ul li {
    display: inline;
  }

  li.compound_list li:not(:last-child):not(:first-child):after {
    content: ",";
  }

  ul {
    padding-left: 0px !important;
  }
</style>
    