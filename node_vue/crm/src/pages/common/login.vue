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
            <br />
            <el-row>
                <el-button type="primary" :plain="true" @click="download">下载</el-button>
            </el-row>
        </el-form>
    </div>
</template>

<script>
const md5 = require('md5');
import { login,
         download } from '@/api/modules/user';
import { blocked } from '@/utils';

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

                    this.login(data);

                } else {
                    return false;
                }
            })
        },
        async login(form) {
            let res = await login(form);
            this.$message({
                message: res.message,
                type: res.status == 0 ? 'success' : 'error'
            })
            if (res.status == 0) {

            }
        },
        async download() {
            let res = await download();
            
            blocked(`${res}`);
            
        }
    }
}
</script>

<style>

</style>
