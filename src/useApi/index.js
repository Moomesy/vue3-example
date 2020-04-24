import { inject } from 'vue'

export function useHelper() {
    return inject('$helper')
}