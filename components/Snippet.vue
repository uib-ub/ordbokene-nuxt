<template>
{{snippet}}
</template>



<script setup>
import { useStore } from '~/stores/searchStore'
const store = useStore()
const props = defineProps({
    definitions: Object,
    dict: String
})

const parse_subitems =  (explanation, text) => {
          let new_string = ""
          let old_parts = text.split(/(\$)/)
          let linkIndex = 0

          old_parts.forEach((item) => {
            if (item == '$') {
              let subitem = explanation.items[linkIndex]
              if (/^\d$/.test(subitem.text)) {
                if (subitem.type_ == "superscript") {
                new_string += "⁰¹²³⁴⁵⁶⁷⁸⁹"[parseInt(subitem.text)]
                }
                else if (subitem.type_ == "subscript") {
                  new_string += "₀₁₂₃₄₅₆₇₈₉"[parseInt(subitem.text)]
                }
              }

              else if (subitem.id) {
                new_string += store['concepts_'+props.dict][explanation.items[linkIndex].id].expansion

              }
              else if (subitem.text) {
                 if (subitem.text.includes('$')) {
                   new_string += parse_subitems(subitem, subitem.text)
                 }
                 else new_string += subitem.text
              }
              else  {
                if (explanation.items[linkIndex].lemmas) {
                new_string +=  explanation.items[linkIndex].word_form || explanation.items[linkIndex].lemmas[0].lemma
                }
              }
              linkIndex += 1
            }
            else {
              new_string += item
            }
          })
          return new_string

    }


const parse_definitions = (node) => {
    let definitionTexts = []
      try {
      node.forEach((definition) => {
        if (definition.elements) {
        if (definition.elements[0].content) {
          let new_string = parse_subitems(definition.elements[0], definition.elements[0].content)
          if (new_string.substring(new_string.length, new_string.length - 1) == ":") {
            new_string = new_string.slice(0, -1)
          }
          definitionTexts.push(new_string)

        }
        else if (definition.elements[0].elements) {
          definitionTexts.push(parse_definitions(definition.elements))
        }
      }
      })
      } catch(error) {
        console.log("snippet", error.message)
        definitionTexts = []
      }

      let snippet = definitionTexts.join("\u00A0•\u00A0")
      return snippet
    
}


const snippet = computed(() => {
    return parse_definitions(props.definitions)
    })

</script>