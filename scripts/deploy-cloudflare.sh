#!/bin/bash
# Cloudflare Pages 快速部署脚本

echo "🚀 准备部署到 Cloudflare Pages..."
echo ""

# 检查out目录是否存在
if [ ! -d "out" ]; then
    echo "❌ 错误: out目录不存在"
    echo "请先运行: npm run build"
    exit 1
fi

# 统计文件数量
HTML_COUNT=$(find out -name "*.html" | wc -l)
echo "📊 静态文件统计:"
echo "   - HTML文件: $HTML_COUNT 个"
echo "   - 配置文件: $(ls out/_* 2>/dev/null | wc -l) 个"
echo ""

# 检查必需文件
echo "🔍 检查必需文件:"
if [ -f "out/_redirects" ]; then
    echo "   ✅ _redirects 存在"
else
    echo "   ❌ _redirects 缺失"
fi

if [ -f "out/_headers" ]; then
    echo "   ✅ _headers 存在"
else
    echo "   ❌ _headers 缺失"
fi

if [ -f "out/index.html" ]; then
    echo "   ✅ index.html 存在"
else
    echo "   ❌ index.html 缺失"
fi

echo ""

# 询问部署方式
echo "请选择部署方式:"
echo "1) 使用 Wrangler CLI 部署"
echo "2) 显示手动部署说明"
echo "3) 退出"
echo ""
read -p "选择 (1-3): " choice

case $choice in
    1)
        # 检查wrangler是否安装
        if ! command -v wrangler &> /dev/null; then
            echo ""
            echo "❌ Wrangler 未安装"
            echo "请运行: npm install -g wrangler"
            exit 1
        fi

        echo ""
        read -p "请输入项目名称 (默认: aitrados-api-explorer): " PROJECT_NAME
        PROJECT_NAME=${PROJECT_NAME:-aitrados-api-explorer}

        echo ""
        echo "🚀 开始部署到 Cloudflare Pages..."
        wrangler pages deploy out --project-name="$PROJECT_NAME"
        ;;

    2)
        echo ""
        echo "📖 手动部署步骤:"
        echo ""
        echo "方法1: Git集成部署（推荐）"
        echo "1. 推送代码到Git仓库"
        echo "   git add ."
        echo "   git commit -m 'Add static export'"
        echo "   git push"
        echo ""
        echo "2. 登录 Cloudflare Dashboard"
        echo "   https://dash.cloudflare.com/"
        echo ""
        echo "3. 进入 Pages → Create a project"
        echo ""
        echo "4. 连接Git仓库并配置:"
        echo "   - Framework: Next.js (Static HTML Export)"
        echo "   - Build command: npm run build"
        echo "   - Build output directory: out"
        echo "   - Node version: 18 或以上"
        echo ""
        echo "方法2: 直接上传"
        echo "1. 登录 Cloudflare Dashboard"
        echo "2. Pages → Create a project → Direct upload"
        echo "3. 上传整个 out 文件夹"
        echo ""
        echo "完整指南请查看: CLOUDFLARE_DEPLOY_GUIDE.md"
        ;;

    3)
        echo "退出部署"
        exit 0
        ;;

    *)
        echo "无效选择"
        exit 1
        ;;
esac

echo ""
echo "✅ 完成！"

