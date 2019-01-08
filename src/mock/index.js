import Mock from 'mockjs'
import loginAPI from './login'
import featureAPI from './feature'

Mock.mock(/\/login\/login/, 'post', loginAPI.login)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/login\/getUserInfo/, 'post', loginAPI.getUserInfo)

Mock.mock(/\/feature\/SubmitFilter/, 'post', featureAPI.SubmitFilter)

export default Mock
