<template>
<main class="secondary-page">
  <h2>{{$t('contact.title')}}</h2>
  <div>
    <h3>{{$t('contact.content[0]')}}</h3>
    <p>{{$t('contact.content[2]')}} <a href="mailto:ordbok@uib.no">ordbok@uib.no</a></p>
    <h3>{{$t('contact.content[1]')}}</h3>
    <p>{{$t('contact.content[3]')}} <span style="white-space: nowrap;"><a href="mailto:ordbok-teknisk@uib.no">ordbok-teknisk@uib.no</a></span></p>
  </div>
  <div><h3>{{$t('contact.faq.title')}}</h3></div>
  <div class="accordion accordion-flush">
  <div class="accordion-item">
    <h3 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        {{$t('contact.faq.items[0].title')}}
      </button>
    </h3>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body"><p><em>Bokmålsordboka</em>{{$t('and')}}<em>Nynorskordboka</em>{{$t('contact.faq.items[0].text[0]')}}<router-link to="/om" @click="$emit('close')">{{$t('contact.faq.items[0].text[1]')}}</router-link></p></div>
    </div>
  </div>
  <div class="accordion-item">
    <h3 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        {{$t('contact.faq.items[1].title')}}
      </button>
    </h3>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">{{$t('contact.faq.items[1].text')}}</div>
    </div>
  </div>
  <div class="accordion-item">
    <h3 class="accordion-header" id="flush-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        {{$t('contact.faq.items[2].title')}}
      </button>
    </h3>
    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">{{$t('contact.faq.items[2].text')}}</div>
    </div>
  </div>
</div>
</main>
</template>

<style scoped>
.accordion{
  background-color: white;
}
.accordion-button:after {
    order: -1;
    margin-left: 0; 
    margin-right:0.5em;
    color: var(--bs-primary);
}
</style>
