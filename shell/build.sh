###
 # @Author: JC
 # @Date: 2020-12-19 14:49:59
 # @LastEditTime: 2020-12-26 23:11:20
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: \admin\shell\build.sh
###
project=/data/code/my-blog-admin

cd $project
git pull

# 图片压缩模块需要cnpm下载
npm install
yarn build