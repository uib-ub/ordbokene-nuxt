import { setBlockTracking } from "nuxt/dist/app/compat/capi";
import { defineStore } from "pinia";


export const useSettingsStore = defineStore('settings', () => {
    const inflectionExpanded = ref(false)
    const inflectionNo = ref(false)
    const inflectionTableContext = ref(false)
    const expanded = useCookie<boolean>('expanded')
    const no = useCookie<boolean>('no')
    const tableContext = useCookie<boolean>('tableContext')

    if(expanded.value){
        inflectionExpanded.value = expanded.value
    }
    if(no.value){
        inflectionNo.value = no.value
    }
    if(tableContext.value){
        inflectionTableContext.value = tableContext.value
    }

    watch(inflectionExpanded, () => {
        expanded.value = inflectionExpanded.value
    },
    {deep: true})
    watch(inflectionNo, () => {
        no.value = inflectionNo.value
    },
    {deep: true})
    watch(inflectionTableContext, () => {
        tableContext.value = inflectionTableContext.value
    },
    {deep: true})

    return{
        inflectionExpanded,
        inflectionNo,
        inflectionTableContext,
        expanded,
        no,
        tableContext
    }


})

//export const useSettingsStore = defineStore('settings', () => {
//const inflectionExpanded = ref(false);
//const inflectionNo = ref(false);
//const inflectionTableContext = ref(false);

//onMounted(() => {
//    if(localStorage.getItem('expanded') || localStorage.getItem('no') || localStorage.getItem('table-context')){
//        inflectionExpanded.value = JSON.parse(localStorage.getItem('expanded'))
//        inflectionNo.value = JSON.parse(localStorage.getItem('no'))
//        inflectionTableContext.value = JSON.parse(localStorage.getItem('table-context'))
//    }
//    watch(inflectionExpanded, () => {
//        localStorage.setItem('expanded', JSON.stringify(inflectionExpanded.value))
//    },
//    {deep: true})
//    watch(inflectionNo, () => {
//        localStorage.setItem('no', JSON.stringify(inflectionNo.value))
//    },
//    {deep: true})
//    watch(inflectionTableContext, () => {
//        localStorage.setItem('table-context', JSON.stringify(inflectionTableContext.value))
//    },
//    {deep: true})
//})

//return{
//    inflectionExpanded,
//    inflectionNo,
//    inflectionTableContext
//}
//})
