<template>
  <div class="login-container">
    <div class="login-form">
      <el-form ref="loginForm" :model="loginForm" :rules="rulesForm" label-width="80px">
        <el-form-item label="账号：" prop="name">
          <el-input v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      rulesForm: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loginForm: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.loginForm)
          this.$request.login.Login(this.loginForm).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-container{
  height: 100%;
  width: 100%;
  position: relative;
  background: aliceblue;
  .login-form{
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50px;
    transform: translate3d(-50%, 50%, 0);
  }
}
</style>
