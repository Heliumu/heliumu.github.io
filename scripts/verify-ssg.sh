#!/bin/bash
# 验证SSG静态页面生成情况

echo "=== SSG静态页面生成验证 ==="
echo ""

# 统计总页面数
total_html=$(find .next/server/pages -name '*.html' 2>/dev/null | wc -l)
echo "✓ 总HTML页面数: $total_html"

# 统计语言首页
echo ""
echo "=== 语言首页 ==="
for lang in en zh_cn zh ja ko de fr; do
  if [ -f ".next/server/pages/$lang.html" ]; then
    echo "✓ /$lang (首页)"
  else
    echo "✗ /$lang (缺失)"
  fi
done

# 检查政策页面
echo ""
echo "=== 政策页面（英文和中文）==="
for page in privacy-policy terms-of-service cookie-policy; do
  if [ -f ".next/server/pages/en/$page.html" ]; then
    echo "✓ /en/$page"
  else
    echo "✗ /en/$page (缺失)"
  fi
  if [ -f ".next/server/pages/zh_cn/$page.html" ]; then
    echo "✓ /zh_cn/$page"
  else
    echo "✗ /zh_cn/$page (缺失)"
  fi
done

# 检查部分API浏览器页面
echo ""
echo "=== API浏览器页面（英文示例）==="
sample_apis=(
  "quickstart"
  "ohlc_latest_bars%2Fcrypto"
  "asset_reference%2Fstock"
  "futures_continuous_real_contracts"
  "economic_calendar_event_list"
  "news_list"
  "holiday_codes"
  "address_info"
)

for api in "${sample_apis[@]}"; do
  if [ -f ".next/server/pages/en/api_explorer/$api.html" ]; then
    echo "✓ /en/api_explorer/$api"
  else
    echo "✗ /en/api_explorer/$api (缺失)"
  fi
done

# 统计API浏览器页面总数
api_html=$(find .next/server/pages/en/api_explorer -name '*.html' 2>/dev/null | wc -l)
echo ""
echo "✓ 英文API浏览器页面总数: $api_html"

# 验证其他语言
echo ""
echo "=== 其他语言API浏览器页面数 ==="
for lang in zh_cn zh ja ko de fr; do
  count=$(find .next/server/pages/$lang/api_explorer -name '*.html' 2>/dev/null | wc -l)
  echo "✓ $lang: $count 个页面"
done

echo ""
echo "=== 验证完成 ==="

