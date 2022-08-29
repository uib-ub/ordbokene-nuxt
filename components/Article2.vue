<template>


    <div class="article-container">
      <span v-if="vuetifysmAndDown || !$route.name || $route.name == 'lookup'" class="dict-label" role="heading" aria-level="2">{{dict_label}}</span>
      <article v-bind:class="{'expanded': !collapsed && collapsable, 'collapsable': collapsable, 'hide-label': hide_label, 'v-sheet v-card rounded-xl': !$parent.article}" v-if="article">
        <div :class="vuetifyname" v-if="!invalid">
        <Header :title_id="title_id" :lemmas="article.lemmas" :dictionary="dictionary" :article_id="article.article_id" @toggle-collapse = "toggle_collapse"/>
    
        <div class="article_content" :class="vuetifyname" v-show="!collapsed" ref="article_content">
          <section v-if="article.body.pronunciation && article.body.pronunciation.length" class="pronunciation">
            <h4>{{$t('article.headings.pronunciation', content_locale)}}</h4>
              <ul>
                <DefElement v-for="(element, index) in article.body.pronunciation" :dictionary="dictionary" :key="index" :body='element' @article-click="article_link_click" @error="article_error"/>
              </ul>
          </section>
          <section v-if="article.body.etymology && article.body.etymology.length" class="etymology">
            <h4>{{$t('article.headings.etymology', content_locale)}}</h4>
              <ul>
                <DefElement v-for="(element, index) in article.body.etymology" :dictionary="dictionary" :key="index" :body='element' @article-click="article_link_click"  @error="article_error"/>
              </ul>
          </section>
          <section class="definitions" v-if="has_content">
            <h4>{{$t('article.headings.definitions', content_locale)}}</h4>
            <ol>
              <Definition v-for="definition in article.body.definitions" :dictionary="dictionary" :level="1" :key="definition.id" :body='definition' @article-click="article_link_click"  @error="article_error"/>
            </ol>
          </section>
          <section v-if="sub_articles.length" class="expressions">
            <h4>{{$t('article.headings.expressions', content_locale)}}</h4>
            <ul>
              <SubArticle :body="subart" v-for="(subart, index) in sub_articles" :dictionary="dictionary" :key="index" @article-click="article_link_click"  @error="article_error"/>
            </ul>
          </section>
        </div>
        <ArticleFooter v-if="!collapsed" :article="article"/>
        </div>
        <div v-else><i class="bi bi-exclamation-triangle"/>{{$t('error.article', {no: article.article_id, dict: $t('dicts_inline.'+this.dictionary)})}}</div>
    </article>
    </div>
    
    
    </template>
    
    <script>
    
    export default {
        props: {
            article_id: String,
            articleLookup: Boolean,
            title_id: String,
            queryPattern: String,
        },
        async setup(props) {
            const { data: article } = await useLazyAsyncData('article', () => $fetch(`https://oda.uib.no/opal/dev/nn/article/${props.article_id}.json`))
            return {article}
      
        }
    }
    </script>
    