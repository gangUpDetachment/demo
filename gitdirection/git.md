//git下载地址https://git-scm.com
Linux常用命令 
ls 常看当前文件的文件夹
cd 进入某个文件夹 cd..回到上一级
clear 清屏
mkdir 创建文件夹
touch test.html 创建test.html文件
rm rest.html 删除test.html文件
ctrl+c 取消命令
Vim编辑器
i可以进入编辑模式
ESC + :wq 保存并退出
ESC + ：q!不保存并退出
git配置
//配置全局用户名
git config --golbal user.name "username"
//配置全部密码
git config --golbal user.email "email"
//查看git所有全局配置
gitconfig --global -l 
git init 仓库初始化
git 常用命令
git status 版本状态查看
//跟踪新文件，暂存已修改文件等
git add -A（或者git add .或者 git add *）
git commit -m "注释"  提交修改并注释
git restore . 丢弃工作区的改动
git restore --staged<文件>可以取消暂存
git log --oneline 查看历史简略信息
git reset --hard/--mixed/--soft xxxx版本回退
git branch name 创建分支
git branch 查看分支
git checkout xxx  切换分支（注意：每次在切换分支前 提交一下分支）
git checkout -b xxx ：创建并切换到xx分支
git checkout -B xxx:创建并切换分支，如果存在，则强行覆盖
git branch -d xxx:删除某个分支
git merge name:把某个分支内容合并到当前分支
本地配置远程仓库地址
git remote add origin https://xxxx
git push -u origin master 将本地仓库某个分支内容推送到远程仓库
git push origin --all:推送本地仓库的全部分支到远程仓库
git clone https://xxx 克隆仓库
git fetch origin dev:dev 拉取本地没有的分支
git push 提交代码
node.js（NPM全称：Node Package Manager,node的包管理器 ）
npm config set registry https://registry.npm.taobao.org/更改npm地址为淘宝镜像
npm init -y 初始化一个默认配置package.json
npm install/i xx --save-dev 或 npm install/i xx -D 安装指定的包并添加到项目的开发依赖中
npm i xxx -S 安装指定包并添加到项目的生产依赖中
npm install yarn -g  yarn的安装





