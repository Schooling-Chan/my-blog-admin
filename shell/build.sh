###
 # @Author: JC
 # @Date: 2020-12-19 14:49:59
 # @LastEditTime: 2020-12-19 14:53:43
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: \admin\shell\build.sh
###
project=/data/code/my-blog-admin

cd $project
git pull

npm install
npm run build