/*=============================================================================
#     FileName: TreeMenu.js
#         Desc:  通用树形菜单组件  
#       Creator: Ryu
#        Email: ryu@imiku.com
#      Version: 1.0
#   LastChange: 2017-05-08 14:20:02
#      Usage: 详看 TreeMenu.md
=============================================================================*/
define(['lib/vue/vue'], function(Vue) {
	var tpl = [
		'<li>',
		'<div class="item_tit">',
		'	<span :class="open ? \'ico_arrow\' : \'ico_arrow ico_arrow_hide\'" @click="toggle"v-if="isFolder"></span>',
		'	<input type="checkbox" id="chk_{{model.id}}" class="chk" name="chk_{{model.id}}" @change="changeHandle()" v-model="model.checked" />',
		'	<label for="chk_{{model.id}}">{{model.name}}</label>',
		'</div>',
		'<ul v-show="open" v-if="isFolder">',
		'	<tree-item class="sub_item" v-for="model in model.children" :data-name="dataName" :index="$index" :model.sync="model"></tree-item>',
		'</ul>',
		'</li>'].join('');

	var modTreeMenu = Vue.extend({
		template: tpl,
		props: {
			/*序号*/
			index: Number,
			/*根数据名称*/
			dataName: String,
			model: Object,
			open: Boolean
		},

		data: function () {
			return {
				open: false
				/*open: true*/
			}
		},

		computed: {
			/*判断是否含有子菜单*/
			isFolder: function () {
				return this.model.children && this.model.children.length;
			}
		},

		methods: {
			toggle: function () {
				if (this.isFolder) {
					this.open = !this.open;
				}
			},

			/*从一个子列表创建一个菜单*/
			changeType: function () {
				if (!this.isFolder) {
					Vue.set(this.model, 'children', []);
					this.addChild();
					this.open = true;
				}
			},

			/*添加一个项*/
			addChild: function () {
				this.model.children.push({
					name: '新建菜单项',
					checked: false
				});
			},

			/*删除一个项*/
			delChild: function () {
				this.model.children.pop();
			},

			/*选中处理*/
			chkToggle: function(items, status){
				for(var i = 0; i < items.length; i++){
					var item = items[i];

					/*递归处理*/
					if(item.children && item.children.length > 0){
						this.chkToggle(item.children, status);
					}
					
					/*选中*/
					item.checked = status;
				}
			},

			changeHandle: function(isInit){
				if (this.isFolder) {
					if(this.model.checked === true){
						this.chkToggle(this.model.children, true);
					}else{
						if(!isInit){
							this.chkToggle(this.model.children, false);
						}
					}
				}
			},

			check: function(){
				var parent_model = this.$parent.model;

				if(parent_model){
					var children = parent_model.children;
					var flag = true;

					for(var i = 0; i < children.length; i++){
						if(children[i].checked === false){
							flag = false;
							break;
						}
					}

					Vue.set(this.$parent.model, 'checked', flag);
				}
			}
		},

		watch: {
			'model.checked': function(newVal, oldVal){
				if(newVal !== oldVal){
					this.check();
				}
			}
		},

		ready: function(){
			if(!this.model.checked){
				Vue.set(this.model, 'checked', false);
			}
			this.changeHandle(true);
			this.check();
		}
	});

	return modTreeMenu;
});
// vim: set noet fdm=manual ff=unix sts=4 sw=4 ts=4 tw=0 : 
