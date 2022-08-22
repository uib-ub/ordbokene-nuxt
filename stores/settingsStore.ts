import { defineStore } from "pinia";

export const useSettingsStore = defineStore('settings', () => {
    const inflectionExpanded = ref(false);
    const inflectionNo = ref(false);
    const inflectionTableContext = ref(false);

        onMounted(() => {
            watch(inflectionExpanded, (state) => {
                console.log('hei')
                localStorage.setItem('settings-state', JSON.stringify(state))
              }) 
        })
})
