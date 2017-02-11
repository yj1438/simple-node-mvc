const StorageKey = require('../../common/StorageKey');
const ToolUitls = require('../../utils/toolUtils');

const app = getApp();
const _wx = app.getWx();

const groupList = require('../../data/grouplist');
const groupLen = groupList.length;

Page({
    data: {
        groupList: [],
    },
    onLoad: function (option) {
        console.log('页面LOAD');
    },
    onShow: function () {
        const _groupList = this._getGroupList();
        console.log(_groupList);
        this.setData({
            groupList: _groupList,
        });
        console.log('页面SHOW');
    },
    /**
	 * 
	 * 
	 * @returns
	 */
	_creatGroup: function () {
		const group_id = Math.floor(groupLen * Math.random());
		return group_id;
	},
    _getTodoCount: function (group) {
        let count = 0;
        group.list.forEach((item) => {
            if (item.isDone === 0) {
                ++count;
            }
        });
        return count;
    },
    _getGroupList: function () {
        const group_ids = _wx.getStorageSync(StorageKey.group_ids);
        if (!group_ids || group_ids.length === 0) {
            return [];
        } else {
            const _groupList = [];
            group_ids.forEach((item) => {
                const group = _wx.getStorageSync(StorageKey.group_id_prefix + item);
                _groupList.push({
                    id: item,
                    name: group.name,
                    create_date: ToolUitls.dateFormat(new Date(group.create_ts), '%Y-%m-%d %H:%M:%S'),
                    memberCount: group.members.length,
                    todoCount: this._getTodoCount(group)
                });
            });
            return _groupList;
        }
    },
    bindTapCreateGroup: function (evt) {

        _wx.navigateTo({
            url: '../index/index?group_id=' + this._creatGroup(),
        });
    },
    bindTapGotoGroup: function (evt) {
        const group = evt.currentTarget.dataset.item;
        _wx.navigateTo({
            url: '../index/index?group_id=' + group.id
        });
    }, 
    
});