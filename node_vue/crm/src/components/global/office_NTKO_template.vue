<template>
	<div class="" style="border: 1px solid red; width: 800px;">
		<object id="TANGER_OCX" classid="clsid:C9BC4DFF-4248-4a3c-8A49-63A7D317F404" codebase="OfficeControl.cab#version=5,0,2,4" width="100%" height="500">
	    <param name="IsUseUTF8URL" value="-1">
	    <param name="IsUseUTF8Data" value="-1">
	    <param name="BorderStyle" value="1">
	    <param name="BorderColor" value="14402205">
	    <param name="TitlebarColor" value="15658734">
	    <param name="isoptforopenspeed" value="0">
	    <param name="ProductCaption" value="广东智通人才连锁股份有限公司">
	    <param name="ProductKey" value="BB052D0F8674D3DE7DE952EAABE4F15C3AFAA22B">
	    <param name="TitlebarTextColor" value="0">
	    <param name="MenubarColor" value="14402205">
	    <param name="MenuButtonColor" VALUE="16180947">
	    <param name="MenuBarStyle" value="3">
	    <param name="MenuButtonStyle" value="7">
	    <param name="WebUserName" value="广东智通人才连锁股份有限公司">
	    <param name="Caption" value="广东智通人才连锁股份有限公司人才库">
	    <span style="color:red">不能装载文档控件。请在检查浏览器的选项中检查浏览器的安全设置。</span>
		</object>
	</div>
</template>
<script>
	export default {
		name: 'v-docTemplate',
		props: {
			settings: {
		        docId: '通用模板',  // 文档id，同时是文档名称
		        docFolder: '',  // 文件夹名称,
		        fileExt: '.doc', // 文件扩展名：默认为.doc，如果你只上传word文档，这个不用改
		        width: '100%',   // 控件宽度
		        height: '700'  // 控件高度
		    }
		},
		data() {
			return {
				officeObj: null  // ntko对象
			}
		},
		watch: {
			settings: {
				handler(val, oldVal) {
					this.settings = Object.assign(this.settings, val)
				},
				deep: true
			}
		},
		created() {
			
		},
		mounted() {
			this.$nextTick(() => {
				this.initDoc();
			})
		},
		methods: {
			/**
			* 初始化文档控件，主要做以下操作：
			* 1. 封装ntko对象
			* 2. 判断docId是否为空，如果为空，则创建一个新的word文档；
			*    否则，根据docId去下载文档并显示出来
			*/
			initDoc(){
				// 获取控件对象
				this.officeObj = document.getElementById("TANGER_OCX")
				console.log(this.officeObj)

				if (this.officeObj == null) {
					return;
				}

				if (this.settings.docId == null || this.settings.docId === '') {
					// 打开一个空白文档
					this.officeObj.CreateNew('Word.Document')
				} else {
					// 下载文档
					this.httpDownload()
				}
			},
			/**
			* 下载office控件
			*/
			httpDownload() {
				let fileName = this.settings.docId + '.doc'

				let fileUrl = `http://localhost:8000/通用模板.docx`
				console.log(fileUrl)
				console.log('officeObj=', this.officeObj)

				return this.officeObj.OpenFromURL(fileUrl)
			}

		}
	}
</script>