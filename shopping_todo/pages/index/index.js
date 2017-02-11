const app = getApp();
const _wx = app.getWx();

const toolUtils = require('../../utils/toolUtils');

const groupList = require('../../data/grouplist');
const groupLen = groupList.length;

const StorageKey = require('../../common/StorageKey');

Page({
	data: {
		userInfo: {},
		groupId: null,
		groupData: null,
		chooseIndex: null,
		isEditing: false,
		editValue: '',
		// 彩蛋
		activeEggs: false,
		animationData: [],
	},
	onLoad: function (options) {
		//调用应用实例的方法获取全局数据
		app.getUserInfo((userInfo) => {
			//更新数据
			console.log(userInfo);
			// 获取默认的群ID name
			let group_id = parseInt(options.group_id, 10);
			console.log('group_id' + group_id);
			let group_name = options.group_name;
			if (!group_id) {
				group_id = this._initGroup();
			} else {
				this._setGroups(group_id);
			}
			this.setData({
				userInfo: userInfo,
				groupId: group_id,
			});
			const groupData = this._getGroupData(group_id, group_name);
			console.log(groupData);
			this._render(groupData);
		});

		// _wx.req({
		// 	url: '/shopping/initGroup',
		// 	success: (res) => {
		// 		console.log(res);
		// 	},
		// 	fail: () => {

		// 	},
		// });
		setTimeout(() => {
			this._activeSecretEggs();
		}, 2000);
	},
	/**
	 * 
	 * 
	 * @returns
	 */
	_initGroup: function () {
		const groups = this._getGroups();
		if (groups.length === 0) {
			groups.push(this._creatGroup());
		}
		return groups[groups.length - 1];
	},
	/**
	 * 
	 * 
	 * @returns
	 */
	_creatGroup: function () {
		const group_id = Math.floor(groupLen * Math.random());
		this._setGroups(group_id);
		return group_id;
	},
	/**
	 * 
	 * 
	 * @returns
	 */
	_getGroups: function () {
		const ids = _wx.getStorageSync(StorageKey.group_ids) || [];
		return ids;
	},
	/**
	 * 
	 * 
	 * @param {any} group_id
	 */
	_setGroups: function (group_id) {
		const groups = this._getGroups() || [];
		if (groups.indexOf(group_id) === -1) {
			groups.push(group_id);
		}
		_wx.setStorageSync(StorageKey.group_ids, groups);
	},
	/**
	 * 
	 * 
	 * @param {any} group_id
	 * @param {any} group_name
	 * @returns
	 */
	_getGroupData: function (group_id, group_name) {
		const storageKey = StorageKey.group_id_prefix + group_id;
		if (this._getGroups().indexOf(group_id) === -1) {
			return null;
		}
		let groupData = _wx.getStorageSync(storageKey);
		if (!groupData) {
			groupData = groupList[group_id];
			groupData.name = group_name || '请输入清单标题';
			groupData.members = this._makeMember(groupData.members);
			groupData.create_ts = new Date().getTime();
			this._setGroupData(group_id, groupData);
		}
		return groupData;
	},
	/**
	 * 
	 * 
	 * @param {any} group_id
	 * @param {any} data
	 */
	_setGroupData: function (group_id, data) {
		const storageKey = StorageKey.group_id_prefix + group_id;
		_wx.setStorageSync(storageKey, data);
	},
	_makeMember: function (members) {
		const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
		let _member = members.map((m) => {
			const piece = arr.splice(Math.floor(arr.length * Math.random()), 1);
			m.avatar = 'avatar_' + piece[0] + '.png';
			return m;
		});
		return _member;
	},
	/**
	 * 渲染页面方法
	 * 包括列表事项的分类排序
	 * @param {any} groupData
	 */
	_render: function (groupData) {
		const data = groupData || this._getGroupData(this.data.groupId);
		const _list = {
			'0': [],
			'1': [],
			'2': [],
		};
		const result = [];
		data.list.forEach((item) => {
			_list[item.isDone].push(item);
		});
		Array.prototype.push.apply(result, _list['0']);
		Array.prototype.push.apply(result, _list['1']);
		Array.prototype.push.apply(result, _list['2']);
		data.list = result;
		this.setData({
			groupData: data,
		});
	},
	// ==============================================
	/**
	 * 
	 * 
	 * @param {any} evt
	 */
	bindTapNeedItem: function (evt) {
		const dataset = evt.currentTarget.dataset;
		const i = dataset.i;
		if (i == this.data.chooseIndex) {
			this.setData({
				chooseIndex: null,
			});
		} else {
			this.setData({
				chooseIndex: i,
			});
		}
		const type = evt.target.dataset.type;
		const _item = this.data.groupData.list[i];
		if (type === 'mine') {
			_item.isDone = 2;
			_item.by = {
				avatar: this.data.userInfo.avatarUrl,
				name: this.data.userInfo.nickName,
				uid: 'user_' + 100,
				isReal: true,
			};
			this.data.groupData.list[i] = _item;
			this._setGroupData(this.data.groupId, this.data.groupData);
			this._render();
		} else if (type === 'todo'){
			wx.showModal({
				title: '',
				content: '确定要认领此任务吗？一言既出驷马难追哦！',
				showCancel: true,
				success: (res) => {
					if (res.confirm) {
						console.log('用户点击确定');
						this.data.groupData.list[i].isMine = true;
						this._setGroupData(this.data.groupId, this.data.groupData);
						this._render();
					} else {
						console.log('用户点击取消');
					}
				}
			})
		}
		console.log(dataset);
	},

	bindTapEdit: function (evt) {
		this.setData({
			isEditing: true,
		});
	},

	bintInput: function (evt) {
		const value = evt.detail.value;
		this.setData({
			editValue: value,
		});
	},

	bindTapSaveNeed: function (evt) {
		const value = this.data.editValue;
		if (!value) {
			// 还原编辑框
			this.setData({
				isEditing: false,
				editValue: '',
			});
			return null;
		}
		const needitem = {
			date: toolUtils.dateFormat(new Date(), '%Y-%m-%d'),
			by: null,
			isDone: 0,
			id: new Date().getTime(),
			need: value,
			user: {
				avatar: this.data.userInfo.avatarUrl,
				name: this.data.userInfo.nickName,
				uid: 'user_' + 100,
				isReal: true,
			},
		};
		const _groupData = this._getGroupData(this.data.groupId);
		_groupData.list.push(needitem);
		this._setGroupData(this.data.groupId, _groupData);
		// 还原编辑框
		this.setData({
			isEditing: false,
			editValue: '',
		});
		this._render();
	},
	bindTapGotoList: function (evt) {
		_wx.navigateBack();
	},
	bindInputTitle: function (evt) {
		const value = evt.detail.value || '请输入清单标题';
		this.data.groupData.name = value;
		this._setGroupData(this.data.groupId, this.data.groupData);
	},
	// 开始彩蛋
	_activeSecretEggs: function () {
		this.setData({
			activeEggs: true,
		});
		const _animData = [];
		let i = 6;
		while (i > 0) {
			const animation = _wx.createAnimation({
				transformOrigin: "50% 50%",
				duration: 2000,
				timingFunction: "ease-in",
				delay: 0 + i * 100,
			});
			_animData.push(animation);
			--i;
		}
		this.animation = _animData;
		console.log(this.animation);
		const _animationData = this.data.animationData;
		this.animation.forEach((item, index) => {
			item.translateY(800).step();
			_animationData[index] = item.export();
		});
		console.log(this.animation);
		this.setData({
			animationData: _animationData
		});
		setTimeout(() => {
			this.setData({
				activeEggs: false,
			});
		}, 3000);
	}
});