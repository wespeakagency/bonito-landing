'use client';

import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
} from '@/components/icons';
import { Button } from './ui/button';

const socialLinks = [
  {
    name: 'Facebook',
    icon: FacebookIcon,
    href: '#',
  },
  {
    name: 'Instagram',
    icon: InstagramIcon,
    href: '#',
  },
  {
    name: 'TikTok',
    icon: TiktokIcon,
    href: '#',
  },
];

export default function SocialLinks() {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col gap-2">
        {socialLinks.map((link) => (
          <Button
            key={link.name}
            variant="ghost"
            size="icon"
            className="text-white/50 hover:text-white hover:bg-white/10 transition-colors duration-300 rounded-full"
            asChild
          >
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <link.icon className="h-5 w-5" />
              <span className="sr-only">{link.name}</span>
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}
