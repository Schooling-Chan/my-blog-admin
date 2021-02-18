###
 # @Author: JC
 # @Date: 2020-12-19 14:49:59
 # @LastEditTime: 2021-02-19 00:51:14
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: \admin\shell\build.sh
###
project=/data/code/my-blog-admin

cd $project
git pull

# yarn下载
yarn
yarn build