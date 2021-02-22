// 引入axios
import ajax from "../util/axios-init";
//文章保存相关
// 保存文章html
function saveMD(data) {
  return ajax
    .post({
      url: "/api/blog/saveMD",
      data: {
        _h: data.md,
        title: data.title,
        rawData: data.rawData,
      },
    })
    .then((res) => {
      if (res.success) {
        return res;
      } else {
        throw res;
      }
    });
}

// 文章列表
function mdList(page = {}) {
  return ajax
    .get({
      url: "/api/blog/mdList",
      data: {
        page: page.num || 1,
        pageSize: page.size || 10,
      },
    })
    .then((res) => {
      if (res.success) {
        return res;
      } else {
        throw res;
      }
    });
}

// 编辑文章
function editMD(id) {
  return ajax
    .get({
      url: "/api/blog/editMD",
      data: {
        id,
      },
    })
    .then((res) => {
      if (res.success) {
        return res;
      } else {
        throw res;
      }
    });
}
// 保存编辑文章
function saveEditMD(data) {
  return ajax
    .put({
      url: "/api/blog/editMD",
      data: {
        _h: data.md,
        title: data.title,
        rawData: data.rawData,
        id: data.id,
      },
    })
    .then((res) => {
      if (res.success) {
        return res;
      } else {
        throw res;
      }
    });
}

// 删除文章
function deleteMD(id) {
  return ajax
    .del({
      url: "/api/blog/delMD",
      data: {
        id,
      },
    })
    .then((res) => {
      if (res.success) {
        return res;
      } else {
        throw res;
      }
    });
}

export default {
  saveMD,
  mdList,
  editMD,
  saveEditMD,
  deleteMD,
};
