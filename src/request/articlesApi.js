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

export default {
  saveMD,
  mdList,
};
