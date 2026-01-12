#!/bin/bash
# 验证语言定义统一性

echo "🔍 检查语言定义统一性..."
echo ""

# 1. 检查 types.ts
echo "✅ 1. types.ts 的定义:"
grep "SupportedLanguages = " types.ts | head -1

# 2. 检查 sitemap 脚本
echo ""
echo "✅ 2. generate-sitemap.cjs 的定义:"
grep "SUPPORTED_LANGUAGES = " scripts/generate-sitemap.cjs | head -1

# 3. 检查所有使用SUPPORTED_LANGUAGES的文件
echo ""
echo "✅ 3. 使用 SUPPORTED_LANGUAGES 的文件:"
grep -l "SUPPORTED_LANGUAGES" components/*.tsx pages/*.tsx lib/*.ts 2>/dev/null | while read file; do
  echo "   - $file"
done

# 4. 检查是否还有硬编码的语言列表
echo ""
echo "⚠️  4. 检查硬编码的语言列表 (应该只有types.ts和sitemap):"
grep -n "\['en'.*'zh_cn'.*'zh'.*'ja'.*'ko'.*'de'.*'fr'\]" **/*.{ts,tsx,js,cjs} 2>/dev/null | grep -v "types.ts" | grep -v "generate-sitemap.cjs" | head -5

echo ""
echo "✅ 检查完成！"

