import { defineStore } from "pinia";


export const useSettingsStore = defineStore('settings', () => {
    const inflectionExpanded = ref(false)
    const inflectionNo = ref(false)
    const inflectionTableContext = ref(false)
    const listView = ref(false)

    const expanded = useCookie<boolean>('expanded')
    const no = useCookie<boolean>('no')
    const tableContext = useCookie<boolean>('tableContext')
    const listViewCookie = useCookie<boolean>('listView')

    if(expanded.value){
        inflectionExpanded.value = expanded.value
    }
    if(no.value){
        inflectionNo.value = no.value
    }
    if(tableContext.value){
        inflectionTableContext.value = tableContext.value
    }
    if(listViewCookie.value){
        listView.value = listViewCookie.value
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
    watch(listView, () => {
        listViewCookie.value = listView.value
    },
    {deep: true})

    return{
        inflectionExpanded,
        inflectionNo,
        inflectionTableContext,
        listView,
        expanded,
        no,
        tableContext,
        listViewCookie

    }


})
