import Mock from 'mockjs'
import loginAPI from './login'

Mock.mock(/\/login\/login/, 'post', loginAPI.login)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/login\/getUserInfo/, 'post', loginAPI.getUserInfo)

export default Mock
