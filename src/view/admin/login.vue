<template>
  <div class="login-bg">
    <div class="login-form" @keydown.enter="submitForm('ruleForm')">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px" >
        <el-form-item label="账号"
                      prop="userName">
          <el-input type="text"
                    v-model="ruleForm.userName"
                    auto-complete="off"
                    autofocus></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password"
                    v-model="ruleForm.password"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')"
                     :loading="submitLoading">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import md5 from 'md5'
  export default {
    data () {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          if (rule.field === 'password') {
            callback(new Error('请输入密码'))
          } else if (rule.field === 'userName') {
            callback(new Error('请输入账号'))
          }
        } else {
          callback()
        }
      }
      return {
        submitLoading: false,
        ruleForm: {
          userName: '',
          password: ''
        },
        rules: {
          userName: [
            {validator: validatePass, trigger: 'blur'}
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            let loginForm = {
              userName: this.ruleForm.userName,
              password: md5(this.ruleForm.password)
            }
            this.$store.dispatch('LoginAction', loginForm)
              .then(() => {
                this.submitLoading = false
                this.$router.push({name: 'admin'})
                this.$message({
                  message: '登入成功',
                  type: 'success'
                })
              })
              .catch((err) => {
                console.log('login.vue err', err)
                this.submitLoading = false
              })
          } else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
  .login-form {
    width: 28%;
    position: fixed;
    left: 50%;
    top: 30%;
    margin-left: -14%;
    border: 1px solid #aaa;
    padding: 20px 20px 20px 0;
    border-radius: 3px;
    box-shadow: 1px 1px 1px #aaa;
  }
  @media (max-width: 992px) {
    .login-form {
      width: 60%;
      position: fixed;
      left: 50%;
      top: 30%;
      margin-left: -30%;
      border: 1px solid #aaa;
      padding: 20px 20px 20px 0;
      border-radius: 3px;
      box-shadow: 1px 1px 1px #aaa;
    }
  }
  @media (max-width: 720px) {
    .login-form {
      width: 80%;
      position: fixed;
      left: 50%;
      top: 30%;
      margin-left: -40%;
      border: 1px solid #aaa;
      padding: 20px 20px 20px 0;
      border-radius: 3px;
      box-shadow: 1px 1px 1px #aaa;
    }
  }

  .login-bg {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /*background-image: url('https://a-ssl.duitang.com/uploads/item/201510/04/20151004181525_BiWfM.jpeg');*/
    /*background-repeat: no-repeat;*/
    /*background-size: 100% auto;*/
  }
</style>
