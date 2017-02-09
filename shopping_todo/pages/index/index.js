const app = getApp();
const _wx = app.getWx();

Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
	},
	onLoad: function () {
		const that = this;
		//调用应用实例的方法获取全局数据
		app.getUserInfo((userInfo) => {
			//更新数据
			that.setData({
				userInfo: userInfo
			});
		});
		_wx.req({
			url: '/shopping/initGroup',
			success: (res) => {
				console.log(res);
			},
			fail: () => {

			},
		});
	},
});