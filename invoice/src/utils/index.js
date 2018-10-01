/*
 * 获取viewBox对象
 * component: VueComponent对象
 */
export function viewBox(component) {
	let viewBox = component.$refs.viewBox
	while(!viewBox) {
		component = component.$parent
		viewBox = component.$refs.viewBox
	}
	return viewBox
}
