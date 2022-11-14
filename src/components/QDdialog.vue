<template>
	<el-dialog :title="title" :visible.sync="dialogVisible" :width="width" :before-close="handleClose" 
	:modal="modal"  :append-to-body="appendToBody" :custom-class="customClass" :fullscreen="fullscreen" :top="top">
		<!-- 内容主体 -->
		<div class="main">
			<!-- 默认插槽 -->
			<slot />
			<!-- 具名插槽 -->
			<slot name="img"></slot>
			<slot name="form"></slot>
			<slot name="table"></slot>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button v-if="isShowBtnConfim" type="primary" @click="handleConfim">确 定</el-button>
			<el-button v-if="isShowBtnCancle" @click="handleCancle">取 消</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	name: "QDdialog",
	data() {
		return {};
	},
	props: {
		dialogVisible: {
			type: Boolean,
			default: false,
		},
		width: {
			type: String,
			default: "30%",
		},
		title: {
			type: String,
			default: "提示",
		},
		isShowBtnConfim: {
			type: Boolean,
			default: true,
		},
		isShowBtnCancle: {
			type: Boolean,
			default: true,
		},
		fullscreen:{
			type: Boolean,
			default: false,
		},
		top:{
			type: String,
			default: '15vh',
		},
		modal:{
			type: Boolean,
			default: true,
		},
		appendToBody:{
			type: Boolean,
			default: true,
		},
		customClass:{
			type: String,
			default: '',
		},
	// 是否为全屏 Dialog	boolean	—	false
	// Dialog CSS 中的 margin-top 值	string	—	15vh
	// 是否需要遮罩层	boolean	—	true
	// 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上	boolean	—	true
	// Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true	boolean	—	false
	// 是否在 Dialog 出现时将 body 滚动锁定	boolean	—	true
	// Dialog 的自定义类名	string	—	—
	// 是否可以通过点击 modal 关闭 Dialog	boolean	—	true
	// 是否可以通过按下 ESC 关闭 Dialog	boolean	—	true
	// 是否显示关闭按钮	boolean	—	true
	// 关闭前的回调，会暂停 Dialog 的关闭	function(done)，done 用于关闭 Dialog	—	—
	// 是否对头部和底部采用居中布局	boolean	—	false

	},
	components: {},
	mounted() { },
	methods: {
		handleClose(done) {
			this.$emit("update:dialogVisible", false);
			// this.$confirm('确认关闭？').then(_ => {
			// 	done();
			// }).catch(_ => {});
		},
		// 确定
		handleConfim() {
			// this.$emit("update:dialogVisible", false);
			// 建议点击确定后的关闭逻辑 放在请求接口提交后
			this.$emit('confim', false);
		},
		// 取消
		handleCancle() {
			this.$emit("update:dialogVisible", false);
			this.$emit('cancle')
		},
	},
};
</script>

<style lang="scss" scoped>
.box-card {
	width: 100%;
	box-sizing: border-box;
	padding: 20px;
}
</style>
