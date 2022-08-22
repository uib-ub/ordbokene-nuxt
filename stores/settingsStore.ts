import { defineStore } from "pinia";

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        inflectionExpanded: false,
        inflectionNo: false,
        inflectionTableContext: false
    })
})
