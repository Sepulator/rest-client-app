import { useTranslations } from 'next-intl';
import Image from 'next/image';

import courseLogo from '@/assets/images/rs-logo.svg';
import { teamInfo } from '@/components/footer/constants/team-info';
import { GithubIcon } from '@/components/icons/github';
import { safeSource } from '@/utils/safe-source';

const footerLinksClassName = 'opacity-70 duration-300 hover:opacity-100 flex gap-2 items-center';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer>
      <div className="border-divider border-t-1 p-6">
        <div className="mx-auto flex max-w-screen-2xl flex-col flex-wrap items-center justify-between gap-8 text-center whitespace-nowrap md:flex-row">
          <span> © 2025</span>

          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {teamInfo.map(({ name, github }) => (
              <a key={name} href={github} className={footerLinksClassName} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="text-large" />
                <span>{t(name)}</span>
              </a>
            ))}
          </div>

          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinksClassName}
          >
            <Image width={24} height={24} alt={t('courseLogoAlt')} src={safeSource(courseLogo)} />
            <span className="text-sm">RS School</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
