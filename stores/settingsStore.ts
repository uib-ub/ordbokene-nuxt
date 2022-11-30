import { defineStore } from "pinia";

export const useSettingsStore = defineStore('settings', () => {

    const checkLocalstorage = (key: string, defaultValue: any) => {
        if (process.client) {
            try {
                let stored = localStorage.getItem(key)
                if (stored) {
                    return ref(typeof defaultValue === 'boolean' ?  stored == 'true' : stored)
                }
                else {
                    localStorage.setItem(key, defaultValue)
                    return ref(defaultValue)
                }
            }
            catch {
                return ref(defaultValue)
            }
        }
        else {
            return ref(defaultValue)
        }
    }


    const submitSelect = useCookie<boolean>('submitSelect') || checkLocalstorage('submitSelect', false)
    const inflectionExpanded = useCookie<boolean>('inflectionExpanded') || checkLocalstorage('inflectionExpanded', false)
    const inflectionNo = useCookie<boolean>('inflectionNo') || checkLocalstorage('inflectionNo', false)
    const inflectionTableContext = useCookie<boolean>('inflectionTableContext') || checkLocalstorage('inflectionNo', false)
    const listView = useCookie<boolean>('listView')  || checkLocalstorage('inflectionNo', false)
    

    watch(submitSelect, () => {
        try {
            localStorage.setItem('searchSubmit', submitSelect.value ? 'true' : 'false')
        }
        catch {
            console.log("No local storage")
        }
    },
    {deep: true})
    watch(inflectionExpanded, () => {
        try {
            localStorage.setItem('inflectionExpanded', inflectionExpanded.value ? 'true' : 'false')
        }
        catch {
            console.log("No local storage")
        }
    },
    {deep: true})
    watch(inflectionNo, () => {
        try {
            localStorage.setItem('inflectionNo', inflectionNo.value ? 'true' : 'false')
        }
        catch {
            console.log("No local storage")
        }
    },
    {deep: true})
    watch(inflectionTableContext, () => {
        try {
            localStorage.setItem('inflectionTableContext', inflectionTableContext.value ? 'true' : 'false')
        }
        catch {
            console.log("No local storage")
        }
    },
    {deep: true})

    watch(listView, () => {
        try {
            localStorage.setItem('listView', listView.value ? 'true' : 'false')
        }
        catch {
            console.log("No local storage")
        }
    },
    {deep: true})

    return  {
        submitSelect,
        inflectionExpanded,
        inflectionNo,
        inflectionTableContext,
        listView
    }


})
