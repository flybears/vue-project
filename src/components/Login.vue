<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" @keyup.native.13="handleSubmit2" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked style="margin:0px 0px 35px 0px;">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" :loading="loading" style="width:100%;" @click.native.prevent="handleSubmit2">登录</el-button>
    </el-form-item>
    <div style='color: red' v-if='error'>
      {{ error }}
    </div>
  </el-form>
</template>

<script>
  import auth from '../auth'
  export default {
    data () {
      return {
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: true,
        loading: false,
        error: null
      }
    },
    methods: {
      handleReset2 () {
        this.$refs.ruleForm2.resetFields()
      },
      handleSubmit2 (ev) {
        var _this = this
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            _this.loading = true;
            auth.login(_this.ruleForm2.account, _this.ruleForm2.checkPass, loggedIn => {
              if (loggedIn) {
                _this.$router.replace(this.$route.query.redirect || '/')
              }else{
                _this.error = '账户名密码错误！'
                _this.loading = false;
                setTimeout( function(){
                  _this.error = null
                }, 2000)
                console.log('error submit!!')
                return false
              }
            })
          } else {
            _this.error = '登录失败'
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .card-box {
    padding: 20px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 120px auto;
    width: 400px;
    border: 2px solid #8492A6;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .loginform {
    width: 350px;
    padding: 35px 35px 15px 35px;
  }
</style>
