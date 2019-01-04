<template>
    <div class="pages">
        <el-form :model="form" :rules="rules" ref="form" :inline="true" label-width="100px">
            <el-row>
                <el-form-item label="姓名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-button type="primary" @click="signIn('form')">登录</el-button>
            </el-row>
        </el-form>
    </div>
</template>

<script>
const md5 = require('md5');
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    computed: {
        rules() {
            return {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        signIn(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = {
                        username: this.form.username,
                        password: md5(this.form.password, null, true)
                    }

                    console.log(data)
                    console.log(md5("698d51a19d8a121ce581499d7b701668", null, true))
                } else {
                    return false;
                }
            })
        }
    }
}
</script>

<style>

</style>
