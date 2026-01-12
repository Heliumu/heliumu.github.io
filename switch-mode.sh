#!/bin/bash

# 切换 SSG 和 SSR 模式的脚本
# 用法:
#   ./switch-mode.sh ssg  # 切换到 SSG（静态生成）
#   ./switch-mode.sh ssr  # 切换到 SSR（服务器渲染）

FILE="pages/[...slug].tsx"

if [ "$1" == "ssg" ]; then
    echo "🔄 切换到 SSG 模式（静态生成）..."

    # 注释掉 getServerSideProps
    sed -i 's/^export const getServerSideProps/\/\/ export const getServerSideProps/g' "$FILE"
    sed -i 's/^  return {$/\/\/   return {/g' "$FILE"
    sed -i 's/^    props: {$/\/\/     props: {/g' "$FILE"
    sed -i 's/^      slug: context.params/\/\/       slug: context.params/g' "$FILE"
    sed -i 's/^    },$/\/\/     },/g' "$FILE"
    sed -i 's/^  }$/\/\/   }/g' "$FILE"
    sed -i 's/^}$/\/\/ }/g' "$FILE"

    # 取消注释 getStaticPaths 和 getStaticProps
    sed -i 's/^\/\/ export const getStaticPaths/export const getStaticPaths/g' "$FILE"
    sed -i 's/^\/\/ export const getStaticProps/export const getStaticProps/g' "$FILE"

    echo "✅ 已切换到 SSG 模式"
    echo "💡 运行: npm run build"

elif [ "$1" == "ssr" ]; then
    echo "🔄 切换到 SSR 模式（服务器渲染）..."

    # 注释掉 getStaticPaths 和 getStaticProps
    sed -i 's/^export const getStaticPaths/\/\/ export const getStaticPaths/g' "$FILE"
    sed -i 's/^export const getStaticProps/\/\/ export const getStaticProps/g' "$FILE"

    # 取消注释 getServerSideProps
    sed -i 's/^\/\/ export const getServerSideProps/export const getServerSideProps/g' "$FILE"

    echo "✅ 已切换到 SSR 模式"
    echo "💡 运行: npm run dev"
    echo "⚠️  注意: SSR 模式无法生成静态文件"

else
    echo "❌ 用法: ./switch-mode.sh [ssg|ssr]"
    echo "  ssg - 静态生成模式（可生成静态文件）"
    echo "  ssr - 服务器渲染模式（不可生成静态文件）"
    exit 1
fi

