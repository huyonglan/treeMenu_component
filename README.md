## 树形菜单组件v1.0

By Ryu

### 依懒

* Vue v1.x
* requirejs

### 用法

#### 完整例子： ``/html/demo/demo.html``

#### 数据格式
```json
{
	name: '一级菜单',
	checked: false,
	children: [{
		name: '二级菜单',
		checked: false,
		children: [],
		...
	},
	...
}
```

#### 样式加载

```scss
@import '../base_treeMenu';
```

#### 组件引入
```javascript
Vue.component('tree-item', TreeMenu);
```

#### 页面结构

```html
<div class="mod_tree_menu">
	<ul>
		<tree-item :open="true" v-for="treeItem in treeData" :model.sync="treeItem"></tree-item>
	</ul>
</div>
```

### MIT
