import { defineStore } from "pinia";


export const useSettingsStore = defineStore('settings', {
    state: () => ({
        inflectionExpanded: ref(false),
        inflectionNo: ref(false),
        inflectionTableContext: ref(false),
        setting: useCookie('setting')
    }),
    //hydrate(state, initialState){state.inflectionExpanded = useCookie('expanded')}
    actions: {
        setCookie(){
          this.setting.value = this.inflectionExpanded.value
        }

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
