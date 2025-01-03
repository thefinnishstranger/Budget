import { IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

const socialIcons = [
  {
    link: 'https://instagram.com/nikolasgustavson',
    icon: InstagramIcon,
  },
  {
    link: 'https://github.com/thefinnishstranger',
    icon: GitHubIcon,
  },
  {
    link: 'https://x.com/nikgustavson',
    icon: XIcon,
  },
  {
    link: 'https://www.facebook.com/nikolas.gustavson',
    icon: FacebookIcon,
  },
  {
    link: 'https://www.youtube.com/@nikolasgustavson2493',
    icon: YouTubeIcon,
  },
];

const Footer = () => {
  const user = localStorage.getItem("loggedUser");

  return (
    <footer className="bg-green-500 text-white py-10 text-center font-semibold">
      <div className="flex flex-wrap justify-center gap-4 sm:gap-2 mb-6">
        <a
          href="/"
          className="transition transform hover:text-slate-200 duration-150 px-2 sm:px-1"
        >
          Home
        </a>
        <a
          href="/calculator"
          className="transition transform hover:text-slate-200 duration-150 px-2 sm:px-1"
        >
          Budget Calculator
        </a>
        {user && (
          <a
            href="/account"
            className="transition transform hover:text-slate-200 duration-150 px-2 sm:px-1"
          >
            Dashboard
          </a>
        )}
        <a
          href="/about"
          className="transition transform hover:text-slate-200 duration-150 px-2 sm:px-1"
        >
          About us
        </a>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {socialIcons.map((social) => (
          <IconButton
            key={social.link}
            sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
          >
            <a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition transform hover:text-slate-200 duration-150"
            >
              <social.icon />
            </a>
          </IconButton>
        ))}
      </div>
      <div className="text-sm font-thin mt-4">
        © 2024 Budget, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
