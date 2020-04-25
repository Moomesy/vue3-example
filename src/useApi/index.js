import { inject, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useHelper } from '../library/helper'


// ES6 Symbol是为了防止重复
// Symbol('a') !== Symbol('a')
// 所以不能用新的Symbol('helper')取值


export {
    useRouter,
    useHelper
};