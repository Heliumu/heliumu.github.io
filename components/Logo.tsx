import React from 'react';
import Image from 'next/image';
import { ENV_CONFIG, shouldShowBrandName } from '../lib/env-config';

const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  const showBrandName = shouldShowBrandName();
  const brandName = ENV_CONFIG.BRAND_NAME;
  const logoPath = ENV_CONFIG.LOGO;

  return (
    <div className={`flex items-center gap-2 font-bold tracking-tighter ${className}`}>
      {/* Logo 图片 */}
      <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden">
        <Image
          src={logoPath}
          alt={`${brandName} logo`}
          width={32}
          height={32}
          className="object-contain"
        />
      </div>

      {/* 品牌名称 - 仅在 square 类型时显示 */}
      {showBrandName && (
        <span className="text-2xl text-slate-900">
          {brandName}
        </span>
      )}
    </div>
  );
};

export default Logo;
