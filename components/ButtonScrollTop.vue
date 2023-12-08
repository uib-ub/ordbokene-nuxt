<template>
    <a
      v-if="displayButton"
      href="#main"
      role="button"
      class="fixed bottom-4 right-4 rounded border bg-white text-primary shadow-md p-1 xl:bottom-8 xl:right-8"
      :aria-label="$t('to_top')"
      :title="$t('to_top')"
      @click.prevent="scrollToTop()">
      <BiArrowUpShort class="text-2xl xl:text-4xl"/>
    </a>
  </template>
  
  <script setup>
  // Based on component in termportalen
  const displayButton = ref(false);
  const input_element = useState('input_element')
  
  function scrollToTop() {
    window.scrollTo(0, 0);
    input_element.value.select()
  }
  
  onMounted(() => {
    let tick = false;
    window.addEventListener("scroll", () => {
      if (!tick) {
        setTimeout(function () {
          if (window.pageYOffset > 290) {
            displayButton.value = true;
          } else {
            displayButton.value = false;
          }
          tick = false;
        }, 100);
      }
      tick = true;
    });
  });
  </script>