<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" @click="open">
		<hr>
		<hr>

		<img alt="Vue logo" src="../assets/logo.png" @click="openMap">

		<tian-Map ref="tianArea" @getLongLatArea="getLongLatArea" long="118.362881" lat="35.109849"></tian-Map>
		<QDdialog :dialogVisible.sync="isOpen" @confim="onSubmit" @cancle="onCancle">
			<template v-slot:form>
				<el-form :rules="rules" ref="ruleForm"  :inline="true" :model="formInline" class="demo-form-inline">
					<el-form-item label="审批人" prop="user">
						<el-input v-model="formInline.user"  placeholder="审批人"></el-input>
					</el-form-item>
					<el-form-item label="活动区域">
						<el-select v-model="formInline.region" placeholder="活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</template>
		</QDdialog>
	</div>
</template>

<script>
// @ is an alias to /src
import QDdialog from '@/components/QDdialog.vue'
import TianMap from '@/components/TianMap/index.vue'


export default {
	name: 'HomeView',
	components: {
		QDdialog,
		TianMap
	},
	data() {
		return {
			isOpen: false,
			formInline: {
				user: '',
				region: ''
			},
			rules: {
				user: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
			}
		}
	},
	methods: {
		getLongLatArea(data){
			console.log(data.length)
		},
		openMap(data) {
			// data 打开时赋值边界范围
			// this.$refs.tianArea.openMapAreaDetail(data);
			// 也可以 没有默认值
			this.$refs.tianArea.openMapAreaDetail();
		},
		onSubmit(bool) {
			this.$refs['ruleForm'].validate((valid) => {
				if (valid) {
					console.log('submit!', this.formInline);
					this.isOpen = bool
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		onCancle(){
			// 清空表单
			// this.$refs['ruleForm'].resetFields();
		},
		open() {
			this.isOpen = true
		},
	}
}
</script>
